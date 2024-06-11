const express = require('express');

// Handler is exporting from the external folder of the controller

const userController = require('./../controllers/userController');

const authController = require('./../controllers/authController');
// const { router } = require('../app');

// const userRouter = express.Router();
const router = express.Router();
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Creating the function of the many route handling

// Implementing the USERS Routes with the response handler

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
