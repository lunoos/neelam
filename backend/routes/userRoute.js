import express from 'express';
import User from '../models/userModel';
import { getToken } from '../util';

const router = express.Router();

router.post('/signin', async( req,res ) =>{

	const signinUser = await User.findOne({
	email:req.body.email,
	password: req.body.password
});
  if(signinUser){
  	res.send({
  		_id: signinUser.id,
  		name: signinUser.name,
  		email: signinUser.email,
  		isAdmin: signinUser.isAdmin,
  		token: getToken(signinUser),
  		products: signinUser.products
  	})
  	;}
  	else {
  	res.status(401).send({ message: 'Invalid Email or password'});
  	
  
 } } );

 router.put('/:id', async(req, res) =>{
 	console.log(req.params.id);
 	const user = await User.findOne({email: req.params.id});
 	 User.updateOne(
    { email : req.params.id },
    { $push: { products: [
    	{name:req.body.name, 
    	image: req.body.image,
    	price: req.body.price,
    	qty: req.body.qty}] } },
    function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
 })


router.post('/register', async ( req,res ) =>{
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password
	});

	const newUser = await user.save();
	if(newUser){
		res.send({
		_id: newUser.id,
  		name: newUser.name,
  		email: newUser.email,
  		isAdmin: newUser.isAdmin,
  		token: getToken(newUser),
      products:newUser.products
		})
	}
	else {
  	res.status(401).send({ message: 'Invalid user data'});
//  const signinUser = await User.findOne({
//   email:req.body.email,
//   password: req.body.password
// });
//   if(signinUser){
//     res.send({
//       _id: signinUser.id,
//       name: signinUser.name,
//       email: signinUser.email,
//       isAdmin: signinUser.isAdmin,
//       token: getToken(signinUser),
//       products: signinUser.products
//     })
//     ;}
//     else {
//     res.status(401).send({ message: 'Invalid Email or password'});
    
  
 }
  	
  
  } );

router.get("/createadmin", async (req, res) => {
	try{
		const user = new User({
		name: 'Basir',
		email: 'basir@gmail.com',
		password: '1234',
		isAdmin: true
	})

	const newUser = await user.save();
	res.send(newUser);

	}catch(error){
		res.send({msg: error.messag});
	}
	 

})

export default router;