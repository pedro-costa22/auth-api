import { Router } from 'express';
import UserController from '../controllers/user.controller';
import verifyToken from '../core/middlewares/auth';

const router = Router();

const userRoutes = () => {
  router.post(`/api/v${process.env.API_VERSION}/user/register`, UserController.create);
  router.get(`/api/v${process.env.API_VERSION}/user`, verifyToken, UserController.getUsers);
  router.get(`/api/v${process.env.API_VERSION}/user/:id`, verifyToken, UserController.getById);
  router.put(`/api/v${process.env.API_VERSION}/user/:id`, verifyToken, UserController.updateUser);
  router.delete(`/api/v${process.env.API_VERSION}/user/:id`, verifyToken, UserController.deleteUser);

  return router;
}

export default userRoutes;