const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const taskController = require("../controllers/task.controller");

const checkAuthz = require("../middleware/authorization");
const { multerMiddleware } = require("../middleware/upload");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ hello: "darkness my old friend" });
});

router.post("/api/v1/user/login", userController.login);
// router.post("/api/v1/user/forgot-password", userController.forgotPassword);

router.get("/api/v1/task", checkAuthz("task-list"), taskController.taskList);
router.get("/api/v1/task/:id", checkAuthz("task-detail"), taskController.taskDetail);
router.post("/api/v1/task", taskController.taskCreate);
router.put(
  "/api/v1/task/:id/detail/:taskDetailId",
  checkAuthz("task-update"),
  multerMiddleware.single("file"),
  taskController.taskDetailUpdate,
);

// router.get("/api/v1/user/permissions", checkAuthz("GET_PERMISSIONS"), userController.getPermissions);
// router.post("/api/v1/user", checkAuthz("ADD_USER"), userController.userCreate);
// router.get("/api/v1/user", checkAuthz("READ_USER_LIST"), userController.userRead);
// router.put("/api/v1/user", checkAuthz("EDIT_USER"), userController.userUpdate);
// router.get("/api/v1/dashboard", checkAuthz("DASHBOARD_COMPANY"), userController.dashboard)
// router.post("/api/v1/user/logout", userController.logout);
// router.post("/api/v1/user/change-password", userController.changePassword);
// router.get("/api/v1/user/api-token", checkAuthz("API_TOKEN_LIST"), userController.getUserToken);
// router.post("/api/v1/user/api-token", checkAuthz("ADD_API_TOKEN"), userController.createApiToken);
// router.put("/api/v1/user/api-token/:id", checkAuthz("EDIT_API_TOKEN"), userController.updateApiToken);
// router.get("/api/v1/user/:id", checkAuthz("READ_USER"), userController.userDetail);
// router.put("/api/v1/user/:id", checkAuthz("EDIT_USER"), userController.userUpdate);
// router.post("/api/v1/user/:id/reset-password", checkAuthz("RESET_USER_PASSWORD"), userController.resetPassword);
// router.get("/api/v1/user/:id/quota", userController.userQuota);
// router.post("/api/v1/user/:id/api-token", userController.createApiToken);
// router.put("/api/v1/user/:id/api-token/:tokenId", userController.updateApiToken);

// router.post("api/v1/user-quota/bulk", userQuota.userQuotaUpload);
// router.put("/api/v1/user-quota/:id", userQuota.userQuotaUpdate);

// router.post("/api/v1/company", checkAuthz("ADD_COMPANY"), companyController.companyCreate);
// router.get("/api/v1/company", checkAuthz("READ_COMPANY_LIST"), companyController.companyList);
// router.get("/api/v1/company/:id", companyController.companyDetail);
// router.get("/api/v1/company/:id/billing", companyController.companyBillingDetail);
// router.put("/api/v1/company/:id", checkAuthz("EDIT_COMPANY"), companyController.companyUpdate);
// router.put("/api/v1/company/:id/billing", checkAuthz("EDIT_COMPANY_BILL"), companyController.companyBillingUpdate);

module.exports = router;
