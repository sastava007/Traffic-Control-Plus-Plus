const express= require("express");
const nodemailer = require("nodemailer");
const app = express();
require('dotenv').config()
app.get("/",(req,res)=>{
    res.send("hello world")
})
var fs = require("fs");
var contents = fs.readFileSync("dummy.json");
var jsonContent = JSON.parse(contents);
console.log("Name:",jsonContent.members[0].name);
console.log("hash-code:", jsonContent.members[0].hash_code);
console.log("Plate-number:", jsonContent.members[0].plate_num);

var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: 'sg9827252555@gmail.com',
        pass: process.env.PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})

const mailOptions={
    from:'sg98272252555@gmail.com',
    to: 'imt_2018094@iiitm.ac.in',
    subject:'Blockchain checking',
    html: '<p>You are fined because you exceed the limit of speed.<br><h4>confimation details</h4><br><h4>Name:'+ jsonContent.members[0].name +'</h4><br><h4>Plate number:'+ jsonContent.members[0].name+'</h4><br><h4>Hash code:'+jsonContent.members[0].name +'</h4><br><a href="http://localhost:3000/">Click here to pay challan</a></p>'
}
transporter.sendMail(mailOptions,function(err,info){
    if(err)
    console.log(err)
    else
    console.log(info)
})

app.listen(3003,()=>{
    console.log("your server is started");
})
