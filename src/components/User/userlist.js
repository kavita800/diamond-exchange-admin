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
    this.state = {accessToken:accessToken,tabledata:"",respStatus:false};  
  }	  

  componentWillMount() {  
         let headers={
            Authorization:"Bearer "+ this.state.accessToken,
        };  
        axios.get(baseUrl + '/api/userlist', {headers}).then((resp) => { 
		 var respNew = resp.data;  
			if(respNew.success === true){
				this.setState({tabledata:respNew.userlist,respStatus:respNew.success });
			}
		});
  }
  
  showTableHtml = () =>{
	  if(this.state.respStatus===true){ 
		  const html = []
		 this.state.tabledata.map(function(value, i){  
	  html.push(<tr><td>{i+1}</td><td>{value.username}</td><td>{value.email}</td><td>{value.country}</td><td>{value.cricket}</td><td>{value.football}</td><td>{value.tennis}</td><td>{Moment(value.created_at).format('lll')}</td>
	  <td><a href={"/gameassign/"+value.id}> <button type="button" className="btn btn-success" >Assign</button></a></td>
	  </tr>);
		}) 
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
    return (
	<div> 
	<Header />
      <div id="page-wrapper">
		<div className="row">
			<div className="col-lg-12">
				<h1 className="page-header">User List</h1> 
            <a href="/adduser"><button type="button" className="btn btn-info">ADD</button></a> 
			</div>
		</div><br></br> 
		<div className="row">
			<div className="col-lg-12 col-md-12 table-responsive">
			<table className="table table-bordered"><thead><tr><th>Sr No.</th><th>Username</th><th>Email</th><th>Country</th><th>Cricket</th><th>Football</th><th>Tennis</th><th>Created At</th> <th>Assign</th></tr></thead>
			{this.showTableHtml()}
			</table>
			</div>
	   
		</div> 
	</div>
	</div>
    );
  }
}

export default Receive;
