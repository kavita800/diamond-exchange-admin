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
    axios.get(baseUrl + '/adminbetlist-user', {headers}).then((resp) => { 
     var respNew = resp.data; 
     console.log(respNew.success);
     if(respNew.success === true){
        this.setState({tabledata:respNew.data,respStatus:respNew.success });
        this.changeFormat(respNew.data);
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
















  componentWillMount() {


        // setting header
         let headers={
            Authorization:"Bearer "+ this.state.accessToken,
        }; 

    //     axios.get(baseUrl + '/transactions', {headers}).then((resp) => {
    //         //this.handleModal("close");
	// 		var respNew = resp.data;
	// 		if(respNew.success === true){

    //         this.setState({tabledata:respNew.showdata,respStatus:respNew.success });
    //         this.changeFormat(respNew.showdata);
	// 		}else{
	// 		console.log(newarry);
	// 		this.setState({tabledata:respNew.showdata,respStatus:respNew.success });
    //         var newarry =[];
    //         this.changeFormat(newarry);
    //      }
    //   });
      
  }
  
  changeFormat = (arr) =>{
  
   
   let html = [];
   let html2 = [];
		 if(arr!=''&& arr!=undefined){
         var newdata=0;
         for (var a = 0; a < arr.length; a++) {
            
               const value = arr[a];
               

               var data=html2.includes(value.event_id);
              
               
               
               var obj = {
                  event_type:value[0].event_type,
                  event_name: value[0].event_name,
                  event_id: value[0].event_id,
                  team_name: value[0].team_name,
                  newdata :arr[a].length
                 
                 }
                 html.push(obj);
            
               
            
         }
         
            
            
           
           
    this.setState({html11:html})
              
       }else{
         this.setState({html11:[]})
       }
       
      
	  
  }
  handleChange = (event)=> {
   this.setState({q:event.target.value})

  };
  match_type = (event)=> {
   this.setState({match_type:event.target.value})

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
   console.log(row);
      return (
         <div>
           
             <a href={"matchdetail/"+row.event_id+"/"+row.event_type} > 
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
						<h4 className="">Market-Analysis</h4>
					 
					 <div className="">
                        <div id="account-statement_wrapper" className="dataTables_wrapper ">
                           
                           <div className="">
                           <div className="">
							  
                       <BootstrapTable                
                    data={this.state.html11} 
                    striped={true} 
                    hover={true}
                    pagination 
             ignoreSinglePage
             exportCSV
             
                    search  searchPlaceholder='input something...'
                  >
                   
                  

                   <TableHeaderColumn dataField="event_type" isKey={true}>
                    Event Type
                    </TableHeaderColumn>
                    
                    <TableHeaderColumn dataField="event_name"  dataFormat={colFormatterNew}>
                    Event Name
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="event_id" >
                    Event ID
                    </TableHeaderColumn>
                    
                    
                    
                    <TableHeaderColumn dataField="newdata"  >
                   Count
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
