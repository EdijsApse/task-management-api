import express from 'express';
import projectRoutes from './projects';

const APIRouter = express.Router();

APIRouter.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Task Management API is running',
  });
});

APIRouter.use('/projects', projectRoutes);

export default APIRouter;
