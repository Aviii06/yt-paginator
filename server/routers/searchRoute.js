//Router for the route '/search/'
const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController.js");

router.post('/', searchController.post);
router.get('/:query', searchController.getParams);

module.exports = router;