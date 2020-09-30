import React, { Component } from 'react';
import axios from "axios";
import Moment from 'moment'; 
import {Link,Redirect} from "react-router-dom";

import ReactDrawer from 'react-drawer';
import './Header.css';
import 'react-drawer/lib/react-drawer.css';

const baseUrl = "http://18.159.217.229:4000";

const $ = window.$;

class Header extends Component {
	constructor(props) {
		super(props);
		var accessToken = localStorage.getItem("token");
		this.state = {accessToken:accessToken,
			open: false,
			position: 'left',
			noOverlay: true,
			matchData:"",
			matchName:"",
			matchData1:"",
			matchData1:"",
			matchName2:"",
			loader:false,
			admin_text:"",
			username:"",
			admin_list:false,
			manage_fancy:false,
			gametypelist:false,
			manage_market:false,
			admin_text_permission:false,
			addnewmatch:false,
			maintainance_page:false,
			customSuperAdmin:false
		}; 

		this.toggleDrawer = this.toggleDrawer.bind(this);
		this.closeDrawer = this.closeDrawer.bind(this);
		this.onDrawerClose = this.onDrawerClose.bind(this);
		this.setPosition = this.setPosition.bind(this);
		this.setNoOverlay = this.setNoOverlay.bind(this);
	  }	

	  setPosition(e) {
		this.setState({position: e.target.value});
	  }
	  setNoOverlay(e) {
		this.setState({noOverlay: e.target.checked});
	  }
	  toggleDrawer() {
		this.setState({open: !this.state.open});
	  }
	  closeDrawer() {
		this.setState({open: false});
	  }
	  onDrawerClose() {
		this.setState({open: false});
	  }




	  componentWillMount() { 
		  this.callPermissonData();
	let headers = {
		Authorization: "Bearer " +  localStorage.getItem("token"),
	}; 
	
	axios.get(baseUrl + '/api/get_admin_text_value',{headers}).then((resp) => {  
		var resps = resp.data;

			// if (resps.success === true) {
				this.setState({ admin_text:resps.value.admin_text });
			
			
		
	});  
	   
	axios.get(baseUrl + '/api/current',{headers}).then((resp) => { 
		if(resp.data.user_status=="N"){
			window.location.href="/login";
			return false;
		}
		this.setState({ id:resp.data._id ,session_id:resp.data.session_id,username:resp.data.username,
			userType:resp.data.userType, });  
				
	});
	
	localStorage.removeItem("match");
	localStorage.removeItem("match1");
	localStorage.removeItem("match2");
	
	

}


callPermissonData=()=>{
	   let headers = {
		 	Authorization: "Bearer " + this.state.accessToken,
		 };
		
		axios.get(baseUrl + '/api/userpermission', { headers }).then((resp) => {
			var respNew = resp.data;
				var admin_list = false;
				var manage_fancy=false;
				var gametypelist=false;
				var manage_market=false;
				var admin_text=false;
				var addnewmatch=false;
				var maintainance_page=false;
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
					
					
				}
				//this.setState({ tabledata: respNew.data, respStatus: respNew.success });
				this.setState({ admin_list: admin_list, 
								customSuperAdmin: true, 
								manage_fancy: manage_fancy,
								gametypelist: gametypelist,
								manage_market: manage_market,
								admin_text_permission: admin_text,
								addnewmatch: addnewmatch,
								maintainance_page: maintainance_page
								});
			}
		});
		 
		
  }
handleSubmit =(event) =>{
	event.preventDefault(); 
	
	$(".blockUI").show();

	 let headers={
		Authorization:"Bearer "+ this.state.accessToken,
	 }; 
	 
	  axios.get(baseUrl + '/api/usermatch_serieslist/cricket', {headers}).then((resp) => { 
	   var resp = resp.data;
	   //console.log(resp);

		this.setState({matchData:resp.data})
		const items2 = []
		for(var index = 0; index < this.state.matchData.length; index++){
			items2.push(this.state.matchData[index].series_id)
			
		}
		this.handleSubmitMatchname(items2)
		});
		var match = localStorage.getItem("match");
		if(match!=undefined){
			localStorage.setItem("match",parseInt(match)+parseInt(1));

		}else{
			localStorage.setItem("match", 1);
		}
		

}

