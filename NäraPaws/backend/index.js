import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
