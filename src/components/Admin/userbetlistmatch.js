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










 handleSubmit =(event) => {
   let headers={
      Authorization:"Bearer "+ this.state.accessToken,
   }; 
   let sendData={
      match_type:this.state.match_type,
      
      
    }; 
   event.preventDefault(); 
   axios.post(baseUrl + '/bet-list-data',sendData, {headers}).then((resp) => {
      //this.handleModal("close");
   var respNew = resp.data;
   if(respNew.success === true){

      this.setState({tabledata:respNew.data,respStatus:respNew.success });
        this.changeFormat(respNew.data);
   }else{
      
      var newarry =[];
      this.setState({tabledata:respNew.data,respStatus:respNew.success });
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
  
   
   let html = [];
		 if(arr!=''){
         
         
         
            var newdata=arr;
            let amount =0;
           
             
            for (var a = 0; a < arr.length; a++) {
               for (var b = 0; b < arr[a].length;b++) {
                  const value = arr[a][b];
                  var obj = {
                     event_type:value.event_type,
                     event_name: value.event_name,
                     event_id: value.event_id,
                     odd:value.odds,
                     stake: value.stake,
                     profit: value.profit,
                     team_name:value.team_name,
                     bet_type:value.bet_type,
                     
                     market_id: value.market_id,
                     type: value.type,
                     username:value.user_id.username,
                     status:status,
                     created:Moment(value.createdDate).format('lll'),
                     matchDate:Moment(value.matchDate).format('lll'),
                     color:value.color,
                    }
                    html.push(obj);
               
                  }
            }
            
      
      
     
     
	
		
		
		

              
               // console.log(obj);
              
             
                
         
      
               
              
    
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

 rowClassNameFormat(row, rowIdx) {
    console.log(row.color);
   
   // row is whole row object
   // rowIdx is index of row
     
   return  row.color==="#92C9F0" ?'back-class':'lay-class';
   //return rowIdx % 2 === 0 ? 'td-column-function-even-example' : 'td-column-function-odd-example';
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
						<h4 className="a_manh">Current Bets</h4>
						<div className="">
                  <div className="man_bglight">
                     <form onSubmit={this.handleSubmit}>
                      
                        <div className="row">
                        <div className="select-report form-group col-md-4 col-9">
						<label>Choose Type</label>
                           <select id="bind_opt_select" className="form-control" required name="match_type"  onChange={this.match_type} >
                              
                              <option value="match">Matched</option>
                              <option value="unmatch">Unmatched</option>
							  <option value="Deleted" >Deleted</option>
                           </select>
                        </div>
                        <div className="d-inline-block  col-md-4 col-3">
						<label class="d_block h_14"> </label>
                           <button className="btn btn-primary btn22 " value="submit" type="submit">Load</button>
                        </div>
                        </div>
                     </form>
                     
					 
					 <div className="">
                        <div id="account-statement_wrapper" className="dataTables_wrapper ">
                          
                           <div className="">
                           <div className="">
							  
                       <BootstrapTable 
                       trClassName={this.rowClassNameFormat}               
                    data={this.state.html11} 
                    striped={true} 
                    hover={true}
                    pagination 
             ignoreSinglePage
             exportCSV
             
                    search  searchPlaceholder='Search...'
                  >
                   
                  

                   <TableHeaderColumn dataField="event_type"  >
                    Event Type
                    </TableHeaderColumn>
                    
                    <TableHeaderColumn dataField="event_name" isKey={true}>
                    Event Name
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="username" >
                     User Name
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="team_name" >
                    Runner Name
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
                   
                    
                   
             
             <TableHeaderColumn dataField="type" >
             Type
                    </TableHeaderColumn>
                   
                    
             <TableHeaderColumn dataField="status" >
             Status
                    </TableHeaderColumn>



             <TableHeaderColumn dataField="created" >
            Place Date


                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="matchDate" >
                    Match Date


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
