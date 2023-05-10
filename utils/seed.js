const mongoose = require('mongoose');
const { User, Thought } = require('../models');
const db = require('../config/connection');

db.once('open', async () => {
  try {
    // Delete existing thoughts and users
    await Thought.deleteMany({});
    await User.deleteMany({});

    // Create user data
    const userData = await User.create([
      {
        username: 'lernantino',
        email: 'l@gmail.com',
      },
      {
        username: 'testUser',
        email: 'TA@gmail.com',
      }
    ]);

    // Create thoughts
    await Thought.create({
      thoughtText: 'This is a seeded thought!',
      username: 'lernantino'
    });

    await Thought.create({
      thoughtText: 'This is another seeded thought!',
      username: 'testUser'
    });

    console.log('Seeding completed');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    // Close the database connection
    db.close();
  }
});
