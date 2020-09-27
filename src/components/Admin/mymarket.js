import React, { Component } from 'react';
import Header from '../Header/Header';
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Moment from 'moment'; 
import Loading from 'react-fullscreen-loading';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
const $ = window.$;
const baseUrl = "http://172.105.40.76:4000"; 
class Index extends Component {

	constructor(props) {
		super(props);
		var accessToken = localStorage.getItem("token");
		this.state = { accessToken: accessToken,gotoindex:false,loading:true,session_id:"",matchData2:"" ,match_odds:"",sports:"",sport_data:"",
		html1 :"",
	};

	} 
	
	componentWillMount() { 
	
		if(this.props.match.params.id===undefined){
			this.setState({gotoindex:true});
		}
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 
		
		axios.get(baseUrl + '/api/current-sports',{headers}).then((resp) => {  
			
			
				
				this.setState({sports:resp.data})
				this.activeSport(resp.data);
			
		
				setInterval(() => {this.callMattchListApiSetTimeOut()}, 4000);
		
			
		
			
		});  
	}

	handleSubmit=(id,type,sport_name)=> {
		
		 let headers={
			Authorization:"Bearer "+ this.state.accessToken,
		 }; 
		 let sendData={
			match_id:id,
			type:type,
			sport_name:sport_name
		   }; 
		 axios.post(baseUrl + '/api/match-update',sendData, {headers}).then((resp) => {
			//this.handleModal("close");
			   var respNew = resp.data;
			   if(respNew.success === true){
	  
				  this.setState({respStatus:respNew.success });
				  if(this.state.sport_data!='undefined'){
					setTimeout(() => {this.callMattchListApiSetTimeOut()}, 4000);
					}
				 // setTimeout(() => { window.location = '/manage-market'}, 2000);  
	  
			   }else{
				  this.setState({respStatus:respNew.success });
			   }
		 });
	   };
	   responseHtml = () =>{ 
   
		if(this.state.respStatus === true) {
		  return (
		   <div className="alert alert-success">
		   Status Change Sucessfully
		   </div>
		  )
	   }
	} 
	  
	submit = (id,type,match_name) => {
		confirmAlert({
		  title: 'Confirm',
		  message: 'Are you sure to do this.',
		  buttons: [
			{
			  label: 'Yes',
			  onClick: () => this.handleSubmit(id,type,match_name)
			},
			{
			  label: 'No',
			  
			}
		  ]
		});
	  };
	handleFormSubmit =(sport_name) => {
		
		
		
		 let headers={
			  Authorization:"Bearer "+ localStorage.getItem("token"),
		  }; 
		  var data2234 ="";
		var data2234 ="";
		  axios.get(baseUrl + '/api/cricket_data/'+sport_name,{headers}).then((resp) => { 
			 //var resp = resp.data;
			 if(sport_name==="tennis"){
				var data2233=JSON.parse(resp.data.showdata.tennis);
				var data2234=JSON.parse(resp.data.showdata.tennis_bookmaker);
			}
			else if(sport_name==="cricket"){
				var data2233=JSON.parse(resp.data.showdata.cricket);
				var data2234=JSON.parse(resp.data.showdata.cricket_bookmaker);
			}
			else if(sport_name==="soccer"){
				var data2233=JSON.parse(resp.data.showdata.soccer);
				var data2234=JSON.parse(resp.data.showdata.soccer_bookmaker);
			}
			
			
			var resp = resp.data; 
			
			
			var getResult = data2233['myArr']; 
			
			var getResult2 = data2234['myArr1'];   
			
			if(resp.success===true){
			
				this.setState({matchData:getResult,matchData2:getResult2,DataFound:true,loading:false,matchDataFound:true,sport_name:sport_name});
			} else{
				$(".blockUI").hide();
				this.setState({loading:false,matchDataFound:false});

			}   
			 
			}); 
	  }

	
	activeSport = (data) => {
		var newarray =[];
			for(var index=0;index<data.data.length;index++){
				//console.log(data.data[index]);
				var newarray1=<li className="nav-item"><a href="#"  onClick={this.handleFormSubmit.bind(this,data.data[index].sport_name)} className="nav-link">{data.data[index].sport_name.toUpperCase()}</a></li>
				newarray.push(newarray1);
			}
		this.setState({sport_data:newarray})
	}

	callMattchListApiSetTimeOut = () => {
		/* let Postid = { 
			id: this.props.match.params.id
		};  
		 axios.post(baseUrl + '/api/totalmatchlist',Postid).then((resp) => { 
			var resp = resp.data; 
			var getResult = JSON.parse(resp.data);   
			if(resp.success===true){
				this.setState({matchData:getResult.result,matchDataFound:true});
			}    
		});  */
		
		console.log(this.state.sport_name);
		if(this.state.sport_name==undefined){
			this.state.sport_name="cricket";
		}
		this.setState({loading:true});
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 
		let Postid = this.state.sport_name;  
		//console.log(Postid);
		var newvalue=""
		
		var data2234 ="";
		var data2234 ="";
		 axios.get(baseUrl + '/api/cricket_data/'+Postid,{headers}).then((resp) => { 
			$(".blockUI").hide();
			if(Postid==="tennis"){
				var data2233=JSON.parse(resp.data.showdata.tennis);
				var data2234=JSON.parse(resp.data.showdata.tennis_bookmaker);
			}
			else if(Postid==="cricket"){
				var data2233=JSON.parse(resp.data.showdata.cricket);
				var data2234=JSON.parse(resp.data.showdata.cricket_bookmaker);
			}
			else if(Postid==="soccer"){
				var data2233=JSON.parse(resp.data.showdata.soccer);
				var data2234=JSON.parse(resp.data.showdata.soccer_bookmaker);
			}
			console.log(data2233);
			
			var resp = resp.data; 
			
			if(data2233!=undefined){
				var getResult = data2233['myArr']; 
			}
			if(data2234!=undefined){
				var getResult2 = data2234['myArr1'];   

			}
			
			
			if(resp.success===true){
			
				this.setState({matchData:getResult,matchData2:getResult2,DataFound:true,loading:false,matchDataFound1:true,match_odds:true});
				
			} else{
				$(".blockUI").hide();
				this.setState({loading:false,matchDataFound:false});

			}   
		}); 
		
	}
	

