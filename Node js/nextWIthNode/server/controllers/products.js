const products = [];

const addProduct = (name,id) => {
    products.push({
        name,id,
    });
};
const getProducts = () => {
    return products;
}

const deleteProduct = (id) => {
    products.forEach((product,index) => {
        if(id === product.id){
            products.splice(index,1);
        };
    });
};
const editProduct = (name,id) => {
    const item = products.find(p => p.id === id);
    products.forEach((product,index) => {
        if(id === product.id){
            item.name = name;
            item.id = id;
            products.splice(index,1,item);
        };
    });
};

module.exports = {
    addProduct,
    getProducts,
    deleteProduct,
    editProduct
}
