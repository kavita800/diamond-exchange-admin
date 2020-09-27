import React, { Component } from 'react';
import Header from '../Header/Header';
import {Redirect} from "react-router-dom";
import axios from "axios"; 
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';



const baseUrl = "http://172.105.40.76:4000"; 
class ChangePass extends Component {
	
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
                errMsg:"",
                accessToken:accessToken,
                tabledata:"",
                user_id:user_id ,
				new_password:"",
				confirm_password:"",
				master_password:"",
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
		if(this.state.new_password===""){
			this.setState({emptyField:true,errMsg:"Passowrd Is required"});
			return false;
		}
		if(this.state.confirm_password===""){
			this.setState({emptyField:true,errMsg:"Confirm Passowrd Is required"});
			return false;
		} 
		if(this.state.confirm_password!==this.state.new_password){
			this.setState({emptyField:true,errMsg:"Password and Confirm Passowrd Should be Same"});
			return false;
		} 
      let registerData={
            new_password:this.state.new_password,
            confirm_password:this.state.confirm_password,
			
          }; 
       
         let headers={
            Authorization:"Bearer "+ this.state.accessToken,
        }; 
          axios.post(baseUrl + '/api/change_password_admin',registerData, {headers}).then((resp) => { 
           var resp = resp.data;
           if(resp.success === true){
              this.setState({respStatus:resp.success,
							respMessage:resp.message,
							new_password:"",
							confirm_password:"",
							master_password:"",
                          });
                          localStorage.clear();
                          window.location.href = "/login";
                          return false;
				
              }else{
               this.setState({respStatus:resp.success,respMessage:resp.message});
            
              }
           
          }); 
    }
    handleChange = (event)=> {
		let {name,value} = event.target;
		
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
	
    return (
	<div >
	<Header />
		<div id="content-wrapper" className="container-fluid">
      <div className="man_bglight">
	  <h3 className="a_manh">Change Password</h3>
	   <div className="man_box">
	  <form onSubmit={this.handleSubmit}>
	   <div className="row">
	   <div className="col-md-5">
	     <div className="form-group">
	       <label>New Password</label>
		   <input type="password" onChange={this.handleChange}  value={this.state.new_password} name="new_password" id="new_password" className="form-control" placeholder="New Password" />
	     </div>
		  <div className="form-group">
	       <label>Confirm Password</label>
		    <input type="password" onChange={this.handleChange}  value={this.state.confirm_password} name="confirm_password" id="confirm_password" className="form-control" placeholder="Confirm Password" />
	     </div>
		 
		  <div className="form-group">
		  {this.responseHtml()}
		  {this.emptyHtml()}
	      <button className="btn btn-primary" value="submit" type="submit">Submit</button>
	     </div>
	     </div>
       </div>
	  </form>
     </div>
     </div>
	</div>
	</div>
    );
  }
}

export default ChangePass;
