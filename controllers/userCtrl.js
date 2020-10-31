const { findOne } = require("../models/userModel");
const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {
  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await Users.findOne({ email });
      if (user) return res.status(400).json({ msg: "email already exist" });

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = new Users({
        username,
        email,
        password: passwordHash,
      });

      await newUser.save();
      res.status(200).json({ msg: "Sign up success" });
    } catch {
      (err) => {
        res.status(500).json({ msg: err.message });
      };
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "email does not exist" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "invalid password" });

      const payload = { id: user._id, username: user.username };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
      });
      res.json({ token });
    } catch {
      (err) => {
        return res.status(500).json({ msg: err.message });
      };
    }
  },
  verifiedUser: (req, res) => {
    try {
      const token = req.header("Authorization");
      if (!token) return res.send(false);

      jwt.verify(token, process.env.TOKEN_SECRET, async (err, userVerified) => {
        if (err) return res.send(false);

        const user = await Users.findById(userVerified.id);
        if (!user) return res.send(false);

        return res.send(true);
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCtrl;
