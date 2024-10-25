import mongoose from "mongoose";

export async function dbConnect(){
    try {
        const conn = await mongoose.connect(String(process.env.MONGODB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }));
        return mongoose.connection;
    } catch(err) {
        console.error(err);
    }
}