const PORT = process.env.PORT || 8080;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/barstool-be';
const TEST_DATABASE_URL = 
        process.env.TEST_DATABASE_URL ||
        'mongodb://localhost/barstool-be-test';
