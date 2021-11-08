import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { Model } from 'mongoose';
import { IUser } from '../models/user.model';
import jwt from 'jsonwebtoken';

const router = express.Router();

import checkRegistrationFields from '../validation/register';
import validateLoginInput from '../validation/login';

const usersRoutes = (User: Model<IUser>) => {

  router.post('/register', async (req, res) => {
    const { errors, isValid } = checkRegistrationFields(req.body);
  
    if (!isValid) {
      console.log('Not valid in usersRoutes');
      return res.status(400).json(errors);
    }
    
    const existingUser = await User.find({email: req.body.email});
    console.log('Existing user:', existingUser);
    if (existingUser) return res.status(400).json("User already exists");
    
    let token: string;
    crypto.randomBytes(48, (err, buf) => {
      if (err) throw err;
      token = buf
      .toString('base64')
      .replace(/\//g, "") // Removes '/' and '+' because they are not valid in URLs
      .replace(/\+/g, "-")
      return token;
    });
    console.log('About to hash password and create new user!');
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
          errors.email = "Email already registered";
          res.status(400).json(errors);
        });
      });
    });


  });

  router.post('/login', (req, res) => {
    // Ensures that all entries by the user are valid
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    } else {
      User.find({email: req.body.email})
      .then(data => {
        bcrypt.compare(req.body.password, data[0].password).then(isMatch => {
          if (isMatch) {
            const payload = { id: data[0].id, email: data[0].email };
            jwt.sign(
              payload,
              'asdlfjJFJ2F4398F2ASODJF2438RFAFAD;LKGJGjlgfiejg390gafdsflj3498jfadfjiaDF@F@#F*rAGFJgzugg043tkj23fadf',
              { expiresIn: 3600 },
              (err, token) => {
                res.status(200).json("Bearer " + token);
              }
            )
          } else {
            res.status(400).json("Bad request");
          }
        });
      })
      .catch(err => {
        res.status(400).json("Bad request");
      });
    }
  });

  return router;
};

export default usersRoutes;