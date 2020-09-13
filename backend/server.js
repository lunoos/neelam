import express from 'express';
import data from './data';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import bodyParser from 'body-parser';
import products from './routes/productRoute';
import filter from './routes/filterRoute';
import Razorpay from 'razorpay';
import shortid from 'shortid';
import cors from 'cors';
import crypto from 'crypto';



dotenv.config();

const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}).catch(error => console.log(error.reason));



const app = express();
app.use(bodyParser.json());
 app.use("/api/users", userRoute);
 app.use("/api/products", products);
 app.use("/api/filter", filter);




const razorpay = new Razorpay({
	key_id:"rzp_test_av1wpTOyUA2Hbx",
	key_secret: "FG2KYxeR9RNuxrvrZKbc3dzZ"
});
app.use(cors());
app.use(bodyParser.json());

app.post('/razorpay', async(req, res) => {
	const payment_capture = 1;
	const amount = req.body.amount;
	const currency = 'INR';

	const options = {
		amount: amount * 100,
		currency, 
		receipt: shortid.generate(), 
		payment_capture
	}

	try{
	const response = await razorpay.orders.create(options)
	console.log(response)
		res.json({
		id: response.id,
		currency: response.currency,
		amount: response.amount

	});
	}catch(err){
		console.log(err);
	}

})
app.post('/verification', (req, res) => {
	const secret = '999xyz###';

	console.log(req.body);
	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body));
	const digest = shasum.digest('hex');

	console.log(digest, req.headers['x-razorpay-signature'])

	if(digest === req.headers['x-razorpay-signature']){
		console.log('request is legit');
	}else{
		console.log('someone is messing around');
	}

	res.json({ status: 'ok' })
})




app.listen(process.env.PORT || 5000, () =>{
	console.log("server is running on local host 5000");
})