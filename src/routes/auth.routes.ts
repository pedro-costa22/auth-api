import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import verifyToken from '../core/middlewares/auth';

const router = Router();

const authRoutes = () => {
  router.post(`/api/v${process.env.API_VERSION}/login`, AuthController.authenticate);

  return router;
}

export default authRoutes;