import React, { Component } from 'react';
import Header from '../Header/Header';
import {Link,Redirect} from "react-router-dom";
import axios from "axios";
import Moment from 'moment'; 

const baseUrl = "http://172.105.40.76:4000"; 
class Receive extends Component { 
  constructor(props) {
    super(props);
	var accessToken = localStorage.getItem("token");
	var user_id = localStorage.getItem("user_id");
	var user_Type = localStorage.getItem("user_Type");
    this.state = {	accessToken:accessToken,
					tabledata:"",
					username:"",
					password:"",
					respStatus:"",
					user_id:user_id,
					user_Type:user_Type,
					select_all:false,
					admin_list:false,
					manage_fancy:false,
					gametypelist:false,
					manage_market:false,
					admin_text:false,
					addnewmatch:false,
					maintainance_page:false,
					match_result_declare:false,
					fancy_result_declare:false,
					emptyField:false
				  };
	
  }	  
	componentWillMount() {
		this.callPermissonData();
	} 
  showTableHtml = () =>{
	//   if(this.state.respStatus===true){ 
	// 	  const html = []
	// 	 this.state.tabledata.map(function(value, i){   
	// 		 if(value.eventTypeId==4){
	// 			event = "Cricket"; 
	// 		 }
	// 		 if(value.eventTypeId==1){
	// 			event = "Football"; 
	// 		 }
	// 		 if(value.eventTypeId==2){
	// 			event = "Tennis"; 
	// 		 }
	// 		 if(value.eventTypeId==7){
	// 			event = "Horse Riding"; 
	// 		 }
	//   html.push(<tr>
	// 				<td>{i+1}</td>
	// 				<td>{event}</td>
	// 				<td>{value.eventName}</td>
	// 				<td>{value.teamname}</td>
	// 				<td>{value.BatAmount}</td>
	// 				<td>{value.profitvalue}</td>
	// 				<td>{Moment(value.created_at).format('lll')}</td>
	//   			</tr>);
	// 		}) 
	// 	return <tbody>{html}</tbody>;
	//   }
  }
  
  callPermissonData=()=>{
	   let headers = {
		 	Authorization: "Bearer " + this.state.accessToken,
		 };
		var getParamId = this.props.match.params.id
		axios.get(baseUrl + '/api/getuserpermission/'+getParamId, { headers }).then((resp) => {
			var respNew = resp.data;
				var admin_list = false;
				var manage_fancy=false;
				var gametypelist=false;
				var manage_market=false;
				var admin_text=false;
				var addnewmatch=false;
				var maintainance_page=false;
				var match_result_declare=false;
				var fancy_result_declare=false;
			if (respNew.success === true) {
				var mainData = respNew.data;
				for(var i=0;i<mainData.length;i++){
					var singleData = mainData[i];
					if(singleData.permission_name==="admin_list"){
						admin_list=true;
					}
					else if(singleData.permission_name==="manage_fancy"){
						manage_fancy=true;
					}
					else if(singleData.permission_name==="gametypelist"){
						gametypelist=true;
					}
					else if(singleData.permission_name==="manage-market"){
						manage_market=true;
					}
					else if(singleData.permission_name==="admin-text"){
						admin_text=true;
					}
					else if(singleData.permission_name==="addnewmatch"){
						addnewmatch=true;
					}
					else if(singleData.permission_name==="maintainance_page"){
						maintainance_page=true;
					}
					else if(singleData.permission_name==="match_result_declare"){
						match_result_declare=true;
					}
					else if(singleData.permission_name==="fancy_result_declare"){
						fancy_result_declare=true;
					}
					
					
				}
				//this.setState({ tabledata: respNew.data, respStatus: respNew.success });
				this.setState({ admin_list: admin_list, 
								manage_fancy: manage_fancy,
								gametypelist: gametypelist,
								manage_market: manage_market,
								admin_text: admin_text,
								addnewmatch: addnewmatch,
								maintainance_page: maintainance_page,
								match_result_declare: match_result_declare,
								fancy_result_declare: fancy_result_declare
								});
			}
		});
		 
		
  }
  
  
	handleRadioButtonChange = (event)=> {
	  
	   let name = event.target.name;

	   if(name==="select_all"){
			var checkData = event.target.checked ;
		   this.setState({ admin_list:checkData,
							manage_fancy:checkData,
							gametypelist:checkData,
							manage_market:checkData,
							admin_text:checkData,
							addnewmatch:checkData,
							maintainance_page:checkData,
							match_result_declare:checkData,
							fancy_result_declare:checkData,
						});
	   }
	   
		this.setState({	
						[name]: event.target.checked,
						emptyField:false
						});
	   
     }	

