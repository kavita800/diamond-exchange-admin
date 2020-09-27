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
				fullname:"",
				
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
	   this.currentUser();
	   
   }
   handleSubmit =(event) => {
      event.preventDefault(); 
      if( this.state.fullname ===""  ){
         this.setState({emptyField:true,errMsg:"fullname is required"});
         return false;
	  }
	 /*  if( this.state.phone ===""  ){
		this.setState({emptyField:true,errMsg:"* Fields are required"});
		return false;
	 } */
      let registerData={
			fullname:this.state.fullname,
			phone:this.state.phone,
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
          }; 
       
		if(this.state.master_password1==''){ 
            this.setState({emptyField:true,errMsg:"Matser Password Can Not Empty"});
           return false;
		} 
		

		

         let headers={
            Authorization:"Bearer "+ this.state.accessToken,
        }; 
          axios.post(baseUrl + '/api/update_data/'+this.props.match.params.id,registerData, {headers}).then((resp) => { 
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
            //window.location = 'adminlist';
              }else{
               this.setState({respStatus:resp.success,respMessage:resp.message});
            //   setTimeout(() => {this.setState({ respStatus: "",gotologin:false });}, 10000);
              }
           
          }); 
    }
    handleChange = (event)=> {
		let {name,value} = event.target;
		

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
		this.setState({[name]: value,emptyField:false,errMsg:""});
	   
     }
	 
	currentUser=()=>{
		 let headers={
            Authorization:"Bearer "+ this.state.accessToken,
        }; 
        axios.get(baseUrl + '/api/current_user_data/'+this.props.match.params.id,{headers}).then((resp) => { 
            var resp = resp.data;
		   
			this.setState({fullname:resp.data.fullname,phone:resp.data.phone,
				cricket_min_bet :resp.data.cricket_min_bet,
				football_min_bet:resp.data.football_min_bet,

				tennis_min_bet:resp.data.tennis_min_bet,

				cricket_max_bet:resp.data.cricket_max_bet,

				football_max_bet:resp.data.football_max_bet,

				tennis_max_bet:resp.data.tennis_max_bet,

				cricket_delay:resp.data.cricket_delay,
				football_delay:resp.data.football_delay,
				tennis_delay:resp.data.tennis_delay
			
			})
				
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
			   <option value="2">Admin</option>
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
		<div className="row">
			<div className="col-lg-12">
				<h3 className="a_manh">Bet Min-Max Update</h3>
			</div> 
		</div> 
		<form onSubmit={this.handleSubmit}>
		
		<div className="row">
		<div className="col-6">
		<div className="breadcrumb">Personal Details</div>
		<div className="row">
        
         <div className="col-6">
            <div className="form-group">
				<label>FullName *</label>
               <div className="form-label-group">
                  <input type="text" onChange={this.handleChange}  value={this.state.fullname} name="fullname" id="fullname" className="form-control" placeholder="Full Name" />
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
			  <button type="submit" className="btn man_btn" onClick={this.handleFormSubmit}>Update</button></div>
        
        
      

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
