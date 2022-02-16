const UserModel = require("../models/UserModel");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const isEmail = require("validator/lib/isEmail");
const options = {
  auth: {
    api_key: process.env.sendGrid_api
  }
};

const transporter = nodemailer.createTransport(sendGridTransport(options));
const sendNewMeetingEmail = async(senderEmail, receiverId) => {
    try {
        console.log("senderEmail is: " + senderEmail);
        console.log("receiverId is: " + receiverId);
        const email  = senderEmail;
        console.log("email is: " + email);
        if (!isEmail(email)) {
          return res.status(401).send("Invalid Email");
        }
        const senderUser = await UserModel.findOne({ email: email.toLowerCase() });
        const receiver = await UserModel.findById(receiverId);
        if (!senderUser) {
            return res.status(404).send("User not found");
          }
        if(!receiver) {
            return res.status(404).send("Receiver user not found");
        }
        const mailOptions = {
          to: email,
          from: "info@atomtechsolutions.com",
          subject: "Dear Sunbae, New Meeting Created",
          html: `<p>Hey ${senderUser.name
            .split(" ")[0]
            .toString()}, You have a meeting with ${receiver.name}. Please go to your Google Calendar and you can see your Google Meets event for the time you specified!</p>
          `
          
        };
    
        transporter.sendMail(mailOptions, (err, info) => err && console.log(err));
    
        return;
      } catch (error) {
        console.error(error);
        return;
      }
}

const sendConfirmMeetingEmail = async(senderEmail, receiverId) => {
    try {
      console.log("senderEmail is: " + senderEmail);
      console.log("receiverId is: " + receiverId);
      const email  = senderEmail;
      console.log("email is: " + email);
      if (!isEmail(email)) {
        return res.status(401).send("Invalid Email");
      }
      const senderUser = await UserModel.findOne({ email: email.toLowerCase() });
      const receiver = await UserModel.findById(receiverId);
      if (!senderUser) {
          return res.status(404).send("User not found");
        }
      if(!receiver) {
          return res.status(404).send("Receiver user not found");
      }
      const mailOptions = {
        to: email,
        from: "info@atomtechsolutions.com",
        subject: "Dear Sunbae, You Confirmed A Meeting Has Taken Place",
        html: `<p>Hey ${senderUser.name
          .split(" ")[0]
          .toString()}, You have confirmed that your meeting with ${receiver.name} has taken place. If you are a Sunbae, your payment will be sent to your PayPal account once ${senderUser.name} has confirmed the meeting has taken place.</p>
        `
       
      };
      transporter.sendMail(mailOptions, (err, info) => err && console.log(err));
    
        return;
    } catch (error) {
      console.error(error);
      return;
    }
}

const sendPayOutEmail = async(senderEmail, receiverId) => {
  try {
    console.log("senderEmail is: " + senderEmail);
    console.log("receiverId is: " + receiverId);
    const email  = senderEmail;
    console.log("email is: " + email);
    if (!isEmail(email)) {
      return res.status(401).send("Invalid Email");
    }
    const senderUser = await UserModel.findOne({ email: email.toLowerCase() });
    const receiver = await UserModel.findById(receiverId);
    if (!senderUser) {
        return res.status(404).send("User not found");
      }
    if(!receiver) {
        return res.status(404).send("Receiver user not found");
    }
    const mailOptions = {
      to: email,
      from: "info@atomtechsolutions.com",
      subject: "Dear Sunbae, Your Payment Has Been Sent!",
      html: `<p>Hey ${senderUser.name
        .split(" ")[0]
        .toString()}, Your payment for your meeting with ${receiver.name} has been sent to your PayPal account.</p>
      `
      
    };
    transporter.sendMail(mailOptions, (err, info) => err && console.log(err));
    
    return;
  } catch (error) {
    console.error(error);
    return;
  }
}

module.exports = {
    sendNewMeetingEmail,
    sendConfirmMeetingEmail,
    sendPayOutEmail,
  };