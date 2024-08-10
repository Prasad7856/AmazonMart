const Products = require('./models/productsSchema');
const productsData = require('./constant/productsdata');

const DefaultData = async () => {
    try {
        await Products.deleteMany({});
        const storeData = await Products.insertMany(productsData);
        // console.log(storeData);

    } catch (error) {
        console.log("error" + error.message);
    }

}

module.exports = DefaultData;