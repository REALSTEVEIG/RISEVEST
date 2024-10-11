import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import { errorHandler } from './middleware/errorHandler';
import { authMiddleware } from './middleware/authMiddleware';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/users', authMiddleware, postRoutes);
app.use('/posts', authMiddleware, commentRoutes);

app.use(errorHandler);

export default app;
