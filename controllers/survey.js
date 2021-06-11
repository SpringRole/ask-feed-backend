const mongoose = require("mongoose");
const { Survey } = require("../models/survey");
const {transporter} = require('../utils/transporter')

const createSurvey = async (req, res) => {
  const { title, category,subject, body, recipients } = req.body;
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
          <a href="/">Yes</a>
        </div>
        <div>
          <a href="/">No</a>
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
module.exports = { createSurvey };