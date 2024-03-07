import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import { Express } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger';

const routesConfig = (app: Express) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
  app.use(userRoutes());
  app.use(authRoutes());
}

export default routesConfig;
