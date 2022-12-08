let express = require("express")
const authController = require("../../controllers/api/auth");
let router = express.Router();

router.post('/authenticate', authController.authenticate);
router.post('/forgotPassword', authController.forgotPassword);

module.exports = router;
