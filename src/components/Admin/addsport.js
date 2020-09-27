import React, { Component } from 'react';
import Header from '../Header/Header';
import {Redirect} from "react-router-dom";
import axios from "axios"; 
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
var passwordValidator = require('password-validator');
var schema = new passwordValidator();
const { detect } = require('detect-browser');
const browser = detect();
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
				sport_name:"",
				min_bet:"",
				max_bet:""
				};  
    }	

    goToLogin=()=>{
      if(this.state.gotologin===true) {
          return(
             <Redirect to="/login" />
             );
      }
   } 
  
   handleSubmit =(event) => {
      event.preventDefault(); 
      if(  this.state.sport_name ===""  ){
         this.setState({emptyField:true,errMsg:"* Fields are required"});
         return false;
      }
      	let registerData={
			sport_name:this.state.sport_name,
			min_bet:this.state.min_bet,
			max_bet:this.state.max_bet,
		}; 
		  
       let headers={
            Authorization:"Bearer "+ localStorage.getItem("token"),
        }; 
        axios.post(baseUrl + '/api/add_sports',registerData, {headers}).then((resp) => { 
           var resp = resp.data;
           if(resp.success === true){
              this.setState({respStatus:resp.success,
                           respMessage:resp.message,
                           sport_name:"",
                           min_bet:"",
                           max_bet:"",
                           
                          });
            //   setTimeout(() => {this.setState({ respStatus: "",gotologin:true });}, 2000);  
            window.location = '/sports-details';
              }else{
               this.setState({respStatus:resp.success,respMessage:resp.message});
            //   setTimeout(() => {this.setState({ respStatus: "",gotologin:false });}, 10000);
              }
           
          }); 
    }
    handleChange = (event)=> {
		let {name,value} = event.target;
		this.setState({[name]: value,emptyField:false,errMsg:""});
	   
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
	var change_password=localStorage.getItem("change_password")
	
	if (change_password==2 && change_password!=null) {
		return (
			<Redirect to="/changepass" />
		);
	}
   var accessToken = this.state.accessToken;
	
	if(accessToken==="" || accessToken===null){
		return(
				<Redirect to="/login" />
				);
	}
	var new_data ="";
	var new_data1 =false;
	
    return (
	<div >
	<Header />
		<div id="wrapper">
		<div id="content-wrapper" className="container-fluid">
		<div id="wrapper">
		<div className="man_bglight">
		<div className="row">
			<div className="col-lg-12">
				<h3 className="a_manh">Add Sport</h3>
			</div> 
		</div> 
		<form onSubmit={this.handleSubmit}>
		
		<div className="row">
		<div className="col-lg-6">
		
		<div className="row">
         <div className="col-lg-12">
            <div className="form-group">
			<label>Sport Name *</label>
               <div className="form-label-group">
                  <input type="text" onChange={this.handleChange} value={this.state.sport_name} name="sport_name" id="user_name" className="form-control" placeholder="Sport Name" />
               </div>
            </div>
         </div>
       
		
		 
		</div> 
		</div> 
	  
		</div> 	
		
		
		
            <br/>  
               {this.responseHtml()}   
               {this.goToLogin()} 
               {this.emptyHtml()}
              <div className="" style={{marginBottom:"100px;"}}> 
			  <button type="submit" className="btn man_btn" onClick={this.handleFormSubmit}>Add Sport</button></div>
        
        
      

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
