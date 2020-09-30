import React, { Component } from 'react';
import Header from '../Header/Header';
import {Redirect} from "react-router-dom";
import axios from "axios"; 
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';


 
const baseUrl = "http://18.159.217.229:4000"; 
class Receive extends Component {
	
   constructor(props) {
      super(props);
      var accessToken = localStorage.getItem("token");
      this.state = {respStatus: '',
                respMessage:"",
                gotologin:false,
                emptyField:false,
                username:"",
                email:"",
                password:"",
                country:"",
                errMsg:"",
                accessToken:accessToken,
                tabledata:""  
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
      if(  this.state.username ==="" || this.state.email ==="" || this.state.password ==="" || this.state.country ==="" ){
         this.setState({emptyField:true,errMsg:"All Fields are required"});
         return false;
      }
      let registerData={
              username:this.state.username,
              email:this.state.email,
              password:this.state.password,
              country:this.state.country,

          }; 
        if(this.state.password!==this.state.repassword){
           
            this.setState({emptyField:true,errMsg:"password and re password should be same"});
           return false;
        } 
        let headers={
            Authorization:"Bearer "+ this.state.accessToken,
        }; 
          axios.post(baseUrl + '/api/userregister', registerData, {headers}).then((resp) => { 
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

            window.location = 'userlist';
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
    return (
	<div>
	<Header />
      <div id="page-wrapper">
		<div className="row">
			<div className="col-lg-12">
				<h1 className="page-header">Add User</h1>
			</div> 
		</div> 
      <form onSubmit={this.handleSubmit}>
      <div className="row">
         <div className="col-lg-3"></div>
         <div className="col-lg-6">
            <div className="form-group">
               <div className="form-label-group">
                  <input type="text" onChange={this.handleChange} value={this.state.username} name="username" id="user_name" className="form-control" placeholder="USER NAME" />
               </div>
            </div>
         </div>
         <div className="col-lg-5"></div> 
      </div> 
      <div className="row">
         <div className="col-lg-3"></div>
         <div className="col-lg-6">
            <div className="form-group">
               <div className="form-label-group">
                  <input type="text" onChange={this.handleChange}  value={this.state.email} name="email" id="mail-id" className="form-control" placeholder="E-MAIL ID" />
               </div>
            </div>
         </div>
         <div className="col-lg-5"></div> 
      </div>
      <div className="row">
         <div className="col-lg-3"></div>
         <div className="col-lg-6">
            <div className="form-group">
					<div className="form-label-group">
						  <ReactFlagsSelect searchable={true} className="form-control" onSelect={this.onSelectFlag} />
               </div>
            </div>
         </div>
         <div className="col-lg-5"></div> 
      </div>
      <div className="row">
         <div className="col-lg-3"></div>
         <div className="col-lg-6">
         <div className="form-group">
					<div className="form-label-group">
						  <input type="password" onChange={this.handleChange}  value={this.state.password} name="password" id="password" className="form-control" placeholder="PASSWORD"  />
					</div>
				  </div>
         </div>
         <div className="col-lg-5"></div> 
      </div> 
      <div className="row">
         <div className="col-lg-3"></div>
         <div className="col-lg-6"> 
         <div className="form-group"> 
               <div className="form-label-group">
               <input type="password" onChange={this.handleChange}  value={this.state.repassword} name="repassword" id="re-password" className="form-control" placeholder="RE-PASSWORD"  />
               </div>
           </div>
         </div>
         <div className="col-lg-5"></div> 
      </div>
      <div className="row">
         <div className="col-lg-3"></div>
         <div className="col-lg-6">   
               {this.responseHtml()}   
               {this.goToLogin()}   
               {this.emptyHtml()}
              <div className="tc"> <button type="submit" className="btn btn-info" onClick={this.handleFormSubmit}>Save</button></div>
         </div>
         <div className="col-lg-5"></div> 
      </div> 

      </form>
	   </div>
	</div>
    );
  }
}

export default Receive;
