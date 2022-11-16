const app = require("express");
const router = app.Router();
const auth = require("../utils/auth");
const { registerAdmin, loginAdmin } = require("../controllers/UserController");


router.post("/editor/add", registerAdmin);
router.post("/editor/edit", registerAdmin);
router.post("/editor/remove", registerAdmin);
router.post("/editor/login", loginAdmin);
// router.post("/chairman/login", loginChairman);
// router.post("/chairman/forgot-password", forgotPassword);
// router.post("/chairman/reset-password/:token", resetPassword);
// router.get("/chairman/dash-info/:dept_id", fetchDashInfo);
// router.post("/chairman/resign/:id", resignChairman);

module.exports = router;