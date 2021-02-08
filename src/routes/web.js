const express = require("express");
const router = express.Router();
const path = require("path");

const controllerWeb = require("../controllers/controllerWeb");

router.get('/', controllerWeb.start)
router.get("/", controllerWeb.index);
router.post("/create", controllerWeb.create);
router.get('/project/:id', controllerWeb.read);
router.get('/project/edit/:id', controllerWeb.edit)
router.put('/project/edit/:id', controllerWeb.update)
router.get('/project/delete/:id', controllerWeb.destroy)

module.exports = router;
