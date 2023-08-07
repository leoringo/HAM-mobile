const router = require('express').Router()
const Controller = require('../controller')


//product
router.post('/products', Controller.addProduct)
router.get('/products', Controller.fetchProductUser)
router.get('/products/:productId', Controller.fetchProductUserById)
router.put('/products/:productId', Controller.updateProduct)
router.delete('/products/:productId', Controller.destroyProduct)

//category
router.post('/categories', Controller.addCategory)
router.get('/categories', Controller.getCategory)
router.get('/categories/:catId', Controller.getCategoryById)
router.patch('/categories/:catId', Controller.patchCategory)
router.delete('/categories/:catId', Controller.destroyCategory)



module.exports = router