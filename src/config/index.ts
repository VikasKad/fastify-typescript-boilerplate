const config = {
    port: process.env.PORT || 3000,
    dbUrl: process.env.DB_URL || 'mongodb://localhost:27017/fastifydb',
    jwtSecret: process.env.JWT_SECRET || 'supersecret',
};

export default config;
