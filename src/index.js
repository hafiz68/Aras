const express = require ("express");
const app = express();
const cors = require ("cors");
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const studRoutes = require('./routes/studentsRoutes')



const  {users, employement,jobs , qualification, students}  = require('./models');
app.use(cors());
app.use(express.json());
app.use("/alumini", userRoutes);
app.use("/alumini", studRoutes);

const dotenv = require('dotenv');
dotenv.config();

app.use("/", (req, res)=>{ 
    return res.send({message:"Server is listening at localhost:5000"});
})


sequelize.sync().then((result) => {
    app.listen(5000, ()=>{
        console.log("You are on port 5000");
    });
}).catch(err => {
    console.log(err)
});