import React, { Component } from 'react';
import Header from '../Header/Header';
import {Redirect} from "react-router-dom";
import axios from "axios"; 
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
var passwordValidator = require('password-validator');
var $ = require( "jquery" );
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
                username:"",
                email:"",
                password:"",
                confirm_password:"",
                city:"",
                phone:"",
                userType:"",
                creditAmount:"",
                exposerAmount:"",
                country:"",
                errMsg:"",
                accessToken:accessToken,
                tabledata:"",
                user_id:user_id ,
				cricket_commission_own:0,
				football_commission_own:0,
				tennis_commission_own:0, 
				cricket_partnership_own:0,
				football_partnership_own:0,
				tennis_partnership_own:0,
				cricket_commission_downline:0,
				football_commission_downline:0,
				tennis_commission_downline:0,
				cricket_partnership_downline:0,
				football_partnership_downline:0,
				tennis_partnership_downline:0,
				cricket_min_bet:0,
				cricket_max_bet:0,
				cricket_delay:0,
				football_min_bet:0,
				football_max_bet:0,
				football_delay:0,
				tennis_min_bet:0,
				tennis_max_bet:0,
				tennis_delay:0,
				master_password1:"",
				display:false,
				browser_name:"",
				version:"",
				os:"",
				ip_address:"",
				};  
    }	

    goToLogin=()=>{
      if(this.state.gotologin===true) {
          return(
             <Redirect to="/login" />
             );
      }
   } 
   componentWillMount(){
	if (browser) {
		var browser_name=browser.name;
		var version=browser.version;
		var os=browser.os;
		this.setState({browser_name:browser_name,version:version,os:os})
		
		
	  }
	  axios.get('https://api.ipify.org/?format=json').then((resp) => { 
			this.setState({ip_address:resp.data.ip})
			  
		});
	   this.currentUser();
	   
   }
   handleSubmit =(event) => {
      event.preventDefault(); 
      if(  this.state.username ==="" || this.state.fullname ==="" || this.state.password ==="" || this.state.confirm_password ==="" || this.state.userType ==="" ){
         this.setState({emptyField:true,errMsg:"* Fields are required"});
         return false;
      }
      let registerData={
            username:this.state.username,
            fullname:this.state.fullname,
			email:this.state.email,
			password:this.state.password,
			city:this.state.city,
			phone:this.state.phone,
			userType:this.state.userType,
			creditAmount:this.state.creditAmount,
			exposerAmount:this.state.exposerAmount,
			cricket_commission_own:this.state.cricket_commission_own,
			football_commission_own:this.state.football_commission_own,
			tennis_commission_own:this.state.tennis_commission_own, 
			cricket_partnership_own:this.state.cricket_partnership_own,
			football_partnership_own:this.state.football_partnership_own,
			tennis_partnership_own:this.state.tennis_partnership_own,
			cricket_commission_downline:this.state.cricket_commission_downline,
			football_commission_downline:this.state.football_commission_downline,
			tennis_commission_downline:this.state.tennis_commission_downline,
			cricket_partnership_downline:this.state.cricket_partnership_downline,
			football_partnership_downline:this.state.football_partnership_downline,
			tennis_partnership_downline:this.state.tennis_partnership_downline,
			cricket_min_bet:this.state.cricket_min_bet,
			cricket_max_bet:this.state.cricket_max_bet,
			cricket_delay:this.state.cricket_delay,
			football_min_bet:this.state.football_min_bet,
			football_max_bet:this.state.football_max_bet,
			football_delay:this.state.football_delay,
			tennis_min_bet:this.state.tennis_min_bet,
			tennis_max_bet:this.state.tennis_max_bet,
			tennis_delay:this.state.tennis_delay,
			master_password1:this.state.master_password1,
			
			browser_name:this.state.browser_name,
			version:this.state.version,
			os:this.state.os,
			ip_address:this.state.ip_address,



		  }; 
		  
        if(this.state.password!==this.state.confirm_password){ 
            this.setState({emptyField:true,errMsg:"password and re password should be same"});
           return false;
		} 
		
		if(schema.validate(this.state.password)===false){ 
            this.setState({emptyField:true,errMsg:"Minimum length 8,Maximum length 15,Must have uppercase letters,Must have lowercase letter,Must have digits,Should not have spaces in the password."});
           return false;
		} 
		if(this.state.master_password1==''){ 
            this.setState({emptyField:true,errMsg:"Matser Password Can Not Empty"});
           return false;
		} 
		

		

         let headers={
            Authorization:"Bearer "+ this.state.accessToken,
        }; 
          axios.post(baseUrl + '/api/register',registerData, {headers}).then((resp) => { 
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
            window.location = 'adminlist';
              }else{
               this.setState({respStatus:resp.success,respMessage:resp.message});
            //   setTimeout(() => {this.setState({ respStatus: "",gotologin:false });}, 10000);
              }
           
          }); 
    }
    handleChange = (event)=> {
		let {name,value} = event.target;
		if(this.state.cricket_commission_upline==0){
			this.state.cricket_commission_upline ="";
		}
		
		if(event.target.name=='userType'){
			
			if(event.target.value==6){
					
				
				this.setState({ display:true,
								cricket_commission_own:this.state.cricket_commission_upline,
								football_commission_own:this.state.football_commission_upline,
								tennis_commission_own:this.state.tennis_commission_upline,
								cricket_partnership_own:this.state.cricket_partnership_upline,
								football_partnership_own:this.state.football_partnership_upline,
								tennis_partnership_own:this.state.tennis_partnership_upline,
								cricket_commission_downline:0,
								football_commission_downline:0,
								tennis_commission_downline:0,
								cricket_partnership_downline:0,
								football_partnership_downline:0,
								tennis_partnership_downline:0
							});
				
			}else{
				this.setState({ display:false,
								cricket_commission_own:0,
								football_commission_own:0,
								tennis_commission_own:0,
								cricket_partnership_own:0,
								football_partnership_own:0,
								tennis_partnership_own:0,
								cricket_commission_downline:0,
								football_commission_downline:0,
								tennis_commission_downline:0,
								cricket_partnership_downline:0,
								football_partnership_downline:0,
								tennis_partnership_downline:0
							});
			}
			
		 }

		if(event.target.name=='master_password1'){
			
			
		   this.setState({master_password1: event.target.value});
		}

		if(name=='cricket_commission_downline'){
			
			if(value<0 || value>this.state.cricket_commission_upline){
				return false;
			}
		   var ownVal = this.state.cricket_commission_upline - value;
		   if(isNaN(parseInt(ownVal))){
			   return false ;
		   }
		   this.setState({cricket_commission_own: ownVal});
		}
		else if(name=='football_commission_downline'){
			if(value<0 || value>this.state.football_commission_upline){
				return false;
			}
		   var ownVal = this.state.football_commission_upline - value;
		    if(isNaN(parseInt(ownVal))){
			   return false ;
		   }
		   this.setState({football_commission_own: ownVal});
		}
		else if(name=='tennis_commission_downline'){
			if(value<0 || value>this.state.tennis_commission_upline){
				return false;
			}
		   var ownVal = this.state.tennis_commission_upline - value;
		    if(isNaN(parseInt(ownVal))){
			   return false ;
		   }
		   this.setState({tennis_commission_own: ownVal});
		}
		else if(name=='cricket_partnership_downline'){
			if(value<0 || value>this.state.cricket_partnership_upline){
				return false;
			}
		   var ownVal = this.state.cricket_partnership_upline - value;
		    if(isNaN(parseInt(ownVal))){
			   return false ;
		   }
		   this.setState({cricket_partnership_own: ownVal});
		}
		else if(name=='football_partnership_downline'){
			if(value<0 || value>this.state.football_partnership_upline){
				return false;
			}
		   var ownVal = this.state.football_partnership_upline - value;
		    if(isNaN(parseInt(ownVal))){
			   return false ;
		   }
		   this.setState({football_partnership_own: ownVal});
		}
		else if(name=='tennis_partnership_downline'){
			if(value<0 || value>this.state.tennis_partnership_upline){
				return false;
			}
		   var ownVal = this.state.tennis_partnership_upline - value;
		    if(isNaN(parseInt(ownVal))){
			   return false ;
		   }
		   this.setState({tennis_partnership_own: ownVal});
		}
		
		else if(name=='username'){
			let registerData={
				username:value,
			}
			let headers={
				Authorization:"Bearer "+ this.state.accessToken,
			}; 
			  axios.post(baseUrl + '/api/uniqueusername',registerData, {headers}).then((resp) => { 
				if(resp.data.success==true){

					this.setState({respStatusUername:true,errMsgUserName:"UserName Already Taken"});

					$(".man_btn").hide();
					return false;
				}else{
					this.setState({respStatusUername:false,errMsgUserName:""});

					//this.setState({respStatusUername:false,errMsgUserName:""});
					$(".man_btn").show();
				}

			  });
			console.log(name)
		   //this.setState({tennis_partnership_own: ownVal});
		}
		this.setState({[name]: value,emptyField:false,errMsg:""});
	   
     }
	 
	currentUser=()=>{
		 let headers={
            Authorization:"Bearer "+ this.state.accessToken,
        }; 
        axios.get(baseUrl + '/api/current',{headers}).then((resp) => { 
            var resp = resp.data;
		   
            this.setState({currentUserType:resp.userType });
			if(resp.userType==1){
				this.setState({
					cricket_commission_upline:100,
					football_commission_upline:100,
					tennis_commission_upline:100, 
					cricket_partnership_upline:100,
					football_partnership_upline:100,
					tennis_partnership_upline:100
				});
			}
			else {
				this.setState({
					cricket_commission_upline:resp.cricket_commission_downline,
					football_commission_upline:resp.football_commission_downline,
					tennis_commission_upline:resp.tennis_commission_downline,
					cricket_partnership_upline:resp.cricket_partnership_downline,
					football_partnership_upline:resp.football_partnership_downline,
					tennis_partnership_upline:resp.tennis_partnership_downline
				});
			}	
        }); 
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
	 
	 responseHtmlNew = () =>{ 
		if(this.state.respStatusUername === true) {
			return (
			<div className="alert alert-danger">
			{this.state.errMsgUserName}
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
   
   userTypeSelectBox=()=>{
	   if(this.state.currentUserType==1){
		   return(
		    <select className="form-control"  name="userType" onChange={this.handleChange}>
			   <option value="">Select</option>
			   <option value="2">ADMIN</option>
			   <option value="3">SMDL</option>
			   <option value="4">MDL</option>
			   <option value="5">DL</option>
			   <option value="6">User</option>
			</select>   
		    );
	   }
	   else if(this.state.currentUserType==2){
		   return(
		    <select className="form-control"  name="userType" onChange={this.handleChange}>
			<option value="">Select</option>
			<option value="3">SMDL</option>
			   <option value="4">MDL</option>
			   <option value="5">DL</option>
			   <option value="6">User</option>
			</select>   
		    );
	   }
	   else if(this.state.currentUserType==3){
		   return(
		    <select className="form-control"  name="userType" onChange={this.handleChange}>
			<option value="">Select</option>
			<option value="4">MDL</option>
			   <option value="5">DL</option>
			   <option value="6">User</option>
			</select>
		    );
	   }
	   else if(this.state.currentUserType==4){
		   return(
		    <select className="form-control" name="userType" onChange={this.handleChange}>
			<option value="">Select</option>
			<option value="5">DL</option>
			   <option value="6">User</option>			
			</select>   
		    );
	   }else if(this.state.currentUserType==5){
		return(
		 <select className="form-control" name="userType" onChange={this.handleChange}>
		 <option value="">Select</option>
			<option value="6">User</option>			
		 </select>   
		 );
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

	if(this.state.display==true){
		var new_data1 =true;
		var new_data= <div className="col-lg-6" >
		<div className="form-group">
			<label>Exposer Limit</label>
		   <div className="form-label-group">
			  <input type="text" onChange={this.handleChange}  value={this.state.exposerAmount} name="exposerAmount" id="exposerAmount" className="form-control" placeholder="exposer Limit" />
		   </div>
		</div>
	 </div>;
	}
    return (
	<div >
	<Header />
		<div id="wrapper">
		<div id="content-wrapper" className="container-fluid">
		<div id="wrapper">
		<div className="man_bglight">
		<div className="row">
			<div className="col-12">
				<h3 className="a_manh">Add Account</h3>
			</div> 
		</div> 
		<form onSubmit={this.handleSubmit}>
		
		<div className="row">
		<div className="col-6">
		<div className="breadcrumb">Personal Details</div>
		<div className="row">
         <div className="col-6">
            <div className="form-group">
			<label>Username *</label>
               <div className="form-label-group">
                  <input type="text" onChange={this.handleChange} value={this.state.username} name="username" id="user_name" className="form-control" placeholder="User Name" />
               </div>
			   {this.responseHtmlNew()}   
            </div>
         </div>
         
		 <div className="col-6">
            <div className="form-group">
				<label>User Password</label>
               <div className="form-label-group">
                  <input type="password" onChange={this.handleChange}  value={this.state.password} name="password" id="password" className="form-control" placeholder="Password" />
               </div>
            </div>
         </div>
		 <div className="col-6">
            <div className="form-group">
				<label>Retype Password</label>
               <div className="form-label-group">
                  <input type="password" onChange={this.handleChange}  value={this.state.confirm_password} name="confirm_password" id="confirm_password" className="form-control" placeholder="Confirm Password" />
               </div>
            </div>
         </div>
		 <div className="col-6">
            <div className="form-group">
				<label>FullName</label>
               <div className="form-label-group">
                  <input type="text" onChange={this.handleChange}  value={this.state.fullname} name="fullname" id="fullname" className="form-control" placeholder="Full Name" />
               </div>
            </div>
         </div>
		 <div className="col-6">
            <div className="form-group">
			<label>City </label>
               <div className="form-label-group">
                  <input type="text" onChange={this.handleChange}  value={this.state.city} name="city" id="city" className="form-control" placeholder="City" />
               </div>
            </div>
         </div>
		 <div className="col-6">
            <div className="form-group">
			<label>Phone </label>
               <div className="form-label-group">
                  <input type="text" onChange={this.handleChange}  value={this.state.phone} name="phone" id="phone" className="form-control" placeholder="Phone" />
               </div>
            </div>
         </div>
		 
		</div> 
		</div> 
	  
		<div className="col-6">
		<div className="breadcrumb">Account Details</div>
		<div className="row">
         <div className="col-6">
            <div className="form-group">
			<label>Account Type*</label>
               <div className="form-label-group">
                	{this.userTypeSelectBox()}
				</div>
            </div>
         </div>
         <div className="col-6">
            <div className="form-group">
			<label>Credit Reference</label>
               <div className="form-label-group">
                  <input type="text" onChange={this.handleChange}  value={this.state.creditAmount} name="creditAmount" id="creditAmount" className="form-control" placeholder="Credit Reference" />
               </div>
            </div>
         </div>
		 {new_data}
		
		</div> 	
		</div> 	
		</div> 	
		
		<div className="breadcrumb">Commission Setting</div>
		<div className="rows">
			<table className="table table-bordered table-striped" >
			 <tbody>
				<tr>
					<td>&nbsp;</td>
					<th>  
						Cricket
					</th>
					<th>  
						Football
					</th>
					<th>  
						Tennis
					</th>
				</tr>
				
				<tr>
					<th>Upline</th>
					<td>  
						{this.state.cricket_commission_upline}
					</td>
					<td>  
						{this.state.football_commission_upline}
					</td>
					<td>  
						{this.state.tennis_commission_upline}
					</td>
				</tr>
				
				<tr>
					<th>Downline</th>
					<td>  
						<input type="text" onChange={this.handleChange} max={this.state.cricket_commission_upline}  value={this.state.cricket_commission_downline} readOnly={new_data1} name="cricket_commission_downline" id="cricket_commission_downline" className="form-control" />
					</td>
					<td>  
						<input type="text" onChange={this.handleChange}  value={this.state.football_commission_downline} readOnly={new_data1} name="football_commission_downline" id="football_commission_downline" className="form-control" />
					</td>
					<td>  
						<input type="text" onChange={this.handleChange}  value={this.state.tennis_commission_downline} readOnly={new_data1}name="tennis_commission_downline" id="tennis_commission_downline" className="form-control" />
					</td>
				</tr>
				
				<tr>
					<th>Own</th>
					<td>  
						{this.state.cricket_commission_own}
					</td>
					<td>  
						{this.state.football_commission_own}
					</td>
					<td>  
						{this.state.tennis_commission_own}
					</td>
				</tr>
				 </tbody>
			</table>
		</div> 	
		
		<div className="breadcrumb">Partnership Setting</div>
		<div className="rows">
			<table className="table table-bordered table-striped" >
			 <tbody>
				<tr>
					<td>&nbsp;</td>
					<th>  
						Cricket
					</th>
					<th>  
						Football
					</th>
					<th>  
						Tennis
					</th>
				</tr>
				
				<tr>
					<th>Upline</th>
					<td>  
						{this.state.cricket_partnership_upline}
					</td>
					<td>  
						{this.state.football_partnership_upline}
					</td>
					<td>  
						{this.state.tennis_partnership_upline}
					</td>
				</tr>
				
				<tr>
					<th>Downline</th>
					<td>  
						<input type="text" onChange={this.handleChange}  value={this.state.cricket_partnership_downline} name="cricket_partnership_downline" readOnly={new_data1}id="cricket_partnership_downline" className="form-control"  />
					</td>
					<td>  
						<input type="text" onChange={this.handleChange}  value={this.state.football_partnership_downline} readOnly={new_data1}name="football_partnership_downline" id="football_partnership_downline" className="form-control" />
					</td>
					<td>  
						<input type="text" onChange={this.handleChange}  value={this.state.tennis_partnership_downline} name="tennis_partnership_downline" readOnly={new_data1}id="tennis_partnership_downline" className="form-control" />
					</td>
				</tr>
				
				<tr>
					<th>Own</th>
					<td>  
						{this.state.cricket_partnership_own}
					</td>
					<td>  
						{this.state.football_partnership_own}
					</td>
					<td>  
						{this.state.tennis_partnership_own}
					</td>
				</tr>
				 </tbody>
			</table>
		</div>
		
		
		<div className="breadcrumb">Min/Max Bet</div>
		<div className="rows">
			<table className="table table-bordered table-striped" >
			 <tbody>
				<tr>
					<td>&nbsp;</td>
					<th>  
						Cricket
					</th>
					<th>  
						Football
					</th>
					<th>  
						Tennis
					</th>
				</tr>
				
				<tr>
					<th>Min</th>
					<td>  
						<input type="number" onChange={this.handleChange}  value={this.state.cricket_min_bet} name="cricket_min_bet" id="cricket_min_bet" className="form-control"  />
					</td>
					<td>  
						<input type="number" onChange={this.handleChange}  value={this.state.football_min_bet} name="football_min_bet" id="football_min_bet" className="form-control" />
					</td>
					<td>  
						<input type="number" onChange={this.handleChange}  value={this.state.tennis_min_bet} name="tennis_min_bet" id="tennis_min_bet" className="form-control" />
					</td>
				</tr>
				
				<tr>
					<th>Max</th>
					<td>  
						<input type="number" onChange={this.handleChange}  value={this.state.cricket_max_bet} name="cricket_max_bet" id="cricket_max_bet" className="form-control"  />
					</td>
					<td>  
						<input type="number" onChange={this.handleChange}  value={this.state.football_max_bet} name="football_max_bet" id="football_max_bet" className="form-control" />
					</td>
					<td>  
						<input type="number" onChange={this.handleChange}  value={this.state.tennis_max_bet} name="tennis_max_bet" id="tennis_max_bet" className="form-control" />
					</td>	
				</tr>
				
				<tr>
					<th>Delay</th>
					<td>  
						<input type="number" onChange={this.handleChange}  value={this.state.cricket_delay} name="cricket_delay" id="cricket_delay" className="form-control"  />
					</td>
					<td>  
						<input type="number" onChange={this.handleChange}  value={this.state.football_delay} name="football_delay" id="football_delay" className="form-control" />
					</td>
					<td>  
						<input type="number" onChange={this.handleChange}  value={this.state.tennis_delay} name="tennis_delay" id="tennis_delay" className="form-control" />
					</td>


				</tr>
				 </tbody>
			</table>
		</div>
		<div className="row" >
		<div className="col-lg-12 pp0" > 
		<div className="form-group col-md-3 float-right" > 
      			 <label>Master Password* </label><input type="password" className="form-control" value={this.state.master_password1}   onChange={this.handleChange} name="master_password1"  />
        </div> 
        </div> 
   
          </div>
            <br/>  
               {this.responseHtml()}   
               {this.goToLogin()} 
               {this.emptyHtml()}
              <div className="tr" style={{marginBottom:"100px;"}}> 
			  <button type="submit" className="btn man_btn" onClick={this.handleFormSubmit}>Create Account</button></div>
        
        
      

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
