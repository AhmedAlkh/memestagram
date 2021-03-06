const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys');
const requireLogin = require('../middleware/requireLogin')
// This is for email section
// const nodemailer = require('nodemailer')
// const sendgridTransport = require('nodemailer-sendgrid-transport')

//how to validate someone by token using middleware
//router.get('/protected', requireLogin, (req,res)=>{
    //verify a user that they are carrying the appropriate token
   // res.send("hello user")
//})

// API key for emails
// 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

// const transporter = nodemailer.createTransport(sendgridTransport({
//     auth:{
//         api_key:"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"
//     }
// }))



//posting username and password for signup
router.post('/signup',(req,res)=> {
    //deconstruct the parameters
    const {name,email,password,pic} = req.body
    if(!name || !email || !password) {
        res.status(422).json({error:"please add all the required fields"})
    }
    //check to see if the email exists by running a query with that email
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"User already exists"})
        }
        //create a user variable to hold the User constructor Schema object, ensure the password is hashed
        bcrypt.hash(password, 12)
        .then(hashedPass=>{
            const user = new User({
                email,
                name,
                password:hashedPass,
                pic
            })
            //call the user object to save, then respond with json that its saved. catch any errors in console.
            user.save()
            .then(userData=>{
                // This is for email section
                // transporter.sendMail({
                //     to:user.email,
                //     from:"no-reply@memestagram.com",
                //     subject: "signup successful",
                //     html: "<h1>Welcome to Memestagram</h1>"
                // })
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err);
            })

        })

    })
    //catch error if the find one does work
 .catch(err => {
     console.log(err);
 })
    
})

//post route to validate the sign in if no email, send that, if password doesnt match, send that.
router.post('/signin', (req,res) => {
    const {email,password} = req.body
    if(!email || !password) {
        return res.status(422).json({error: "Please provide email or password"})
    }

    User.findOne({email:email})
    .then(savedUser => {
        if(!savedUser) {
            return res.status(422).json({error:"Invalid Username or does not exist!"})
        }

        //check if the password matches
        bcrypt.compare(password, savedUser.password)
        .then(doMatch=>{
            if(doMatch) {
                //res.json({message:"successful sign in!"})
                //send them a token if successfully signed in
                const token = jwt.sign({_id:savedUser._id}, JWT_SECRET)
                const {_id,name,email,followers,following,pic} = savedUser
                res.json({token,user:{_id,name,email,followers,following,pic}})


            } else {
                return res.status(422).json({error:"invalid password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})
module.exports = router;