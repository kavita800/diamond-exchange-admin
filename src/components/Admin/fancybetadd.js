import React, { Component } from 'react';
import Header from '../Header/Header';
import {Redirect} from "react-router-dom";
import axios from "axios";   
const baseUrl = "http://172.105.40.76:4000"; 
class Receive extends Component {
	
   constructor(props) {
      super(props);
      var accessToken = localStorage.getItem("token");
      var user_id = localStorage.getItem("user_id");
      this.state = {respStatus: '',
                respMessage:"",
                gotologin:false,
                emptyField:false,
                title:"",
                yes_first:"",
                yes_second:"",
                no_first:"",
                errMsg:"",
                accessToken:accessToken,
                tabledata:"",
                user_id:user_id,
                respStatus:false
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
      if(  this.state.title ==="" || this.state.yes_first ==="" || this.state.yes_second ==="" 
      || this.state.no_first ==="" || this.state.no_second ==="" || this.state.minimum ==="" || this.state.maximum ==="" ){
         this.setState({emptyField:true,errMsg:"All Fields are required"});
         return false;
      }
      let registerData={
            title:this.state.title, 
            user_id:this.state.user_id,
            yes_first:this.state.yes_first,
            yes_second:this.state.yes_second,
            no_first:this.state.no_first,
            no_second:this.state.no_second,
            minimum:this.state.minimum,
            maximum:this.state.maximum 
          };    
          axios.post(baseUrl + '/api/addfancybet', registerData).then((resp) => { 
           var resp = resp.data;
           if(resp.success === true){
              this.setState({respStatus:resp.success,
                           respMessage:resp.message 
                          });
            //   setTimeout(() => {this.setState({ respStatus: "",gotologin:true });}, 2000);  
            window.location = 'fancybetlist';
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
         if(this.state.respStatus === true) {
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
    return (
	<div>
	<Header />
      <div id="page-wrapper">
		<div className="row">
			<div className="col-lg-12">
				<h1 className="page-header">Add Fancy Bet</h1>
			</div> 
		</div> 
      <form onSubmit={this.handleSubmit}>
      <div className="row">
         <div className="col-lg-3"></div>
         <div className="col-lg-6">
            <div className="form-group">
               <div className="form-label-group">
                  <label htmlFor="title">Title</label>
                  <input type="text" id="title" onChange={this.handleChange} value={this.state.title} name="title" className="form-control" placeholder="Title" />
               </div>
            </div>
         </div>
         <div className="col-lg-5"></div> 
      </div> 
      <div className="row">
         <div className="col-lg-3"></div> 
         <div className="col-lg-3"> 
         <label htmlFor="yes_first">Yes First</label>
            <div className="form-group">
               <div className="form-label-group"> 
                  <input type="text" id="yes_first" onChange={this.handleChange}  value={this.state.yes_first} name="yes_first" className="form-control" placeholder="Yes First" />
               </div>
            </div>
         </div>
         <div className="col-lg-3">
         <label htmlFor="yes_second">Yes Second</label>
            <div className="form-group">
               <div className="form-label-group"> 
                  <input type="text" id="yes_second" onChange={this.handleChange}  value={this.state.yes_second} name="yes_second" className="form-control" placeholder="Yes Second" />
               </div>
            </div>
         </div>
         <div className="col-lg-5"></div> 
      </div> 
      <div className="row">
         <div className="col-lg-3"></div> 
         <div className="col-lg-3"> 
         <label htmlFor="no_first">No First</label>
            <div className="form-group">
               <div className="form-label-group"> 
                  <input type="text" id="no_first" onChange={this.handleChange}  value={this.state.no_first} name="no_first" className="form-control" placeholder="No First" />
               </div>
            </div>
         </div>
         <div className="col-lg-3">
         <label htmlFor="no_second">No Second</label>
            <div className="form-group">
               <div className="form-label-group"> 
                  <input type="text" id="no_second" onChange={this.handleChange}  value={this.state.no_second} name="no_second" className="form-control" placeholder="No Second" />
               </div>
            </div>
         </div>
         <div className="col-lg-5"></div> 
      </div> 
      <div className="row">
         <div className="col-lg-3"></div>
         <div className="col-lg-6">
         <label htmlFor="minimum">Minimum</label>
            <div className="form-group">
               <div className="form-label-group">
                  <input type="text" id="minimum" onChange={this.handleChange}  value={this.state.minimum} name="minimum" className="form-control" placeholder="Minimum" />
               </div>
            </div>
         </div>
         <div className="col-lg-5"></div> 
      </div>
      <div className="row">
         <div className="col-lg-3"></div>
         <div className="col-lg-6">
         <label htmlFor="maximum">Maximum</label>
            <div className="form-group">
               <div className="form-label-group">
                  <input type="text" id="maximum" onChange={this.handleChange}  value={this.state.maximum} name="maximum" className="form-control" placeholder="Maximum" />
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
              <div className="tc"> <button type="submit" className="btn btn-info" onClick={this.handleFormSubmit}>SAVE</button></div>
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
