import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { Model } from 'mongoose';
import { IUser } from '../models/user.model';
const router = express.Router();

const checkRegistrationFields = require('../validation/register');

const usersRoutes = (User: Model<IUser>) => {

  router.post('/register', (req, res) => {
    const { errors, isValid } = checkRegistrationFields(req.body);
    
    if (!isValid) {
      return res.status(400).json(errors);
    }
    
    let token: string;
    crypto.randomBytes(48, (err, buf) => {
      if (err) throw err;
      token = buf
      .toString('base64')
      .replace(/\//g, "") // Removes '/' and '+' because they are not valid in URLs
      .replace(/\+/g, "-")
      return token;
    });

    bcrypt.genSalt(12, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(req.body.password1, salt, (err, hash) => {
        if (err) throw err;
        const newUser = new User({
          email: req.body.email,
          password: hash,
          registered: Date.now(),
          token: token,
          emailverified: 'f',
          tokenusedbefore: 'f'
        });        
        newUser.save()
        .then(user => {
          const returnUser = {
            email: user.email,
            registered: user.registered,
            token: user.token
          };
          res.json(returnUser);
        })
        .catch(err => {
          errors.account = "Email already registered";
          res.status(400).json(errors);
        });
      });
    });


  });

  return router;
};

export default usersRoutes;