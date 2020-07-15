import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';

const router = express.Router();

router.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            name: 'Atticus',
            email: 'atticusfinchIPH@gmail.com',
            password: 'admin',
            isAdmin: true
        })
        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.send({ msg: error.message})
    }
})

router.post("/signin", async(req, res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    })  
    if(signinUser){
        res.send({
            _id: signinUser._id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        })
    } else {
        res.status(401).send({ msg: 'Invalid Email or Password'});
    }
})

router.post("/register", async(req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    try {
        const newUser = await user.save();
        if(newUser){
            res.send({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: getToken(newUser)
            })
        } else {
            res.status(401).send({ msg: 'Invalid User data'});
        }
    } catch (error) {
        res.status(401).send({ msg: 'Email already been used'});
    }
    
})

export default router;

