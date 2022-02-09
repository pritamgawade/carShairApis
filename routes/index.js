const express = require('express');
const router = express.Router();
const carDetails = require("../src/carDetails")

/* GET home page. */
router.get('/getAll', carDetails.getAllMakesList);
router.get('/getAllModels/make/:make/modelyear/:year', carDetails.allModelsList);
router.get('/getDetails/:vin', carDetails.getDetails);

module.exports = router;
