import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import { Express } from 'express';

const routesConfig = (app: Express) => {
  app.use(userRoutes());
  app.use(authRoutes());
}

export default routesConfig;
