import React, { Component } from 'react';
import Header from '../Header/Header';
import {Link,Redirect} from "react-router-dom";
import axios from "axios";
import Moment from 'moment';



const baseUrl = "http://18.159.217.229:4000";

const columns = [{
  dataField: 'id',
  text: 'Product ID'
}];

class Receive extends Component {
	
  constructor(props) {
    super(props);
	var accessToken = localStorage.getItem("token");
    this.state = {accessToken:accessToken,walletaddress:"",tabledata:"",respStatus:false};
	
  }	
  
  
/*   componentWillMount() {
      console.log('Component WILL MOUNT!')
   }
   componentDidMount() {
      console.log('Component DID MOUNT!')
   }
   componentWillReceiveProps(newProps) {    
      console.log('Component WILL RECIEVE PROPS!')
   }
   shouldComponentUpdate(newProps, newState) {
      return true;
   }
   componentWillUpdate(nextProps, nextState) {
      console.log('Component WILL UPDATE!');
   }
   componentDidUpdate(prevProps, prevState) {
      console.log('Component DID UPDATE!')
   }
   componentWillUnmount() {
      console.log('Component WILL UNMOUNT!')
   } */
  
  componentWillMount() {


        // setting header
         let headers={
            Authorization:"Bearer "+ this.state.accessToken,
        }; 

        axios.get(baseUrl + '/api/transactions', {headers}).then((resp) => {
            //this.handleModal("close");
			var respNew = resp.data;
			if(respNew.success === true){
				this.setState({tabledata:respNew.data,respStatus:respNew.success,walletaddress:respNew.wallet_address });
			}
		});
  }
  
  showTableHtml = () =>{
	  if(this.state.respStatus===true){
		  var walletAddr = this.state.walletaddress;
		  const html = []
		 this.state.tabledata.map(function(value, i){
			var showAddr = (value.sender_address===walletAddr) ? value.receiver_address : value.sender_address;
			   var showType = (value.sender_address==walletAddr) ? "Send" : "Receive";
	  html.push(<tr><td>{i+1}</td><td>{showAddr}</td><td>{value.amount}</td><td>{showType}</td><td>{value.transactionId}</td><td>{Moment(value.created_at).format('lll')}</td></tr>);
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
				<h1 className="page-header">Transactions</h1>
			</div>
			
		</div>
		
		<div className="row">
			<div className="col-lg-12 col-md-12 table-responsive">
			<table className="table table-bordered"><thead><tr><th>Sr No.</th><th>Address</th><th>Amount</th><th>Type</th><th>Tx Id</th><th>Created At</th></tr></thead>
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
