export const config = {
  port: process.env.PORT || 5001,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/smashlive',
  jwtSecret: process.env.JWT_SECRET || 'smash_secret_key_2024',
  jwtExpire: '24h',
  redisUri: process.env.REDIS_URI || 'redis://localhost:6379'
};