import express from 'express';
import mongoose from 'mongoose';
import bankAccountRoutes from './routes/bankAccountRouterWeb';
import bankAccountRoutesJSON from './routes/bankAccountRouterJSON';
import loanRouteJSON from './routes/loansRouterJSON';
import loanRouteWeb from './routes/loansRouterWeb';
import userRouteWeb from './routes/userRouterWeb';
import userRouteJSON from './routes/userRouterJSON';
import methodOverride from 'method-override';
import { errorHandler } from './middleware/errorHandler';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

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

  // Start server
  const PORT =
    process.env.PORT != null ? (process.env.PORT as unknown as number) : 3000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
})();
