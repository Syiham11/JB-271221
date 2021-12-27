const selectProduct = (item) => {
    return {
        id: item.prdNo,
        name: item.prdNm,
        price: item.selPrc,
        stock: stockCount(item.ProductOptionDetails),
        imageUrl: item.ProductDetail.imageUrl,
        description: item.ProductDetail.detail,
        createdAt: new Date(),
        updatedAt: new Date()
    }
}

const stockCount = (stocks) => {
    let stock = 0
    if (stocks && Array.isArray(stocks)) {
        stocks.forEach(item => {
            stock=+ item.stckQty
        })
    } else {
        stock = stocks.stckQty
    }

    return stock
}

module.exports = {
    selectProduct,
    stockCount
}