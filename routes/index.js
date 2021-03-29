const router = require('express').Router();
const didlistRoutes = require('./did');

/////////API routes////////////
//first api endpoint at localhost3000/didlist
router.use('/did', didlistRoutes);

module.exports = router;