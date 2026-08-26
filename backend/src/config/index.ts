export const config = {
  port: process.env.PORT || 5001,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/smashlive',
  jwtSecret: process.env.JWT_SECRET || 'smash_secret_key_2024',
  jwtExpire: process.env.JWT_EXPIRE || '24h',

  // Firebase Admin — paste the full service account JSON as a single-line string
  firebaseServiceAccount: process.env.FIREBASE_SERVICE_ACCOUNT || '',
};
