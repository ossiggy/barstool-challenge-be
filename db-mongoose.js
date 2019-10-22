const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { DATABASE_URL } = require('./config');

const dbConnect = (url = DATABASE_URL) => {
  console.log(url);
    return mongoose.connect(url).catch(err => {
        console.error('Mongoose failed to connect');
        console.error(err);
    });
}

const dbDisconnect = () => {
    return mongoose.disconnect();
}

const dbGet = () => {
    return mongoose;
}

module.exports = {
    dbConnect,
    dbDisconnect,
    dbGet
};
