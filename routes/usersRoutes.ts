import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { Model } from 'mongoose';
import { IUser } from '../models/user.model';
import { IAdmin } from '../models/admin.model';
import jwt from 'jsonwebtoken';
import checkRegistrationFields from '../validation/register';
import validateLoginInput from '../validation/login';

const router = express.Router();

const usersRoutes = (User: Model<IUser>, Admin: Model<IAdmin>) => {

  router.post('/register', async (req, res) => {
    const { errors, isValid } = checkRegistrationFields(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
    
    const existingUser = await User.find({ email: req.body.email });
    if (existingUser && existingUser[0]) {
      errors.user = "User already exists";
      return res.status(400).json(errors);
    }

    const admin = await Admin.find({ email: req.body.email });
    const isAdmin: boolean = admin.length >= 1;

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
          admin: isAdmin,
          token: token
        });        
        newUser.save()
        .then(user => {
          const returnUser = {
            email: user.email,
            createdAt: user.createdAt,
            token: user.token,
            admin: user.admin
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

  router.post('/login', (req, res): any => {
    // Ensures that all entries by the user are valid
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    } else {
      User.find({email: req.body.email})
      .then(data => {
        bcrypt.compare(req.body.password, data[0].password).then(isMatch => {
          if (isMatch) {
            const payload = { id: data[0].id, email: data[0].email, admin: data[0].admin };
            jwt.sign(
              payload,
              'asdlfjJFJ2F4398F2ASODJF2438RFAFAD;LKGJGjlgfiejg390gafdsflj3498jfadfjiaDF@F@#F*rAGFJgzugg043tkj23fadf',
              { expiresIn: 3600 },
              (err, token) => {
                res.status(200).json({ token: "Bearer " + token, admin: data[0].admin });
              }
            );
          } else {
            errors.user = "Incorrect email or password";
            res.status(400).json(errors);
          }
        });
      })
      .catch(err => {
        errors.user = "Bad request. Please try again."
        res.status(400).json(errors);
      });
    }
  });

  return router;
};

export default usersRoutes;