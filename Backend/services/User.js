const Models = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
process.env.SECRET_KEY = "secret";
const UsersService = {
  async login(data) {
    let user = await Models.Users.findOne({
      where: {
        email: data.email,
      },
    });

    if (user) {
      if (bcrypt.compareSync(data.password, user.password)) {
        let result = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440,
        });
        return  {
          token: result
      };
      } else {
        return "Wrong Password!";
      }
    } else {
      return { error: "User does not exist" };
    }
  },
};

module.exports = UsersService;
