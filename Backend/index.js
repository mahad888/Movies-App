import express from "express"
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import userRoute from './Routes/userRoute.js';


const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
    credentials: true,
  };
  
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use('/api/v1/auth',userRoute);




  mongoose.set('strictQuery', false);

mongoose.connect(process.env.Mongo_URL)
  .then(() => console.log('Connected to the database!'))
  .catch(err => {
    console.error('Failed to connect to the database!', err.message);
    process.exit(1);
  });

    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    }
    );
  