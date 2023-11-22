const mongoose = require('mongoose');

const { generate: uniqueId } = require('shortid');

const updateProfilePassword = async (userModel, req, res) => {
  const UserPassword = mongoose.model(userModel + 'Password');
  let { password } = req.body;

  if (!password) return res.status(400).json({ msg: 'Not all fields have been entered.' });

  if (password.length < 8)
    return res.status(400).json({
      msg: 'The password needs to be at least 8 characters long.',
    });

  // if (password !== passwordCheck)
  //   return res.status(400).json({ msg: 'Enter the same password twice for verification.' });

  // Find document by id and updates with the required fields

  var newUserPassword = new UserPassword();

  const salt = uniqueId();

  const passwordHash = newUserPassword.generateHash(salt, password);

  const UserPasswordData = {
    password: passwordHash,
    salt: salt,
    user: req.params.id,
  };

  const userProfile = req[userModel];

  const resultPassword = await UserPassword.findOneAndUpdate(
    { user: userProfile._id, removed: false },
    { $set: UserPasswordData },
    {
      new: true, // return the new result instead of the old one
    }
  ).exec();

  if (!resultPassword) {
    return res.status(403).json({
      success: false,
      result: null,
      message: "User Paswword couldn't save correctly",
    });
  }

  return res.status(200).json({
    success: true,
    result: {},
    message: 'we update the password by this id: ' + req.params.id,
  });
};

module.exports = updateProfilePassword;
