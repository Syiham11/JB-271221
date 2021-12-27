const Models = require('../models')
const ProductsService = {
    async getAll(params) {
        try {
            let qParams = {
                offset: (Number(params.page) -1) * Number(params.limit),
                limit: Number(params.limit), 
                where: {}
            }

    
            if (params.name) {
                qParams.where.name = {
                    [Models.Sequelize.Op.iLike]: `%${params.name.toLowerCase()}%`
                }
            }
    
            let list = await Models.Products.findAll({
                ...qParams
            })
            let count = await Models.Products.count({
                where: qParams.where
            })
            const pagination = {
                page: Number(params.page),
                limit:Number(params.limit),
                currentData: list.length,
                totalData: count,
                totalPage: Math.ceil(count / Number(params.limit)),
              }
            return {
                pagination: pagination,
                data: list
            }
        } catch (error) {
            console.log(error)
        }
    },
    getById(id) {
        return Models.Products.findOne({where: {id: id}})
    },
    update(id,data) {
        Models.Products.update(data, {
            where: {
                id: id
            }
        }) 
        return data
    },
    create(data) {
        return Models.Products.create(data)
    },
    delete(id) {
         Models.Products.destroy({where : {id: id}})
         return {status:"success"}
    }
}

module.exports = ProductsService;