handleSubmitMatchname =(value) =>{
	var match = localStorage.getItem("match");

	
if(match<=1 || match===undefined){
	let headers={
		Authorization:"Bearer "+ this.state.accessToken,
	 }; 

	 let sendData={
		event_id:value.toString(),
		
	  }; 
	  
	  $(".blockUI").show();  

	  axios.post(baseUrl + '/api/partiuser_match_deatils/cricket',sendData, {headers}).then((resp) => { 
	   var resp = resp.data;
		this.setState({matchName:resp.data})

 




   
  });
}
	
	
		
}

showTableHtml1 = (series_id) =>{  
	const items1 = []
 
if(this.state.matchName!=undefined){
	for (var a = 0; a < this.state.matchName.length; a++) {
		for (var b = 0; b < this.state.matchName[a].length;b++) {
			var value = this.state.matchName[a][b];	
			
			if(series_id==value.series_id){
			items1.push(
			<li>
			{Moment(value.open_date).format('LL')}
			<div className="expander" />
			<ul>
			  <li>{value.match_name}</li>
			  <div className="expander" />
				<ul>
				<li>
				<a href={"/matchdetail/"+value.match_id+'/'+"cricket"}>MATCH_ODDS</a>
					
					
					</li>
			
				</ul>
			</ul>
		  </li>)
			}
		
		   
	}

}
$(".blockUI").hide();
	}
	
	  

return items1;

}

showTableHtml = () =>{  
	const items = []
	
for (var a = 0; a < this.state.matchData.length; a++) {

	items.push(
	<li>
		{this.state.matchData[a].series_name}
		<div className="expander"   />
		<ul>
		  {this.showTableHtml1(this.state.matchData[a].series_id)}
		 
		
		  
		</ul>
	  </li>)


	   
}
	return   <ul>
    			{items}
			</ul>
  
}

handleSubmitSoccer =(event) =>{
	event.preventDefault(); 
	

	$(".blockUI").show();
	 let headers={
		Authorization:"Bearer "+ this.state.accessToken,
	 }; 
	  axios.get(baseUrl + '/api/usermatch_serieslist/soccer', {headers}).then((resp) => { 
	   var resp = resp.data;
	   //console.log(resp);

		this.setState({matchData1:resp.data})
		const items2 = []
		for(var index = 0; index < this.state.matchData1.length; index++){
			items2.push(this.state.matchData1[index].series_id)
			
		}
		this.handleSubmitMatchnameSoccer(items2)
		});
		var match = localStorage.getItem("match1");
		if(match!=undefined){
			localStorage.setItem("match1",parseInt(match)+parseInt(1));

		}else{
			localStorage.setItem("match1", 1);
		}
		
}

handleSubmitMatchnameSoccer =(value) =>{
	var match = localStorage.getItem("match1");

	
if(match<=1 || match===undefined){
	let headers={
		Authorization:"Bearer "+ this.state.accessToken,
	 }; 

	 let sendData={
		event_id:value.toString(),
		
	  }; 
	  

	  $(".blockUI").show();  
	  axios.post(baseUrl + '/api/partiuser_match_deatils/soccer',sendData, {headers}).then((resp) => { 
	   var resp = resp.data;
		this.setState({matchName1:resp.data})

 




   
  });
}
	
	
		
}

showTableHtmlSoccer1 = (series_id) =>{  
	const items1 = []
 
	if(this.state.matchName1!=undefined){

	for (var a = 0; a < this.state.matchName1.length; a++) {
		for (var b = 0; b < this.state.matchName1[a].length;b++) {
			var value = this.state.matchName1[a][b];	
			
			if(series_id==value.series_id){
			items1.push(
			<li>
			{Moment(value.open_date).format('LL')}
			<div className="expander" />
			<ul>
			  <li>{value.match_name}</li>
			  <div className="expander" />
				<ul>
				<li><a href={"/matchdetail/"+value.match_id+'/'+"soccer"}>MATCH_ODDS</a></li>
			
				</ul>
			</ul>
		  </li>)
			}
		}
		$(".blockUI").hide();  
	}
}
	
	  

return items1;

}

