import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/smashlive';
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error. Please ensure MongoDB is running or check your MONGODB_URI environment variable:', error);
    // Removed process.exit(1) to prevent the entire app server from hanging/looping in preview mode
  }
};

export default connectDB;