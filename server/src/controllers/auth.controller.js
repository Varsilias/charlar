const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");

const SALT = bcrypt.genSaltSync(12);

const AuthController = {
  sign_up: async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
      let user;

      user = await User.findOne({ username });

      if (user) {
        return res
          .status(200)
          .json({ success: false, message: "Username taken" });
      }
      user = await User.findOne({ email });

      if (user) {
        return res.status(200).json({ success: false, message: "Email taken" });
      }

      let hashedPassword = bcrypt.hashSync(password, SALT);
      user = new User({
        username,
        email,
        password: hashedPassword,
      });
      user = await user.save();
      const { avatar_present, avatar, _id } = user;
      return res.status(200).json({
        success: true,
        message: "success",
        data: {
          id: _id,
          email: user.email,
          username: user.username,
          avatar,
          avatar_present,
        },
      });
    } catch (error) {
      console.log(error.stack);

      return res.status(500).json({
        success: false,
        message: "We can not complete your request at this time",
        error: error.message,
        errors: error.stack,
      });
    }
  },

  sign_in: async (req, res, next) => {
    const { username, password } = req.body;
    try {
      let user = await User.findOne({ username }).select("+password");

      if (!user) {
        return res
          .status(200)
          .json({ success: false, message: "Invalid username or password" });
      }

      let check = bcrypt.compareSync(password, user.password);

      if (!check) {
        return res
          .status(200)
          .json({ success: false, message: "Invalid username or password" });
      }

      const { avatar_present, avatar, _id } = user;
      return res.status(200).json({
        success: true,
        message: "success",
        data: {
          email: user.email,
          username: user.username,
          avatar_present,
          avatar,
          id: _id,
        },
      });
    } catch (error) {
      console.log(error.stack);

      return res.status(500).json({
        success: false,
        message: "We can not complete your request at this time",
        error: error.message,
        errors: error.stack,
      });
    }
  },

  avatar: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { avatar } = req.body;

      let user = await User.findById(id);
      if (!user) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find this user" });
      }
      user.avatar = avatar;
      user.avatar_present = true;
      user = await user.save();

      const { avatar_present, username, email, _id } = user;

      return res.status(200).json({
        success: true,
        message: "Success",
        data: {
          id: _id,
          username,
          email,
          avatar_present,
          avatar: user.avatar,
        },
      });
    } catch (error) {
      console.log(error.stack);

      return res.status(500).json({
        success: false,
        message: "We can not complete your request at this time",
        error: error.message,
        errors: error.stack,
      });
    }
  },

  get_all_users: async (req, res, next) => {
    try {
      const { id } = req.params;
      let users = await User.find({ _id: { $ne: id } });

      return res
        .status(200)
        .json({ success: true, message: "Success", data: users });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "We can not complete your request at this time",
        error: error.message,
        errors: error.stack,
      });
    }
  },
};

module.exports = {
  AuthController,
};
