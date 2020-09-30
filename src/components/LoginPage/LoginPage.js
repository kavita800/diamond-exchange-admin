import React, { Component } from 'react';
var axios = require('axios');
import {Link,Redirect} from "react-router-dom";
import jQuery from "jquery";
import './LoginPage.css';
const baseUrl = "http://18.159.217.229:4000";
// const baseUrl = "http:18.159.217.229:4000";
// const baseUrl = "http://172.105.40.76:4000";

class LoginPage extends Component {
 
  constructor(props) {
    super(props);
    this.state = {respStatus: '',respMessage:"",gotoindex:false};

  }	
   goToIndex=()=>{
	  if(this.state.gotoindex===true) {
		   return(
				<Redirect to="/adminlist" />
				);
	  }
  } 
  handleSubmit =(event) => {
    event.preventDefault();
	 let loginData={
            email:this.state.email,
            password:this.state.password
        };

        // setting header
        /* let headers={
            Authorization:"Bearer "+ this.state.tempToken,
        }; */

        axios.post(baseUrl + '/api/login', loginData).then((resp) => { 
			if(resp.data.message === "Username or password is incorrect"){
				
                this.setState({respStatus:false,respMessage:resp.data.message});
				setTimeout(() => {this.setState({ respStatus: "",gotoindex:false });}, 10000);
				

            }else{
				if (resp.data.message.user_status ==="Y") {
					
					if (resp.data.message.userType !=6) {
						
					if(resp.data.message.hash_new===undefined || resp.data.message.hash_new===''){
						
						localStorage.setItem("token", resp.data.message.token);
							localStorage.setItem("user_id", resp.data.message._id);
							localStorage.setItem("user_Type", resp.data.message.userType); 
							localStorage.setItem("session_id", resp.data.session_id);
							localStorage.setItem("creditAmount", resp.data.creditAmount);
						this.setState({
							respStatus: true,
							respMessage: "Login Successfully",
							email: "",
							password: ""
						});
						setTimeout(() => { this.setState({ respStatus: "", gotoindex: true }); }, 1000);
					}
					else {
						
							localStorage.setItem("token", resp.data.message.token);
							localStorage.setItem("user_id", resp.data.message._id);
							localStorage.setItem("user_Type", resp.data.message.userType); 
							localStorage.setItem("session_id", resp.data.session_id);
							localStorage.setItem("change_password", 2);
							
							window.location.href = "/changepass";
							return false;
						}
						
					}else{
						this.setState({ respMessage: "Invalid Username And Password",respStatus:false });
					}
				}else{
					
					this.setState({
						respStatus:false,
						respMessage: "Something went wrong Please Contact upline",
					});
					return false;
					window.location.href="/login";
				
				}
            }
			
        });

  }
  componentWillMount(){
    

    
	
    



    
    // console.log(wordList.amount(5));
    
  }
  handleChange = (event)=> {
	let {name,value} = event.target;
    this.setState({[name]: value});
  }	
  
  responseHtml = () =>{
	
	  if(this.state.respStatus === false) {
		  return (
			<div className="alert alert-danger">
			{this.state.respMessage}
			</div>
		  )
	  }
	  else if(this.state.respStatus === true) {
		  return (
			<div className="alert alert-success">
			{this.state.respMessage}
			</div>
		  )
	  }
  }
  render() {
	  
	  
    var htmllogo1="";
	var html_logo2="";
if("admin.demandexch99.com"!=window.location.hostname){
	var htmllogo1=	<img className="login_logo" src="/img/logo.gif"/> 
   
}
if("admin.demandexch99.com"===window.location.hostname){
    var html_logo2=	<img className="login_logotwo" src="/img/demandexch99.png"/>    
}

    return (
	
	
	
	<div className="loginman">
			  <div className="container">
				<div className="card card-login mx-auto mmt-12 border-none">
				 {htmllogo1}
				{html_logo2}
				  <div className="card-header-1">Sign In</div>
				  <div className="card-body">
					<form className="form loginform mb-0" onSubmit={this.handleSubmit}>
					  <div className="form-group">
						<div className="form-label-group">
						 <input type="text" name="email" placeholder="Username"  onChange={this.handleChange} value={this.state.email} className="form-control" required="required"/>
						 
						</div>
					  </div>
					  <div className="form-group">
						<div className="form-label-group">
						  <input type="password" name="password"  placeholder="Password" onChange={this.handleChange} value={this.state.password} className="form-control" required="required"/>
						 
						</div>
					  </div>
					  {/* <div className="form-group">
						<div className="checkbox">
						  <label>
							<input name="remember" type="checkbox" value="1"/>&nbsp;
							Remember Me
						  </label>
						</div>
					  </div>*/}
					  {this.goToIndex()}
						{this.responseHtml()}
						 <div className=" form-label-group">
					 <button type="submit" className="btn man_btn width-100">Login <i className=" ml-2 fas fa-sign-in-alt"></i></button>
					 </div>
					 
					 {/*<div className="m-t-20 text-center download-apk">
					 <a href="#" className=" btn man_btn width-100">
					 <span className="newlacunch-menu">
					 <i className="fab fa-android"></i><b>Download Apk</b> </span></a>
					
					 </div>*/}
					</form>
					</div>
				  </div>
				  
				  <div className="copy_right">© HPEXCH</div>
				</div>
			  </div>
	);
  }
}

export default LoginPage;
