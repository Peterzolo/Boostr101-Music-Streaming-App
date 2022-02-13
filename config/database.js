const mongoose = require('mongoose');


const databaseConnection = async () =>{

    try {
        const mongoConnect = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB successfully connected')
     
       
    } catch (error) {
        console.log('Could not connect with the database', error)
    }
}


module.exports = databaseConnection;