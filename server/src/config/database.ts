import mongoose from 'mongoose';

const connectionString = 'mongodb://localhost:27017/carsdb';

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