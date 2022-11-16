const app = require("express");
const router = app.Router();
const auth = require("../utils/auth");
const { createNews, editNews, updateNews, deleteNews } = require("../controllers/NewsController");


router.post("/editor/create-news", auth, createNews);
router.get("/editor/edit-news/:id", auth, editNews);
router.post("/editor/update-news/:id", auth, updateNews);
router.post("/editor/delete-news/:id", auth, deleteNews);

module.exports = router;