showTableHtmlSoccer = () =>{  
	const items = []
	
for (var a = 0; a < this.state.matchData1.length; a++) {

	items.push(
	<li>
		{this.state.matchData1[a].series_name}
		<div className="expander"   />
		<ul>
		  {this.showTableHtmlSoccer1(this.state.matchData1[a].series_id)}
		 
		
		  
		</ul>
	  </li>)

	
	   
}
	return   <ul>
    			{items}
			</ul>
  
}



handleSubmitTennis =(event) =>{
	event.preventDefault(); 
	
	$(".blockUI").show();

	 let headers={
		Authorization:"Bearer "+ this.state.accessToken,
	 }; 
	  axios.get(baseUrl + '/api/usermatch_serieslist/tennis', {headers}).then((resp) => { 
	   var resp = resp.data;
	   //console.log(resp);

		this.setState({matchData2:resp.data})
		const items2 = []
		for(var index = 0; index < this.state.matchData2.length; index++){
			items2.push(this.state.matchData2[index].series_id)
			
		}
		this.handleSubmitMatchnameTennis(items2)
		});
		var match = localStorage.getItem("match2");
		if(match!=undefined){
			localStorage.setItem("match2",parseInt(match)+parseInt(1));

		}else{
			localStorage.setItem("match2", 1);
		}

}

handleSubmitMatchnameTennis =(value) =>{
	var match = localStorage.getItem("match2");

	
if(match<=1 || match===undefined){
	let headers={
		Authorization:"Bearer "+ this.state.accessToken,
	 }; 

	 let sendData={
		event_id:value.toString(),
		
	  }; 
	  

	  $(".blockUI").show();  
	  axios.post(baseUrl + '/api/partiuser_match_deatils/tennis',sendData, {headers}).then((resp) => { 
	   var resp = resp.data;
		this.setState({matchName2:resp.data})

 




   
  });
}
	
	
		
}

showTableHtmlTennis1 = (series_id) =>{  
	const items1 = []
 
if(this.state.matchName2!=undefined){
    for (var a = 0; a < this.state.matchName2.length; a++) {
		for (var b = 0; b < this.state.matchName2[a].length;b++) {
			var value = this.state.matchName2[a][b];	
			
			if(series_id==value.series_id){
			items1.push(
			<li>
			{Moment(value.open_date).format('LL')}
			<div className="expander" />
			<ul>
			  <li>{value.match_name}</li>
			  <div className="expander" />
				<ul>
				<li><a href={"/matchdetail/"+value.match_id+'/'+"tennis"}>MATCH_ODDS</a></li>
			
				</ul>
			</ul>
		  </li>)
			}
		
		   
	}
	$(".blockUI").hide();

}
}
	
	  

return items1;

}

showTableHtmlTennis = () =>{  
	const items = []
	if(this.state.matchData2!=undefined){
		for (var a = 0; a < this.state.matchData2.length; a++) {

			items.push(
			<li>
				{this.state.matchData2[a].series_name}
				<div className="expander"   />
				<ul>
				  {this.showTableHtmlTennis1(this.state.matchData2[a].series_id)}
				 
				
				  
				</ul>
			  </li>)
		
			
			   
		}
	}

	return   <ul>
    			{items}
			</ul>
  
}

