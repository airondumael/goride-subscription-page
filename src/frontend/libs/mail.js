var Mailgun = require('mailgun-js');
var config = require('../../../config');

var api_key = config.MAILGUN.API_KEY;
var domain = config.MAILGUN.DOMAIN;
var from_who = config.MAILGUN.EMAIL_FROM;

var mailgun = new Mailgun({apiKey: api_key, domain: domain});

export function send(mail_to, subject, content) {
    var data = {
        from: from_who,
        to: mail_to,
        subject: subject,
        html: content
    };

    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, function (err, body) {
        console.log(err || body);
    });
}
