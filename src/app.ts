import express from 'express';
import mongoose from 'mongoose';
import bankAccountRoutes from './routes/bankAccountRouterWeb';
import bankAccountRoutesJSON from './routes/bankAccountRouterJSON';
import methodOverride from 'method-override';
import { errorHandler } from './middleware/errorHandler';

void (async function () {
  const app = express();

  // Connect to MongoDB database using Mongoose
  await mongoose.connect(
    'mongodb+srv://tempAccount:Hr5UjgvOrA0hxUSo@jpasuift458.ibk5shr.mongodb.net/bank-accounts',
    {}
  );
  console.log('Connected to MongoDB database');

  // Configure middleware
  app.set('view engine', 'ejs');
  app.set('views', 'src/views');
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(methodOverride('_method'));
  app.use(errorHandler);
  // Configure routes
  app.use('/bankAccounts', bankAccountRoutes);
  app.use('/api/bankAccounts', bankAccountRoutesJSON);

  // Start server
  const PORT =
    process.env.PORT != null ? (process.env.PORT as unknown as number) : 3000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
})();
