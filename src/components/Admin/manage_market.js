import React, { Component } from 'react';
import Header from '../Header/Header';
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Moment from 'moment'; 
import Modal from "react-bootstrap-modal";
import Loading from 'react-fullscreen-loading';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
const $ = window.$;
const baseUrl = "http://18.159.217.229:4000"; 
class Index extends Component {

	constructor(props) {
		super(props);
		var accessToken = localStorage.getItem("token");
		this.state = {  accessToken: accessToken,
						gotoindex:false,
						loading:true,
						session_id:"",
						matchData2:"" ,
						match_odds:"",
						sports:"",
						sport_data:"",
						html1 :"",
						showBookmakerPopup:false,
						row_match_id:false,
						row_market_id:"",
						row_match_name:"",
						row_sport_type:"",
						row_sport_id:"",
						row_match_name:"",
						firstTeam:"",
						first_team_back:"",
						first_team_lay:"",
						secondTeam:"",
						second_team_back:"",
						second_team_lay:"",
						draw_back:"",
						draw_lay:"",
						back_jump:"",
						draw:"The Draw",
						drawDisplay:"none",
						enable_draw:false,
						draw_suspend:false,
						first_team_suspend:false,
						second_team_suspend:false,
						enableChecked:false,
						disableChecked:false,
						bookmakerChange:false,
						max_bookmaker_limit:"",
						min_bookmaker_limit:""

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
			
		
				//setInterval(() => {this.callMattchListApiSetTimeOut()}, 4000);
		
			
		
			
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

  
  	
   handleChange = (event)=> {
		let {name,value} = event.target;
		if(name==="back_jump" && value!==""){
			this.setState({first_team_lay:(this.state.first_team_back!=="") ? parseFloat(this.state.first_team_back)+parseFloat(value) : "",
						   second_team_lay:(this.state.second_team_back!=="") ? parseFloat(this.state.second_team_back)+parseFloat(value) : "",
						   draw_lay:(this.state.draw_back!=="") ? parseFloat(this.state.draw_back)+parseFloat(value) : "",
						   })
		}
		else if(name==="first_team_back" && value!=="" && this.state.back_jump!==""){
			this.setState({first_team_lay: parseFloat(this.state.back_jump)+parseFloat(value)})
		}else if( name==="second_team_back"  && value!=="" && this.state.back_jump!==""){
			this.setState({second_team_lay:parseFloat(this.state.back_jump)+parseFloat(value) })
		}else if( name==="draw_back"  && value!=="" && this.state.back_jump!==""){
			this.setState({ draw_lay:parseFloat(this.state.back_jump)+parseFloat(value)})
		}
		this.setState({[name]: value,
						emptyBookmakerField:false,
						bookmakerChange:true,
						errBookmakerMsg:""});
	   
     }

   handleRadioButtonChange = (event)=> {
	  
	   let name = event.target.name;
	   if(name==="enable_draw"){
			var checkData = event.target.checked ? "block" : "none";
		   this.setState({
						drawDisplay: checkData
						});
	   }
	   else if(name==="suspend_all"){
			var checkData = event.target.checked ;
		   this.setState({first_team_suspend: checkData,
						  second_team_suspend: checkData,
						  draw_suspend: checkData
						});
	   }
		this.setState({	
						[name]: event.target.checked,
						bookmakerChange:true
						});
	   
     }	 
	handleBookmakerClose=()=>{
	 
	  this.setState({showBookmakerPopup:false,
					match_id:"",
					match_name:"",
					match_open_date:"",
					series_id:"",
					series_name:"",
					sport_id:"",
					first_team_back:"",
					first_team_lay:"",
					first_team_suspend:false,
					second_team_back:"",
					second_team_lay:"",
					second_team_suspend:false,
					draw_back:"",
					back_jump:"",
					draw_lay:"",
					min_bookmaker_limit:"",
					max_bookmaker_limit:"",
					draw_suspend:false,
					enableStatus:false,
					sport_type:""});
	}
	handleBookmakerShow=(getRowMatchId,getRowMatchName,getRowOpenDate,getSeriesId,getSeriesName,getSportId)=>{
		
	  var expMatchName = getRowMatchName.split("Vs");
	  if(expMatchName.length==1){
		  expMatchName = getRowMatchName.split("v");
	  }
	  var firstTeamName = expMatchName[0];
	  var secondTeamName = expMatchName[1];
	  this.setState({showBookmakerPopup:true,
					firstTeamName:firstTeamName,
					secondTeamName:secondTeamName,
					row_match_id:getRowMatchId,
					row_match_id:getRowMatchId,
					row_match_name:getRowMatchName,
					row_match_open_date:getRowOpenDate,
					row_series_id:getSeriesId,
					row_series_name:getSeriesName,
					row_sport_id:getSportId,
					back_jump:"",
					enableChecked:false,
					disableChecked:false
					
				});
		this.getBookmakerData(getRowMatchId);		
	}
	handleBookmakerSubmit =(event=null) => {
		if(event!==null){
			event.preventDefault(); 
		}
		this.setState({bookmakerChange:false});
		
      if(isNaN(parseInt(this.state.first_team_back)) || this.state.first_team_back<=0){
         this.setState({emptyBookmakerField:true,errBookmakerMsg:"Enter  Amount"});
         return false;
      } 
	  if(isNaN(parseInt(this.state.first_team_lay)) || this.state.first_team_lay<=0){
         this.setState({emptyBookmakerField:true,errBookmakerMsg:"Enter  Amount"});
         return false;
      } 
	  if(isNaN(parseInt(this.state.second_team_back)) || this.state.second_team_back<=0){
         this.setState({emptyBookmakerField:true,errBookmakerMsg:"Enter  Amount"});
         return false;
      } 
	  if(isNaN(parseInt(this.state.second_team_lay)) || this.state.second_team_lay<=0){
         this.setState({emptyBookmakerField:true,errBookmakerMsg:"Enter  Amount"});
         return false;
      }
	  if(isNaN(parseInt(this.state.min_bookmaker_limit)) || this.state.min_bookmaker_limit<=0){
         this.setState({emptyBookmakerField:true,errBookmakerMsg:"Enter Minimum Limit"});
         return false;
      }
	   if(isNaN(parseInt(this.state.max_bookmaker_limit)) || this.state.max_bookmaker_limit<=0){
         this.setState({emptyBookmakerField:true,errBookmakerMsg:"Enter Minimum Limit"});
         return false;
      }
	  
	  
	  
	  if(this.state.enable_draw===true && (isNaN(parseInt(this.state.draw_lay)) || this.state.draw_lay<=0)){
         this.setState({emptyBookmakerField:true,errBookmakerMsg:"Enter Draw Lay Amount"});
         return false;
      } 
	  
	  if(this.state.enable_draw===true && (isNaN(parseInt(this.state.draw_back)) || this.state.draw_back<=0)){
         this.setState({emptyBookmakerField:true,errBookmakerMsg:"Enter Draw Back  Amount"});
         return false;
      } 
	  
	  
	  let sport_type = "";
	  if(this.state.row_sport_id==="1"){
		  sport_type="scooer";
	  }
	  else if(this.state.row_sport_id==="2"){
		  sport_type="tennis";
	  }
	  else if(this.state.row_sport_id==="4"){
		  sport_type="cricket";
	  }
	 
	  if(this.state.bookmaker_status==="" || this.state.bookmaker_status===undefined){
		  this.setState({emptyBookmakerField:true,errBookmakerMsg:"Select Status"});
         return false;
	  }
	
		let sendData={
            match_id:this.state.row_match_id,
            match_name:this.state.row_match_name,
            match_open_date:this.state.row_match_open_date,
            series_id:this.state.row_series_id,
            series_name:this.state.row_series_name,
            sport_id:this.state.row_sport_id,
            first_team_back:this.state.first_team_back,
            first_team_lay:this.state.first_team_lay,
            first_team_suspend:this.state.first_team_suspend,
            second_team_back:this.state.second_team_back,
			second_team_lay:this.state.second_team_lay,
			second_team_suspend:this.state.second_team_suspend,
			draw_back:this.state.draw_back,
			draw_lay:this.state.draw_lay,
			draw_suspend:this.state.draw_suspend,
			enable_draw:this.state.enable_draw,
			max_bookmaker_limit:this.state.max_bookmaker_limit,
			min_bookmaker_limit:this.state.min_bookmaker_limit,
			sport_type:sport_type,
			status:this.state.bookmaker_status
          }; 
		  
		 

          let headers={
            Authorization:"Bearer "+ this.state.accessToken,
         }; 
          axios.post(baseUrl + '/api/addbookmaker',sendData, {headers}).then((resp) => { 
           var resp = resp.data;
           if(resp.success === true){
				this.setState({ respBookmakerStatus:resp.success,
							    respBookmakerMessage:resp.message
                          });
				
				setTimeout(() => {this.setState({ respBookmakerStatus: "",respBookmakerMessage:"",bookmakerChange:false });}, 2000);
						
              }else{
				this.setState({respBookmakerStatus:resp.success,respBookmakerMessage:resp.message});
				setTimeout(() => {this.setState({ respBookmakerStatus: "",respBookmakerMessage:"",bookmakerChange:false});}, 2000);  
          
              }
           
          });
    }
	
	
	 getBookmakerData =(matchId)=>{
		  let headers={
				Authorization:"Bearer "+ this.state.accessToken,
			 }; 
			  axios.get(baseUrl + '/api/getbookmarketbymatchid/'+matchId, {headers}).then((resp) => { 
			   var resp = resp.data;
			   
			   if(resp.success === true){
				   var enableStatus = (resp.data.status==="enable") ? true : false;
				   var disableStatus = (resp.data.status==="disable") ? true : false;
				   console.log(resp.data);
					this.setState({ first_team_back:resp.data.first_team_back,
									first_team_lay:resp.data.first_team_lay,
									first_team_suspend:(resp.data.first_team_suspend==="true") ? true : false,
									second_team_back:resp.data.second_team_back,
									second_team_lay:resp.data.second_team_lay,
									second_team_suspend:(resp.data.second_team_suspend==="true") ? true : false,
									draw_back:resp.data.draw_back,
									draw_lay:resp.data.draw_lay,
									draw_suspend:(resp.data.draw_suspend==="true") ? true : false,
									enable_draw:(resp.data.enable_draw==="true") ? true : false,
									drawDisplay:(resp.data.enable_draw==="true") ? "block" : "none",
									enableChecked:enableStatus,
									disableChecked:disableStatus,
									min_bookmaker_limit:resp.data.min_bookmaker_limit,
									max_bookmaker_limit:resp.data.max_bookmaker_limit,
									bookmaker_status:resp.data.status
							  });
			   }
			  });
							
			  
			   
	 }	
	responseBookmakerHtml = () =>{ 
      if(this.state.respBookmakerStatus === false) {
          return (
          <div className="alert alert-danger">
          {this.state.respBookmakerMessage}
          </div>
          )
        }
        else if(this.state.respBookmakerStatus === true) {
           return (
            <div className="alert alert-success">
            {this.state.respBookmakerMessage}
            </div>
           )
        }
     } 
  
   emptyBookmakerHtml = () =>{
	
      if(this.state.emptyBookmakerField === true) {
         return (
          <div className="alert alert-danger">
          {this.state.errBookmakerMsg}
          </div>
         )
      }
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
		
		//console.log(this.state.sport_name);
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
			//console.log(data2233);
			
			var resp = resp.data; 
			
			if(data2233!=undefined){
				var getResult = data2233['myArr']; 
			}
			if(data2234!=undefined){
				var getResult2 = data2234['myArr1'];   

			}
			
			
			if(resp.success===true){
			
				this.setState({matchData:getResult,matchData2:getResult2,DataFound:true,loading:false,matchDataFound1:true,match_odds:true});
				this.showTableHtml1(Postid);
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
							
							//console.log(bm);
									// if(value.eventName!==matchName){ 
									html.push(<tr > 
									<td key={value.match_name} id={value.match_name}> 
									<div className="game-name">
										 <a className="text-dark" href="#" key={"header"+value.match_name}>{value.match_name}/{Moment(value.open_date).format('lll')} </a> </div> 
										 <div className="game-icons"> 
										 <span className="game-icon"> 
										 <span className={FancyClass}></span>
										 </span>
										 <span className="game-icon"  id={value.match_id+"_in"} ></span>
										 <span className="game-icon"  id={value.match_id+"_bm"}></span>
										 <span className="game-icon" id={value.match_id+"_fn"}></span>
										 <span className="game-icon"  id={value.match_id+"_tv"}></span>
										
										  </div> </td> 
										 <td> 
											 
											  <a className="btn btn-default" href="#" onClick={this.submit.bind(this,value.match_id,"BM",sport_name)}>B  </a>
											 
										</td> <td>  <a className="btn btn-default" href="#" onClick={this.submit.bind(this,value.match_id,"Fancy",sport_name)}>F </a>
										 </td> 
										<td>
											 
											 <a className="btn btn-default" href="#" onClick={this.submit.bind(this,value.match_id,"Inplay",sport_name)}>IN  </a>
											 
											 </td> 
											 <td>  <a className="btn btn-default" href="#" onClick={this.submit.bind(this,value.match_id,"Tv",sport_name)}>T</a>
											</td> 
									<td>  <a className="btn btn-default" onClick={this.handleBookmakerShow.bind(this,value.match_id,value.match_name,value.open_date,value.series_id,value.series_name,value.sport_id)} href="javascript:void(0);">Bookmaker</a>
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
			return  <table className="table coupon-table"><thead><tr> <th > Game</th> <th colSpan="2">  </th> <th colSpan="2">  </th><th colSpan="2"> </th><th colSpan="2">  </th></tr></thead><tbody>{html}</tbody></table>; 
		}else{
			return  <table className="table coupon-table"><thead><tr> <th > Game</th> <th colSpan="2"> 1 </th> <th colSpan="2"> X </th><th colSpan="2"> 2 </th></tr></thead><tbody><center>No real-time records found</center></tbody></table>;
		}
		
	}

	showTableHtml1 = (sport_name) =>{  
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
						
							axios.get(baseUrl + '/api/manage_data/'+value.match_id, {headers}).then((resp) => {
								if(resp.data.data!=null){
									if(resp.data.data.bm==="BM" && resp.data.data.status==='1'){
										$("#"+resp.data.data.match_id+"_bm").addClass("bookmaker-icon");
									}
									if(resp.data.data.fancy==="Fancy" && resp.data.data.status_fancy==='1'){
										
										$("#"+resp.data.data.match_id+"_fn").addClass("fancy-icon ");
									}
									if(resp.data.data.inplay==="Inplay" && resp.data.data.status_inplay==='1'){
										
										$("#"+resp.data.data.match_id+"_in").addClass("active");
									}

									if(resp.data.data.tv==="Tv" && resp.data.data.status_tv==='1'){
										
										$("#"+resp.data.data.match_id+"_tv").addClass("fas fa-tv");
									}
								}
								
							
							
							
									
								
								
								
								
								
								
								
								
								//console.log(profit14);
									//console.log(profit13);
								
								
							
							
							
							
									// if(value.eventName!==matchName){ 
									
											
								var matchName = value.name; 
						
						//console.log(this.state.match_odds);
						
							
									
						
						var drawFirstBack =[];
						 ////console.log(j);
						 
						
						});	
							
							 
					
					}
							
					
					
				
					
				
				
				j++
							
				
			
				} 
				
				html1.map((value, index) => (
					console.log(value)
				))
			
				console.log(html1);
				
			
				
			}
			return  <table className="table coupon-table"><thead><tr> <th > Game</th> <th colSpan="2">  </th> <th colSpan="2">  </th><th colSpan="2"> </th><th colSpan="2">  </th></tr></thead><tbody>{html}</tbody></table>; 
		}else{
			return  <table className="table coupon-table"><thead><tr> <th > Game</th> <th colSpan="2"> 1 </th> <th colSpan="2"> X </th><th colSpan="2"> 2 </th></tr></thead><tbody><center>No real-time records found</center></tbody></table>;
		}
		
	}


	render() {
		var accessToken = this.state.accessToken;
		if(this.state.bookmakerChange){
			 this.handleBookmakerSubmit();
		}

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
<h3 class="a_manh">Manage Market</h3>
<ul role="tablist" id="home-events" className="nav nav-tabs nav-tabs22">
			{this.state.sport_data}
			{this.responseHtml()}
</ul>

						
							<div className="tab-content">
								<div id="home" className="tab-pane active">
									<br />
									<div className="coupon-card coupon-card-first">
										<div className="card-content" id="home_match_data">
										<div className="table-responsive">
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
				
				
				
				
				<Modal show={this.state.showBookmakerPopup} onHide={this.handleBookmakerClose}>
					<form className="form loginform" onSubmit={this.handleBookmakerSubmit}>
						<input type="hidden" name="row_match_id" value={this.state.row_match_id} />
						<input type="hidden" name="row_market_id" value={this.state.row_market_id} />
						<input type="hidden" name="row_match_name" value={this.state.row_match_name} />
						<input type="hidden" name="row_sport_type" value={this.state.row_sport_type} />
						<input type="hidden" name="row_sport_id" value={this.state.row_sport_id} />
						<Modal.Header >
							<Modal.Title>Bookmaker  <span style={{fontSize:'12px'}}>({this.state.row_match_name})</span> </Modal.Title>
						</Modal.Header>
						<Modal.Body>
						<div className="row form-group">
						  <div className="col-md-4">
							&nbsp;
						  </div>
						   <div className="col-md-2">
							Suspend
							<input type="checkbox" name="suspend_all" onChange={this.handleRadioButtonChange} value="suspend_all"  className="form-control intr" />
						  </div>
						  <div className="col-md-4">
							BACK
							<input type="text" style={{float:'right',width:'50%'}} name="back_jump" onChange={this.handleChange} value={this.state.back_jump} placeHolder="jump"   className="form-control intr" />
						  </div>
						   <div className="col-md-2">
							Lay
						  </div>
						</div>
						<div className="row form-group">
						  <div className="col-md-4">
							<label>{this.state.firstTeamName}</label>
						  </div>
						  <div className="col-md-2" >
							<input type="checkbox" name="first_team_suspend" onChange={this.handleRadioButtonChange} value="first_team_suspend"  className="form-control intr" checked={this.state.first_team_suspend} />
						  </div>
						  <div className="col-md-4" >
							<input type="text" style={{backgroundColor:'#72BBEF'}} name="first_team_back" onChange={this.handleChange} value={this.state.first_team_back}   className="form-control intr" />
						  </div>
						   <div className="col-md-2" >
							<input type="text" style={{backgroundColor:'#FAA9BA'}} name="first_team_lay" onChange={this.handleChange} value={this.state.first_team_lay}  className="form-control intr" />
						  </div>
						</div>
						
						<div className="row form-group">
						  <div className="col-md-4">
							<label>{this.state.secondTeamName}</label>
						  </div>
						   <div className="col-md-2">
							<input type="checkbox" name="second_team_suspend" onChange={this.handleRadioButtonChange} value="second_team_suspend"  className="form-control intr"  checked={this.state.second_team_suspend} />
						  </div>
						  <div className="col-md-4">
							<input type="text"  style={{backgroundColor:'#72BBEF'}} name="second_team_back" onChange={this.handleChange} value={this.state.second_team_back}   className="form-control intr" />
						  </div>
						   <div className="col-md-2">
							<input type="text"  style={{backgroundColor:'#FAA9BA'}} name="second_team_lay" onChange={this.handleChange} value={this.state.second_team_lay}  className="form-control intr" />
						  </div>
						</div>
						
						
						<div className="row form-group">
						  <div className="col-md-12">
						  
							<label><input style={{float:'left',margin:'3px'}} type="checkbox" name="enable_draw" checked={this.state.enable_draw} onChange={this.handleRadioButtonChange} value='enable_draw' />Enable Draw</label>
						  </div>
						 
						  
						</div>
						<div style={{display:this.state.drawDisplay}}>
							<div className="row form-group" >
							  <div className="col-md-4">
								<label>{this.state.draw}</label>
							  </div>
							   <div className="col-md-2">
								<input type="checkbox" name="draw_suspend" onChange={this.handleRadioButtonChange} value="draw_suspend" className="form-control intr"   checked={this.state.draw_suspend} />
							  </div>
							  <div className="col-md-4">
								<input type="text"  style={{backgroundColor:'#72BBEF'}} name="draw_back" onChange={this.handleChange} value={this.state.draw_back}   className="form-control intr" />
							  </div>
							   <div className="col-md-2">
								<input type="text"  style={{backgroundColor:'#FAA9BA'}} name="draw_lay" onChange={this.handleChange} value={this.state.draw_lay}  className="form-control intr" />
							  </div>
							</div>
						</div>
						
						
						
						<div className="row form-group">
						  <div className="col-md-4">
							<label>Min Limit</label>
						  </div>
						  <div className="col-md-8">
							<input type="text"  name="min_bookmaker_limit" onChange={this.handleChange} value={this.state.min_bookmaker_limit}  className="form-control intr" />
							
						  </div>
						  
						</div>
						
						<div className="row form-group">
						  <div className="col-md-4">
							<label>Max Limit</label>
						  </div>
						  <div className="col-md-8">
							<input type="text" name="max_bookmaker_limit" onChange={this.handleChange} value={this.state.max_bookmaker_limit}  className="form-control intr" />
							
						  </div>
						  
						</div>
					
						
						
						<div className="row form-group">
						  <div className="col-md-4">
							<label>Status</label>
						  </div>
						  <div className="col-md-8">
							<select name="bookmaker_status"  className="form-control intr" onChange={this.handleChange} >
								<option value="">select status</option>
								<option value="enable" selected={this.state.enableChecked}>Enable</option>
								<option value="disable" selected={this.state.disableChecked}>Disable</option>
							</select>
							
						  </div>
						  
						</div>
						
						</Modal.Body>
						<Modal.Footer>
							{this.responseBookmakerHtml()}
							{this.emptyBookmakerHtml()}
							<button type="button" className="btn btn-info" data-dismiss="modal" onClick={this.handleBookmakerClose}><i className="fas fa-undo-alt"></i> Close</button>
							<button type="submit" className="btn btn-primary"><i className="fas fa-paper-plane"></i> Submit</button>	
						</Modal.Footer>
					</form>
				  </Modal>
				
			</div>
			
			
			
		);
	}
}

export default Index;