showSubHtmlMenu=()=>{
	
	if(this.state.customSuperAdmin===true) {
		var session_id=localStorage.getItem("session_id");
		
		if(this.state.session_id!=undefined && this.state.session_id!=""){
			
			if(session_id!=this.state.session_id){
				localStorage.clear();

				return (
					<Redirect to="/login" />
				);
			}
		}
			
		var html_logo="";
		var html_logo2="";
		if("admin.demandexch99.com"!=window.location.hostname){
			var html_logo=	<a className="navbar-brand mr-1" href="home.html"><img src="/img/logo.gif" className="logoman" /><span>Diamond Exchange</span></a> 
		   
		}
		if("admin.demandexch99.com"===window.location.hostname){
			var html_logo2=	<a className="navbar-brand mr-1" href="home.html"><img src="/img/demandexch99.png" className="logoman2" /></a>    
		}
		
		
		var listOfClients = "";
		if(this.state.admin_list){
			listOfClients = <li className="nav-item">
					<Link className="nav-link" to="/adminlist">List of clients</Link>
				  </li>
		}
		
		var manageFancy = "";
		if(this.state.manage_fancy){
			manageFancy = <li className="nav-item">
							<a className="nav-link" href="/manage_fancy/cricket">Manage Fancy </a>
						  </li>
		}
		
		
		var gameList = "";
		 if(this.state.gametypelist){
		 	gameList = <li className="nav-item">
		 					<a className="nav-link" href="/gametypelist">Block Market </a>
		 				  </li>
		 }
		
		var manageMarket = "";
		if(this.state.manage_market){
			manageMarket = <li className="nav-item">
			
							<a className="nav-link" href="/manage-market">Manage Market</a>
						  </li>
		}
		
		var menuMessage = "";
		if(this.state.admin_text_permission){
			menuMessage = <li className="nav-item">
							<a className="nav-link" href="/admin-text">Message</a>
						  </li>
		}
		

		var maintainancePage = "";
		if(this.state.maintainance_page){
			maintainancePage = <li className="nav-item">
							<a className="nav-link" href="javascript:void(0);">Maintainance Page</a>
						  </li>
		}
		 
		return (
	
			
			<nav className="navbar navbar5 navbar-expand navbar-dark static-top">
			{html_logo}
				{html_logo2}
				
			
			   <button className="btn btn-link btn-sm  order-1 order-sm-0 sidebartoggle11"
				onClick={this.toggleDrawer}
				disabled={this.state.open && !this.state.noOverlay}
				>
				{!this.state.open ? <span><i className="fas fa-bars"></i></span>: <span><i className="fas fa-bars"></i></span>}
			  </button>
				  
			  <div className="blockUI blockMsg blockPage" style={{display: "none"}}  ><div className="loading-hold" id="overlay"> <div className="loaderGif"> </div> </div></div>
				  
				
				 <div className="menu2">
				<ul className="nav">
					
					{listOfClients}
					{manageFancy}
					{gameList}
					{manageMarket}
					{menuMessage}
					{maintainancePage}
				  
				</ul>
				
				
				<div className="marquee_box">
				  <div class="alarm_icon"><i class="fas fa-bell"></i></div>
					 <marquee className="marquee_header">{this.state.admin_text}</marquee>
				 
				</div>
			  </div>
			
			
				<ul className="navbar-nav  right_nav">
				
				  <li className="nav-item dropdown no-arrow">
					<a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					  <span>{this.state.username} <i className="fas fa-caret-down fa-fw"></i></span>
					</a>
				   <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
						<Link className="dropdown-item" to="/changepass">Change Password </Link>
						<Link className="dropdown-item" to="/logout" >Signout</Link>
					</div>
				  </li>
				  
				  <li className="lili"> 
				  <form className="d-none d-md-inline-block form-inline ">
				  <div className="input-group">
					<input type="text" className="form-control" placeholder="All Client" aria-label="Search" aria-describedby="basic-addon2" />
					<div className="input-group-append">
					  <button className="btn" type="button">
						<i className="fas fa-search"></i>
					  </button>
					</div>
				  </div>
				</form></li>
				</ul>
				<ReactDrawer
			  open={this.state.open}
			  position={this.state.position}
			  onClose={this.onDrawerClose}
			  noOverlay={this.state.noOverlay}>
			  <i onClick={this.closeDrawer} className="fa fa-times"></i>
			  <ul class="mp_0">
			<li>
			  <ul className="tree">
			   
				<li>
				  Cricket
				  <div className="expander"  id="cricket" onClick={this.handleSubmit}/>
				{this.showTableHtml()}
				</li>
				<li>
				  Football
				  <div className="expander" id="Soccer" onClick={this.handleSubmitSoccer}/>
				{this.showTableHtmlSoccer()}
				</li>


				<li>
				Tennis
				  <div className="expander" id="tennis" onClick={this.handleSubmitTennis}/>
				{this.showTableHtmlTennis()}
				</li>
			  </ul>
			</li>
		  </ul>
			</ReactDrawer>
			  </nav>
					
		);
	}
}



