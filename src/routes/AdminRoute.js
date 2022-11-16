const app = require("express");
const router = app.Router();
const { registerAdmin, loginAdmin } = require("../controllers/AdminController");


router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
// router.post("/chairman/login", loginChairman);
// router.post("/chairman/forgot-password", forgotPassword);
// router.post("/chairman/reset-password/:token", resetPassword);
// router.get("/chairman/dash-info/:dept_id", fetchDashInfo);
// router.post("/chairman/resign/:id", resignChairman);

module.exports = router;