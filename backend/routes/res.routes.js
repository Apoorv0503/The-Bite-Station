const router= require("express").Router();
const {getAllRestaurants} = require("../controllers/res.controller");

router.get("/all",getAllRestaurants);

module.exports=router;