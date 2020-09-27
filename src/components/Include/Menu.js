import React, { Component } from 'react';
import {Link,Redirect} from "react-router-dom";
import axios from 'axios';

const baseUrl = "http://172.105.40.76:4000";
class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {logoutset: false,respMessage:"",gotoindex:false};
	}	
	
	componentWillMount(){
		var getToken = localStorage.getItem("token");
		// setting header
         let headers={
            Authorization:"Bearer "+ getToken,
        }; 
		axios.get(baseUrl + '/api/current',{headers}).then((resp) => {
			console.log(resp);
            //this.handleModal("close");
			var resp = resp.data;
			if(resp.success === true){
				this.setState({respStatus:resp.success,
							    respMessage:resp.message,
							    username:"",
								email:"",
								password:"",
								country:"",
							   });
				setTimeout(() => {this.setState({ respStatus: "",gotologin:true });}, 2000);
                // login user
               // localStorage.setItem("token", this.state.tempToken);

            }else{
				this.setState({respStatus:resp.success,respMessage:resp.message});
				setTimeout(() => {this.setState({ respStatus: "",gotologin:false });}, 10000);
            }
			
        });
	}
	logout =() => {
		localStorage.removeItem("token");
		this.setState({logoutset: true});
	}
	render() {
		if(this.state.logoutset){
		  return(
				<Redirect to="/login" />
				);
		}
		return (

          <div className="menu2">
		   <ul className="nav">
			  <li className="nav-item">
				<a className="nav-link" href="#">Home</a>
			  </li>
			  <li className="nav-item">
				<a className="nav-link" href="#">Cricket</a>
			  </li>
			  <li className="nav-item">
				<a className="nav-link" href="#">Tennis</a>
			  </li>
			  <li className="nav-item">
				<a className="nav-link" href="#">Football</a>
			  </li>
			  <li className="nav-item">
				<a className="nav-link" href="#">Worli</a>
			  </li>
			  <li className="nav-item">
				<a className="nav-link" href="#">Horse Riding</a>
			  </li>
			  <li className="nav-item">
				<a className="nav-link" onClick={this.logout} href="javascript:void();">Logout</a>
			  </li>
			</ul>
		  </div>
				
    );
  }
}

export default Menu;