const router = require("express").Router();
const categorieC = require("../controller/categorieC");
router.get('/getAll', categorieC.getAll);
router.post('/addCat', categorieC.addCat);
router.put('/updateCat/:id', categorieC.updateCat);
router.delete('/deleteCat/:id', categorieC.deleteCat);

module.exports = router;