import React, { Component } from 'react';
import Header from '../Header/Header';
import {Redirect} from "react-router-dom";
import axios from "axios";   
import DatePicker from "react-datepicker";
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
                respStatus:false,
				match_name:'',
				match_id:'',
				open_date:'',
				sport_id:this.props.match.params.sport_id,
				
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
      if(  this.state.match_id ==="" || this.state.match_name ==="" || this.state.open_date ==="" 
      || this.state.sport_id ===""){
         this.setState({emptyField:true,errMsg:"All Fields are required"});
         return false;
      }
      let registerData={
            match_id:this.state.match_id, 
            match_name:this.state.match_name,
            open_date:this.state.open_date,
            sport_id:this.state.sport_id
          };    
          axios.post(baseUrl + '/api/addnewmatch', registerData).then((resp) => { 
           var resp = resp.data;
           if(resp.success === true){
              this.setState({respStatus:resp.success,
                           respMessage:resp.message,
							match_id:"",						   
							match_name:"",						   
							open_date:""						   
                          });
            //   setTimeout(() => {this.setState({ respStatus: "",gotologin:true });}, 2000);  
            
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


  handleDateChange = date => {
   this.setState({
     open_date: date

   });
 };
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
	
	  <div className="container-fluid">
      <div class="man_bglight">
		
		<div className="row">
			<div className="col-lg-12">
				<h4 className="">Add Match</h4>
			</div> 
		</div> 
      <form onSubmit={this.handleSubmit}>
	  <input type="hidden" id="sport_id" onChange={this.handleChange} value={this.state.sport_id} name="sport_id" className="form-control" placeholder="sport_id" />
      <div className="row">
        
         <div className="col-lg-4">
		  <label htmlFor="title">Match Name</label>
            <div className="form-group">
               <div className="form-label-group ">
                 
                  <input type="text" id="match_name" onChange={this.handleChange} value={this.state.match_name} name="match_name" className="form-control" placeholder="match name" />
				  
               </div>
               </div>
          
         <label htmlFor="minimum">Match Id</label>
            <div className="form-group">
               <div className="form-label-group">
                  <input type="text" id="match_id" onChange={this.handleChange}  value={this.state.match_id} name="match_id" className="form-control" placeholder="match id" />
               </div>
            </div>
        
         <label htmlFor="maximum">Date & Time</label>
            <div className="form-group">
               <div className="form-label-group">
                  <div className="datepicker-wrapper form-group w_100">
						
						<DatePicker selected={this.state.open_date} onChange={this.handleDateChange} />
						<i className="fas fa-calendar-alt"></i>
				</div> 
               </div>
            </div>
        
         
       
               {this.responseHtml()}   
               {this.goToLogin()} 
               {this.emptyHtml()}
              <div className="tr"> <button type="submit" className="btn btn-primary" onClick={this.handleFormSubmit}>SAVE</button></div>
         </div>
        
      </div>  

      </form>
	   </div>
	   </div>
	 
	</div>
    );
  }
}

export default Receive;
