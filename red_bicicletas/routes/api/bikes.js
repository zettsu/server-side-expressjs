let express = require("express")
let router = express.Router();

let bikesApiController = require('../../controllers/api/bikes');

router.get('/', bikesApiController.get);
router.get('/:code', bikesApiController.getById);
router.post('/', bikesApiController.create);
router.put('/:code', bikesApiController.update);
router.delete('/:code', bikesApiController.delete);

module.exports = router;