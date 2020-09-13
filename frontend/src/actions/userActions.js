import Axios from "axios";
import Cookie from 'js-cookie';
import { USER_SIGNOUT_REQUEST, USER_SIGNOUT_SUCCESS, USER_SIGNOUT_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL } from "../constants/userConstants";


const signin = (email, password) => async (dispatch) => {
	dispatch({ type:  USER_SIGNIN_REQUEST, payload: { email, password } });
	try {
		const { data } = await Axios.post("https://cors-anywhere.herokuapp.com/https://neelambackend.herokuapp.com/api/users/signin", { email, password });
		dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
		Cookie.set('userInfo', JSON.stringify(data));
	} catch(error) {
		dispatch({ type: USER_SIGNIN_FAIL , payload: error.message });
	}
}

const register = (name, email, password) => async (dispatch) => {
	dispatch({ type:  USER_REGISTER_REQUEST, payload: {name, email, password } });
	try {
		const { data } = await Axios.post("https://cors-anywhere.herokuapp.com/https://neelambackend.herokuapp.com/api/users/register", {name, email, password });
		dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
		Cookie.set('userInfo', JSON.stringify(data));
	} catch(error) {
		dispatch({ type: USER_REGISTER_FAIL , payload: error.message });
	}
}

const signout = () =>  (dispatch,getState ) => {
	dispatch({ type:  USER_SIGNOUT_REQUEST });
	try {
		const { userSignin: { userInfo } } = getState();
		Cookie.remove("userInfo");
		const data = null;
		dispatch({ type: USER_SIGNOUT_SUCCESS, payload: data });
		//const { userSignin: { userInfo } } = getState();
		
	} catch(error) {
		dispatch({ type: USER_SIGNOUT_FAIL , payload: error.message });
	}

}


export { signin, register, signout};