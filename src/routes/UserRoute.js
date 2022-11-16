const app = require("express");
const router = app.Router();
const auth = require("../utils/auth");
const { registerAdmin, loginAdmin, createEditor, editEditor, updateEditor, deleteEditor, loginEditor } = require("../controllers/UserController");


router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);

router.post("/admin/create-editor", auth, createEditor);
router.get("/admin/edit-editor/:id", auth, editEditor);
router.post("/admin/update-editor/:id", auth, updateEditor);
router.post("/admin/delete-editor/:id", auth, deleteEditor);

router.post("/editor/login", loginEditor);

module.exports = router;