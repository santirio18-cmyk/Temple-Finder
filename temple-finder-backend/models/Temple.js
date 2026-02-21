const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Temple = sequelize.define('Temple', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [2, 255]
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deity: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [2, 100]
      }
    },
    category: {
      type: DataTypes.ENUM(
        'Hindu',
        'Buddhist',
        'Jain',
        'Sikh',
        'Other'
      ),
      allowNull: false,
      defaultValue: 'Hindu'
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [2, 100]
      }
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [2, 100]
      }
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [2, 100]
      }
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: 'India',
      validate: {
        len: [2, 100]
      }
    },
    coordinates: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isValidCoordinates(value) {
          if (!value || typeof value.lat !== 'number' || typeof value.lng !== 'number') {
            throw new Error('Coordinates must contain valid lat and lng numbers');
          }
          if (value.lat < -90 || value.lat > 90) {
            throw new Error('Latitude must be between -90 and 90');
          }
          if (value.lng < -180 || value.lng > 180) {
            throw new Error('Longitude must be between -180 and 180');
          }
        }
      }
    },
    contact: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {
        phone: null,
        email: null,
        website: null,
        socialMedia: {
          facebook: null,
          instagram: null,
          twitter: null
        }
      }
    },
    timings: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {
        openingTime: '06:00',
        closingTime: '21:00',
        specialTimings: {},
        weeklySchedule: {
          monday: { open: true, timings: '06:00-21:00' },
          tuesday: { open: true, timings: '06:00-21:00' },
          wednesday: { open: true, timings: '06:00-21:00' },
          thursday: { open: true, timings: '06:00-21:00' },
          friday: { open: true, timings: '06:00-21:00' },
          saturday: { open: true, timings: '06:00-21:00' },
          sunday: { open: true, timings: '06:00-21:00' }
        }
      }
    },
    facilities: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {
        parking: false,
        wheelchairAccess: false,
        restrooms: false,
        drinkingWater: false,
        foodCourt: false,
        souvenirShop: false,
        accommodation: false,
        wifi: false,
        atm: false,
        medicalFacility: false
      }
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 100,
      validate: {
        min: 1,
        max: 100000
      }
    },
    currentOccupancy: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: true,
      defaultValue: 0.00,
      validate: {
        min: 0.00,
        max: 5.00
      }
    },
    reviewCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {
        establishedYear: null,
        architecture: null,
        significance: null,
        festivals: [],
        nearbyAttractions: []
      }
    }
  }, {
    tableName: 'temples',
    indexes: [
      {
        fields: ['name']
      },
      {
        fields: ['deity']
      },
      {
        fields: ['city']
      },
      {
        fields: ['state']
      },
      {
        fields: ['category']
      },
      {
        fields: ['isActive']
      },
      {
        fields: ['featured']
      },
      {
        fields: ['rating']
      },
      {
        type: 'GIN',
        fields: ['tags']
      }
    ]
  });

  // Instance Methods
  Temple.prototype.calculateDistance = function(lat, lng) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat - this.coordinates.lat) * Math.PI / 180;
    const dLng = (lng - this.coordinates.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.coordinates.lat * Math.PI / 180) * Math.cos(lat * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  Temple.prototype.updateRating = async function() {
    const reviews = await this.getReviews();
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      this.rating = (totalRating / reviews.length).toFixed(2);
      this.reviewCount = reviews.length;
      await this.save();
    }
  };

  Temple.prototype.toJSON = function() {
    const values = { ...this.get() };
    return values;
  };

  return Temple;
};