showMainHtmlMenu=()=>{
	if(this.state.customSuperAdmin===false) {
		var session_id=localStorage.getItem("session_id");
		console.log(session_id);
		console.log(this.state.session_id);
		if(this.state.session_id!=undefined && this.state.session_id!=""){
			
			if(session_id!=this.state.session_id){
				localStorage.clear();

				return (
					<Redirect to="/login" />
				);
			}
		}
		var setting="";
		if(this.state.userType===1){
			setting=<li className="nav-item dropdown">
		<Link className="nav-link" to="#">Setting
		<i className="fas fa-caret-down fa-fw"></i></Link>
	<ul className="dropdown-menu" aria-labelledby="userDropdown">
	<li>

	<a className=" dropdown-item" href="/gametypelist">
	Block Market
	</a>
	<a className="dropdown-item" href="/my-market">
	My Market
	</a>
	<a className=" dropdown-item" href="/manage_fancy/cricket">
	Manage Fancy
	</a>
	<a className="dropdown-item" href="/fancy_history">
	Fancy History
	</a>
	<a className="dropdown-item" href="/match_history_details">
	Match History
	</a>
	<a className="dropdown-item" href="/manage-market">
	Manage Market
	</a>

	<a className="dropdown-item" href="/admin-text">
	Message
	</a>

	<a className="dropdown-item" href="/add-privilege">
	Add New Privilege
	</a>
	<a className="dropdown-item" href="/list-privilege">
	List Privilege
	</a>

	</li>

	</ul>
	  </li> ; 
	   var game_list="";
	//   var game_list=<li className="nav-item">
	// 				<Link className="nav-link" to="/gametypelist">Game List</Link>
	// 			  </li>


		}	
		var html_logo="";
		var html_logo2="";
	if("admin.demandexch99.com"!=window.location.hostname){
		var html_logo=	<a className="navbar-brand mr-1" href="home.html"><img src="/img/logo.gif" className="logoman" /><span>Diamond Exchange</span></a> 
	   
	}
	if("admin.demandexch99.com"===window.location.hostname){
		var html_logo2=	<a className="navbar-brand mr-1" href="home.html"><img src="/img/demandexch99.png" className="logoman2" /></a>    
	}
		 
		return (
			
			
			<nav className="navbar navbar5 navbar-expand navbar-dark static-top">
			{html_logo}
				{html_logo2}
				
			
			   <button className="btn btn-link btn-sm  order-1 order-sm-0 sidebartoggle11"
				onClick={this.toggleDrawer}
				disabled={this.state.open && !this.state.noOverlay}
				>
				{!this.state.open ? <span><i className="fas fa-bars"></i></span>: <span><i className="fas fa-bars"></i></span>}
			  </button>
				  
			  <div className="blockUI blockMsg blockPage" style={{display: "none"}}  ><div className="loading-hold" id="overlay"> <div className="loaderGif"> </div> </div></div>
				  
				
				 <div className="menu2">
			   <ul className="nav">

				  <li className="nav-item">
					<Link className="nav-link" to="/adminlist">List of clients</Link>
				  </li>
				  <li className="nav-item">
					<a className="nav-link" href="/market-analysis">Market Analysis </a>
				  </li>
				  <li className="nav-item dropdown ">
					<Link className="nav-link" to="#">Live Market 
					<i className="fas fa-caret-down fa-fw"></i></Link>
			<ul className="dropdown-menu" aria-labelledby="userDropdown">
			<li>
			  <a className=" dropdown-item" href="#">
				Binary
			  </a>
			</li>
			<li className>
			  <a className=" dropdown-item" href="#">
				Baccarat
				
			  </a>
			</li>
			<li className="nav-item">
			<a href="#" className="nav-link">
			<span className="newlacunch-menu">Sports Casino</span></a></li>
		   
			<li>
			  <a className=" dropdown-item" href="#">
				Casino War
				
			  </a>
			</li>
			<li>
			  <a className=" dropdown-item" href="/worli-list">
				Worli
				
			  </a>
			</li>
			<li>
			  <a className=" dropdown-item" href="card32-list">
				3 Cards Judgement
				
			  </a>
			</li>
			<li>
			  <a className=" dropdown-item" href="/card32-list">
				32 Cards Casino
				
			  </a>
			</li>
			<li>
			  <a className=" dropdown-item" href="/teenpatti-list">
				Live TeenPatti
			  </a>
			</li>
		  
			<li>
			  <a className=" dropdown-item" href="/livepoker-list">
				Live Poker
			  </a>
			</li>
			<li className>
			  <a className=" dropdown-item" href="/andar-bahar-list">
				Andar Bahar
			  </a>
			</li>
			<li>
			  <a className=" dropdown-item" href="/lucky7-list">
				Lucky 7
			  </a>
			</li>
			
			<li className>
			  <a className=" dropdown-item" href="/d-t">
			 DRAGON TIGER
			  </a>
			</li>
		  
			<li className>
			  <a className="dropdown-item" href="#">
				Cricket Casino
			  </a>
			</li>
		  </ul>
				  </li>
				  <li className="nav-item dropdown">
					<Link className="nav-link" to="#">Reports
					<i className="fas fa-caret-down fa-fw"></i></Link>
			<ul className="dropdown-menu" aria-labelledby="userDropdown">
			<li>
			  <a className=" dropdown-item" href="/admin-transactions">
				Account's Statement
			  </a>
			</li>
			<li className>
			  <a className=" dropdown-item" href="/user-bet-list">
				Current Bets
			  </a>
			</li>
			<li className>
			  <a className=" dropdown-item" href="/general-report">
			   General Report           
			  </a>
			</li>
		  
			
			<li>
			  <a className=" dropdown-item" href="/casino-report">
				Casino Report
				
			  </a>
			</li>
			<li>
			  <a className=" dropdown-item" href="/profitloss">
				Profit And Loss            
			  </a>
			</li>
			<li>
			  <a className=" dropdown-item" href="/casino-result-report">
				Casino Result Report
			  </a>
			</li>
		 </ul>
				  </li> 
				 {game_list}
				
				 {setting}
				  
				</ul>
				
				
				<div className="marquee_box">
				  <div class="alarm_icon"><i class="fas fa-bell"></i></div>
					 <marquee className="marquee_header">{this.state.admin_text}</marquee>
				 
				</div>
			  </div>
			
			
			
			  
			
			  
		
			

			
				<ul className="navbar-nav  right_nav">
				
				  <li className="nav-item dropdown no-arrow">
					<a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					  <span>{this.state.username} <i className="fas fa-caret-down fa-fw"></i></span>
					</a>
				   <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
						<Link className="dropdown-item" to="/changepass">Change Password </Link>
						<Link className="dropdown-item" to="/logout" >Signout</Link>
					</div>
				  </li>
				  
				  <li className="lili"> 
				  <form className="d-none d-md-inline-block form-inline ">
				  <div className="input-group">
					<input type="text" className="form-control" placeholder="All Client" aria-label="Search" aria-describedby="basic-addon2" />
					<div className="input-group-append">
					  <button className="btn" type="button">
						<i className="fas fa-search"></i>
					  </button>
					</div>
				  </div>
				</form></li>
				</ul>
				<ReactDrawer
			  open={this.state.open}
			  position={this.state.position}
			  onClose={this.onDrawerClose}
			  noOverlay={this.state.noOverlay}>
			  <i onClick={this.closeDrawer} className="fa fa-times"></i>
			  <ul class="mp_0">
			<li>
			  <ul className="tree">
			   
				<li>
				  Cricket
				  <div className="expander"  id="cricket" onClick={this.handleSubmit}/>
				{this.showTableHtml()}
				</li>
				<li>
				  Football
				  <div className="expander" id="Soccer" onClick={this.handleSubmitSoccer}/>
				{this.showTableHtmlSoccer()}
				</li>


				<li>
				Tennis
				  <div className="expander" id="tennis" onClick={this.handleSubmitTennis}/>
				{this.showTableHtmlTennis()}
				</li>
			  </ul>
			</li>
		  </ul>
			</ReactDrawer>
			  </nav>
					
		);
	}
}

  render() {
	return(
		<div>
		{this.showSubHtmlMenu()}
		{this.showMainHtmlMenu()}
		</div>
	)
  }
}

export default Header;
