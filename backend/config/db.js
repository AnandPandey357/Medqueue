import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    console.log('\n⚠️  Please update your MONGODB_URI in backend/.env file');
    console.log('📝 Get your connection string from MongoDB Atlas:');
    console.log('   1. Go to https://www.mongodb.com/cloud/atlas');
    console.log('   2. Create a FREE cluster');
    console.log('   3. Click Connect → Connect your application');
    console.log('   4. Copy the connection string and paste it in backend/.env\n');
    process.exit(1);
  }
};

export default connectDB;
