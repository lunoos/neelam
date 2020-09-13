import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: { type:String, required: true },
	email:{ type:String, required: true, unique: true ,dropDups: true},
	password: { type: String, required: true },
	isAdmin: { type: Boolean, required: true, default: false },
	products:[{
		name: { type:String, required: true },
		price: { type:Number, default:0, required: true },
		image: { type:String, required: true },
		qty:{ type:Number, default:0, required: true }
	}]
});

const userModel = mongoose.model("User", userSchema);

export default userModel;