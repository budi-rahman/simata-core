const userService = require("../services/user.service");

exports.userCreate = async (req, res, next) => {
  const payload = req.body;
  // TODO: validation...

  const user = await userService.userCreate(req.user, payload);

  res.json(user);
};

exports.userRead = async (req, res, next) => {
  const user = await userService.userRead(req.user);

  res.json(user);
};

exports.userDetail = async (req, res, next) => {
  const user = await userService.userDetail(req.params.id);

  res.json(user);
};

exports.userUpdate = async (req, res, next) => {
  const payload = req.body;

  const user = await userService.userUpdate(req.params.id, req.user, payload);

  res.json(user);
};

exports.resetPassword = async (req, res, next) => {
  const user = await userService.userResetPassword(req.params.id);

  res.json(user);
};

exports.login = async (req, res, next) => {
  const payload = req.body;

  const token = await userService.login(payload);

  res.json(token);
};

exports.getPermissions = async (req, res) => {
  let rp = await userService.getUserPermission(req.user);

  res.json(rp);
};

exports.getUserToken = async (req, res) => {
  let tokens = await userService.getUserApiToken(req.user.id);

  res.json(tokens);
};

exports.createApiToken = async (req, res, next) => {
  let token = await userService.userCreateApiToken(req.user, req.body);

  res.json(token);
};

exports.updateApiToken = async (req, res, next) => {
  let token = await userService.userUpdateApiToken(req.user, req.params.id, req.body);

  res.json(token);
};
