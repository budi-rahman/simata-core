const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { AppError, errorMessage } = require("../helpers/appError");
const { checkPermission } = require("../helpers/rolesAndPermissions");

function checkAuthz(action) {
  return (
    checkAuthz[action] ||
    (checkAuthz[action] = async function (req, res, next) {
      req.action = action;
      try {
        const token = req.headers.authorization;
        if (!token) {
          throw new AppError(errorMessage.TOKEN_INVALID);
        }

        jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
          if (err) {
            return next(new AppError(errorMessage.TOKEN_INVALID));
          }

          const user = await User.findByPk(decoded.id);
          if (!user) {
            return next(new AppError(errorMessage.TOKEN_INVALID));
          }

          // if (!(await checkPermission(user.role, action))) {
          //   return next(new AppError(errorMessage.NOT_AUTHORIZED));
          // }

          req.user = user;
          return next();
        });
      } catch (err) {
        console.log(err);
        return next(err);
      }
    })
  );
}
module.exports = checkAuthz;
