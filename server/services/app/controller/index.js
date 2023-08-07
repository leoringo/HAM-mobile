const { Product, Category, Image } = require('../models')
const { sequelize } = require('../models')

class Controller {

    //---------------------------PRODUCT-----------------------------------
    static async addProduct(req, res, next) {
        const t = await sequelize.transaction();
        try {

            const { name, description, price, mainImg, categoryId, mongoUserId} = req.body

            const newProduct = await Product.create({ name, description, price, mainImg, categoryId, mongoUserId }, { transaction: t })

            const { images } = req.body

            images.forEach(e => {
                e.productId = newProduct.id
            })

            await Image.bulkCreate(images, { transaction: t })

            await t.commit()
            res.status(201).json({ message: 'Successfully creating new product' })
        }
        catch (error) {
            await t.rollback();
            next(error)
        }
    }

    static async fetchProductUser(req, res, next) {
        try {
            const product = await Product.findAll({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: Category,
                    attributes: ['name']
                },
                {
                    model: Image,
                    attributes: ['imgUrl']
                }
                ]
            })

            res.status(200).json(product)
        }
        catch (error) {
            next(error)
        }
    }

    static async fetchProductUserById(req, res, next) {
        try {

            const id = req.params.productId

            const product = await Product.findByPk(id, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [
                {
                    model: Category,
                    attributes: ['name']
                },
                {
                    model: Image,
                    attributes: ['id', 'productId', 'imgUrl']
                }
                ]
            })

            if (!product) throw { status: 404, message: 'Product not found!' }

            res.status(200).json(product)
        }
        catch (error) {
            next(error)
        }
    }

    static async updateProduct(req, res, next) {
        try {

            const id = req.params.productId

            const { name, description, price, mainImg, categoryId } = req.body

            const checkProduct = await Product.findByPk(id)

            if (!checkProduct) throw { status: 404, message: 'Product not found!' }

            const updatedProduct = await Product.update({ name, description, price, mainImg, categoryId }, { where: { id } })

            res.status(201).json({ message: `Successfully updated product with id ${id} !` })
        }
        catch (error) {
            next(error)
        }
    }

    static async destroyProduct(req, res, next) {
        try {

            const id = req.params.productId

            const product = Product.findByPk(id)

            if (!product) throw { status: 404, message: 'Product not found!' }

            await Product.destroy({ where: { id } })

            res.status(200).json({ message: `Product with id ${id} deleted!` })

        }
        catch (error) {
            next(error)
        }
    }

    //-------------------------CATEGORY-----------------------------------
    static async addCategory(req, res, next) {
        try {

            const { name } = req.body

            if (!name) throw { status: 400, message: 'Name cannot be empty!' }

            const newCat = await Category.create({ name })

            res.status(201).json(newCat)

        }
        catch (error) {
            next(error)
        }
    }

    static async getCategory(req, res, next) {
        try {

            const cats = await Category.findAll({
                attributes: ['id', 'name']
            })

            res.status(200).json(cats)

        }
        catch (error) {
            next(error)
        }
    }

    static async patchCategory(req, res, next) {
        try {

            const id = req.params.catId

            const { name } = req.body

            if (!name) throw { status: 401, message: 'Name cannot be empty!' }

            const checkCat = await Category.findByPk(id)

            if (!checkCat) throw { status: 404, message: 'Category not found!' }

            await Category.update({ name }, { where: { id } })

            res.status(201).json({ message: `Category with id ${id} has been updated!` })

        }
        catch (error) {
            next(error)
        }
    }

    static async destroyCategory(req, res, next) {
        try {

            const id = req.params.catId

            const check = await Category.findByPk(id)

            if (!check) throw { status: 404, message: 'Category not found!' }

            await Category.destroy({ where: { id } })

            res.status(201).json({ message: `Successfully delete category with id ${id}` })

        }
        catch (error) {
            next(error)
        }
    }

    static async getCategoryById(req, res, next){
        try {
            
            const id = req.params.catId

            const catDetail = await Category.findByPk(id, {
                attributes: ['id', 'name']
            })

            if(!catDetail) throw{status: 404, message: 'Category Not Found!'}

            res.status(200).json(catDetail)
        } 
        catch (error) {
            next(error)
        }
    }
}

module.exports = Controller