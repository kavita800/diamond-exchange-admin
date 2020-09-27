import React, { Component } from 'react';
import Header from '../Header/Header';
import {Link,Redirect} from "react-router-dom";
import axios from "axios";
import Moment from 'moment';
import loadjs from 'loadjs';
import DatePicker from "react-datepicker";
import TextField from '@material-ui/core/TextField';
import "react-datepicker/dist/react-datepicker.css";
import DataTable from 'react-data-table-component';
import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
const baseUrl ="http://172.105.40.76:4000/api";
import Autocomplete from '@material-ui/lab/Autocomplete';

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
    q:"",
	cricketsum:0
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
 handleSubmit =(event) => {
   let headers={
      Authorization:"Bearer "+ this.state.accessToken,
   }; 
   let sendData={
      startDate:this.state.startDate,
      endDate:this.state.endDate,
	  userId:this.state.year
      
    }; 
   event.preventDefault(); 
   axios.post(baseUrl + '/admin_profit_loss',sendData, {headers}).then((resp) => {
      //this.handleModal("close");
   var respNew = resp.data;
   if(respNew.success === true){

      this.setState({tabledata:respNew.showdata,respStatus:respNew.success });
      this.changeFormat(respNew.showdata);
   }else{
      
      var newarry =[];
      this.setState({tabledata:respNew.showdata,respStatus:respNew.success });
      this.changeFormat(newarry);
   }
   });
 }

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
         userId:this.state.year
		 
         
       }; 
      
      axios.post(baseUrl + '/admin_profit_loss', sendData,{headers}).then((resp) => {
            //this.handleModal("close");
			var respNew = resp.data;
			if(respNew.success === true){

            this.setState({tabledata:respNew.showdata,respStatus:respNew.success });
            this.changeFormat(respNew.showdata);
			}else{
            console.log(newarry);
            var newarry =[];
            this.changeFormat(newarry);
         }
      });
      
	  
	  
	 
        axios.get(baseUrl + '/user-detils', {headers}).then((resp) => {
            
        
        
         var html =[];
         console.log(resp.data.data);
			if(resp.data.success === true){
			for(var index=0;index<resp.data.data.length;index++){
				for(var index=0;index<resp.data.data.length;index++){
				html.push(
						{ title: resp.data.data[index].username, year:resp.data.data[index]._id },
				)
					}
  
			}


            // this.setState({tabledata:respNew.showdata,respStatus:respNew.success });
            // this.changeFormat(respNew.showdata);
			}
		
      this.setState({users_data:html})     
     });
  }
  
 changeFormat = (arr) =>{
  
   var eventTypeArr=[];
   let html = [];
    let totalSum =0;
		 if(arr!=''){
          
         console.log(this.state.tabledata);
         
            var newdata=arr;
            let amount =0;
           
             newdata.map(function(value, i){
              
				if(value.userbet_id!=null && value.userbet_id!=undefined){
					
			
				amount = value.amount;
				var event_name="";
				if(value.userbet_id!=null && value.userbet_id!=undefined){
					 event_name=value.userbet_id.event_type
				}
				var event_type="";
				if(value.userbet_id!=null && value.userbet_id!=undefined){
					event_type=value.userbet_id.event_type
				}

				totalSum = totalSum+amount;
               var obj = {
                  event_type:event_type,
                  event_name: event_name,
                  amount:amount,
                 
                 
                }
                html.push(obj);
					}
                
             
               
              
    }); 
    this.setState({html11:html,cricketsum:totalSum})
              
       }else{
         this.setState({html11:[],cricketsum:totalSum})
       }
       console.log(eventTypeArr);
      
	  
  }
  
  newUserSet = (event)=> {
	
   this.setState({year:event.year,})

  };
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
   console.log(row)
	 return (
			  <div>

<a className="btn btn-default" href="javascript:void(0);"  > 
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
						<h3 className="a_manh">Profit Loss</h3>
						<div className="man_bglight">
							<form onSubmit={this.handleSubmit}>
								 <div className="row">
												   <div className=" d-inline-block  form-group newhsat col-md-2">
													<label> Search By Client Name</label>
												   <Autocomplete
							  id="combo-box-demo"
							  options={this.state.users_data}
							  getOptionLabel={(option) => option.title}
							  
							  onChange={(event, newValue) => {
								
								 this.newUserSet(newValue);
							  }}
							 
							  renderInput={(params) => <TextField {...params} label="User List" variant="outlined" />}
							/>
												</div> 
												
												<div className="datepicker-wrapper form-group col-md-2">
												 <label className="d_block">From</label>
												<DatePicker
								selected={this.state.startDate}
								onChange={this.handleChange111}
							  />
												   <i className="fas fa-calendar-alt"></i>
												</div> 
												
												<div className="datepicker-wrapper form-group col-md-2">
												 <label className="d_block">to</label>
												<DatePicker
								selected={this.state.endDate}
								onChange={this.handleChange1}
							  />
												   <i className="fas fa-calendar-alt"></i>
												</div>
											   
												   
												<div className="d-inline-block ">
												<label className="d_block h_14"></label>
												   <button className="btn btn22 btn-primary" value="submit" type="submit">Load</button>
												</div>
												</div>
							 </form>
							  <div className="">
								<div id="account-statement_wrapper" className="dataTables_wrapper ">
								  
								   <div className="">
									  <div className=" table_manpp table_widthmanage">
										 
									 <div style={{color:'#fff',backgroundColor:'green',width:'10%',padding:'10px',textAlign:'center'}}>Cricket:{this.state.cricketsum}</div>
								 
										 <BootstrapTable                
									  data={this.state.html11} 
									  striped={true} 
									  hover={true}
									  pagination 
									  ignoreSinglePage
									  search  searchPlaceholder='input something...'
									>
									 
									  <TableHeaderColumn dataField="event_type"   isKey={true}>
									  Game
									  </TableHeaderColumn>
									  <TableHeaderColumn dataField="event_name" dataFormat={colFormatterNew}>
									  Game Type	
									  </TableHeaderColumn>
									  <TableHeaderColumn dataField="amount"   >
									  Profit & Loss
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
