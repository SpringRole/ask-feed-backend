const keys= require('../config/keys_stripe');
const router=require('express').Router();
const path = require('path');
const PUBLISHABLE_KEY=keys.stripe.PUBLISHABLE_KEY;
const SECRET_KEY=keys.stripe.SECRET_KEY;
const stripe=require('stripe')(SECRET_KEY)
router.get('/',(req,res)=>{
    res.render('payment',{key:PUBLISHABLE_KEY});
    });
    router.post('/',(req,res)=>{
        stripe.customers.create({
            email:req.body.stripeEmail,
            source:req.body.stripeToken,
        })
        .then((customer)=>{
            return stripe.charges.create({
                amount:20,
                description:'Feedback And Details About Companies',
                currency:'inr',
                customer:customer.id
         })
        })
        .then((charge)=>{
            res.send('success');
        })
        .catch((err)=>{
            res.send(err);
        })
        });
        
    