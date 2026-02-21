const express = require('express');
const { Op } = require('sequelize');
const Joi = require('joi');
const { Temple, Review, User } = require('../models');
const { authenticateToken, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Validation Schemas
const createTempleSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  description: Joi.string().optional(),
  deity: Joi.string().min(2).max(100).required(),
  category: Joi.string().valid('Hindu', 'Buddhist', 'Jain', 'Sikh', 'Other').required(),
  address: Joi.string().required(),
  location: Joi.string().min(2).max(100).required(),
  city: Joi.string().min(2).max(100).required(),
  state: Joi.string().min(2).max(100).required(),
  country: Joi.string().min(2).max(100).default('India'),
  coordinates: Joi.object({
    lat: Joi.number().min(-90).max(90).required(),
    lng: Joi.number().min(-180).max(180).required()
  }).required(),
  contact: Joi.object().optional(),
  timings: Joi.object().optional(),
  facilities: Joi.object().optional(),
  capacity: Joi.number().integer().min(1).max(100000).optional(),
  images: Joi.array().optional(),
  tags: Joi.array().optional(),
  metadata: Joi.object().optional()
});

// @route   GET /api/v1/temples
// @desc    Get all temples with filters and pagination
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      city,
      state,
      category,
      deity,
      lat,
      lng,
      radius = 50,
      featured,
      sortBy = 'name',
      sortOrder = 'ASC'
    } = req.query;

    const offset = (page - 1) * limit;
    const where = { isActive: true };

    // Search filter
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
        { deity: { [Op.iLike]: `%${search}%` } },
        { location: { [Op.iLike]: `%${search}%` } },
        { city: { [Op.iLike]: `%${search}%` } }
      ];
    }

    // Location filters
    if (city) where.city = { [Op.iLike]: `%${city}%` };
    if (state) where.state = { [Op.iLike]: `%${state}%` };
    if (category) where.category = category;
    if (deity) where.deity = { [Op.iLike]: `%${deity}%` };
    if (featured) where.featured = featured === 'true';

    // Distance filter (if coordinates provided)
    let distanceFilter = null;
    if (lat && lng) {
      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lng);
      const radiusNum = parseFloat(radius);

      if (!isNaN(latNum) && !isNaN(lngNum) && !isNaN(radiusNum)) {
        // Calculate bounding box for efficient querying
        const latRange = radiusNum / 111; // Rough conversion km to degrees
        const lngRange = radiusNum / (111 * Math.cos(latNum * Math.PI / 180));
        
        where.coordinates = {
          [Op.and]: [
            { lat: { [Op.between]: [latNum - latRange, latNum + latRange] } },
            { lng: { [Op.between]: [lngNum - lngRange, lngNum + lngRange] } }
          ]
        };
      }
    }

    // Sorting
    const order = [[sortBy, sortOrder.toUpperCase()]];

    const { count, rows: temples } = await Temple.findAndCountAll({
      where,
      order,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: Review,
          as: 'reviews',
          attributes: ['rating'],
          required: false
        }
      ]
    });

    // Calculate distances if coordinates provided
    let templesWithDistance = temples;
    if (lat && lng && !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lng))) {
      templesWithDistance = temples.map(temple => {
        const distance = temple.calculateDistance(parseFloat(lat), parseFloat(lng));
        return {
          ...temple.toJSON(),
          distance: Math.round(distance * 10) / 10 // Round to 1 decimal place
        };
      }).filter(temple => !distanceFilter || temple.distance <= parseFloat(radius));
    }

    res.json({
      success: true,
      data: {
        temples: templesWithDistance,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalTemples: count,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get temples error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// @route   GET /api/v1/temples/nearby
// @desc    Get nearby temples
// @access  Public
router.get('/nearby', optionalAuth, async (req, res) => {
  try {
    const { lat, lng, radius = 15, limit = 10 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({
        success: false,
        error: 'Latitude and longitude are required'
      });
    }

    const latNum = parseFloat(lat);
    const lngNum = parseFloat(lng);
    const radiusNum = parseFloat(radius);

    if (isNaN(latNum) || isNaN(lngNum) || isNaN(radiusNum)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid coordinates or radius'
      });
    }

    // Get all active temples
    const temples = await Temple.findAll({
      where: { isActive: true },
      include: [
        {
          model: Review,
          as: 'reviews',
          attributes: ['rating'],
          required: false
        }
      ]
    });

    // Calculate distances and filter
    const nearbyTemples = temples
      .map(temple => {
        const distance = temple.calculateDistance(latNum, lngNum);
        return {
          ...temple.toJSON(),
          distance: Math.round(distance * 10) / 10
        };
      })
      .filter(temple => temple.distance <= radiusNum)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, parseInt(limit));

    res.json({
      success: true,
      data: {
        temples: nearbyTemples,
        userLocation: { lat: latNum, lng: lngNum },
        radius: radiusNum,
        count: nearbyTemples.length
      }
    });

  } catch (error) {
    console.error('Get nearby temples error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// @route   GET /api/v1/temples/:id
// @desc    Get temple by ID
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const temple = await Temple.findOne({
      where: { id, isActive: true },
      include: [
        {
          model: Review,
          as: 'reviews',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name', 'avatar']
            }
          ],
          order: [['createdAt', 'DESC']],
          limit: 10
        }
      ]
    });

    if (!temple) {
      return res.status(404).json({
        success: false,
        error: 'Temple not found'
      });
    }

    res.json({
      success: true,
      data: {
        temple: temple.toJSON()
      }
    });

  } catch (error) {
    console.error('Get temple error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// @route   POST /api/v1/temples
// @desc    Create new temple
// @access  Private (Admin)
router.post('/', authenticateToken, async (req, res) => {
  try {
    // Validate input
    const { error, value } = createTempleSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    // Check if temple with same name and location already exists
    const existingTemple = await Temple.findOne({
      where: {
        name: value.name,
        city: value.city,
        state: value.state
      }
    });

    if (existingTemple) {
      return res.status(409).json({
        success: false,
        error: 'Temple with this name already exists in this location'
      });
    }

    // Create temple
    const temple = await Temple.create(value);

    res.status(201).json({
      success: true,
      message: 'Temple created successfully',
      data: {
        temple: temple.toJSON()
      }
    });

  } catch (error) {
    console.error('Create temple error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// @route   PUT /api/v1/temples/:id
// @desc    Update temple
// @access  Private (Admin)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const temple = await Temple.findByPk(id);
    if (!temple) {
      return res.status(404).json({
        success: false,
        error: 'Temple not found'
      });
    }

    // Validate input (make fields optional for updates)
    const updateSchema = createTempleSchema.fork(Object.keys(createTempleSchema.describe().keys), (schema) => schema.optional());
    const { error, value } = updateSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }

    // Update temple
    await temple.update(value);

    res.json({
      success: true,
      message: 'Temple updated successfully',
      data: {
        temple: temple.toJSON()
      }
    });

  } catch (error) {
    console.error('Update temple error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// @route   DELETE /api/v1/temples/:id
// @desc    Delete temple (soft delete)
// @access  Private (Admin)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const temple = await Temple.findByPk(id);
    if (!temple) {
      return res.status(404).json({
        success: false,
        error: 'Temple not found'
      });
    }

    // Soft delete
    await temple.update({ isActive: false });

    res.json({
      success: true,
      message: 'Temple deleted successfully'
    });

  } catch (error) {
    console.error('Delete temple error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

module.exports = router;




