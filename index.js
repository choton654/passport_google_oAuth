const express = require('express');
const app = express();
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoutes');
const passportSetup = require('./config/passport-setup');

app.set('view engine', 'ejs');

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  keys.mongoDb.dbUri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('database connected')
);

app.use('/auth', authRoute);

app.get('/profile', isAuthenticated, (req, res) => {
  res.render('profile', { user: req.user });
});

app.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

app.listen(3000, () => console.log('server is running to port 3000'));

function isAuthenticated(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
}
