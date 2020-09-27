import React, { Component } from 'react';
import Header from '../Header/Header';
import {Link,Redirect} from "react-router-dom";
import axios from "axios";
import Moment from 'moment'; 
import Modal from "react-bootstrap-modal";
import Switch from "react-switch";
import loadjs from "loadjs";


require("react-bootstrap-modal/lib/css/rbm-complete.css");

const $ = require('jquery');
const baseUrl = "http://172.105.40.76:4000"; 
		
	
//  function  exposuredata  (id=null)  {
// 	let headers={
// 		Authorization:"Bearer "+ localStorage.getItem("token"),
// 	 }; 
	 	
// 		const resp11 =  axios.get(baseUrl + '/api/userbet/'+id, {headers});
// 	//  localStorage.setItem({id:resp11});
		
	


// }	
class Receive extends Component { 
	constructor(props) {
		super(props);
		var accessToken = localStorage.getItem("token");
		var user_id = localStorage.getItem("user_id");
		this.state = {accessToken:accessToken,
					  tabledata:"",
					  respStatus:false,
					  showUserAmountPopup:false,
					  old_update_amount:0.00,
					  master_password:'',
					  row_user_new_password:'',
					  row_user_confirm_password:'',
					  user_id:user_id,
					  exposuredata1:'',
					};
		
	}	  
	componentWillMount() { 
       this.callAdminTable();
       this.currentUserData();
	}
  
