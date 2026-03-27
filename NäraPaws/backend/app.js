// Import necessary modules and dependencies
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';

// Import route handlers for different functionalities
import path from 'path';
import { fileURLToPath } from 'url';

// Import route handlers
import adminRoutes from './routes/admin/index.js';
import bookingRoutes from './routes/bookings/index.js';
import userRoutes from './routes/users/index.js';

// Load environment variables from the .env file
const{ PORT, UPLOADS_DIR } = process.env;
// Create an instance of the Express application
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to enable CORS and parse JSON request bodies
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, UPLOADS_DIR)));


//Define root route
app.get('/', (req, res) => {
    res.send('Welcome to the Dog Walking Service API');
});

//Define a route for favicon
app.get('/favicon.ico', (req, res) => {
    res.sendStatus(204); // No Content
});

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/auth', adminRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/dogs', dogsRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/walkers', walkersRoutes);
// You can add more routes for other user operations as needed


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send({
        status: 'error',
        message: 'Something went wrong!'
    });
});

// Handle 404 errors for undefined routes
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Route not found'
    });
});

// Start the server
// Listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
