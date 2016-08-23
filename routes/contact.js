var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res, next) {
  var transporter = nodemailer.createTransport({
    service: 'Mailgun',
    auth: {
      user: '',
      pass: ''
    }
  });

  var mailOptions = {
    from: 'This is the from field <email@message.name>',
    to: '',
    subject: 'Contact form triggered',
    text: 'Contact form triggered: \n Name: ' + req.body.name + ' \n Email: ' + req.body.email + ' \n Message: ' + req.body.message,
    html: '<strong>Contact form triggered</strong>: \n Name: ' + req.body.name + ' \n Email: ' + req.body.email + ' \n Message: ' + req.body.message
  };
  transporter.sendMail(mailOptions, function(err, response) {
    if (err) {
      console.log('error in sending mail: ' + err);
      res.redirect('/');
    } else {
      console.log('mail has been sent successfuly: ' + response.response);
      res.redirect('/');
    }
  });
});

module.exports = router;
