import convict from 'convict';

const config = convict({
  app: {
    environment: {
      doc: 'App environment',
      env: 'NODE_ENV',
      format: ['production', 'staging', 'development'],
      default: 'development'
    }
  },
  logger: {
    level: {
      doc: 'Level for logger',
      env: 'LOGGER_LEVEL',
      format: ['info', 'debug', 'warn', 'error'],
      default: 'info'
    }
  },
  server: {
    port: {
      doc: 'Server port',
      env: 'SERVER_PORT',
      format: Number,
      default: 5000
    }
  },
  mongo: {
    host: {
      doc: 'Mongo host',
      env: 'MONGO_HOST',
      format: String,
      default: 'localhost'
    },
    port: {
      doc: 'Mongo port',
      env: 'MONGO_PORT',
      format: String,
      default: '27017'
    },
    username: {
      doc: 'Mongo username',
      env: 'MONGO_USERNAME',
      format: String,
      default: 'root'
    },
    password: {
      doc: 'Mongo password',
      env: 'MONGO_PASSWORD',
      format: String,
      default: 'example'
    },
    database: {
      doc: 'Mongo database',
      env: 'MONGO_DATABASE',
      format: String,
      default: ''
    }
  }
});

config.loadFile([`${__dirname}/config.json`]);

export = config;
