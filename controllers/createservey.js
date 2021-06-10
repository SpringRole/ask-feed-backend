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
const invite_user = (req,res)=>{
    const title=req.params.title;
    Customer.findOne({title})
    .then((data)=>{
        var mailOptions={
            from:'1802177.cse.cec@cgc.edu.in',
            to:`${data.list}`,
            subject:'regarding survey',
            text:`http://localhost:7000/survey/${data._id}`
        };
        transporter.sendMail(mailOptions,(err,info)=>{
            if(err)
            {console.log(err);}
            else
            {res.send(info.response);}
        })

    })
};

module.exports ={
  create_servey,
    invite_user
};
