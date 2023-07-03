const router = require("express").Router();
const userC = require("../controller/userC");
router.post('/register', userC.register);
router.post('/login', userC.login);
router.put('/forgotPassword/:id', userC.forgotPassword);
router.put('/changePassword', userC.changePassword);
router.post('/sendActivation', userC.sendActivation);
router.get('/getUsers', userC.getUsers);

module.exports = router;