import React, { Component } from 'react';
import Header from '../Header/Header';
import {Redirect} from "react-router-dom";
import axios from "axios"; 
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';


 
const baseUrl = "http://172.105.40.76:4000"; 
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
                country:"",
                errMsg:"",
                accessToken:accessToken, 
                //respStatus:false
                selected: null
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
      if(  this.state.username ==="" || this.state.email ==="" || this.state.country ==="" ){
         this.setState({emptyField:true,errMsg:"All Fields are required"});
         return false;
      }
      let registerData={
              username:this.state.username,
              email:this.state.email, 
              country:this.state.country,
              id:this.props.match.params.id,
          };  
          axios.post(baseUrl + '/api/profile', registerData).then((resp) => { 
           var resp = resp.data;
           if(resp.success === true){
              this.setState({respStatus:resp.success,
                           respMessage:resp.message,
                           username:"",
                           email:"",
                           country:"",
                          }); 
            window.location = '/profile/'+this.props.match.params.id;
              }else{
               this.setState({respStatus:resp.success,respMessage:resp.message}); 
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
   if(this.state.country!=""){ 
      this.setState({showSelectedLabel: true});
   }  }
   emptyHtml = () =>{ 
      if(this.state.emptyField === true) {
         return (
          <div className="alert alert-danger">
          {this.state.errMsg}
          </div>
         )
      }
   }

componentWillMount() {   
      let headers={
         Authorization:"Bearer "+ this.state.accessToken,
     };  
     axios.get(baseUrl + '/api/current', {headers}).then((resp) => { 
    var respNew = resp.data;       
         this.setState({ username:respNew.username,email:respNew.email,country:respNew.country}); 
   }); 
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
				<h1 className="page-header">Update Profile</h1>
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
                  <select name="country" onChange={this.handleChange} value={this.state.country} className="form-control">
                     <option value="AF">Afghanistan</option>
                     <option value="AB">Albania</option>
                     <option value="DZ">Algeria</option>
                     <option value="AS">American Samoa</option>
                     <option value="AD">Andorra</option>
                     <option value="AO">Angola</option>
                     <option value="AL">Anguilla</option>
                     <option value="AG">Antigua and Barbuda</option>
                     <option value="AR">Argentina</option>
                     <option value="AM">Armenia</option>
                     <option value="AW">Aruba</option>
                     <option value="AU">Australia</option>
                     <option value="AT">Austria</option>
                     <option value="AZ">Azerbaijan</option>
                     <option value="BS">Bahamas</option>
                     <option value="BD">Bangladesh</option>
                     <option value="BB">Barbados</option>
                     <option value="BY">Belarus</option>
                     <option value="BE">Belgium</option>
                     <option value="BZ">Belize</option>
                     <option value="BJ">Benin</option>
                     <option value="BM">Bermuda</option>
                     <option value="BT">Bhutan</option>
                     <option value="BO">Bolivia, Plurinational State of</option>
                     <option value="BA">Bosnia and Herzegovina</option>
                     <option value="BW">Botswana</option>
                     <option value="BR">Brazil</option>
                     <option value="IO">British Indian Ocean Territory</option>
                     <option value="BG">Bulgaria</option>
                     <option value="BF">Burkina Faso</option>
                     <option value="BI">Burundi</option>
                     <option value="KH">Cambodia</option>
                     <option value="CM">Cameroon</option>
                     <option value="CA">Canada</option>
                     <option value="CV">Cape Verde</option>
                     <option value="KY">Cayman Islands</option>
                     <option value="CF">Central African Republic</option>
                     <option value="TD">Chad</option>
                     <option value="CL">Chile</option>
                     <option value="CN">China</option>
                     <option value="CO">Colombia</option> 
                     <option value="CD">Congo</option> 
                     <option value="FR">France</option>
                     <option value="DE">Germany</option>
                     <option value="HK">Hong Kong</option>
                     <option value="IS">Iceland</option>
                     <option value="IN">India</option>
                     <option value="ID">Indonesia</option>
                     <option value="IT">Italy</option>
                     <option value="JM">Jamaica</option>
                     <option value="JP">Japan</option>
                     <option value="MO">Macao</option>  
                     <option value="MY">Malaysia</option>
                     <option value="MX">Mexico</option>
                     <option value="NP">Nepal</option>
                     <option value="NZ">New Zealand</option>
                     <option value="RU">Russian</option>
                     <option value="ZA">South Africa</option>
                     <option value="ES">Spain</option>
                     <option value="LK">Sri Lanka</option>
                     <option value="TH">Thailand</option>
                     <option value="AE">United Arab Emirates</option>
                     <option value="UK">United Kingdom</option>
                     <option value="US">United States</option>
                     <option value="ZM">Zambia</option>
                     <option value="ZW">Zimbabwe</option>
                  </select>
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
