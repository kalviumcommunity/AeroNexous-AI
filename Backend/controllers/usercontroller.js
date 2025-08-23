const User = require('../model/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const secretKey = process.env.JWT_SECRET;

const registerOrLoginUser = async (req, res) => {
  const { username, email, password, expertise } = req.body;

  if (!username || !email || !password || !expertise) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If user exists, check password
      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

      if (!isPasswordCorrect) {
        return res.status(401).json({ error: 'Incorrect password' });
      }

      // Generate token and return user data
      const token = jwt.sign(
        {
          userId: existingUser._id,
          username: existingUser.username,
          expertise: existingUser.expertise
        },
        secretKey,
        { expiresIn: '2h' }
      );

      return res.status(200).json({
        message: 'Login successful',
        token,
        userProfile: {
          username: existingUser.username,
          expertise: existingUser.expertise
        }
      });
    } else {
      // If user doesn't exist, register
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        expertise
      });

      await newUser.save();

      const token = jwt.sign(
        {
          userId: newUser._id,
          username: newUser.username,
          expertise: newUser.expertise
        },
        secretKey,
        { expiresIn: '2h' }
      );

      return res.status(201).json({
        message: 'User registered and logged in successfully',
        token,
        userProfile: {
          username: newUser.username,
          expertise: newUser.expertise
        }
      });
    }
  } catch (err) {
    console.error('Registration/Login error:', err);
    res.status(500).json({ error: 'Server error during login/registration' });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Fetch profile error:', err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};
const editProfile= async (req, res) => {
  const { username, email, expertise, password } = req.body;

  try {
    const updatedFields = { username, email, expertise };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedFields.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      updatedFields,
      { new: true }
    ).select('-password');

    res.json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

module.exports = { registerOrLoginUser , getProfile, editProfile };
