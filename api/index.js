const {Router} = require("express");
const router = Router();
const ctrl = require("./word.ctrl");

router.get("/", ctrl.redirect);
router.post("/auth", ctrl.checkPasswd);
router.get("/auth", ctrl.showEnterance);
router.get("/word", ctrl.list);
router.get("/category", ctrl.categoryList);
router.post("/word", ctrl.create);
router.delete("/word/:text", ctrl.remove);
router.get("/search/category/:category", ctrl.findWordbyCategory);

module.exports = router;



//router.use("",require("./word"))
//router.use("/word", require("./word"));

