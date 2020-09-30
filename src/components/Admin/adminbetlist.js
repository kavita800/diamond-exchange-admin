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



//  exportPDF = () => {
//     const unit = "pt";
//     const size = "A3"; // Use A1, A2, A3 or A4
//     const orientation = "portrait"; // portrait or landscape

//     const marginLeft = 40;
//     const doc = new jsPDF(orientation, unit, size);

    
//     const title = "Account Statement";
//     const headers = [["Date", "Sr No.","Credit","Debit","Closing","Description","FromTo"]];
// 	let credit="";
// 	let debit="";
	
// 	var newdata=this.state.tabledata;
// 		var html= [];
// 		let amount=0;
// 	 newdata.map(function(value, i){
//       if(value.amount!=null){
//          if(value.amount !=''){
// 		let credit="";
// 		let debit="";
		
// 		 amount = value.amount ? amount+value.amount : ``;
	   
// 		if (value.amount > 0) {
// 			credit=value.amount
// 		}else{
// 			debit=value.amount
// 		}
// 		var date=Moment(value.createdDate).format('lll');
// 		var new1=i+1;
// 		var remark =value.remark;
// 		var team_name ="";
// 		if(value.userbet_id!=undefined){
// 			team_name=value.userbet_id.team_name;
// 		}
// 		var username="";
//       var username1="";
//       if(value.user_id!=null){
			
//          username=value.user_id.fullname;
//          //team_name="value.userbet_id.team_name"
//       }
//       if(value.amount_given_by!=null){
			
//          username1=value.amount_given_by.fullname;
//          //team_name="value.userbet_id.team_name"
//       }   
		
			
		   
// 		html.push([date,new1,credit,debit, amount,team_name,username+"/"+username1]);
//    }}
	
		 
	  
		
	   
// }); 
//  let content = {
//       startY: 50,
//       head: headers,
//       body: html
//     };

//     doc.text(title, marginLeft, 40);
//     doc.autoTable(content);
//     doc.save("report.pdf")
//   }



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










 handleSubmit =(event) => {
   let headers={
      Authorization:"Bearer "+ this.state.accessToken,
   }; 
   let sendData={
      startDate:this.state.startDate,
      endDate:this.state.endDate,
      q:this.state.q
      
    }; 
   event.preventDefault(); 
   axios.post(baseUrl + '/transactions',sendData, {headers}).then((resp) => {
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
  
   console.log(arr);
   let html = [];
		 if(arr!=''){
         
         
         
            var newdata=arr;
            let amount =0;
             newdata.map(function(value, i){
             
      
      
     
      var obj = {
         event_id:value.event_id,
         event_name: value.event_name,
         odd:value.odds,
         stake: value.stake,
         profit: value.profit,
         
         bet_type:value.bet_type,
         
         team_name:value.team_name,
         market_id: value.market_id,
         type: value.type,
         
         status:status,
         created:Moment(value.createdDate).format('lll'),
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
						<h4 className="a_manh">Current Bets</h4>
					
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
                   
                    <TableHeaderColumn dataField="event_id"   isKey={true}>
                    Event Id
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="event_name" >
                    Event Name
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="odd"   >
                    Odd
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="stake" >
                    Stake
                    </TableHeaderColumn>
                    
                    <TableHeaderColumn dataField="bet_type" >
                    Bet Type
                    </TableHeaderColumn>
                   
                    <TableHeaderColumn dataField="team_name">
                    Team Name
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="market_id" >
                    Market Id
                    </TableHeaderColumn>
             
             <TableHeaderColumn dataField="type" >
             Type
                    </TableHeaderColumn>
             <TableHeaderColumn dataField="status" >
             Status
                    </TableHeaderColumn>
             <TableHeaderColumn dataField="created" >
             Created
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
