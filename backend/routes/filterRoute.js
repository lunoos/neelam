import express from 'express';
import Product from '../models/productModel';

const router = express.Router();

router.get("/:id", async ( req, res ) => {
	const products = await Product.find({});
	let filterProducts = products.filter(product => product.name === req.params.id);
	if(filterProducts.length){
		res.send(filterProducts);
	}else {
		res.status(404).send({message:'product out of stock'});
	}
})


export default router;

