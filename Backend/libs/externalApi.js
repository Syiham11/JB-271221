const axios = require('axios');
const { parser } = require('./xmlToJson');
const config = require('../config/config.json');
const { selectProduct } = require('./propertyFormat');
const option = {
    headers: {
        openapikey: config.development.eleveniaApiKey,
    }
}
const getProductList = async (page) => {
    try {
        let {data} = await axios.get(`${config.development.eleveniaApi}/prodservices/product/listing?page=${page}`, option)
        let resJson =  await parser(data)
        if (!resJson && !resJson.Product) return []
        let result = await concatProductDetail(resJson.Products.product || [])     
        return result
    } catch (error) {
        console.log(error)
    }

}

const getProductDetail = async (id) => {
    try {
        let { data } = await axios.get(`${config.development.eleveniaApi}/prodservices/product/details/${id}`, option)
        let dataJson = await parser(data)
        return dataJson
    } catch (error) {
        console.log(error)
    }
}

const concatProductDetail = (products) => {
  return Promise.all(
    products.map(async (item) => {
        dataJson = await getProductDetail(item.prdNo)
        item.ProductDetail = {
            imageUrl: dataJson.Product.prdImage01,
            detail: dataJson.Product.htmlDetail
        }
        return selectProduct(item)
    })
  ).then(result => result)
}

module.exports = {
    getProductList
}