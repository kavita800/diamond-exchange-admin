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
    this.state = {accessToken:accessToken,tabledata:"",respStatus:false,user_id:user_id,user_Type:user_Type};
	
  }	  
	componentWillMount() {

		this.callPermissionUsersList();
	} 
	

  
  
  callPermissionUsersList=()=>{
	   let headers = {
		 	Authorization: "Bearer " + this.state.accessToken,
		 };
	  axios.get(baseUrl + '/api/permission_users_list', { headers }).then((resp) => {
		  console.log(resp);
		 		var respNew = resp.data;
		 		if (respNew.success === true) {
					this.setState({ tabledata: respNew.data, respStatus: respNew.success });
				}
		 	});
  }
  
   showTableHtml = () =>{
	   if(this.state.respStatus===true){ 
	 	 const html = []
		
		for(var i=0;i<this.state.tabledata.length;i++){
			var getValue = this.state.tabledata[i];
		   html.push(<tr>
						<td>{i+1}</td>
						<td>{getValue.username}</td>
						
						<td><a href={"/edit_privilege/"+getValue._id} className="btn btn-primary p-1 mr-2"><i className="fas fa-pencil-alt"></i></a>
							{/*<button className="btn btn-danger p-1"><i className="fas fa-trash-alt"></i></button>*/}
						</td>
					</tr>);
	 		}
	 	return <tbody>{html}</tbody>;
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
			<div className=" row">
			<div className=" col-8">
			
			<h4 className="a_manh">Privileges </h4> 
			</div>
			
			<div className=" col-4 tr">
			
				<a href="/add-privilege" className="btn btn-primary pl-3 pr-3">Get New Data</a>
			   </div>
			
			
			</div>
		
				
				
				<div className="form-group">
				
				
				<table className="table table-striped  ">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						
						<th>Action</th>
						
					</tr>
				</thead>
				
					
					{this.showTableHtml()}
					
					
				
			</table>
				
				</div>
				
				
			</div>

	   
		</div> 
	</div>
	</div>
    );
  }
}

export default Receive;
