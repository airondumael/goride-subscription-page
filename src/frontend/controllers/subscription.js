var fs = require('fs');
var prependFile = require('prepend-file');
var Mail = require('../libs/mail');

export function get (req, res, next) {
    res.render('index')
}


export function thankyou (req, res, next) {
    res.render('thankyou')
}

export function post (req, res, next) {
    var path_to_txt = __dirname + '/../../../data/emails.txt'

    fs.stat(path_to_txt, (err, stats) => {
        if (err) {
            console.log(err)
            return fs.writeFile(path_to_txt, req.body.email+'\n')
        }

        prependFile(path_to_txt, req.body.email+'\n', (err) => console.log(err))
    })

    Mail.send(req.body.email, 'You are now subscribed!', `
        The biking ninjas have received your subscription!
        They are now ready to send you with the latest updates
        and if they have, some cookies too!
        <br><br>
        -GoRide Team
    `)

    res.redirect('/thankyou')
}

export function verify (req, res, next) {
    if(req.query.email) {
        prependFile(__dirname + '/../../../data/verified-emails.txt', req.query.email+'\n', (err) => console.log(err))
    }

    res.redirect('/');
}
