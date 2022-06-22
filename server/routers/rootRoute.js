//Router for the route '/'
const express = require("express");
const router = express.Router();
const rootController = require("../controllers/dashboardController");

router.get('/', rootController.default);
router.get('/:page', rootController.page);

module.exports = router;