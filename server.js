const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const app = express();
const mongo = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}))

app.use('/static', express.static( path.join(__dirname, '/public')));

mongo.connect('mongodb://localhost/my_database');
const Schema = mongo.Schema;
const userSchema = new Schema({
    rollNumber : Number,
    firstName: String,
    lastName: String
})
const userModel = mongo.model('user',userSchema);
app.get('/', (req, res) =>{
    res.send('Hello World');
});




app.post('/', (req, res) =>{
    // console.log(req.body);
    var newUser = new userModel({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        rollNumber : req.body.rollNumber
    });
    // find by req.body.id 
    userModel.findOne({ "rollNumber": req.body.rollNumber }, ( err, foundData )=>{
        if(err) throw err;
        if ( foundData ){
            res.send("Data Exist.");
        } else {
            newUser.save((err, data)=>{
                if(err) throw err;
                console.log(" - Data saved", data);
            });
        }
        
    })
    
});

app.listen(3000)
