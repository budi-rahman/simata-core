const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
const { User } = require("../models");
const { AppError, errorMessage } = require("../helpers");
// const { getPermissions, checkPermission } = require("../helpers/rolesAndPermissions");

async function findUserOrFail(id) {
  let user = await User.findByPk(id);
  if (!user) {
    throw new AppError(errorMessage.ERROR_USER_IS_NOT_EXISTS);
  }
  return Promise.resolve(user);
}

exports.login = async (payload) => {
  let user = await User.findOne({
    where: { username: payload.username.toLowerCase() },
  });

  if (!user) {
    throw new AppError(errorMessage.ERROR_LOGIN_INVALID);
  }

  if (!bcrypt.compareSync(payload.password, user.password)) {
    throw new AppError(errorMessage.ERROR_LOGIN_INVALID);
  }

  let token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      status: user.status,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "365d" },
  );

  return Promise.resolve({ ...user.toJSON(), token });
};

exports.userCreate = async (payload) => {
  let user = await User.findOne({
    where: {
      username: payload.username.toLowerCase(),
    },
  });

  if (user) {
    throw new AppError(errorMessage.ERROR_USER_IS_EXISTS, [payload.email]);
  }

  const password = await bcrypt.hash(payload.password, 10);
  user = await User.create({
    ...payload,
    username: payload.username.toLowerCase(),
    password,
  });

  return Promise.resolve(user);
};

// exports.getUserPermission = async (user) => {
//   let rp = await getPermissions();
//   let userDb = await User.findByPk(user.id, {
//     attributes: ["email", "name", "role", "status"],
//   });
//   return Promise.resolve({ permissions: rp[user.role], ...userDb.toJSON() });
// };

// exports.userRead = async (reqUser) => {
//   let filter = {};
//   if (!(await checkPermission(reqUser.role, "READ_USER_LIST_ADMIN"))) {
//     filter = { companyId: reqUser.companyId };
//   }
//   let user = await User.findAll({
//     where: filter,
//     attributes: ["id", "email", "name", "role", "status", "version", "createdAt"],
//     order: [["createdAt", "ASC"]],
//   });

//   return Promise.resolve(user);
// };

// exports.userUpdate = async (id, userPl, payload) => {
//   let user = await User.findByPk(id);

//   if (!user) {
//     throw new AppError(errorMessage.ERROR_USER_IS_NOT_EXISTS);
//   }

//   if (userPl.companyId !== user.companyId && !(await checkPermission(user.role, "EDIT_USER_ADMIN"))) {
//     throw new AppError(errorMessage.NOT_AUTHORIZED);
//   }

//   await User.update({ ...payload, version: user.version + 1, updatedBy: userPl.id }, { where: { id } });
//   user = await User.findByPk(id);

//   UserLog.create({ ...user.toJSON(), id: undefined, userId: user.id, updatedBy: userPl.id, remark: payload.remark });

//   return Promise.resolve(user);
// };

// exports.logout = () => {
//   return Promise.resolve({ status: "success" });
// };

// exports.userChangePassword = async (payload) => {
//   let user = await findUserOrFail(userId);
//   user.password = await bcrypt.hash(payload.password, 10);
//   await user.save();
//   return Promise.resolve({ status: "success" });
// };

// exports.userResetPassword = async (id) => {
//   // console.log("----", id);
//   let user = await findUserOrFail(id);
//   let userMeta = await UserMeta.findOne({ where: { userId: id } });
//   let password = crypto.randomBytes(5).toString("hex");

//   user.password = await bcrypt.hash(password, 10);
//   userMeta.forceChangePassword = true;

//   await user.save();
//   await userMeta.save();

//   sendEmail(user.email, {
//     template: "user.resetPassword",
//     subject: "Rapindo POC Account Password is Resetted",
//     password,
//   });

//   return Promise.resolve(user);
// };
