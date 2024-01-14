const Product = require('../models/product.model');
 


module.exports.findAllProducts = (req, res) => {
    Product.find()
        .then((allDaProducts) => {
            res.json({ products: allDaProducts })
        })
        .catch((err) => {
             res.status(400).json(err)
        });
}
 
module.exports.findOneSingleProduct = (req, res) => {
    Product.findOne({ _id: req.params.id })
        .then(oneSingleProduct => {
            res.json({ product: oneSingleProduct })
        })
        .catch((err) => {
             res.status(400).json(err)
        });}
 

module.exports.createNewProduct = (req, res) => {
    Product.create(req.body)
        .then(newlyCreatedProduct => {
            res.json({ product: newlyCreatedProduct })
        })
        .catch((err) => {
             //  res.json({ message: 'Something went wrong', error: err })
            res.status(400).json(err) // le "status(400)"  ici  permet que l'err soit catch par axios
                                      // le resp.json d'en haut n'etait pas catch
        });}
 

module.exports.updateExistingProduct = (req, res) => {
    Product.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
    )
        .then(updatedProduct => {
            res.json({ product: updatedProduct })
        })
        .catch((err) => {
             res.status(400).json(err)
        });}
 
        
module.exports.deleteAnExistingProduct = (req, res) => {
    Product.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json({ result: result })
        })
        .catch((err) => {
             res.status(400).json(err)
        });}


    