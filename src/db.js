import mongoose from 'mongoose';

export const connectDB = async()=> {
    try {
        mongoose.connect('mongodb://localhost/reservasdb');
        console.log(">>> DB is connected");
    } catch(error){
        console.log(error);
    }
}