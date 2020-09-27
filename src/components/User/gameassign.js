import React, { Component } from 'react';
import Header from '../Header/Header';
import {Redirect} from "react-router-dom";
import axios from "axios";  
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
                cricket:"N",
                football:"N",
                tennis:"N", 
                horse_riding:"N", 
                errMsg:"",
                accessToken:accessToken,
                tabledata:"",
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

   componentWillMount() {   
      let headers={
         Authorization:"Bearer "+ this.state.accessToken,
     };  
     axios.get(baseUrl + '/api/getgameassignuser/'+this.props.match.params.id, {headers}).then((resp) => { 
    var respNew = resp.data; 
       if(respNew.success === true){ 
          if(resp.data.userlist[0].cricket==='Y'){
             var iscricket =<span style={{backgroundColor:"green",color:"white",width:"60px",padding:"5px",margin: "5px" }}>Cricket</span>;
          }
          if(resp.data.userlist[0].football==='Y'){
            var isfootball =<span style={{backgroundColor:"green",color:"white",width:"60px",padding:"5px",margin: "5px" }}>Football</span>;
         }
         if(resp.data.userlist[0].tennis==='Y'){
            var istennis =<span style={{backgroundColor:"green",color:"white",width:"60px",padding:"5px", margin: "5px" }}>Tennis</span>;
         } 
         if(resp.data.userlist[0].horse_riding==='Y'){
            var ishorse_riding =<span style={{backgroundColor:"green",color:"white",width:"60px",padding:"5px", margin: "5px" }}>Horse Riding</span>;
         } 
         this.setState({crickets:iscricket,footballs:isfootball,tenniss:istennis,horse_ridings:ishorse_riding });
       }  
   });
}

   
   handleSubmit =(event) => {
      event.preventDefault();  
      let registerData={
         cricket:this.state.cricket,
         football:this.state.football,
         tennis:this.state.tennis ,
         horse_riding:this.state.horse_riding ,
         id:this.props.match.params.id
          }; 
          axios.post(baseUrl + '/api/gameassign', registerData).then((resp) => {  
            window.location = '/userlist'; 
          }); 
    }

    handleChange = (e) => {
      let { name, value } = e.target; 
      this.setState({
          [name]: value,
          responsedData: ""
      }) 
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
				<h1 className="page-header">Game Assign</h1>
			</div> 
		</div> 
      <form onSubmit={this.handleSubmit}>
      <div className="row"> 
         <div className="col-lg-3"></div>
         <div className="col-lg-6">
         <h3>Game Assigned</h3>
         {this.state.crickets} {this.state.footballs} {this.state.tenniss} {this.state.horse_ridings}<br/><br/>
            <div className="form-group">
               <div className="form-label-group"> 
                  <input type="checkbox" id="cricket" onChange={this.handleChange} value="Y" name="cricket" /> &nbsp;&nbsp;
                  <label htmlFor="cricket">Cricket</label><br/> 
                  
                  <input type="checkbox" id="football" onChange={this.handleChange} value="Y" name="football" /> &nbsp;&nbsp;
                  <label htmlFor="football">Football</label><br/> 
                  
                  <input type="checkbox" id="tennis" onChange={this.handleChange} value="Y" name="tennis" /> &nbsp;&nbsp;
                  <label htmlFor="tennis">Tennis</label><br/>
                  
                  <input type="checkbox" id="horse_riding" onChange={this.handleChange} value="Y" name="horse_riding" /> &nbsp;&nbsp;
                  <label htmlFor="horse_riding">Horse Riding</label><br/>
               </div>
            </div>
         </div>

         <div className="col-lg-5"></div> 
      </div>  
      <div className="row">
         <div className="col-lg-3"></div>
         <div className="col-lg-6">    
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
