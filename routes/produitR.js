const router = require("express").Router();
const upload = require("../middleware/uploadImage");
const produitC = require("../controller/produitC");
router.get('/getAll', produitC.getAll);
router.get('/getProductByUserId', produitC.getProductByUserId);
router.post('/addProd', upload.single("image"), produitC.addProd);
router.get('/getProdById/:id', produitC.getProdById);
router.put('/updateProd/:id', produitC.updateProd);
router.delete('/deleteProd/:id', produitC.deleteProd);



module.exports = router;