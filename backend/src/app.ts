import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import spaceRoutes from './routes/spaceRoutes';
import feedRoutes from './routes/feedRoutes';
import commentRoutes from './routes/commentRoutes';
import reactionRoutes from './routes/reactionRoutes';
import reportRoutes from './routes/reportRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

export default app;
