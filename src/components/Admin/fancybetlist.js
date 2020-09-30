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
    this.state = {accessToken:accessToken,tabledata:"",respStatus:false,user_id:user_id};
	
  }	  
  componentWillMount() { 
         let headers={
            Authorization:"Bearer "+ this.state.accessToken,
        };  
        axios.get(baseUrl + '/api/fancybetlist', {headers}).then((resp) => { 
         var respNew = resp.data; 
			if(respNew.success === true){
				this.setState({tabledata:respNew.fancybetlist,respStatus:respNew.success });
			}
		});
  } 
  showTableHtml = () =>{
	  if(this.state.respStatus===true){ 
		  const html = []
		 this.state.tabledata.map(function(value, i){  
	  html.push(<tr><td>{i+1}</td><td>{value.title}</td><td>{value.yes_first}</td><td>{value.no_first}</td><td>{value.minimum}</td><td>{value.maximum}</td><td>{Moment(value.created_at).format('lll')}</td></tr>);
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
		<div className="row">
			<div className="col-lg-12">
				<h1 className="page-header">Fancybet List</h1> 
            <a href="/fancybetadd"><button type="button" className="btn btn-info">ADD</button></a> 
			</div>
		</div><br></br> 
		<div className="row">
			<div className="col-lg-12 col-md-12 table-responsive">
			<table className="table table-bordered"><thead><tr><th>Sr No.</th><th>Title</th><th>Yes First</th><th>No First</th><th>Minimum</th><th>Maximum</th><th>Created At</th></tr></thead>
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
