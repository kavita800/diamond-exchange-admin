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

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
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
  submit = (id,status) => {
   confirmAlert({
     title: 'Confirm',
     message: 'Are you sure to do this.',
     buttons: [
       {
         label: 'Yes',
         onClick: () => this.handleSubmit(id,status)
       },
       {
         label: 'No',
         
       }
     ]
   });
 };

  handleChange111 = date => {
   this.setState({
     startDate: date

   });
 };

 handleSubmit=(id,status)=> {
  var new_status="";
   if(status==undefined){
      new_status ="Inactive"
   }
   else if(status=="Inactive"){
      new_status ="active"
   }
   else if(status=="active"){
      new_status ="Inactive"
   }
   else{
      new_status ="Inactive"
   }
   let headers={
      Authorization:"Bearer "+ this.state.accessToken,
   }; 
   let sendData={
      _id:id,
      status:new_status,
     }; 
   axios.post(baseUrl + '/vipcasinosportstatus',sendData, {headers}).then((resp) => {
      //this.handleModal("close");
         var respNew = resp.data;
         if(respNew.success === true){

            this.setState({respStatus:respNew.success });
            setTimeout(() => { window.location = '/vip-casino'}, 2000);  

         }else{
            this.setState({respStatus:respNew.success });
         }
   });
 };

 responseHtml = () =>{ 
   
      if(this.state.respStatus === true) {
        return (
         <div className="alert alert-success">
         Status Change Sucessfully
         </div>
        )
     }
  } 

 handleChange1 = date => {
   this.setState({
    endDate: date
     
   });
 };







  componentWillMount() {


        
        let headers={
         Authorization:"Bearer "+ this.state.accessToken,
      }; 
      let sendData={
         startDate:this.state.startDate,
         endDate:this.state.endDate,
         q:this.state.q
         
       }; 
      axios.get(baseUrl + '/vipcasiosportsdetails', {headers}).then((resp) => {
         //this.handleModal("close");
      var respNew = resp.data;
      if(respNew.success === true){
   
         this.setState({tabledata:respNew.showdata, });
         this.changeFormat(respNew.showdata);
      }else{
         
         var newarry =[];
         this.setState({tabledata:respNew.showdata,});
         this.changeFormat(newarry);
      }
      });
      
  }
  
  changeFormat = (arr) =>{
  
   
   let html = [];
		 if(arr!=''){
         
         
         
            var newdata=arr;
            let amount =0;
             newdata.map(function(value, i){
             
             
               
              
              
			  
      
      
     
         var obj = {
            s_no: i+1,
            sport_name:value.sport_name,
            min_bet: value.min_bet,
            max_bet: value.max_bet,
            status: value.status==undefined || value.status=="Inactive" ? "Inactive" :  value.status,
            status_new: value.status,
            _id: value._id,
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
      console.log(row);
      var status="Change Status";
     
	//const key=`${row.key}`
	 return (
			  <div>

				   <a href="#" onClick={this.submit.bind(this,row._id,row.status)}  > 
				   {status}
				   </a>  &nbsp;&nbsp;&nbsp;
				   
              
			   </div>
			 )
   }     
   



   const colFormatterList = ( cell, row,value) => {
      console.log(row);
      var status="Change Status";
	  var new_value="";
	  
	  var data1='';
	  var data2="";
	  var sport_name=row.sport_name.toLowerCase();
	 
	 
     
     
	 
		new_value=1;
		var data2= sport_name
		
	
	//const key=`${row.key}`
	 return (
			  <div>
{data2}
				    &nbsp;&nbsp;&nbsp;
				 {data1}
              
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
						
						<div className="card">
                  <div className="card-body">
                     
                        <div id="account-statement_wrapper" className="dataTables_wrapper ">
                           <div className="row">
                           {this.responseHtml()}
                           </div>
                           <div className="row">
						   <div class="col-sm-12 col-md-6"><h3 className="a_manh">Block Market</h3></div>
                              <div className="col-sm-6">
							  <div className="dataTables_filter">
							  
							   </div>
							  </div>
							  </div>
                               <div className="tbtu">
							   {((this.state.customSuperAdmin===false) || (this.state.addnewmatch===true && this.state.customSuperAdmin===true)) ? <Link to={"/addnewmatch/4"}>Add Match</Link> : ""}

<div className=" table_manpp">
                                 <BootstrapTable                
                              data={this.state.html11} 
                              striped={true} 
                              hover={true}
                              pagination 
							  ignoreSinglePage
							  exportCSV
							  
                              search  searchPlaceholder='input something...'
                            >
                             
                            
                              <TableHeaderColumn dataField="s_no" isKey={true} >
                              Sr No.
                              </TableHeaderColumn>
                              <TableHeaderColumn dataField="sport_name"  dataFormat={colFormatterList} >
                             Sport Name
                              </TableHeaderColumn>
                             <TableHeaderColumn dataField="status" >
                              Status
                              </TableHeaderColumn>
                              <TableHeaderColumn dataField="status_new"  dataFormat={colFormatterNew}>
                              Action
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
	
    );
  }
}

export default Receive;
