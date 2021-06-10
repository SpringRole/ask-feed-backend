const { User } = require("../models/user");
const nodemailer = require("nodemailer");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
JWT_SECRET = "askfeed1234";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "santanrathore75209@gmail.com",
    pass: "*Saheb13*",
  },
});

const signup = async (req, res) => {
  const { username, password, email, phoneNo } = req.body;
  const userexist = await User.findOne({ email });
  if (!userexist) {
    const hashedPass = await bcryptjs.hashSync(password, 10);
    const token = jwt.sign({ username, email }, JWT_SECRET, {
      expiresIn: "30m",
    });
    const newUser = {
      username,
      email,
      password: hashedPass,
      phoneNo,
      token,
    };

    const user = await User.create(newUser);
    if (user) {
      const data = {
        from: "no-reply@gmail.com",
        to: email,
        subject: "Account activation link",
        html: `<h2>PLease click on given link to activate your account</h2>
              <p>http://localhost:2000/api/activate/?token=${token}</p>
       `,
      };
      try {
        await transporter.sendMail(data);
        console.log("Email sent Successfully!");
      } catch (err) {
        console.log("error occured while sending email!", err);
      }
    }
    res.send(user);
  } else {
    res.send("User already exist!");
  }
};

const verifyAccount = async (req, res) => {
  try {
    const token = req.query.token;
    const decodedUser = jwt.verify(token, JWT_SECRET);

    const user = await User.findOne({ email: decodedUser.email, token: token });
    if (user) {
      await User.findOneAndUpdate(
        { email: user.email },
        {
          $set: {
            isVarified: true,
            token: null,
          },
        }
      );

      res.send("user verified");
    } else {
      res.send(" Token expired or invalid Token");
    }
  } catch (e) {
    console.log(e);
  }
};
const resetlink = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  // console.log("user", user, email);
  if (user) {
    const token = jwt.sign({ email }, JWT_SECRET, {
      expiresIn: "30m",
    });

    await User.findOneAndUpdate(
      { email },
      {
        $set: {
          resetToken: token,
        },
      }
    );
    const data = {
      from: "no-reply@gmail.com",
      to: email,
      subject: "Reset link",
      html: `<h2>PLease click on given link to reset your account</h2>
            <p>http://localhost:2000/api/changepassword/?token=${token}</p>
     `,
    };
    try {
      await transporter.sendMail(data);
      res.send("Email sent Successfully!");
    } catch (err) {
      console.log("error occured while sending email!", err);
    }
  } else {
    res.send("User not found!");
  }
};


const changepassword = async(req,res) =>{
  const { password}=req.body;
  const token = req.query.token;
  const decodedtoken = jwt.verify(token,JWT_SECRET)
  const hashedPass = await bcryptjs.hashSync(password, 10);
  const user= await User.findOneAndUpdate({email:decodedtoken.email, resetToken:token },
    {$set:
      {
        password: hashedPass,
        resetToken:null
      }
    }
    )
    if(user)
    {
      res.send("Password updated successfully!")
    }
    else
    {
      res.send("Unable to reset password!")
    }
  }
const login=async(req,res)=>{
  const {email,password}=req.body
  const user=await User.findOne({email})
  const {_id}=user
  if(user)
 
  {
    console.log("user",user)
    const matchpassword=  await bcryptjs.compare(password,user.password)
              if(matchpassword && user.isVarified)
              {
                const token=jwt.sign({email ,_id},JWT_SECRET)
              res.send({token})

              }
              else
              {
              res.send("Login unsuccessful!")
              }
            }
    else
    {
       res.send("Incorrect Email or password!")
    }
}
module.exports = { signup, verifyAccount, resetlink ,changepassword,login};
