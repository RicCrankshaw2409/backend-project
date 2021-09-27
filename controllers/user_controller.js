const { fetchUsers, fetchUsersByUsername } = require("../models/user_model");

exports.getUsers = async (req, res, next) => {
  try {
    const result = await fetchUsers();
    res.status(200).send({ result });
  } catch (err) {
    next(err);
  }
};

exports.getUsersByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    const result = await fetchUsersByUsername(username);
    res.status(200).send({ user: result });
  } catch (err) {
    next(err);
  }
};
