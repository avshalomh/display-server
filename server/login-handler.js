let user = process.env.USER_NAME || 'h';
let pass = process.env.USER_PASSWORD || 'p';

function doLogin(req,res,next) {
  let un = req.body.user;
  let pw = req.body.password;
  if (un === user && pass === pw) {
    req.session.signedIn = true;
    res.send('OK');
  } else {
    res.status(403).send('Unauthorized-doLogin');
  }
}

module.exports = doLogin;
