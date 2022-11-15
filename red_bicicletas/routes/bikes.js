let express = require("express")
let router = express.Router();

let bikesController = require('../controllers/bikes');

router.get('/json', bikesController.json_bikes);
router.get('/', bikesController.list_bikes);
router.get('/create', bikesController.create_get);
router.post('/create', bikesController.create_post);
router.post('/:id/delete', bikesController.delete_post);
router.get('/:id/update', bikesController.update_get);
router.post('/:id/update', bikesController.update_post);

module.exports = router;