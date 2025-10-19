import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/cars';

export default async () => {
  try {
    await mongoose.connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    } as mongoose.ConnectOptions);
    console.log('Database connected');
  } catch (error: any) {
    console.error('Error initializing database');
    console.error(error.message);
    process.exit(1);
  }
};