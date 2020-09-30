import React, { Component } from 'react';
import Header from '../Header/Header';
import {Link,Redirect} from "react-router-dom";
import axios from "axios";
import Moment from 'moment'; 
import Modal from "react-bootstrap-modal";
import DataTable, { createTheme } from 'react-data-table-component';
import loadjs from 'loadjs'
require("react-bootstrap-modal/lib/css/rbm-complete.css");

createTheme('solarized', {
  text: {
    primary: '#268bd2',
    secondary: '#2aa198',
  },
  background: {
    default: '#002b36',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
});

const columns = [
  {
    name: 'Game',
    selector: 'game',
	sortable: true
  },
  {
    name: 'Status',
    selector: 'status',
	sortable: true
  },
  {
    name: 'Action',
    selector: 'action',
	sortable: true
  },  {
    name: 'Maximum Bet Limit',
    selector: 'maximum_bet_limit',
	sortable: true
  },
  {
    name: 'Winner Selection',
    selector: 'winner_selection',
	sortable: true
  },
   {
    name: 'Suspend Match',
    selector: 'suspend_match',
	sortable: true
  }
];
const $ = require('jquery');
const baseUrl = "http://18.159.217.229:4000"; 
class MatchList extends Component { 
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
					  respInactiveMessage:"",
					  respInactiveStatus:"",
					  user_id:user_id,
					  maximum_bet_limit:0,
					  matchData1:"",
					  matchData2:"",
					  resp1:"",
					  min_bet_limit:0,
					  suspend_match:"",
					  maximum_bet_limit1:0,
					minimum_bet_limit2:0
					};
		
	}	  
	componentWillMount() { 
		
       this.callAdminTable();
       this.currentUserData();
	}
  
	callAdminTable=()=>{
		//$(".blockUI).show();
		var gameTypeId = this.props.match.params.id;
		let headers={
            Authorization:"Bearer "+ this.state.accessToken,
        };  
        axios.get(baseUrl + '/api/adminmatchlist/'+gameTypeId, {headers}).then((resp) => { 
		 var respNew = resp.data; 
		 var respNew1 = resp.data1; 
		
			if(respNew.success === true){
				if(gameTypeId==="tennis"){
					var data2233=JSON.parse(resp.data.data.tennis);
					var data2234=JSON.parse(resp.data.data.tennis_bookmaker);
				}
				else if(gameTypeId==="cricket"){
					var data2233=JSON.parse(resp.data.data.cricket);
					var data2234=JSON.parse(resp.data.data.cricket_bookmaker);
				}
				else if(gameTypeId==="soccer"){
					var data2233=JSON.parse(resp.data.data.soccer);
					var data2234=JSON.parse(resp.data.data.soccer_bookmaker);
				}
				var getResult = data2233['myArr']; 
				var getResult2 = data2234['myArr1'];   
				this.setState({matchData:getResult,matchData2:getResult2,matchData1:respNew.inactive_matches,respStatus:respNew.success,suspend_match:respNew.suspend_match });
				this.showTableHtml();
			
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
		//$(".blockUI).hide();
	}
	
	showTableHtml = () =>{   
		if(this.state.respStatus===true){  
				var html1 = []  
				
					//return <center>No bet markets!</center>
					var inactiveMatches = this.state.matchData1;
					var suspend_matches = this.state.suspend_match;

					
				var matchName =""; 
				var showAction4 ="";
				for (var a = 0; a < this.state.matchData.length; a++) {
					for (var b = 0; b < this.state.matchData[a].length;b++) {
						const value = this.state.matchData[a][b];
						console.log(value);
						var realStatus = 'Active';
			var showAction = 'Click To InActive';
			var showAction2 = 'Maximum Bet Limit';
			var showAction3 = 'winner Selection';
			
			var setAction = "inactive";
			if(inactiveMatches!=undefined){
			if(inactiveMatches.indexOf(parseInt(value.match_id)) >= 0){
				 realStatus = 'InActive';
				 var showAction = 'Click To Active';
				 var setAction = "active";
			}
		}
			if(suspend_matches!=undefined){
				console.log(suspend_matches);
				console.log(suspend_matches.indexOf(value.match_id));
				if(suspend_matches.indexOf(value.match_id) >= 0){
					 showAction4 = 'Un-Suspend Match';
				}else{
					showAction4 = 'Suspend Match';
				}
			}else{
				showAction4 = 'Suspend Match';
			}
			

			
					var mainHtml=""
							var inPlayClass = (value.inPlay===true) ? "active" :"";  


							var mainHtml = <tr role="row" className="odd">
							<td className="text-right"><a href={"/fancy-details/"+value.match_id+"/"+this.props.match.params.id}>{value.match_name+"/"+Moment(value.open_date).format('lll')}</a></td>
							<td  className="text-right">{realStatus}</td>
							<td  className="text-right"><a href="javascript:void(0);" onClick={this.handleInactiveModelOpen.bind(this,value.match_id,value.match_name,setAction)}>{showAction}</a></td>
							<td  className="text-right"><a href="javascript:void(0);" onClick={this.winTeam.bind(this,value.match_id,value.match_name,setAction)}>{showAction2}</a></td>
							<td  className="text-right"><a href="javascript:void(0);" onClick={this.winTeamSelection.bind(this,value.match_id,value.match_name,setAction)}>{showAction3}</a></td>
							<td><span className="btn btn-default"><a href="javascript:void(0);" onClick={this.handleSuspendModelOpen.bind(this,value.match_id,value.match_name,setAction)}>{showAction4}</a></span></td>
							<td className="text-right"><a href={"/fancy-details/"+value.match_id+"/"+this.props.match.params.id}>Manage Fancy</a></td>
						</tr>;











								// if(value.eventName!==matchName){ 
								
									
									
								
									
									
									html1.push(mainHtml);
								};
								
								
			
						}
						
						loadjs(['/js/custom.js'], function() {
      
						});
						return <tbody>{html1}</tbody>;
					}
				} 
	
					//this.setState({html11:html1});			
				
				

				
	showTableHtml1 = () =>{
	  if(this.state.respStatus===true){ 
		  const html = []
		 //this.state.tabledata.map(function(value, i){ 
		 var inactiveMatches = this.state.tabledata.inactive_matches;
		  var inactiveMatches = this.state.tabledata.inactive_matches;

		
		 for(var i=0;i<this.state.tabledata.allmatches.length;i++) {
			 
			 var value = this.state.tabledata.allmatches[i].event;
			
			var realStatus = 'Active';
			var showAction = 'Click To InActive';
			var showAction2 = 'Maximum Bet Limit';
			var setAction = "inactive";
			if(inactiveMatches.indexOf(parseInt(value.id)) >= 0){
				 realStatus = 'InActive';
				 var showAction = 'Click To Active';
				 var setAction = "active";
			}
			console.log(value.name);
			if(value.name.includes(" v ")) {			
				
				var mainHtml = {game:value.name+"/"+Moment(value.openDate).format('lll')+" (IST)",
							status:realStatus,
							action:<a href="javascript:void(0);" onClick={this.handleInactiveModelOpen.bind(this,value.id,value.name,setAction)}>{showAction}</a>,
							maximum_bet_limit:<a href="javascript:void(0);" onClick={this.winTeam.bind(this,value.id,value.name,setAction)}>{showAction2}</a>
						};
				html.push(mainHtml);			
			}
		} 
		return  <DataTable  columns={columns} data={html} pagination={true} />;
	  }
	}
  
   
   handleInactiveModelSubmit =(event) =>{
	    event.preventDefault(); 

		let sendData={
            event_id:this.state.event_id,
            event_name:this.state.event_name,
            event_action:this.state.event_action
          }; 


         let headers={
            Authorization:"Bearer "+ this.state.accessToken,
         }; 
          axios.post(baseUrl + '/api/admin_hide_match',sendData, {headers}).then((resp) => { 
           var resp = resp.data;
           if(resp.success === true){
				this.setState({respInactiveStatus:resp.success,
							  respInactiveMessage:resp.message,
                              event_id:"",
                              event_action:"",
                              event_name:""
                          });
				 this.callAdminTable();
				setTimeout(() => {this.setState({ respInactiveStatus: "",showInactiveModel:false });}, 2000);
						
              }else{
				this.setState({respInactiveStatus:resp.success,respInactiveMessage:resp.message});
				setTimeout(() => {this.setState({ respInactiveStatus: "" });}, 2000);  
          
              }
           
          });
   }

   handleSuspendeModelSubmit =(event) =>{
	event.preventDefault(); 

	let sendData={
		event_id:this.state.event_id,
		
	  }; 


	 let headers={
		Authorization:"Bearer "+ this.state.accessToken,
	 }; 
	  axios.post(baseUrl + '/api/suspend_data',sendData, {headers}).then((resp) => { 
	   var resp = resp.data;
	   if(resp.success === true){
			this.setState({respInactiveStatus:resp.success,
						  respInactiveMessage:resp.message,
						  event_id:"",
						  event_action:"",
						  event_name:""
					  });
			 this.callAdminTable();
			setTimeout(() => {window.location.reload();}, 2000);
					
		  }else{
			this.setState({respInactiveStatus:resp.success,respInactiveMessage:resp.message});
			setTimeout(() => {window.location.reload();}, 2000);  
	  
		  }
	   
	  });
}
   handleBetLimitModelSubmit =(event) =>{
	event.preventDefault(); 
	
	let sendData={
		event_id:this.state.event_id,
		event_name:this.state.event_name,
		maximum_bet_limit:this.state.maximum_bet_limit,
		minimum_bet_limit:this.state.min_bet_limit,


	  }; 


	 let headers={
		Authorization:"Bearer "+ this.state.accessToken,
	 }; 
	  axios.post(baseUrl + '/api/maximum_bet_limit',sendData, {headers}).then((resp) => { 
	   var resp = resp.data;
	   if(resp.success === true){
			this.setState({respInactiveStatus:resp.success,
						  respInactiveMessage:resp.message,
						  event_id:"",
						  maximum_bet_limit:"",
						  event_name:""
					  });
			 this.callAdminTable();
			setTimeout(() => {this.setState({ respInactiveStatus: "",showWinModel:false });}, 2000);
					
		  }else{
			this.setState({respInactiveStatus:resp.success,respInactiveMessage:resp.message});
			setTimeout(() => {this.setState({ respInactiveStatus: "" });}, 2000);  
	  
		  }
	   
	  });
}

handleWinModelSubmit =(event) =>{
	event.preventDefault(); 
	var looser_id="";
	
	var explode = this.state.win_team.split("/");
	//console.log()
	if(explode[0]!=this.state.second_team){
		var looser_id=this.state.second_team;

	}else{
		var looser_id=this.state.first_team;
	}
	
	if(explode[1]!=this.state.first_team_name){
		var looser_team=explode[0];

	}else{
		var looser_team=this.state.second_team_name;
	}



	let sendData={
		event_id:this.state.event_id,
		win_team:this.state.win_team,
		looser_id:looser_id,
		win_team_name:explode[1],
		looser_team:looser_team,
		sport_type:this.props.match.params.id
		

	  }; 


	 let headers={
		Authorization:"Bearer "+ this.state.accessToken,
	 }; 
	  axios.post(baseUrl + '/api/set_winner_by_admin',sendData, {headers}).then((resp) => { 
	   var resp = resp.data;
	   if(resp.success === true){
			this.setState({respInactiveStatus:resp.success,
						  respInactiveMessage:resp.message,
						  event_id:"",
						  win_team:"",
						  event_name:""
					  });
			 this.callAdminTable();
			setTimeout(() => {this.setState({ respInactiveStatus: "",winTeamSelectionModel:false });}, 2000);
					
		  }else{
			this.setState({respInactiveStatus:resp.success,respInactiveMessage:resp.message});
			setTimeout(() => {this.setState({ respInactiveStatus: "" });}, 2000);  
	  
		  }
	   
	  });
}







   	responseInactiveHtml = () =>{ 
      if(this.state.respInactiveStatus === false) {
          return (
          <div className="alert alert-danger">
          {this.state.respInactiveMessage}
          </div>
          )
        }
        else if(this.state.respInactiveStatus === true) {
           return (
            <div className="alert alert-success">
            {this.state.respInactiveMessage}
            </div>
           )
        }
     } 
	 
   handleInactiveModelOpen=(getEventId,getEventName,getAction)=>{
	   this.setState({showInactiveModel:true,
					  event_id:getEventId,
					  event_action:getAction,
					  event_name:getEventName});
   }   
   handleSuspendModelOpen=(getEventId,getEventName,getAction)=>{
	this.setState({showSuspendModel:true,
				   event_id:getEventId,
				   event_action:getAction,
				   event_name:getEventName});
}   






   winTeam=(getEventId,getEventName,getAction)=>{
	let headers={
		Authorization:"Bearer "+ this.state.accessToken,
	 };
	axios.get(baseUrl + '/api/maxbet_minbet/'+getEventId, {headers}).then((resp) => {
		const new_array = {};
		var maximum_bet_limit =0;
		var minimum_bet_limit =0;
		if(resp.data.adminlist!=null){
			if(resp.data.adminlist.maximum_bet_limit!=undefined)
			{
				var maximum_bet_limit =resp.data.adminlist.maximum_bet_limit;
	
			}
			if(resp.data.adminlist.minimum_bet_limit!=undefined)
			{
				var minimum_bet_limit =resp.data.adminlist.minimum_bet_limit;
	
			}
		}
	
		this.setState({showWinModel:true,
			event_id:getEventId,
			event_action:getAction,
			event_name:getEventName,
			maximum_bet_limit1:maximum_bet_limit,
			minimum_bet_limit2:minimum_bet_limit
		});
	});
	
	
}

winTeamSelection=(getEventId,getEventName,getAction)=>{
	//$(".blockUI).show();
	let headers={
		Authorization:"Bearer "+ this.state.accessToken,
	 };
	axios.get(baseUrl + '/api/usermatchdetail/'+getEventId+'/'+this.props.match.params.id, {headers}).then((resp) => {
		const new_array = {};
		var resp11 = resp.data.data;
		
		let HTML = resp.data.data1[0].match_name;
let re =" v ";
let result = HTML.match(re);
//console.log(result);
		
console.log(resp11);
		if(result!=null ){
			if(resp.data.data1!=undefined){
				if(resp.data.data1[0]!=undefined){
					var explode = resp.data.data1[0].match_name.split(" v ");
					new_array['second_team_name']=explode[1];
					new_array['first_team_name']=explode[0];
					}else{
						var explode = resp.data.data1[0].match_name.split(" VS ");
						//console.log(explode);
						new_array['second_team_name']=explode[1];
						new_array['first_team_name']=explode[0];
					}
				}
				
			}
			
		if(resp11!=undefined){
			Object.values(resp11[0]).forEach(getResult => {
				console.log(getResult);
				// new_array['second_team']=getResult.runners[1].selectionId;
				// new_array['first_team']=getResult.runners[0].selectionId;
				
			});
		}
		
		
		this.setState(new_array);
		this.setState({winTeamSelectionModel:true,
			event_id:getEventId,
			event_action:getAction,
			event_name:getEventName,
		});
		
		  
		
	})
	

	
}


handleChange = (event)=> {
    this.setState({win_team: event.target.value});
  }

  
   handleInactiveModelClose=()=>{
	   this.setState({showInactiveModel:false,
		winTeamSelectionModel:false,
		showSuspendModel:false,
		showWinModel:false,

					  event_id:"",
					  event_action:"",
					  event_name:""});
   }
   
   handleChangeData=(data)=>{
	this.setState({
		maximum_bet_limit:data.target.value,
		maximum_bet_limit1:data.target.value
		
		//minimum_bet_limit2:0
	})
}
handleChangeDataNew=(data)=>{
	this.setState({
		min_bet_limit:data.target.value,
		minimum_bet_limit2:data.target.value
	})
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
				 <h3 className="a_manh">Match List</h3>
				
				 </div>
				 <div className="col-sm-12 col-md-6">
					<div id="account-statement_filter" className="dataTables_filter">
					  
					   
					</div>
				 </div>
			  </div>
			  <div className="row">
				 <div className="col-sm-12">
				 <div className="col-sm-12">
				 <div className="table-responsive">
					<table id="account-statement" className="display dataTable" >
					   <thead>
					 
						  <tr role="row">
							 <th  >Game</th>
							 <th  >Status </th>
							 <th  >Action</th>
							 <th  >Maximum Bet Limit</th>
							 <th  >Winner Selection</th>
							 <th >Suspend Match</th>
							 <th >Manage Fancy</th>
							
							
						  </tr>
					   </thead>

					  {this.showTableHtml()}
					</table>
				 </div>
				 </div>
			  
				{/* <DataTable  columns={columns} data={this.state.html11} pagination={true} /> */}
					  
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
	
	 <Modal show={this.state.showInactiveModel} onHide={this.handleInactiveModelClose}>
		<form className="form loginform" onSubmit={this.handleInactiveModelSubmit}>
			
			<Modal.Header >
				<Modal.Title>Show/Hide Match</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			<div className="row form-group">
			  
			  <div className="col-md-8">
				Do you really want to {this.state.event_action} {this.state.eventName} Match ?
			  </div>
			  </div>
			
			
			</Modal.Body>
			<Modal.Footer>
				{this.responseInactiveHtml()}
				
				<button type="button" className="btn btn-info" data-dismiss="modal" onClick={this.handleInactiveModelClose}><i className="fas fa-undo-alt"></i> No </button>
				<button type="submit" className="btn btn-primary"><i className="fas fa-paper-plane"></i> Yes</button>	
			</Modal.Footer>
		</form>
      </Modal>
	  <Modal show={this.state.showWinModel} onHide={this.handleInactiveModelClose}>
		<form className="form loginform" onSubmit={this.handleBetLimitModelSubmit}>
			
			<Modal.Header >
				<Modal.Title>Set Min and Max Limit</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			<div className="row form-group">
			  
		  <div className="row form-group">
			  <div className="col-md-4">
				<label> Min Limit</label>
			  </div>
			  <div className="col-md-8">
				<input type="text" required name="min_bet_limit" value={this.state.minimum_bet_limit2} onChange={this.handleChangeDataNew}  className="form-control intr" />
			  </div>
			  </div>
			  <div className="row form-group">
			  <div className="col-md-4">
				<label> Max Limit</label>
			  </div>
			  <div className="col-md-8">
				<input type="text" required name="max_bet_limit" value={this.state.maximum_bet_limit1} onChange={this.handleChangeData}  className="form-control intr" />
			  </div>
			  </div>
			
			
			  </div>
			
			
			</Modal.Body>
			<Modal.Footer>
				{this.responseInactiveHtml()}
				
				<button type="button" className="btn btn-info" data-dismiss="modal" onClick={this.handleInactiveModelClose}><i className="fas fa-undo-alt"></i> No </button>
				<button type="submit" className="btn btn-primary"><i className="fas fa-paper-plane"></i> Yes</button>	
			</Modal.Footer>
		</form>
      </Modal>
	  
	  <Modal show={this.state.winTeamSelectionModel} onHide={this.handleInactiveModelClose}>
		<form className="form loginform" onSubmit={this.handleWinModelSubmit}>
			
			
			<Modal.Header >
				<Modal.Title>Choose To Win Match</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			<div className="row form-group">
			  
			<div className="row form-group">
			  <div className="col-md-4">
				<label>Winning Team Select</label>
			  </div>
			  <div className="col-md-8">
			  <select name="win_team" id="win_team" onChange={this.handleChange} required >
			  <option value="">Please Select Winning Team</option>
			  <option value={this.state.first_team+"/"+this.state.first_team_name}>{this.state.first_team_name}</option>
				<option value={this.state.second_team+"/"+this.state.second_team_name}>{this.state.second_team_name}</option>
				<option value={2+"/"+"Draw"}>Draw</option>

</select>
			  </div>
			  </div>
			
			
			  </div>
			
			
			</Modal.Body>
			<Modal.Footer>
				{this.responseInactiveHtml()}
				
				<button type="button" className="btn btn-info" data-dismiss="modal" onClick={this.handleInactiveModelClose}><i className="fas fa-undo-alt"></i> No </button>
				<button type="submit" className="btn btn-primary"><i className="fas fa-paper-plane"></i> Yes</button>	
			</Modal.Footer>
		</form>
      </Modal>
	  <Modal show={this.state.showSuspendModel} onHide={this.handleSuspendModelClose}>
		<form className="form loginform" onSubmit={this.handleSuspendeModelSubmit}>
			
			<Modal.Header >
				<Modal.Title>Suspend Match</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			<div className="row form-group">
			  
			  <div className="col-md-8">
				Do you really want to Suspend This Match ?
			  </div>
			  </div>
			
			
			</Modal.Body>
			<Modal.Footer>
				{this.responseInactiveHtml()}
				
				<button type="button" className="btn btn-info" data-dismiss="modal" onClick={this.handleInactiveModelClose}><i className="fas fa-undo-alt"></i> No </button>
				<button type="submit" className="btn btn-primary"><i className="fas fa-paper-plane"></i> Yes</button>	
			</Modal.Footer>
		</form>
      </Modal>
	 
	</div>
    );
  }
}

export default MatchList;
