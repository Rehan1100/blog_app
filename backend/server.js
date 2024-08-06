const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const categoryRoutes = require('./routes/categoryRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/categories', categoryRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);
app.use('/blogs', blogRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
