require('dotenv').config()
const jsonData = require('./data.json');
const connectDB = require('./db/connect');
const Employee = require('./models/employee');

const populateDB = async () => {
    try {
        await connectDB(process.env.mongo_uri);
        await Employee.deleteMany();
        await Employee.create(jsonData);
        console.log('Success!')
        process.exit(0)
        
    } catch (error) {
        console.log('Could not connect to MongoDB', error.message)
        process.exit(1)
    }
}

populateDB()