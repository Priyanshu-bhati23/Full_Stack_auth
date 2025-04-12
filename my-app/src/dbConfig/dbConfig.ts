import mongoose from "mongoose"

export async function  connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection=mongoose.connection;

    connection.on('connected',()=>{
      console.log('connected to mongoDB')
    })



    connection.on('error',(err)=>{
      console.log('MongoDB connection error,please make sure mongodb is running'+err);
      process.exit();
    })
  } catch (error){
    console.log('something goes wrong');
    console.log(error);
    
    
  }
}