import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';



function SuccessScreen(props) {
	return <div className="SuccessContainer">
	 <h1>YOUR ORDER HAS BEEN PLACED</h1>
	 <button onClick={() => props.history.push('/') } className="button primary">Continue Shopping</button>
	 </div>
	
	
}

export default SuccessScreen;