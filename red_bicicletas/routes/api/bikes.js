let express = require("express")
let router = express.Router();

let bikesApiController = require('../../controllers/api/bikes');

router.get('/', bikesApiController.get);
router.get('/:id', bikesApiController.getById);
router.post('/', bikesApiController.create);
router.put('/:id', bikesApiController.update);
router.delete('/:id', bikesApiController.delete);

module.exports = router;