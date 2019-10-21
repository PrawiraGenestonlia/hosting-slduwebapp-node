const express = require('express');
const auth = require('basic-auth');
const path = require('path');
const app = express();
app.disable('x-powered-by');

const admins = { sldu: { password: 'sldus2b2a39' } };
function authorization(request, response, next) {
  var user = auth(request);
  if (!user || !admins[user.name] || admins[user.name].password !== user.pass) {
    response.set('WWW-Authenticate', 'Basic realm="slduwebapp"');
    return response.status(401).send("Unauthorized user");
  }
  return next();
}
app.use(authorization);

app.use(express.static(path.join(__dirname, '../slduwebapp/build')));
// need to declare a "catch all" route on your express server 
// that captures all page requests and directs them to the client
// the react-router do the route part
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../slduwebapp/build', 'index.html'));
});
app.listen(
  process.env.PORT || 3500,
  function () {
    console.log(`Frontend start on http://localhost:3820`)
  }
);
