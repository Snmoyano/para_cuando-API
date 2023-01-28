'use strict'
require('dotenv').config()
module.exports = {
  api: {
    jwtSecret: process.env.JWT_SECRET,
    mailPass: process.env.MAIL_PASS,
    host: process.env.HOST || 'http://localhost:8000/',
  },
  development: {
    use_env_variable: 'DATABASE_URI_DEV',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
    dialectOptions: {
      useUTC: true,
    },
    timezone: 'UTC',
  },
  test: {
    use_env_variable: 'DATABASE_URI_TEST',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },
    dialectOptions: {
      useUTC: true,
    },
    timezone: 'UTC',
  },
  production: {
    use_env_variable: 'DATABASE_URI_PROD',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      useUTC: true,
    },
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    },

    timezone: 'UTC',
  },
}
