const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name.'],
    minlength: [2, 'Name must have at least 2 characters.'],
    maxlength: [50, 'Name cannot exceed 50 characters.']
  },
  birthday: {
    type: Date,
    required: [true, 'Please provide a birthday.']
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number.'],
    minlength: [10, 'Phone number must have at least 10 characters.'],
    maxlength: [15, 'Phone number cannot exceed 15 characters.']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address.'],
    unique: true,
    minlength: [5, 'Email address must have at least 5 characters.'],
    maxlength: [255, 'Email address cannot exceed 255 characters.'],
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , 'Please provide a valid email address.']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: [6, 'Password must have at least 6 characters.'],
    maxlength: [100, 'Password cannot exceed 100 characters.']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm the password.']
  },
  zipCode: {
    type: String,
    required: [true, 'Please provide a zip code.'],
    minlength: [5, 'Zip code must have at least 5 characters.'],
    maxlength: [10, 'Zip code cannot exceed 10 characters.']
  },
  street: {
    type: String,
    required: [true, 'Please provide a street name.'],
    minlength: [2, 'Street name must have at least 2 characters.'],
    maxlength: [100, 'Street name cannot exceed 100 characters.']
  },
  number: {
    type: String,
    required: [true, 'Please provide a house number.'],
    minlength: [1, 'House number must have at least 1 character.'],
    maxlength: [10, 'House number cannot exceed 10 characters.']
  },
  neighbourhood: {
    type: String,
    required: [true, 'Please provide a neighborhood.'],
    minlength: [2, 'Neighborhood must have at least 2 characters.'],
    maxlength: [100, 'Neighborhood cannot exceed 100 characters.']
  },
  city: {
    type: String,
    required: [true, 'Please provide a city.'],
    minlength: [2, 'City must have at least 2 characters.'],
    maxlength: [100, 'City cannot exceed 100 characters.']
  }
});

userSchema.pre('save', async function() {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function(userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
