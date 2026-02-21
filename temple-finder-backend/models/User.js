const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [2, 100]
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [6, 255]
      }
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: {
        is: /^[\+]?[1-9][\d]{0,15}$/
      }
    },
    avatar: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull: true
    },
    location: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {
        city: null,
        state: null,
        country: null,
        coordinates: {
          lat: null,
          lng: null
        }
      }
    },
    preferences: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {
        language: 'en',
        notifications: {
          email: true,
          push: true,
          events: true,
          reviews: true
        },
        privacy: {
          profile: 'public',
          visits: 'public',
          reviews: 'public'
        }
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
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    loginCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'users',
    indexes: [
      {
        unique: true,
        fields: ['email']
      },
      {
        fields: ['name']
      },
      {
        fields: ['isActive']
      }
    ],
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 12);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 12);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });

  // Instance Methods
  User.prototype.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  };

  User.prototype.toJSON = function() {
    const values = { ...this.get() };
    delete values.password;
    return values;
  };

  User.prototype.getPublicProfile = function() {
    return {
      id: this.id,
      name: this.name,
      avatar: this.avatar,
      location: this.location,
      preferences: this.preferences
    };
  };

  return User;
};




