const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
// const app = require('./app');

// dotenv.config({ path: './config.env' });

// // console.log(app.get('env'));

// // console.log(process.env);
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD,
// );
// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//   })
//   .then((con) => {
//     // console.log(con.connections);
//     console.log('DB connection successful');
//   });

// // const tourSchema = new mongoose.Schema({
// //   name: {
// //     type: String,
// //     required: [true, 'A tour must have a name'],
// //     unique: true,
// //   },
// //   rating: {
// //     type: Number,
// //     default: 4.5,
// //   },
// //   price: {
// //     type: Number,
// //     required: [true, 'A tour must have a price'],
// //   },
// // });
// // const Tour = mongoose.model('Tour', tourSchema);

// // const testTour = new Tour({
// //   name: 'Newzealand',
// //   price: 997,
// // });

// // testTour
// //   .save()
// //   .then((doc) => {
// //     console.log(doc);
// //   })
// //   .catch((err) => {
// //     console.log('ERROR', err);
// //   });

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log('App running on port 3000...');
// });
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config({ path: './config.env' });
