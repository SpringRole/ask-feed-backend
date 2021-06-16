const { User } = require("../models/user");
const nodemailer = require("nodemailer");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { transporter } = require("../utils/transporter");

const signup = async (req, res) => {
  const { username, password, email, phoneNo } = req.body;
  const userexist = await User.findOne({ email });
  if (!userexist) {
    const hashedPass = await bcryptjs.hashSync(password, 10);
    const token = jwt.sign({ username, email }, process.env.JWT_SECRET, {
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
        html: `<head>
              <hr style="height:2px;border-width:0;color:gray;background-color:gray">
               <h2>Click on the following button to activate your account</h2>
               <a href="http://localhost:2000/api/activate/${token}" target="_blank"><p input type="button" onclick="window.location.href='link' ">ACTIVATE ACCOUNT</p> </a>
               <hr style="height:2px;border-width:0;color:gray;background-color:gray">
               <img src="../contollers/images/askfeedlogo.jpeg" alt="Ask-FEED " width="500" height="333">
               </style></head>
               
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
    const token = req.params.token;
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

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
  if (user) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
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
      html: ` <hr style="height:2px;border-width:0;color:gray;background-color:gray">
              <h2>PLease click on buuton to reset your password</h2>
              <a href="http://localhost:2000/api/changepassword/${token}" target="_blank"><p input type="button" onclick="window.location.href='link' ">RESET PASSWORD PASSWORD</p> </a>
              <p></p>
              <hr style="height:2px;border-width:0;color:gray;background-color:gray">
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

const changepassword = async (req, res) => {
  const { password } = req.body;
  const token = req.params.token;
  const decodedtoken = jwt.verify(token, process.env.JWT_SECRET);
  const hashedPass = await bcryptjs.hashSync(password, 10);
  const user = await User.findOneAndUpdate(
    { email: decodedtoken.email, resetToken: token },
    {
      $set: {
        password: hashedPass,
        resetToken: null,
      },
    }
  );
  if (user) {
    res.send("Password updated successfully!");
  } else {
    res.send("Unable to reset password!");
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const { _id } = user;
    if (user) {
      console.log("user", user);
      const matchpassword = await bcryptjs.compare(password, user.password);
      if (matchpassword && user.isVarified) {
        const token = jwt.sign({ email, _id }, process.env.JWT_SECRET);
        res.send({ token });
      } else {
        res.send("Login unsuccessful!");
      }
    } else {
      res.send("Incorrect Email or password!");
    }
  } catch (e) {
    throw new ERROR("Fail to create operation");
  }
};
const updateProfile = async (req, res) => {
  try {
    const { username, phoneNo, _id } = req.body;
    const userexist = await User.findOneAndUpdate({ _id }, { $set: req.body });
    if (userexist) {
      res.send("user updated successfully");
    } else {
      res.send("unable to update");
    }
  } catch (e) {
    throw new ERROR("Unable to update");
  }
};

module.exports = {
  signup,
  verifyAccount,
  resetlink,
  changepassword,
  login,
  updateProfile,
};
