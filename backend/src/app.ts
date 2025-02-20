import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import spaceRoutes from './routes/spaceRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/spaces', spaceRoutes);

export default app;
