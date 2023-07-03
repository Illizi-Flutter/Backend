const router = require("express").Router();
const produitC = require("../controller/produitC");
router.get('/getAll', produitC.getAll);
router.post('/addProd', produitC.addProd);
router.get('/getProdById/:id', produitC.getProdById);
router.put('/updateProd/:id', produitC.updateProd);
router.delete('/deleteProd/:id', produitC.deleteProd);

module.exports = router;