	handleChange = (event)=> {
		let {name,value} = event.target;
		
		this.setState({[name]: value,
						emptyField:false
						});
	   
     }	

	handleSubmit=(event)=> {
		event.preventDefault();
		
		
		if(this.state.admin_list===false && this.state.manage_fancy===false && this.state.gametypelist===false && this.state.manage_market===false && this.state.admin_text===false && this.state.addnewmatch===false && this.state.maintainance_page===false && this.state.match_result_declare===false && this.state.fancy_result_declare===false){
			this.setState({emptyField:true,errMsg:"Select At Least One Permission"});
			return false;
		}
		var getParamId = this.props.match.params.id
		 let headers={
			Authorization:"Bearer "+ this.state.accessToken,
		 }; 
		 let sendData={};
		 if(this.state.password!==""){
			  sendData={
				 user_id:getParamId,
				 password:this.state.password,
				 admin_list:this.state.admin_list,
				 manage_fancy:this.state.manage_fancy,
				 gametypelist:this.state.gametypelist,
				 manage_market:this.state.manage_market,
				 admin_text:this.state.admin_text,
				 addnewmatch:this.state.addnewmatch,
				 maintainance_page:this.state.maintainance_page,
				 match_result_declare:this.state.match_result_declare,
				 fancy_result_declare:this.state.fancy_result_declare
			   };
		 }
		 else {
			 sendData={
				 user_id:getParamId,
				 password:"",
				 admin_list:this.state.admin_list,
				 manage_fancy:this.state.manage_fancy,
				 gametypelist:this.state.gametypelist,
				 manage_market:this.state.manage_market,
				 admin_text:this.state.admin_text,
				 addnewmatch:this.state.addnewmatch,
				 maintainance_page:this.state.maintainance_page,
				 match_result_declare:this.state.match_result_declare,
				 fancy_result_declare:this.state.fancy_result_declare
			   };
 
		 }
		  
		 axios.post(baseUrl + '/api/update_user_permission',sendData, {headers}).then((resp) => {
			//this.handleModal("close");
			   var respNew = resp.data;
			   if(respNew.success === true){
	  
				  this.setState({respStatus:respNew.success,
								 respMessage:respNew.message,
								/*  username:"",
								 password:"",
								 admin_list:false,
								 manage_fancy:false,
								 gametypelist:false,
								 manage_market:false,
								 admin_text:false,
								 addnewmatch:false,
								 maintainance_page:false */
							});
					setTimeout(() => {this.setState({ respStatus: "" });}, 10000);  
			   }else{
				  this.setState({respStatus:respNew.success,respMessage:respNew.message });
			   }
		 });
	  };	 
	

