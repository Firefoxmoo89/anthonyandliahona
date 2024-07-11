var fs = require("fs"); var nodemailer = require("nodemailer"); var util = require("util");

exports.sendEmail = (subject,body,signature,filenameList=[]) => {
  // Sends email using nodemailer module and gmail's smtp service. Environment variables "sender" for the email address and "sendPass" for the app password must be defined.
  // "subject" parameter is a string for the subject line of the email
  // "body" parameter is an html string for the body of the email
  // "signature" parameter is an html string for the signature, which is gray instead of black
  // "filenameList" parameter is a list of filenames contained in the "temp" folder that will be sent in the email
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user:process.env.sender,
        pass: process.env.sendPass
      }
    });
    attachments = [];
    for (var filename of filenameList) { attachments.push({filename:filename,path:"temp/"+filename}) }
    var mailContent = {
      from: process.env.sender,
      to: process.env.receiver,
      subject: subject,
      html: "<!DOCTYPE html><html><body>"+body+"<p style=\"color: #ADADAD\">"+signature+"</p></body></html>",
      attachments: attachments
    };
    transporter.sendMail(mailContent, function(error, info){
      if (error) { console.log(error) } 
      for (var filename of filenameList) {
        fs.unlink("temp/"+filename, (err) => { if (err) { console.error(err) } });
      }
    });
  }