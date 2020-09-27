import React, { Component } from 'react';
import Header from '../Header/Header';
import {Redirect} from "react-router-dom";
import axios from "axios"; 
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
var passwordValidator = require('password-validator');
var schema = new passwordValidator();
 
// Add properties to it
schema
.is().min(8)                                    // Minimum length 8
.is().max(15)                                  // Maximum length 15
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits
.has().not().spaces()                           // Should not have spaces
.is().not();


const baseUrl = "http://172.105.40.76:4000"; 
class Receive extends Component {
	
   constructor(props) {
      super(props);
      var accessToken = localStorage.getItem("token");
      var user_id = localStorage.getItem("user_id");
      this.state = {respStatus: '', 
                gotologin:false,
                emptyField:false,
				user_text:"User Demo Text",
				admin_text:"Admin Demo Text"
				};  
    }	

    goToLogin=()=>{
      if(this.state.gotologin===true) {
          return(
             <Redirect to="/login" />
             );
      }
   } 
   componentWillMount() { 
	
	
	let headers = {
		Authorization: "Bearer " +  localStorage.getItem("token"),
	}; 
	
	axios.get(baseUrl + '/api/get_admin_text_value',{headers}).then((resp) => {  
		var resps = resp.data;

			// if (resps.success === true) {
				this.setState({ admin_text:resps.value.admin_text,user_text:resps.value.user_text });
			// }
				
			
		
	});  
}
   handleSubmit =(event) => {
      event.preventDefault(); 
      
      let registerData={
		admin_text:this.state.admin_text,
		user_text:this.state.user_text,
			
          }; 
        

		

         let headers={
            Authorization:"Bearer "+ localStorage.getItem("token"),
        }; 
          axios.post(baseUrl + '/api/submit_admin_text_value',registerData, {headers}).then((resp) => { 
           var resp = resp.data;
           if(resp.success === true){
              this.setState({respStatus:resp.success,
                           respMessage:resp.message,
                           username:"",
                           email:"",
                           password:"",
                           country:"",
                          });
            //   setTimeout(() => {this.setState({ respStatus: "",gotologin:true });}, 2000);  
           // window.location = 'adminlist';
              }else{
               this.setState({respStatus:resp.success,respMessage:resp.message});
            //   setTimeout(() => {this.setState({ respStatus: "",gotologin:false });}, 10000);
              }
           
          }); 
    }
    handleChange = (event)=> {
		let {name,value} = event.target;
		

		

		if(name=='admin_text'){
			this.setState({admin_text: value});
		}
		if(name=='user_text'){
			this.setState({user_text: value});
		}
		
	   
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
  onSelectFlag =(countryCode) =>{ 
   this.setState({country: countryCode});
   }  
   emptyHtml = () =>{
	
      if(this.state.emptyField === true) {
         return (
          <div className="alert alert-danger">
          {this.state.errMsg}
          </div>
         )
      }
   }
   
  

  render() { 
   var accessToken = this.state.accessToken;
	
	if(accessToken==="" || accessToken===null){
		return(
				<Redirect to="/login" />
				);
	}
	var change_password=localStorage.getItem("change_password")
	
	if (change_password==2 && change_password!=null) {
		return (
			<Redirect to="/changepass" />
		);
	}
    return (
	<div >
	<Header />
		<div id="wrapper">
		<div id="content-wrapper" className="container-fluid">
		<div id="wrapper">
		
		<div className="man_bglight">
		<h4 className="a_manh">Admin Message - User Message</h4>
		<form onSubmit={this.handleSubmit}>
		
		<div className="row">
		<div className="col-lg-6">
		
		<div className="row">
         <div className="col-lg-6">
            <div className="form-group">
			<label>Admin Message *</label>
               <div className="form-label-group">
                  <input type="text" onChange={this.handleChange} value={this.state.admin_text} name="admin_text" id="user_name"  required className="form-control" placeholder="Admin Text" />
               </div>
            </div>
         </div>
         <div className="col-lg-6">
            <div className="form-group">
				<label>User Message *</label>
               <div className="form-label-group">
                  <input type="text" onChange={this.handleChange}  value={this.state.user_text} name="user_text" id="fullname" required className="form-control" placeholder="User Text" />
               </div>
            </div>
         </div>
		  <div className="col-lg-12" >   
               {this.responseHtml()}   
               {this.goToLogin()} 
               {this.emptyHtml()}
              <div className="tr" style={{marginBottom:"100px;"}}> 
			  <button type="submit" className="btn btn-primary" onClick={this.handleFormSubmit}>Submit</button></div>
         </div>  
		 
		</div> 
		</div> 
	  
		
         
        
        
      </div> 

      </form>
	   </div>
	</div>
	</div>
	</div>
	</div>
    );
  }
}

export default Receive;