  responseHtml = () =>{ 
      if(this.state.respStatus === false) {
          return (
          <div className="alert alert-danger">
          {this.state.respMessage}
          </div>
          )
        }
        else if(this.state.respStatus === true) {
           return (
            <div className="alert alert-success">
            {this.state.respMessage}
            </div>
           )
        }
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
	var change_password=localStorage.getItem("change_password")
	
	if (change_password==2 && change_password!=null) {
		return (
			<Redirect to="/changepass" />
		);
	}

    return (
	<div>
	<Header />
      <div id="page-wrapper">	
		<div className="container-fluid">
			<div className=" man_bglight">
			
			<h4 className="a_manh">Update User</h4> 
			<div className=" row">
			<div className=" col-md-3"></div>
			<div className=" col-md-6">
			<form  onSubmit={this.handleSubmit} >
			<div className="in_bgwite">
				
				
				<div className="form-group">
					<label className="h6">User Password</label>
					<input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control"/>
				</div>
				{/*<div className="form-group">
				<label className="h6">Sat as Super Admin</label><br/>
				<input type="radio" value="male" /> Yes <input type="radio" value="male" /> No
				</div>
				<div className="form-group">
				<label className="h6">Theme Color</label>
				
				<select name="cars" id="cars" form="carform" className="form-control">
				  <option value="volvo">... Choose Background Theme Color</option>
				  <option value="saab">Skin Blue</option>
				  <option value="opel">Skin Blue Light</option>
				  <option value="audi">Skin Yellow</option>
				  <option value="audi">Skin Yellow Light</option>
				  <option value="saab">Skin Purple</option>
				  <option value="opel">Skin Purple Light</option>
				  <option value="audi">Skin Red</option>
				  <option value="audi">Skin Red Light</option>
				  <option value="audi">Skin Black</option>
				  <option value="audi">Skin Black Light</option>
				  
				</select>
				</div>*/}
				
				<div className="form-group">
				<label className="h6">Privileges Configuration</label>
				
				<table className="table table-striped  ">
				<thead>
					<tr>
						<th>So.</th>
						<th>Module's Name</th>
						<td className="tc"><input name="select_all" value="select_all" checked={this.state.select_all}  onChange={this.handleRadioButtonChange} type="checkbox"/></td>
						
					</tr>
				</thead>
				<tbody>
				
					<tr>
						<td>1</td>
						<td>List Of Clients</td>
						<td className="tc"><input name="admin_list" name="admin_list" checked={this.state.admin_list}  onChange={this.handleRadioButtonChange}  type="checkbox"/></td>
					</tr>
					<tr>
						<td>2</td>
						<td>Manage Fancy</td>
						<td className="tc"><input name="manage_fancy" value="manage_fancy" checked={this.state.manage_fancy}  onChange={this.handleRadioButtonChange}  type="checkbox"/></td>
					</tr>
					<tr>
						<td>3</td>
						<td>Block Market</td>
						<td className="tc"><input name="gametypelist" value="gametypelist"  checked={this.state.gametypelist}  onChange={this.handleRadioButtonChange} type="checkbox"/></td>
					</tr>
					<tr>
						<td>4</td>
						<td>Manage Market</td>
						<td className="tc"><input name="manage_market" value="manage-market" checked={this.state.manage_market}  onChange={this.handleRadioButtonChange}  type="checkbox"/></td>
					</tr>
					<tr>
						<td>5</td>
						<td>Message</td>
							<td className="tc"><input name="admin_text" value="admin-text" checked={this.state.admin_text}  onChange={this.handleRadioButtonChange}  type="checkbox"/></td>
					</tr>
					<tr>
						<td>6</td>
						<td>Add Match</td>
						<td className="tc"><input name="addnewmatch" value="addnewmatch" checked={this.state.addnewmatch}  onChange={this.handleRadioButtonChange}  type="checkbox"/></td>
					</tr>
					<tr>
						<td>7</td>
						<td>Maintainance Page</td>
						<td className="tc"><input name="maintainance_page" value="maintainance_page" checked={this.state.maintainance_page}  onChange={this.handleRadioButtonChange}  type="checkbox"/></td>
					</tr>
					<tr>
						<td>8</td>
						<td>Match Result Declare</td>
						<td className="tc"><input name="match_result_declare" value="match_result_declare" checked={this.state.match_result_declare}  onChange={this.handleRadioButtonChange}  type="checkbox"/></td>
					</tr>
					<tr>
						<td>9</td>
						<td>Fancy Result Declare</td>
						<td className="tc"><input name="fancy_result_declare" value="fancy_result_declare" checked={this.state.fancy_result_declare}  onChange={this.handleRadioButtonChange}  type="checkbox"/></td>
					</tr>
					
					
				</tbody>
			</table>
			{this.responseHtml()}
			{this.emptyHtml()}
				</div>
				
				<div className="tr pb-5">
				
				<button type="submit" class="btn btn-primary pl-3 pr-3">Save</button>
			   </div>
			</div>
			</form>
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
