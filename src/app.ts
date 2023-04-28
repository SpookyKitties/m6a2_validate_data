import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { readFileSync } from 'fs';
import https from 'https';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import { errorHandler } from './middleware/errorHandler';
import bankAccountRoutesJSON from './routes/bankAccountRouterJSON';
import bankAccountRoutes from './routes/bankAccountRouterWeb';
import loanRouteJSON from './routes/loansRouterJSON';
import loanRouteWeb from './routes/loansRouterWeb';
import userRouteJSON from './routes/userRouterJSON';
import userRouteWeb from './routes/userRouterWeb';

void (async function () {
  dotenv.config({ path: './.env.local' });
  const app = express();
  const MONGODB_URI =
    process.env.MONGODB_URI != null
      ? process.env.MONGODB_URI
      : 'mongodb://localhost:27017/ift458_final';
  // Connect to MongoDB database using Mongoose
  await mongoose.connect(MONGODB_URI, {});
  console.log('Connected to MongoDB database');

  // Configure middleware
  app.set('view engine', 'ejs');
  app.set('views', 'src/views');
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(methodOverride('_method'));
  app.use(errorHandler);

  app.use(cors());
  // Configure routes
  app.use('/bankAccounts', bankAccountRoutes);
  app.use('/api/bankAccounts', bankAccountRoutesJSON);
  app.use('/loans', loanRouteWeb);
  app.use('/api/loans', loanRouteJSON);
  app.use('/users', userRouteWeb);
  app.use('/api/users', userRouteJSON);

  const options = {
    key: readFileSync('server.key'),
    cert: readFileSync('server.cert')
  };

  // Start server
  const PORT =
    process.env.PORT != null ? (process.env.PORT as unknown as number) : 3000;

  https.createServer(options, app).listen(PORT, () => {
    console.log(`App running on PORT ${PORT}...`);
  });
})();
