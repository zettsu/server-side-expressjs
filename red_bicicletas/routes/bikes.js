let express = require("express")
let router = express.Router();

let bikesController = require('../controllers/bikes');

router.get('/', bikesController.list_bikes);
router.get('/create', bikesController.create_get);
router.post('/create', bikesController.create_post);

module.exports = router;