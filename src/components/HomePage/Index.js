import React, { Component } from 'react';
import Header from '../Header/Header';
import {Link,Redirect} from "react-router-dom";
import axios from "axios";
const baseUrl = "http://18.159.217.229:4000";

class Index extends Component {
	
  constructor(props) {
    super(props);
	var accessToken = localStorage.getItem("token");
    this.state = {accessToken:accessToken,balance:0}; 
  }	 
  
  componentWillMount() { 
         let headers={
            Authorization:"Bearer "+ this.state.accessToken,
		};  
		axios.get(baseUrl + '/api/current',{headers}).then((resp) => { 
			var resp = resp.data;      
				if(resp.userType===1 || resp.userType===2 || resp.userType===3 || resp.userType===4){ 
					axios.get(baseUrl + '/api/admintotal', {headers}).then((resp) => { 
						var resp = resp.data;  
						if(resp.success === true){
							this.setState({totalusers:resp.countadmins
						}); 
						}
					});
					this.setState({
							indexcount:"Admin Count",
							adminlistHeading:"Admin List",
							links:"/adminlist" ,
							userType:resp.userType
						}); 
				}  else{
					axios.get(baseUrl + '/api/usertotal', {headers}).then((resp) => { 
						var resp = resp.data;  
						if(resp.success === true){
							this.setState({totalusers:resp.countadmins
						}); 
						}
					});
					this.setState({
						indexcount:"User Count",
						adminlistHeading:"User List",
						links:"/userlist" ,
						userType:resp.userType
					}); 
				}
			 
		}); 
       
  } 
  
  render() {
	var accessToken = this.state.accessToken;
	
	if(accessToken==="" || accessToken===null){
		return(
				<Redirect to="/login" />
				);
	}
	var change_password=localStorage.getItem("change_password")
		if (change_password===2 && change_password!=null) {
			return (
				<Redirect to="/change_password" />
			);
		}
    return (
	<div>
	<Header />
      <div id="page-wrapper">
      <div class="container-fluid">
      <div class="man_bglight">
	
			
				<h4 className="">Market Analysis</h4>
				<p >You can view your cricket card books from sport menu.</p>
		
	
		
		
		</div>
		</div>
	
	
	
	</div>
	</div>
    );
  }
}

export default Index;
