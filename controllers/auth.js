const { User } = require("../models/user");
const nodemailer = require("nodemailer");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { transporter } = require("../utils/transporter");

const signup = async (req, res) => {
  try{
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
        subject: "This is your Email verification link",
        html: ` <hr style="height:2px;border-width:0;color:gray;background-color:gray">
        <div style="text-align:center;">
        <img src="cid:askfeedlogo"  width="150px" height="150px"> 
        <h2 style="color:black;">Please click on the button to verify your mail!<br>We’re very excited to have you on board!</h2>
        <button style="background-color:#3362a8"  target="_blank"><p input type="button" onclick="window.location.href='link' "><a style="color:white; text-decoration:none;" href="http://localhost:3000/api/activate/${token}">VERIFY EMAIL</a></p> </button>
      
        <hr style="height:2px;border-width:0;color:gray;background-color:gray">
             
          </div>
          </div>
      </div>
      </body>
      </html>`,
        attachments: [
          {
            filename: "askfeedlogo.jpeg",
            path: `${__dirname}/images/askfeedlogo.jpeg`,
            cid: "askfeedlogo",
          },
        ],
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
}
catch(e)
{
  throw new Error("Failed to create the function")
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
      subject: "This is your account reset link",
      html: ` <hr style="height:2px;border-width:0;color:gray;background-color:gray">
      <div style="text-align:center;">
      <img src="cid:askfeedlogo"  width="150px" height="150px"> 
      <h2 style="color:black;">This is your account reset link!<br>Please click on the link to reset your password!</h2>
      <button style="background-color:#3362a8"  target="_blank"><p input type="button" onclick="window.location.href='link' "><a style="color:white; text-decoration:none;" href="http://localhost:3000/api/changepassword/${token}">RESET PASSWORD</a></p> </button> 
      <hr style="height:2px;border-width:0;color:gray;background-color:gray">
           
        </div>
        </div>
    </div>
    </body>
    </html>`,
      attachments: [
        {
          filename: "askfeedlogo.jpeg",
          path: `${__dirname}/images/askfeedlogo.jpeg`,
          cid: "askfeedlogo",
        },
      ],
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

    if (user) {
      const { _id } = user;

      const matchpassword = await bcryptjs.compare(password, user.password);
      if (matchpassword && user.isVarified) {
        const token = jwt.sign({ email, _id }, process.env.JWT_SECRET);
        res.send({ token, email: user.email, username: user.username });
      }
    } else {
      res.send("Incorrect Email or password!");
    }
  } catch (e) {
    throw new Error("Fail to create operation");
  }
};
const updateProfile = async (req, res) => {
  try {
    const { _id } = req.body;
    const userexist = await User.findOneAndUpdate({ _id }, { $set: req.body });
    if (userexist) {
      res.send("user updated successfully");
    } else {
      res.send("unable to update");
    }
  } catch (e) {
    throw new Error("Unable to update");
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
