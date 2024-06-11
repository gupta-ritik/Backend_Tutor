const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
// const fs = require('fs');
// const express = require('express');
// const { version } = require('react');
// const morgan = require('morgan');
// const app = express();

// Exporting the routers from the different file and importing it in the main file

// const userRouter = require('./routes/userRoutes');
// const tourRouter = require('./routes/tourRoutes');
// This is way to implmention of the Middleware interface
// app.use(express.json());

// Making Own middleware
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }
// Above code is for seting the environment variable for development mode

// app.use((req, res, next) => {
//   console.log('Hello from the middleware');
//   next();
// });
// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });
// // Using the third party Middlware middleware
// app.use(morgan('dev'));

// app.get('/', (req, res) => {
//res.status(200).send('Hello from the server side');

// there  is a new version of using the above code
//   res.status(200).json({
//     message: 'Hello from the server side',
//     app: 'Natours',
//     version: '1.0.0',
//   });
// });
// app.post('./', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

// Loading the Data from the data folder

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
// );

// HAndling GET Request handler method
// app.get('/api/v1/tours', (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// });
// Handling of the URL Parameters with the GET response
// app.get('/api/v1/tours/:id', (req, res) => {
//   console.log(req.params);
//   const id = req.params.id * 1;
//   const tour = tours.find((el) => el.id === id);
//   // if (id > tours.length) {
//   if (!tour) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// });

// How to Handle the Patch Request
// app.patch('/api/v1/tours/:id', (req, res) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour: '<Updated tour here...>',
//     },
//   });
// });
// // How to handle the DELETE Request

// app.delete('/api/v1/tours/:id', (req, res) => {
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   res.status(204).json({
//     status: 'success',
//     data: null,
//   });
// });
// HOw to Handle the POST Request
// app.post('/api/v1/tours', (req, res) => {
//   // console.log(req.body);

//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = Object.assign({ id: newId }, req.body);
//   tours.push(newTour);
//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       res.status(201).json({
//         status: 'success',
//         data: {
//           tour: newTour,
//         },
//       });
//     },
//   );
//   // res.send('DONE');
// });

// Refactoring of the all routes with all response handler

// const AllTours = (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// };

// app.get('/api/v1/tours', AllTours);

// const GetTour = (req, res) => {
//   console.log(req.params);
//   const id = req.params.id * 1;
//   const tour = tours.find((el) => el.id === id);
//   // if (id > tours.length) {
//   if (!tour) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// };
// app.get('/api/v1/tours/:id', GetTour);

// Creating the function of the many route handling

// const getAllUsers = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     results: users.length,
//     message: 'This route is not defined yet',
//     data: {
//       users,
//     },
//   });
// };
// const GetUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     results: users.length,
//     message: 'This route is not defined yet',
//     data: {
//       users,
//     },
//   });
// };
// const CreateUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     results: users.length,
//     message: 'This route is not defined yet',
//     data: {
//       users,
//     },
//   });
// };

// const DeleteUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     results: users.length,
//     message: 'This route is not defined yet',
//     data: {
//       users,
//     },
//   });
// };
// const UpdateUser = (req, res) => {
//   res.status(500).json({
//     status: 'error',
//     results: users.length,
//     message: 'This route is not defined yet',
//     data: {
//       users,
//     },
//   });
// };

// Implementing the USERS Routes with the response handler

// app
// .route('/api/v1/users')
// .get(getAllUsers)
// .post(CreateUser);

// app
//   .route('/api/v1/users/:id')
//   .get(GetUser)
//   .patch(UpdateUser)
//   .delete(DeleteUser);

// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/tour', tourRouter);

// app.listen(3000, () => {
//   console.log('App running on port 3000...');
// });

// USING STATics files in serving the static files

// app.use(express.static(`${__dirname}/public`));

// module.exports = app;
