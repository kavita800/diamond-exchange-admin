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
const baseUrl ="http://18.159.217.229:4000/api";

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
  submit = (id) => {
	
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

 handleSubmit=(id)=> {

   let headers={
      Authorization:"Bearer "+ this.state.accessToken,
   }; 

   axios.get(baseUrl + '/result_rollback/'+id, {headers}).then((resp) => {
      //this.handleModal("close");
         var respNew = resp.data;
         if(respNew.success === true){

            this.setState({respStatus:respNew.success });
            setTimeout(() => { window.location = '/match_history_details'}, 2000);  

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
      
      axios.get(baseUrl + '/matchlistdb', {headers}).then((resp) => {
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
					sport_type:value.sport_type,
					//series_name: value.series_name,
					match_name: value.match_name,
					match_id: value.match_id,
					action_match_id: value.match_id,
					market_id: value.market_id,
					open_date: value.open_date,
					winner_name: value.winner_name,
					//looser_name: value.looser_name
				}
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
   
      var status="Change Status";
     
	//const key=`${row.key}`
	 return (
			  <div>

				   <a href="javascript:void(0);" onClick={this.submit.bind(this,row.action_match_id)}  > 
				   Result RollBack
				   </a>
              
			   </div>
			 )
	}  


   const colFormatterLink = ( cell, row,value) => {
   
      var status="Change Status";
     
	//const key=`${row.key}`
	 return (
			  <div>

				   <a href="javascript:void(0);" href={"matchdetail/"+row.match_id+"/"+row.sport_type}  > 
					   {row.match_name}
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
						
						<div className="card">
                  <div className="card-body">
                     
                        <div id="account-statement_wrapper" className="dataTables_wrapper ">
                           <div className="row">
                           {this.responseHtml()}
                           </div>
                           <div className="row">
						   <div class="col-sm-12 col-md-6">
						   <h3 className="a_manh">Match History</h3>
</div>
                              <div className="col-sm-6">
							  <div className="dataTables_filter">
                             </div>
							  </div>
							  </div>
                               <div className="">
							  {/* <button className="dt-button buttons-pdf buttons-html5" onClick={() => this.exportPDF()}>PDF</button> <br></br> <br></br> */}
<div className="table_manpp">
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
                              <TableHeaderColumn dataField="sport_type"   >
                             Sport Name
                              </TableHeaderColumn>
                            
                              
                              <TableHeaderColumn dataField="match_name" width='400'dataFormat={colFormatterLink}>
                              Match Name
                              </TableHeaderColumn> 
							  <TableHeaderColumn dataField="match_id" >
							  Match Id
                              </TableHeaderColumn> 
							  <TableHeaderColumn dataField="market_id" >
                              Market Id
                              </TableHeaderColumn>
							  <TableHeaderColumn dataField="open_date" >
                              Open Date
                              </TableHeaderColumn>
							  <TableHeaderColumn dataField="winner_name" >
                              Winner
                              </TableHeaderColumn>
                             <TableHeaderColumn dataField="action_match_id"   dataFormat={colFormatterNew}>
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
