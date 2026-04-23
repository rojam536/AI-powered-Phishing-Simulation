const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

const seedUsers = async () => {
  try {
    // Delete existing user if exists
    await User.deleteOne({ email: 'r7729090@gmail.com' });

    // Create new user with properly hashed password
    const userRequested = await User.create({
      name: 'User',
      email: 'r7729090@gmail.com',
      password: 'password123',
      role: 'admin'
    });

    console.log('User account recreated:');
    console.log(`Email: ${userRequested.email}`);
    console.log(`Password: password123`);
    console.log(`Role: ${userRequested.role}`);

    process.exit();
  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
