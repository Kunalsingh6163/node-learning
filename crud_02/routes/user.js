const express = require("express");
const { handleGetAlluser, apiAllUserList } = require("../controllers/userControl");

const router = express.Router();

router.get("/", handleGetAlluser);
router.get("/api", apiAllUserList);

module.exports = router;
