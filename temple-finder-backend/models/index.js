const { Sequelize } = require('sequelize');
const path = require('path');

// Database Configuration
const sequelize = new Sequelize(
  process.env.DB_NAME || 'temple_finder',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  }
);

// Import Models
const User = require('./User')(sequelize);
const Temple = require('./Temple')(sequelize);
const Review = require('./Review')(sequelize);
const Event = require('./Event')(sequelize);
const UserFavorite = require('./UserFavorite')(sequelize);
const UserVisit = require('./UserVisit')(sequelize);

// Define Associations
// User Associations
User.hasMany(Review, { foreignKey: 'user_id', as: 'reviews' });
User.hasMany(UserFavorite, { foreignKey: 'user_id', as: 'favorites' });
User.hasMany(UserVisit, { foreignKey: 'user_id', as: 'visits' });

// Temple Associations
Temple.hasMany(Review, { foreignKey: 'temple_id', as: 'reviews' });
Temple.hasMany(Event, { foreignKey: 'temple_id', as: 'events' });
Temple.hasMany(UserFavorite, { foreignKey: 'temple_id', as: 'favorites' });
Temple.hasMany(UserVisit, { foreignKey: 'temple_id', as: 'visits' });

// Review Associations
Review.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Review.belongsTo(Temple, { foreignKey: 'temple_id', as: 'temple' });

// Event Associations
Event.belongsTo(Temple, { foreignKey: 'temple_id', as: 'temple' });

// UserFavorite Associations
UserFavorite.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
UserFavorite.belongsTo(Temple, { foreignKey: 'temple_id', as: 'temple' });

// UserVisit Associations
UserVisit.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
UserVisit.belongsTo(Temple, { foreignKey: 'temple_id', as: 'temple' });

// Database Connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
    
    // Sync database (create tables if they don't exist)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('📊 Database synchronized');
    }
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectDB,
  User,
  Temple,
  Review,
  Event,
  UserFavorite,
  UserVisit
};




