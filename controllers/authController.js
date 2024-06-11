const jwt = require('jsonwebtoken');

const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = id => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  //
  const newUser = await User.create(req.body);
  // Creating the token for the user and sending it to the client will create a cookie in the client side of the session and send it to the server side of the session session cookie store and the client side of the session cookie store will be sent to the server side of the session cookie store and the client side of the session cookie store will be sent to the server side of the session

  // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
  //   expiresIn: process.env.JWT_EXPIRES_IN
  // });

  // different way to use above code that is above code is same as below code
  const token = signToken(newUser._id);
  // Sending details of the newUser to the clients in the form of json
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

// login code is given below and it is used to login the user and send the token to the client

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');
  // const correct = await user.correctPassword(password, user.password);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  // console.log(user);

  // 3) If everything is ok, send token to client
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    if (!token) return next(new AppError('Token not found', 401));
  }
  // 2) Verification token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  // 3) Check if user still exists

  // 4) Check if user changed password after the token was issued

  next();
});