	showTableHtml = (sport_name) =>{  
		const html = []   
	if(this.state.matchDataFound===true){  
			
			if(this.state.matchData===undefined){ 
				return <center>No bet markets!</center>
			}else{ 

			var matchName =""; 
			var fancy="";
			var bookmaker ="";
			var FancyClass ="";
			var iplay ="False";
			var j =0;
			let promises = [];
			let html1 = [];
			
			for (var a = 0; a < this.state.matchData.length; a++) {
				
				for (var b = 0; b < this.state.matchData[a].length;b++) {
					const value = this.state.matchData[a][b];
						
						let headers = {
							Authorization: "Bearer " + this.state.accessToken,
						};
						var bm="";
						
							// axios.get(baseUrl + '/api/manage_data/'+value.match_id,{headers}).then((resp1) => {  
								
							// 	html1[value.match_id]=resp1.data.data;
							// })
					
							
							
						
							  
								
								
							
							
							
									
								
								
								
								
								
								
								
								
								//console.log(profit14);
									//console.log(profit13);
								
								
							
							
							
							
							var inPlayClass = iplay!="False" && iplay!=undefined && iplay!="" ? "active" :"";  
							var FancyClass = fancy!=undefined && fancy!="" ? "fancy-icon" :""; 
							var bookmakerClass = bookmaker!=undefined && bookmaker!="" ? "bookmaker-icon" :""; 
							
							
									// if(value.eventName!==matchName){ 
									html.push(<tr > 
									<td key={value.match_name} id={value.match_name}> 
									<div className="game-name">
										 <a className="text-dark" href={"/matchdetail/"+value.match_id+"/"+sport_name}>{value.match_name}/{Moment(value.open_date).format('lll')} </a> </div> 
										 <div className="game-icons"> 
										 
										
										  </div> </td> 
										 <td>
										 <a className="text-dark" href={"/matchdetail/"+value.match_id+"/"+sport_name}>Action </a> 

											 
											 
										</td> 
										 </tr>);
									// } 
											
								var matchName = value.name; 
						
						//console.log(this.state.match_odds);
						
							
									
						
						var drawFirstBack =[];
						 ////console.log(j);
						 
						
							
							
							 
					
					}
							
					
					
				
					
				
				
				j++
							
				
			
				} 
				
				html1.map((value, index) => (
					console.log(value)
				))
			
				console.log(html1);
				
			
				
			}
			return  <table className="table"><thead><tr> <th > Game</th> <th >  </th></tr></thead><tbody>{html}</tbody></table>; 
		}else{
			return  <table className="table"><thead><tr> <th > Game</th> <th colSpan="2"> 1 </th> <th colSpan="2"> X </th><th colSpan="2"> 2 </th></tr></thead><tbody><center>No real-time records found</center></tbody></table>;
		}
		
	}



	render() {
		var accessToken = this.state.accessToken;
		

		var session_id=localStorage.getItem("session_id")
		if (accessToken === "" || accessToken === null) {
			return (
				<Redirect to="/login" />
			);
		} 
		var change_password=localStorage.getItem("change_password")
		if (change_password!="" && change_password!=null) {
			return (
				<Redirect to="/change_password" />
			);
		}
		
		var popupdta ="";
		if(localStorage.getItem("popup")==1)
		{
			var popupdta=<div className="popop_boxman wow zoomIn animated " style={{ display: "none" }} data-wow-delay="0.1s">
			<div className="popop_box">
			<div className="popop_header">
			<span id="close">x</span>
			</div>
            <img className="img-fluid" src="/img/popup21dim.jpg" /> 
			</div>
		   </div> 
		   localStorage.setItem("popup",2);
		}
		return (
			<div>
				

				{/* <img src="/img/ajax-loader.gif" /> */}
			
			<Header />
				
				<div id="wrapper"> 
					
					<div id="content-wrapper">
<div className="container-fluid">
<div className="man_bglight">
<h3 class="a_manh">My Market</h3>
<ul role="tablist" id="home-events" className="nav nav-tabs nav-tabs22">
			{this.state.sport_data}
			{this.responseHtml()}
</ul>
<br/>


						
							<div className="tab-content">
								<div id="home" className="tab-pane active">
								
									 <div className="coupon-card coupon-card-first">
										<div className="card-content" id="home_match_data">
										<div className="">
										{this.showTableHtml(this.state.sport_name)} 
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

export default Index;