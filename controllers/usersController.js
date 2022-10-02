const path = require('path');
const fs = require('fs');
const {validationResult} = require('express-validator');

const usersDatabasePath = path.join(__dirname, '../database/users.json');

const getUsers = () => {
  const usersJson = fs.readFileSync(usersDatabasePath);
  return JSON.parse(usersJson);
};

const saveUsers = (usersObject) => {
  const usersJson = JSON.stringify(usersObject);
  fs.writeFileSync(usersDatabasePath, usersJson);
  return true;
}

const usersController = {
    list: (req, res, next) => {
        res.send('respond with a resource');
      },
    register: (req, res) => {
        res.render('usersRegister');
      },
    processRegister: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          res.render('usersRegister', {errors: errors.mapped(), old: req.body});
        } else {
          const users = getUsers();
          const newUser = {
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            profileImage: req.file.filename
          }
          users.push(newUser);
          saveUsers(users);
          res.redirect('/users');
        }
    }
}

module.exports = usersController;