	callAdminTable=()=>{
		console.log();
		let headers={
            Authorization:"Bearer "+ this.state.accessToken,
        };  
        axios.get(baseUrl + '/api/users_trans_list/'+this.props.match.params.id, {headers}).then((resp) => { 
         var respNew = resp.data; 
			if(respNew.success === true){
				this.setState({tabledata:respNew.showdata,respStatus:respNew.success });
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
	
   handleChange = (event)=> {
		let {name,value} = event.target;
		
		if(name==="row_user_amount" && this.state.user_balance_type==="deposit"){
			if(isNaN(parseInt(value)) || value>this.state.current_user_balance){
				return false;
			}
			var current_user_balance_remaining = Number(this.state.current_user_balance) - Number(value);
			var row_user_new_balance = Number(this.state.row_user_balance) + Number(value);
			this.setState({current_user_balance_remaining:current_user_balance_remaining,
						   row_user_new_balance:row_user_new_balance})
		}
		else if(name==="row_user_amount" && this.state.user_balance_type==="withdrawal"){
			if(isNaN(parseInt(value)) || value>this.state.row_user_balance){
				return false;
			}
			var current_user_balance_remaining = Number(this.state.current_user_balance) + Number(value);
			var row_user_new_balance = Number(this.state.row_user_balance) - Number(value);
			this.setState({current_user_balance_remaining:current_user_balance_remaining,
						   row_user_new_balance:row_user_new_balance})
		}
		
		
		this.setState({[name]: value,
						emptyField:false,
						emptyUserAmountField:false,
						emptyExposureField:false,
						emptyDepoWithdrField:false,
						emptyChangePassField:false,
						errMsg:""});
	   
     }
  
	showTableHtml = () =>{
	  if(this.state.respStatus===true){ 
		  const html = []
		 //this.state.tabledata.map(function(value, i){ 
		
		 for(var i=0;i<this.state.tabledata.length;i++) {
			 
			 var value = this.state.tabledata[i];
			 
			





var mainHtml = <tr role="row" className="odd">
							<td>{value.amount}</td>
							<td className="text-right">{value.trans_type}</td>
							<td  className="text-right">{value.remark}</td>
							<td  className="text-right">{(value.created_at)}</td>
							
						</tr>;







			html.push(mainHtml);
			
		} 
		loadjs(['js/custom.js'], function() {
      
		});
		return <tbody>{html}</tbody>;
		
	  }
	}
  
   // deposit withdrawal button action 
	handleDepoWithdrPopupClose=()=>{
		 this.setState({showDepoWithdrPopup:false})
	}
	handleDepoWithdrPopupOpen=(get_row_user_balance,get_row_user_id,get_row_user_username,get_user_balance_type)=>{
		 this.setState({showDepoWithdrPopup:true,
						current_user_balance_remaining:0,
						row_user_balance:get_row_user_balance,
						row_user_username:get_row_user_username,
						row_user_new_balance:0,
						user_balance_type:get_user_balance_type,
						row_user_id:get_row_user_id,
						user_depo_withdr_popup_title:get_user_balance_type.toUpperCase(),
						})
	}
	
	handleDepoWithdrSubmit =(event) => {
      event.preventDefault(); 
		
      if(isNaN(parseInt(this.state.row_user_amount)) || this.state.row_user_amount<=0){
         this.setState({emptyDepoWithdrField:true,errDepoWithdrMsg:"Enter Valid Amount"});
         return false;
      } 
	  if(this.state.user_balance_type===""){
         this.setState({emptyDepoWithdrField:true,errDepoWithdrMsg:"Invalid Action"});
         return false;
      }
	  if(this.state.master_password===""){
         this.setState({emptyDepoWithdrField:true,errDepoWithdrMsg:"Master Passowrd is required"});
         return false;
      }
		let sendData={
            row_user_id:this.state.row_user_id,
            user_balance_type:this.state.user_balance_type,
            row_user_amount:this.state.row_user_amount,
            row_user_remark:this.state.row_user_remark,
			master_password:this.state.master_password
          }; 


         let headers={
            Authorization:"Bearer "+ this.state.accessToken,
         }; 
          axios.post(baseUrl + '/api/update_balance',sendData, {headers}).then((resp) => { 
           var resp = resp.data;
           if(resp.success === true){
				this.setState({respDepoWithdrStatus:resp.success,
							 respDepoWithdrMessage:resp.message,
                             row_user_amount:"",
                             master_password:""
                          });
				 this.callAdminTable();
				setTimeout(() => {this.setState({ respDepoWithdrStatus: "" });}, 7000);
						
              }else{
				this.setState({respDepoWithdrStatus:resp.success,respDepoWithdrMessage:resp.message, master_password:""});
				setTimeout(() => {this.setState({ respDepoWithdrStatus: "" });}, 7000);  
          
              }
           
          });
    }
	
	responseDepoWithdrHtml = () =>{ 
      if(this.state.respDepoWithdrStatus === false) {
          return (
          <div className="alert alert-danger">
          {this.state.respDepoWithdrMessage}
          </div>
          )
        }
        else if(this.state.respDepoWithdrStatus === true) {
           return (
            <div className="alert alert-success">
            {this.state.respDepoWithdrMessage}
            </div>
           )
        }
     } 
  
   emptyDepoWithdrHtml = () =>{
	
      if(this.state.emptyDepoWithdrField === true) {
         return (
          <div className="alert alert-danger">
          {this.state.errDepoWithdrMsg}
          </div>
         )
      }
   }
	
  
  
  
  
  
	handleExposureLimitClose=()=>{
	 
	  this.setState({showUserAmountPopup:false,
					 old_update_amount:0.00,
					 user_amount_popup_title:"",
					 row_user_id:"",
					 master_password:"",
					 user_update_type:""})
	}
	handleExposureLimitShow=(getExAmt,get_row_user_id,get_user_update_type,get_user_amount_popup_title)=>{
	  
	  this.setState({showUserAmountPopup:true,
					user_amount_popup_title:get_user_amount_popup_title,
					old_update_amount:getExAmt,
					row_user_id:get_row_user_id,
					user_update_type:get_user_update_type})
	}
	handleExposureLimitSubmit =(event) => {
      event.preventDefault(); 
		
      if(isNaN(parseInt(this.state.updateAmount)) || this.state.updateAmount<=0){
         this.setState({emptyExposureField:true,errExposureMsg:"Enter Valid Amount"});
         return false;
      } 
	  if(this.state.user_update_type===""){
         this.setState({emptyExposureField:true,errExposureMsg:"Invalid Action"});
         return false;
      }
	   if(this.state.master_password===""){
         this.setState({emptyExposureField:true,errExposureMsg:"Master Passowrd is required"});
         return false;
      }
		let sendData={
            row_user_id:this.state.row_user_id,
            user_update_type:this.state.user_update_type,
            updateAmount:this.state.updateAmount,
			master_password:this.state.master_password
          }; 


         let headers={
            Authorization:"Bearer "+ this.state.accessToken,
         }; 
          axios.post(baseUrl + '/api/update_user_amount',sendData, {headers}).then((resp) => { 
           var resp = resp.data;
           if(resp.success === true){
				this.setState({respExposureStatus:resp.success,
							 respExposureMessage:resp.message,
                             exposerAmount:"",
                             master_password:""
                          });
				 this.callAdminTable();
				setTimeout(() => {this.setState({ respExposureStatus: "" });}, 7000);
						
              }else{
				this.setState({respStatus:resp.success,respMessage:resp.message, master_password:""});
				setTimeout(() => {this.setState({ respExposureStatus: "" });}, 7000);  
          
              }
           
          });
    }
	
	responseExposureHtml = () =>{ 
      if(this.state.respExposureStatus === false) {
          return (
          <div className="alert alert-danger">
          {this.state.respExposureMessage}
          </div>
          )
        }
        else if(this.state.respExposureStatus === true) {
           return (
            <div className="alert alert-success">
            {this.state.respExposureMessage}
            </div>
           )
        }
     } 
  
   emptyExposureHtml = () =>{
	
      if(this.state.emptyExposureField === true) {
         return (
          <div className="alert alert-danger">
          {this.state.errExposureMsg}
          </div>
         )
      }
   }
   
   
	handleChangePassPopupClose=()=>{
	 
	  this.setState({showChangePassPopup:false,
					row_user_id:"",
					row_user_new_password:"",
					row_user_confirm_password:""})
	}
	handleChangePassPopupOpen=(get_row_user_id)=>{
	 
	  this.setState({showChangePassPopup:true,
					row_user_id:get_row_user_id,
					row_user_new_password:"",
					row_user_confirm_password:""})
	}
	handleChangePassSubmit =(event) => {
      event.preventDefault(); 
		
		if(this.state.row_user_new_password===""){
			this.setState({emptyChangePassField:true,errChangePassMsg:"Passowrd Is required"});
			return false;
		}
		if(this.state.row_user_confirm_password===""){
			this.setState({emptyChangePassField:true,errChangePassMsg:"Confirm Passowrd Is required"});
			return false;
		} 
		if(this.state.row_user_confirm_password!==this.state.row_user_new_password){
			this.setState({emptyChangePassField:true,errChangePassMsg:"Password and Confirm Passowrd Should be Same"});
			return false;
		} 
		
		if(this.state.master_password===""){
         this.setState({emptyExposureField:true,errExposureMsg:"Master Passowrd is required"});
         return false;
		}
	 
		let sendData={
            row_user_id:this.state.row_user_id,
            row_user_new_password:this.state.row_user_new_password,
            master_password:this.state.master_password
          }; 


         let headers={
            Authorization:"Bearer "+ this.state.accessToken,
         }; 
          axios.post(baseUrl + '/api/change_user_password',sendData, {headers}).then((resp) => { 
			var resp = resp.data;
			if(resp.success === true){
				this.setState({ respChangePassStatus:resp.success,
								respChangePassMessage:resp.message,
								row_user_id:"",
								row_user_new_password:"",
								row_user_confirm_password:""
							});
				
				setTimeout(() => {this.setState({ respChangePassStatus: "" });}, 7000);
				this.callAdminTable();
				}else{
				this.setState({respChangePassStatus:resp.success,respChangePassMessage:resp.message, master_password:""});
				setTimeout(() => {this.setState({ respChangePassStatus: "" });}, 7000);  
          
              }
           
          });
    }
	
	responseChangePassHtml = () =>{ 
      if(this.state.respChangePassStatus === false) {
          return (
          <div className="alert alert-danger">
          {this.state.respChangePassMessage}
          </div>
          )
        }
        else if(this.state.respChangePassStatus === true) {
           return (
            <div className="alert alert-success">
            {this.state.respChangePassMessage}
            </div>
           )
        }
     } 
  
   emptyChangePassHtml = () =>{
	
      if(this.state.emptyChangePassField === true) {
         return (
          <div className="alert alert-danger">
          {this.state.errChangePassMsg}
          </div>
         )
      }
   }
   
   
   
	handleBetUserPopupClose=()=>{
	 
	  this.setState({showBetUserPopup:false,
					row_user_name:""})
	}
	handleBetUserPopupOpen=(get_row_user_id,get_row_user_username,get_row_user_status,get_row_user_bet)=>{
	 
	  this.setState({showBetUserPopup:true,
					row_user_id:get_row_user_id,
					row_user_status:get_row_user_status,
					row_user_bet:get_row_user_bet,
					row_user_name:get_row_user_username})
	}
	handleBetUserSubmit =(event) => {
      event.preventDefault(); 
		
		
		let sendData={
            row_user_id:this.state.row_user_id,
            row_user_status:this.state.row_user_status,
            row_bet_status:this.state.row_user_bet,
            master_password:this.state.master_password
          }; 


         let headers={
            Authorization:"Bearer "+ this.state.accessToken,
         }; 
          axios.post(baseUrl + '/api/change_bet_user_status',sendData, {headers}).then((resp) => { 
			var resp = resp.data;
			if(resp.success === true){
				this.setState({ respBetUserStatus:resp.success,
								respBetUserMessage:resp.message,
								row_user_id:"",
								row_user_name:"",
							});
				
				setTimeout(() => {this.setState({ respBetUserStatus: "" });}, 7000);
				this.callAdminTable();
				}else{
				this.setState({respBetUserStatus:resp.success,respBetUserMessage:resp.message, master_password:""});
				setTimeout(() => {this.setState({ respBetUserStatus: "" });}, 7000);  
          
              }
           
          });
    }
	
	responseBetUserHtml = () =>{ 
      if(this.state.respBetUserStatus === false) {
          return (
          <div className="alert alert-danger">
          {this.state.respBetUserMessage}
          </div>
          )
        }
        else if(this.state.respBetUserStatus === true) {
           return (
            <div className="alert alert-success">
            {this.state.respBetUserMessage}
            </div>
           )
        }
     } 
  
   emptyBetUserHtml = () =>{
	
      if(this.state.emptyBetUserField === true) {
         return (
          <div className="alert alert-danger">
          {this.state.errBetUserMsg}
          </div>
         )
      }
   }
   
   
   
   handleUserStatusChange = (checked) =>{
	  
	   this.setState({row_user_status:checked});
   }
   
   
    handleUserBetChange = (checked) =>{
		console.log(checked);
	   this.setState({row_user_bet:checked});
	}
   
   
   
  render() {
	var accessToken = this.state.accessToken;
	
	if(accessToken==="" || accessToken===null){
		return(
				<Redirect to="/login" />
				);
	} 
	var change_password=localStorage.getItem("change_password")
	
	if (change_password==2 && change_password!=null) {
		return (
			<Redirect to="/changepass" />
		);
	}
    return (
	<div >
		<Header />
		<div id="wrapper">
		<div id="content-wrapper" className="container-fluid">
	 <div id="wrapper">
		<div className="man_bglight">
	  
	
				 
		   <div id="account-statement_wrapper" className="dataTables_wrapper ">
			  <div className="row">
				 <div className="col-sm-12 col-md-6">
				 <h3 className="a_manh">User-transactions</h3>
					<a className="btn btn-danger" href="#"><i className="far fa-file-pdf"></i> PDF</a>&nbsp;
					<a className="btn btn-success" href="#"><i className="far fa-file-excel"></i> Excel</a>
				 </div>
				 <div className="col-sm-12 col-md-6">
					<div id="account-statement_filter" className="dataTables_filter">
					   <Link to="/addadmin" className="btn btn-primary mb-2">Add Account</Link><br/>
					   <label>
						  Search:<input type="search" className="form-control form-control-sm" placeholder="" aria-controls="account-statement" />
					   </label>
					</div>
				 </div>
			  </div>
			  <div className="row">
				 <div className="col-sm-12">
				 <div className="table-responsive">
				 <table id="account-statement" >
					   <thead>
						  <tr role="row">
							 <th  >Amount</th>
							 <th  >Trans type</th>
							 <th >Remark</th>
							 <th >Date</th>
							
						  </tr>
					   </thead>
					  {this.showTableHtml()}
					</table>
				 </div>
				 </div>
			  </div>
			
		   </div>

			 <div>
			 <div>
		</div>
			</div>
		  </div>
		  
		  
	 </div>
	 </div>
	 </div>
	
	<Modal show={this.state.showUserAmountPopup} onHide={this.handleExposureLimitClose}>
		<form className="form loginform" onSubmit={this.handleExposureLimitSubmit}>
			<input type="hidden" name="row_user_id" value={this.state.row_user_id} />
			<input type="hidden" name="user_update_type" value={this.state.user_update_type} />
			<Modal.Header >
				<Modal.Title>{this.state.user_amount_popup_title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			<div className="row form-group">
			  <div className="col-md-4">
				<label>Old Limit</label>
			  </div>
			  <div className="col-md-8">
				<input type="text" name="old_exposer_amount" value={this.state.old_update_amount} readOnly="false"  className="form-control intr" />
			  </div>
			  </div>
			<div className="row form-group">
			  <div className="col-md-4">
				<label>New Limit </label>
			  </div>
			  <div className="col-md-8">
				<input type="text" name="updateAmount" value={this.state.updateAmount} onChange={this.handleChange}   className="form-control" />
			  </div>
			</div>
			<div className="row form-group">
			  <div className="col-md-4">
				<label>Master Password</label>
			  </div>
			  <div className="col-md-8">
				<input type="password" name="master_password"  value={this.state.master_password}  onChange={this.handleChange} className="form-control" />
			  </div>
			</div>
			</Modal.Body>
			<Modal.Footer>
				{this.responseExposureHtml()}
				{this.emptyExposureHtml()}
				<button type="button" className="btn btn-info" data-dismiss="modal" onClick={this.handleExposureLimitClose}><i className="fas fa-undo-alt"></i> Close</button>
				<button type="submit" className="btn btn-primary"><i className="fas fa-paper-plane"></i> Submit</button>	
			</Modal.Footer>
		</form>
      </Modal>
	  
	  
	  
	  
	  
	  <Modal show={this.state.showDepoWithdrPopup} onHide={this.handleDepoWithdrPopupClose}>
		<form className="form loginform" onSubmit={this.handleDepoWithdrSubmit}>
		<input type="hidden" name="row_user_id" value={this.state.row_user_id} />
		<input type="hidden" name="user_balance_type" value={this.state.user_balance_type} />
        <Modal.Header >
          <Modal.Title>{this.state.user_depo_withdr_popup_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
			<div className="row form-group">
			  <div className="col-md-4">
				<label>{this.state.current_user_username} </label>
			  </div>
			  <div className="col-md-8">
			  <div className="row">
				<div className="col-md-6">
				<input type="text" className="form-control intr" value={this.state.current_user_balance} readOnly="true"  className="form-control intr"  />
				</div>
				<div className="col-md-6">
				<input type="text"  value={this.state.current_user_balance_remaining} readOnly="true" className="form-control intr" />
			  </div>
			  </div>
			  </div>
			</div>
			
			<div className="row form-group">
			  <div className="col-md-4">
				<label>{this.state.row_user_username}</label>
			  </div>
			  <div className="col-md-8">
			  <div className="row">
				<div className="col-md-6">
				<input type="text" readOnly="true" value={this.state.row_user_balance} className="form-control  intr" />
				</div>
				<div className="col-md-6">
				<input type="text"  readOnly="true"  value={this.state.row_user_new_balance} className="form-control intr" />
			  </div>
			  </div>
			  </div>
			</div>
			
			<div className="row form-group">
			  <div className="col-md-4">
				<label>Amount </label>
			  </div>
			  <div className="col-md-8">
				<input type="text" name="row_user_amount" value={this.state.row_user_amount} onChange={this.handleChange}   className="form-control intr" />
			  </div>
			</div>
			
			<div className="row form-group">
			  <div className="col-md-4">
				<label>Remark</label>
			  </div>
			  <div className="col-md-8">
				<textarea type="text" name="row_user_remark" value={this.state.row_user_remark} onChange={this.handleChange}  className="form-control"></textarea>
			  </div>
			</div>
			
			<div className="row form-group">
			  <div className="col-md-4">
				<label>Master Password</label>
			  </div>
			  <div className="col-md-8">
				<input type="password"  name="master_password" value={this.state.master_password} onChange={this.handleChange}  className="form-control" />
			  </div>
			</div>
		</Modal.Body>
        <Modal.Footer>
		{this.responseDepoWithdrHtml()}
		{this.emptyDepoWithdrHtml()}
		 <button type="button" className="btn btn-info" data-dismiss="modal" onClick={this.handleDepoWithdrPopupClose}><i className="fas fa-undo-alt"></i> Close</button>
		  <button type="submit" className="btn btn-primary"><i className="fas fa-paper-plane"></i> Submit</button>	
         
        </Modal.Footer>
		</form>
      </Modal>
	  
	  
	<Modal show={this.state.showChangePassPopup} onHide={this.handleChangePassPopupClose}>
		<form className="form loginform" onSubmit={this.handleChangePassSubmit}>
		<input type="hidden" name="row_user_id" value={this.state.row_user_id} />
		<Modal.Header >
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
			
			<div className="row form-group">
			  <div className="col-md-4">
				<label>New Password </label>
			  </div>
			  <div className="col-md-8">
				<input type="password" name="row_user_new_password" value={this.state.row_user_new_password} onChange={this.handleChange}   className="form-control intr" />
			  </div>
			</div>
			
			<div className="row form-group">
			  <div className="col-md-4">
				<label>Confirm Password</label>
			  </div>
			  <div className="col-md-8">
				<input type="password" name="row_user_confirm_password" value={this.state.row_user_confirm_password} onChange={this.handleChange}   className="form-control intr" />
			  </div>
			</div>
			
			<div className="row form-group">
			  <div className="col-md-4">
				<label>Master Password</label>
			  </div>
			  <div className="col-md-8">
				<input type="password"  name="master_password" value={this.state.master_password} onChange={this.handleChange}  className="form-control" />
			  </div>
			</div>
		</Modal.Body>
        <Modal.Footer>
		{this.responseChangePassHtml()}
		{this.emptyChangePassHtml()}
		 <button type="button" className="btn btn-info" data-dismiss="modal" onClick={this.handleChangePassPopupClose}><i className="fas fa-undo-alt"></i> Close</button>
		  <button type="submit" className="btn btn-primary"><i className="fas fa-paper-plane"></i> Submit</button>	
         
        </Modal.Footer>
		</form>
      </Modal>
	  
	  
	  <Modal show={this.state.showBetUserPopup} onHide={this.handleBetUserPopupClose}>
		<form className="form loginform" onSubmit={this.handleBetUserSubmit}>
		<input type="hidden" name="row_user_id" value={this.state.row_user_id} />
		<Modal.Header >
          <Modal.Title>Change Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
			<div className="row form-group">
				<div className="col-md-6">
					<h4 className="text-warning">{this.state.row_user_name}</h4>
				</div>
				<div className="col-md-6 tr">
					<span className="text-success">Active</span>
				</div>
			</div>	
			<div className="row form-group">
			 <div className="col-md-6 tc">
			  <label className="dpb">User Active</label>
			  <div className="onoffswitch">
					<Switch onChange={this.handleUserStatusChange} checked={this.state.row_user_status} />
				</div>
			  </div>
			  <div className="col-md-6 tc">
			   <label className="dpb">Bet Active</label>
			  <div className="onoffswitch">
					
					<Switch onChange={this.handleUserBetChange} checked={this.state.row_user_bet} />
				</div>
			  </div>
			  </div>
			
			<div className="row form-group">
			  <div className="col-md-4">
				<label>Master Password</label>
			  </div>
			  <div className="col-md-8">
				<input type="password"  name="master_password" value={this.state.master_password} onChange={this.handleChange}  className="form-control" />
			  </div>
			</div>
		</Modal.Body>
        <Modal.Footer>
		{this.responseBetUserHtml()}
		{this.emptyBetUserHtml()}
		 <button type="button" className="btn btn-info" data-dismiss="modal" onClick={this.handleBetUserPopupClose}><i className="fas fa-undo-alt"></i> Close</button>
		  <button type="submit" className="btn btn-primary"><i className="fas fa-paper-plane"></i> Submit</button>	
         
        </Modal.Footer>
		</form>
      </Modal>
	  
	  
	</div>
    );
  }
}

export default Receive;
