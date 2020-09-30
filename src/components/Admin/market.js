import React, { Component } from 'react';
import Header from '../Header/Header';
import {Link,Redirect} from "react-router-dom";
import axios from "axios";
import Moment from 'moment'; 

const baseUrl = "http://18.159.217.229:4000"; 
class Receive extends Component { 
  constructor(props) {
    super(props);
	var accessToken = localStorage.getItem("token");
	var user_id = localStorage.getItem("user_id");
	var user_Type = localStorage.getItem("user_Type");
    this.state = {accessToken:accessToken,tabledata:"",respStatus:false,user_id:user_id,user_Type:user_Type};
	
  }	  
	componentWillMount() {
		// let headers = {
		// 	Authorization: "Bearer " + this.state.accessToken,
		// };
		// if (this.state.user_Type == 1) {
		// 	axios.get(baseUrl + '/api/alluserbetlist', { headers }).then((resp) => {
		// 		var respNew = resp.data;
		// 		if (respNew.success === true) {
		// 			this.setState({ tabledata: respNew.Betlist, respStatus: respNew.success });
		// 		}
		// 	});
		// }else{
		// 	axios.get(baseUrl + '/api/userbetlist', { headers }).then((resp) => {
		// 		var respNew = resp.data;
		// 		if (respNew.success === true) {
		// 			this.setState({ tabledata: respNew.Betlist, respStatus: respNew.success });
		// 		}
		// 	});
		// }
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
			<h4 className="a_manh">Block Market </h4> 
			<table className="table table-striped  ">
				<thead>
					<tr>
						<th>So.</th>
						<th>Name</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>1</td>
						<td>CRICKET</td>
						<th><div className="onoffswitch onoffswitch22">
							<input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch1" tabindex="0"  />
							<label className="onoffswitch-label" for="myonoffswitch1">
								<span className="onoffswitch-inner"></span>
								<span className="onoffswitch-switch"></span>
							</label>
						</div>
						</th>
					</tr>
					<tr>
						<td>2</td>
						<td>FOOTBALL</td>
						<th><div className="onoffswitch onoffswitch22">
							<input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch2" tabindex="0"  />
							<label className="onoffswitch-label" for="myonoffswitch2">
								<span className="onoffswitch-inner"></span>
								<span className="onoffswitch-switch"></span>
							</label>
						</div>
						</th>
					</tr>
					<tr>
						<td>3</td>
						<td>TENNIS</td>
						<th><div className="onoffswitch onoffswitch22">
							<input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch3" tabindex="0"  />
							<label className="onoffswitch-label" for="myonoffswitch3">
								<span className="onoffswitch-inner"></span>
								<span className="onoffswitch-switch"></span>
							</label>
						</div>
						</th>
					</tr>
					<tr>
						<td>4</td>
						<td><a href="/diamond-sports">DIAMOND</a> </td>
						<th><div className="onoffswitch onoffswitch22">
							<input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch4" tabindex="0"  />
							<label className="onoffswitch-label" for="myonoffswitch4">
								<span className="onoffswitch-inner"></span>
								<span className="onoffswitch-switch"></span>
							</label>
						</div>
						</th>
					</tr>
					<tr>
						<td>5</td>
						<td><a href="/vip-casino">VIP Casino</a></td>
						<th><div className="onoffswitch onoffswitch22">
							<input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch5" tabindex="0"  />
							<label className="onoffswitch-label" for="myonoffswitch5">
								<span className="onoffswitch-inner"></span>
								<span className="onoffswitch-switch"></span>
							</label>
						</div>
						</th>
					</tr>
				</tbody>
			</table>
			</div>
	   
		</div> 
	</div>
	</div>
    );
  }
}

export default Receive;
