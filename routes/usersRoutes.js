const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const checkRegistrationFields = require('../validation/register');

const usersRoutes = (User) => {

  router.post('/register', (req, res) => {
    const { errors, isValid } = checkRegistrationFields(req.body);
    
    if (!isValid) {
      return res.status(400).json(errors);
    }
    
    let token;
    crypto.randomBytes(48, (err, buf) => {
      if (err) throw err;
      token = buf
      .toString('base64')
      .replace(/\//g, "") // Removes '/' and '+' because they are not valid in URLs
      .replace(/\+/g, "-")
      return token;
    });
    
  });

  return router;
};

module.exports = usersRoutes;