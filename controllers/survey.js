const mongoose = require("mongoose");
const { Survey } = require("../models/survey");
const { transporter } = require("../utils/transporter");

const createSurvey = async (req, res) => {
  const { title, category, subject, body, recipients } = req.body;
  const survey = await Survey.create({
    title,
    category,
    subject,
    body,
    recipients,

    dateSent: Date.now(),
  });

  const data = {
    from: "no-reply@gmail.com",
    to: recipients,
    subject: "Account activation link",
    html: `    <html>
    <body>
      <div style="text-align: center;">
        <h3>I'd like your input!</h3>
        <p>Please answer the following question:</p>
        <p>${survey.body}</p>
        <div>
          <a href=http://localhost:2000/survey/response/yes/${survey._id}>Yes</a>
        </div>
        <div>
          <a href=http://localhost:2000/survey/response/no/${survey._id}>No</a>
        </div>
      </div>
    </body>
  </html>
   `,
  };

  try {
    await transporter.sendMail(data);
    console.log("Email sent Successfully! survey");
  } catch (err) {
    console.log("error occured while sending email!", err);
  }
  res.send(survey);
};

const responseYes = async (req, res) => {
  try {
    const id = req.params.id;

    const dataToSet = {
      $inc: {
        yes: 1,
      },
    };
    const result = await Survey.findByIdAndUpdate(id, dataToSet);
    if (result) {
      res.send("response recorded successfully");
    } else {
      res.send("Could not record the respone");
    }
  } catch (e) {
    throw new Error("Internal Serever Error");
  }
};

const responseNo = async (req, res) => {
  try {
    const id = req.params.id;
    const dataToSet = {
      $inc: {
        No: 1,
      },
    };
    const result = await Survey.findByIdAndUpdate(id, dataToSet);
    if (result) {
      res.send("response recorded successfully");
    } else {
      res.send("Could not record the respone");
    }
  } catch (e) {
    throw new Error("Internal Serever Error");
  }
};
const getSurvey = async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.send(surveys);
  } catch (e) {
    throw new Error("Internal Serever Error");
  }
};

module.exports = { createSurvey, responseYes, responseNo, getSurvey };
