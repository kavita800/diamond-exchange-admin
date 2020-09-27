import React, { Component } from 'react';
import Header from '../Header/Header';
import {Link,Redirect} from "react-router-dom";
import axios from "axios";
import Moment from 'moment';
import loadjs from 'loadjs';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
import DataTable from 'react-data-table-component';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

const baseUrl ="http://172.105.40.76:4000/api";

const $ = require('jquery');
const columns = [{
  dataField: 'id',
  text: 'Product ID'
}];

class Receive extends Component {
	
  constructor(props) {
    super(props);
	var accessToken = localStorage.getItem("token");
    this.state = {accessToken:accessToken,tabledata:"",respStatus:false,
    startDate: new Date(),
    endDate: new Date(),
    responsedData:[],
    html11:"",
    q:""
   };
   
   this.changeFormat = this.changeFormat.bind(this);
   
  }	
  
  handleChange111 = date => {
   this.setState({
     startDate: date

   });
 };
 handleChange1 = date => {
   this.setState({
    endDate: date
     
   });
 };

 componentWillMount=()=> { 
	
	this.callAdminTable();
	this.currentUserData();
 }
 currentUserData = () =>{
	 let headers={
		 Authorization:"Bearer "+ this.state.accessToken,
	 };  
	 axios.get(baseUrl + '/current',{headers}).then((resp) => { 
		 var resp = resp.data;      
		 this.setState({
					 current_user_balance:resp.balance,
					 current_user_username:resp.username
				 });
		  
	 }); 
 }






callAdminTable=()=>{
  var userId = this.props.match.params.id;
  let headers={
        Authorization:"Bearer "+ this.state.accessToken,
    };  
    axios.get(baseUrl + '/adminbetlist/'+userId, {headers}).then((resp) => { 
     var respNew = resp.data; 
     if(respNew.success === true){
        this.setState({tabledata:respNew.showdata,respStatus:respNew.success });
        this.changeFormat(respNew.showdata);
     }
  });
  
}

currentUserData = () =>{
  let headers={
        Authorization:"Bearer "+ this.state.accessToken,
  };  
  axios.get(baseUrl + '/api/current',{headers}).then((resp) => { 
     var resp = resp.data;      
     this.setState({
              current_user_balance:resp.balance,
              current_user_username:resp.username
           });
      
  }); 
}


















  componentWillMount=() =>{


        // setting header
         let headers={
            Authorization:"Bearer "+ this.state.accessToken,
        }; 

        axios.get(baseUrl + '/user-logs/'+this.props.match.params.id, {headers}).then((resp) => {
            //this.handleModal("close");
			var respNew = resp.data;
			if(respNew.success === true){
				this.changeFormat(respNew.showdata);
			}else{
			this.setState({tabledata:respNew.showdata,respStatus:respNew.success });
            var newarry =[];
            this.changeFormat(newarry);
         }
      });
      
  }
  
  changeFormat = (arr) =>{
  
   console.log(arr);
   let html = [];
		 if(arr!=''){
         
         
         
            var newdata=arr;
            let amount =0;
             newdata.map(function(value, i){
             
      
      
     
      var obj = {
		browser_name:value.browser_name,
		version: value.version,
         os:value.os,
         ip_address: value.ip_address,
		 created:Moment(value.createdDate).format('lll'),
		 user_name:value.user_id.username
        }
	
		
		
		

              
               // console.log(obj);
                html.push(obj);
             
                
         
      
               
              
    }); 
    this.setState({html11:html})
              
       }else{
         this.setState({html11:[]})
       }
       
      
	  
  }
  handleChange = (event)=> {
   this.setState({q:event.target.value})

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
   const data  = "";
   
   
   const colFormatterNew = ( cell, row,value) => {
	const key=`${row.key}`
	 return (
			  <div>

				   <a href="#"  > 
				   {cell}
				   </a> 
			   </div>
			 )
	}     
    return (
		
	<div>
	
   <div>
   <Header />
				<div id="wrapper">
					<div id="content-wrapper">
					
						<div className="container-fluid">
						<div className="man_bglight">
						<h3 className="a_manh ">User Logs</h3>
						
                  <div className="">
                     {/* <form onSubmit={this.handleSubmit}>
                        <div className="datepicker-wrapper form-group">
                        <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange111}
      />
                           <i className="fas fa-calendar-alt"></i>
                        </div> 
                        <span className="pto">to</span> 
                        <div className="datepicker-wrapper form-group">
                        <DatePicker
        selected={this.state.endDate}
        onChange={this.handleChange1}
      />
                           <i className="fas fa-calendar-alt"></i>
                        </div>
                        <div className="select-report d-inline-block pto form-group">
                           <select id="bind_opt_select" className="form-control" name="q"  onChange={this.handleChange} >
                              <option value="1" selected="selected">All</option>
                              <option value="2">Deposite/Withdrow Report</option>
                              <option value="3">Game Report</option>
                           </select>
                        </div>
                        <div className="d-inline-block ">
                           <button className="btn btn-primary" value="submit" type="submit">Load</button>
                        </div>
                     </form>
                      */}
					 
					 <div className="">
                        <div id="account-statement_wrapper" className="dataTables_wrapper ">
                           <div className="row">
                             
                           </div>
                           <div className="row">
                           <div className="col-sm-12">
							  
                       <BootstrapTable                
                    data={this.state.html11} 
                    striped={true} 
                    hover={true}
                    pagination 
             ignoreSinglePage
             exportCSV
             
                    search  searchPlaceholder='input something...'
                  >
                   
                    <TableHeaderColumn dataField="browser_name"   isKey={true}>
					Browser Name
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="version" >
					Version
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="os"   >
                   OS
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="ip_address" >
                    IP Address
                    </TableHeaderColumn>
                    
                    <TableHeaderColumn dataField="created" >
					Created Date
                    </TableHeaderColumn>
                   
                    <TableHeaderColumn dataField="user_name">
					User Name
                    </TableHeaderColumn>
                   
             
                </BootstrapTable>
            
                    </div>
         </div>
                          </div>
                     </div>
                  </div>
               </div>
						</div>
					</div>
				</div>
			</div>
		
	

	
	</div>
	
    );
  }
}

export default Receive;
