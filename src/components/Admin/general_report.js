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
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Modal from "react-bootstrap-modal";

// import jsPDF from 'jspdf'
// import 'jspdf-autotable'
const baseUrl ="http://18.159.217.229:4000/api";
//const doc = new jsPDF()
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
    user_id:"",
    users_data:[],
    game_type:"",
    amounttotal :0
   };
   
   this.changeFormat = this.changeFormat.bind(this);
   
  }	
  
  handleChange111 = date => {
   this.setState({
     startDate: date,
     

   });
 };
 handleChangeUser =(event) =>{
    console.log(event.target);
   this.setState({
     year: event.value

   });
 };
 
 handleChange1 = date => {
   this.setState({
    endDate: date
     
   });
 };
 
 
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
 handleSubmit =(event) => {
   let headers={
      Authorization:"Bearer "+ this.state.accessToken,
   }; 
   let sendData={
     general_report:this.state.general_report,
   }; 
   event.preventDefault(); 
   axios.get(baseUrl + '/adminlist', {headers}).then((resp) => {
      //this.handleModal("close");
   var respNew = resp.data;
   if(respNew.success === true){
    
      this.setState({tabledata:respNew.adminlist,respStatus:respNew.success });
      this.changeFormat(respNew.adminlist);
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
  console.log(arr);

   let html = [];
		 if(arr!=''){
         
         
         var newdata2 =0;
            var newdata=arr;
            let amount =0;
            var amounttotal=0;
            var balance=0;
             if(this.state.general_report==1){
               newdata.map(function(value, i){
                  if(value!=undefined){
                    if(value.userType!=undefined){
                       if(value.userType===6){
                          amounttotal+=value.balance +value.profit_loss-value.data_new
                           console.log(value.userType);
                     
                          var obj = {
                          
                             username:value.username,
                             amount:value.balance +value.profit_loss-value.data_new,

                          }
                          html.push(obj);
                          if(i==newdata.length-1){
                           var obj = {
                              
                              username:"Genral Total",
                              amount:amounttotal,
 
                           }
                           
                              html.push(obj);
                              
                          }
                          
                       }
                    }
                  }
           }); 

    }

    if(this.state.general_report==3){
      newdata.map(function(value, i){
         if(value!=undefined){
           if(value.userType!=undefined){
              if(value.userType===6){
                 amounttotal+=value.creditAmount 
                  console.log(value.userType);
            
                 var obj = {
                 
                    username:value.username,
                    amount:value.creditAmount ,
                 }
                 html.push(obj);
                 if(i==newdata.length-1){
                  var obj = {
                     
                     username:"Genral Total",
                     amount:amounttotal,

                  }
                  
                     html.push(obj);
                     
                 }
              }
           }
         }
  }); 

}
    this.setState({html11:html,amounttotal:amounttotal})
              
       }else{
         this.setState({html11:[]})
       }
       
      
	  
  }

  
  handleChange = (event)=> {
   this.setState({general_report:event.target.value})
   
  }
 
  newUserSet = (event)=> {
   this.setState({year:event.year,})

  };

  

  handleExposureLimitClose= ()=>{
   this.setState({showUserAmountPopup:false})
  }

  modelShow = (event_id,user_id)=> {
   let headers={
      Authorization:"Bearer "+ this.state.accessToken,
  }; 
   axios.get(baseUrl + '/betlist-detils/'+event_id+"/"+user_id, {headers}).then((resp) => {
            
        
        
      var html =[];
      console.log(resp.data.data);
     
   
  this.setState({bethistory:resp.data.data})     
  });

this.setState({showUserAmountPopup:true})

  };
  showTableHtml = () =>{ 
   if(this.state.bethistory!=undefined){  
      var html1 = []  
      
         //return <center>No bet markets!</center>
         var inactiveMatches = this.state.matchData1;
         var suspend_matches = this.state.suspend_match;

         
      var matchName =""; 
      var showAction4 ="";
      for (var i = 0; i < this.state.bethistory.length; i++) {
       
            
   
         var mainHtml=""
             
       
       
       
       
       
       
         

     
           

               var mainHtml = <tr role="row" className="odd" style={{backgroundColor:this.state.bethistory[i].color}}>
                
                  <td>{this.state.bethistory[i].user_id.username}</td>
                  <td>{this.state.bethistory[i].team_name}</td>
                  <td>{this.state.bethistory[i].odds}</td>
                  <td>{this.state.bethistory[i].profit}</td>
                  <td>{this.state.bethistory[i].createdDate}</td>
                  <td>{this.state.bethistory[i].matchDate}</td>
                  <td>{this.state.bethistory[i].user_id.ip_address}</td>
                  <td>{this.state.bethistory[i].user_id.browser_name+" "+this.state.bethistory[i].user_id.version}</td>
               
         
            </tr>;




      }






                  // if(value.eventName!==matchName){ 
                  
                     
                     
                  
                     
                     
                     html1.push(mainHtml);

                     loadjs(['/js/custom.js'], function() {

                     });
                     return <tbody>{html1}</tbody>;
                  };
                  
                  
   
            
            
           
       
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
   var gameArray =[];
   if(this.state.gameData!=undefined){
      if(this.state.gameData==1){
         // var html=<option value="upper">Upper</option>;
         //    var html2=<option value="lower">Lower</option>;
         //    gameArray.push(html);
         //    gameArray.push(html2);
      }else{
         if(this.state.gameData.length>0){
            for(var gamelist=0;gamelist<this.state.gameData.length;gamelist++){
               var html=<option value={this.state.gameData[gamelist].sport_name}>{this.state.gameData[gamelist].sport_name}</option>;
               gameArray.push(html);
            }
         }
      }
      
   }
   

   const data  = "";
   
   
   const colFormatterNew = ( cell, row,value) => {
   const key=`${row.key}`
   console.log(row)
	 return (
			  <div>

<a href="#"  onClick={this.modelShow.bind(this,row.event_id,row.user_id)} > 
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
					<div id="">
						<div className="container-fluid22">
						<h4 className="a_manh">General Report</h4>
						<div className="">
                  <div className="man_bglight">
                     <form onSubmit={this.handleSubmit}>
                     <div className="row">
                     <div className="select-report d-inline-block  form-group col-md-2">
					 <label> Select Type</label>
                           <select id="bind_opt_select" className="form-control" name="general_report"  onChange={this.handleChange} >
                           
                              <option value="1">General Report</option>
                              <option value="3">Credit Reference Report</option>
                           </select>
						   </div>
                     
						   
                        <div className="d-inline-block ">
						<label className="d_block h_14"></label>
                           <button className="btn btn22 btn-primary" value="submit" type="submit">Load</button>
                        </div>
                        </div>
                     </form>
                     <div className="">
                        <div id="account-statement_wrapper" className="dataTables_wrapper ">
                           <div className="row">
                             
                           </div>
                           <div className="">
                              <div className=" table_manpp table_widthmanage">
							  {/* <button className="buttons-pdf mb55" onClick={() => this.exportPDF()}>PDF</button> */}
                                 <BootstrapTable                
                              data={this.state.html11} 
                              striped={true} 
                              hover={true}
                              pagination  
							  ignoreSinglePage
							  exportCSV
							  exportPDF
                              search  searchPlaceholder='Search...'
                            >
                             
                              {/* <TableHeaderColumn dataField="s_no"  >
                              S.No
                              </TableHeaderColumn> */}
                             
                              <TableHeaderColumn dataField="username"   isKey={true} >
                              Name
                              </TableHeaderColumn>
                              <TableHeaderColumn dataField="amount" >
                              Amount
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
