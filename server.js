const express = require("express")
const cors = require("cors");
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

require("dotenv").config()

const app = express();
const port = process.env.PORT || 5000;
const urlencodedParser = bodyParser.urlencoded({extended:false})
app.use(cors());
app.use(bodyParser.json(), urlencodedParser)

app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology:true})

const connection = mongoose.connection

connection.once('open', ()=>{
    console.log("MongoDB database connection established successfully.")
}) 


const schoolsRouter = require("./routes/schoolsrouter")
const loginRouter = require("./routes/loginrouter")
const assignmentrouter = require("./routes/assignmentrouter")
const noticesRouter = require("./routes/noticesrouter");
const { urlencoded } = require("body-parser");


app.use('/add-school', schoolsRouter);

// app.use('/assignments', assignmentrouter);
// app.use('/notices', noticesRouter);

app.listen(port, ()=>{
    console.log("SERVER IS RUNNING ON PORT " +port)
})