const User_ques = require('../models/userques');

const create_servey = (req,res)=>{
    const user=new User(req.body);
    user.save()
    .then((value)=>{
res.redirect('/');
    })
    .catch((err)=>{
        res.send(err);
    })
});
module.exports ={
  create_servey
};
