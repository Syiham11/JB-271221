const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
process.env.SECRET_KEY = "secret";
const pool = require("../config/db")

const UsersService = {
  async login(data) {
  const { rows } = await pool.query('SELECT * FROM "Users" WHERE email = $1', [data.email])
    if (rows.length !== 0) {
      if (bcrypt.compareSync(data.password, rows[0]['password'])) {
        let result = jwt.sign(rows[0], process.env.SECRET_KEY, {
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
