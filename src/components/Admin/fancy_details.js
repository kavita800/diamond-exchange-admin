import React, { Component } from 'react';
import Header from '../Header/Header';
// import newdata from "./new.css";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Moment from 'moment';
import NumberFormat from 'react-number-format';
import Loading from 'react-fullscreen-loading';
import { useClearCache } from "react-clear-cache";
import Modal from "react-bootstrap-modal";
import $ from "jquery";
import loadjs from 'loadjs'
require("react-bootstrap-modal/lib/css/rbm-complete.css");
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
const baseUrl = "http://172.105.40.76:4000/api"; 



class Index extends Component {

	constructor(props) {
		super(props);
		
		var accessToken = localStorage.getItem("token");
		var user_id = localStorage.getItem("user_id");
		this.state = {
			accessToken: accessToken, 
			collapsed: false,
			draw:false,
			getFirstLay: false, 
			getSecondBack: false, 
			user_id: user_id, 
			oddsfirstlay: "",
			matchids: "", 
			BatAmount_second: "", 
			proFitfirstval: "", 
			proFitsecondval: "", 
			getFancybet: false, 
			getFancySecondbet: false,
			pancypickCall:false,
			stake_amount:"",
			respStatus:"",
			respMessage:"",
			emptyField:false,
			loading:true,
			team_profit1:"",
			team_profit2:"",
			new_array : {},
			stackAmount_team1:"",
			stackAmount_team2:"",
			profit22:"",
			profit_team:"",
			loss_team:"",
			profit12:0,
			profit13:0,
			profit14:0,
			loss:0,
			maxminBet:"",
			fancyDataFound:false,
			getFancyResults:"",
			betClick1:false,
			headname:"",
			SessInptNo:"",
			no:"",
			yes:"",
			status:"",
			buttonvalue_new:"",
			min_bookmaker       : "",
			max_bookmaker: "",
			bookmaker_team_a: "",
			bookmaker_back_1: "",
			bookmaker_back_2: "",
			bookmaker_back_3: "",
			bookmaker_lay_2:"",
			bookmaker_lay_3: "",
			bookmaker_b_back_1: "",
			bookmaker_b_back_2: "",
			bookmaker_b_back_3: "",
			bookmaker_b_lay_2: "",
			bookmaker_b_blay_3: "",
			bookmaker_b_status :  "",
			no_data_model:"",yes_data_model:"",color_data_model:"",showUserAmountPopup:false,
			key_index:"",
			promises_data :"",
			oods:"",
			yes:"",
			promises_data :"",
			fancyOddsListModelShow:false,
			resultDeclareModelShow:false,
			respResultDeclareStatus:"",
			resultDeclareField:false
		};
		this.callPermissonData();
	}
	
	

	callPermissonData=()=>{
	   let headers = {
		 	Authorization: "Bearer " + this.state.accessToken,
		 };
		
		axios.get(baseUrl + '/userpermission', { headers }).then((resp) => {
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
								customSuperAdmin: true, 
								manage_fancy: manage_fancy,
								gametypelist: gametypelist,
								manage_market: manage_market,
								admin_text_permission: admin_text,
								addnewmatch: addnewmatch,
								maintainance_page: maintainance_page,
								match_result_declare: match_result_declare,
								fancy_result_declare: fancy_result_declare,
								});
			}
			this.callFancyLIstFrontApi();
			
		});
		 
		
  }

	onFirstLayClick = () => {
		const { getFirstLay } = this.state;
		this.setState(() => ({
			getFirstLay: !getFirstLay
		}));
	};

	onSecondLayClick = () => {
		const { getSecondBack } = this.state;
		this.setState(() => ({
			getSecondBack: !getSecondBack
		}));
	};


	  rollBackConfirm = (fancyName) => {
		
	   confirmAlert({
		 title: 'Confirm',
		 message: 'Are you sure about rollback of '+fancyName,
		 buttons: [
		   {
			 label: 'Yes',
			 onClick: () => this.handleResultRollbackSubmit(fancyName)
		   },
		   {
			 label: 'No',
			 
		   }
		 ]
	   });
	 };

	
	handleResultRollbackSubmit=(fancyName)=>{
		
		
		
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 
		
		let sendDataObj = {event_id:this.props.match.params.id,
						   headname:fancyName};
		axios.post(baseUrl + '/fancy_result_rollback',sendDataObj,{headers}).then((resp) => {  
		this.callFancyListApi();
			/* 
			var resp = resp.data;
            if(resp.success === true){
				this.setState({respResultDeclareStatus:resp.success,
							 respResultDeclareMessage:resp.message,
                             row_user_amount:"",
                             master_password:""
                          });
				this.callFancyListApi();
				//setTimeout(() => {this.setState({ respResultDeclareStatus: "",resultDeclareModelShow:false });}, 2000);
						
              }else{
				this.setState({respResultDeclareStatus:resp.success,respResultDeclareMessage:resp.message});
				//setTimeout(() => {this.setState({ respResultDeclareStatus: "" });}, 2000);  
          
              } */
		}); 
		
		
		
		
		
		
		
		
	}
	
	
	handleResultDeclareSubmit = (e) => {
		e.preventDefault();
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 
		var getFancyScore = parseInt(this.state.fancy_score);
		if(isNaN(getFancyScore)){
			this.setState({resultDeclareField:true,errResultDeclareMsg:'Please enter valid score'});
			return false ;
		}
		
		
		
		let sendDataObj = {event_id:this.props.match.params.id,
						   headname:this.state.fancy_headname,
						   score:this.state.fancy_score};
		axios.post(baseUrl + '/set_fancy_result_by_admin',sendDataObj,{headers}).then((resp) => {  
			
			var resp = resp.data;
            if(resp.success === true){
				this.setState({respResultDeclareStatus:resp.success,
							 respResultDeclareMessage:resp.message,
                             row_user_amount:"",
                             master_password:""
                          });
				this.callFancyListApi();
				setTimeout(() => {this.setState({ respResultDeclareStatus: "",resultDeclareModelShow:false });}, 2000);
						
              }else{
				this.setState({respResultDeclareStatus:resp.success,respResultDeclareMessage:resp.message});
				setTimeout(() => {this.setState({ respResultDeclareStatus: "" });}, 2000);  
          
              }
		});  
	}	
	
	

	responseResultDeclareHtml = () =>{ 
      if(this.state.respResultDeclareStatus === false) {
          return (
          <div className="alert alert-danger">
          {this.state.respResultDeclareMessage}
          </div>
          )
        }
        else if(this.state.respResultDeclareStatus === true) {
           return (
            <div className="alert alert-success">
            {this.state.respResultDeclareMessage}
            </div>
           )
        }
     } 
  
   emptyResultDeclareHtml = () =>{
	
      if(this.state.resultDeclareField === true) {
         return (
          <div className="alert alert-danger">
          {this.state.errResultDeclareMsg}
          </div>
         )
      }
   }
		
	
	currentUserDetail = () => {
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 
		axios.get(baseUrl + '/current',{headers}).then((resp) => {  
			var resp= resp.data;
			this.setState({userData:resp})
		});  
	}	
	getUserCurrentBalance = () => {
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 
		axios.get(baseUrl + '/maxbet_minbet/'+this.props.match.params.id,{headers}).then((resp) => {  
			var resp= resp.data;
			this.setState({maxminBet:resp})
		});  
	}

	getFancybet = () => {
		if (this.state.getFancybet === true) {
			return (<tr style={{ background: "#F3DCE2" }}>
				<td className="text-center"><a href="#" className="text-danger"> <i className="fa fa-times"></i> </a></td>
				<td id="team_nm">{this.state.teamname1}</td>
				<td style={{ width: "75px" }} >
					<div className="form-group">
						<input value={this.state.amountFancybetBal} name="amountFancybetBal" className="amountint" onChange={this.handleChange} type="number" style={{ float: "left", width: "45px", verticalAlign: "middle" }} id="odds" readOnly required="required" />
					</div>
				</td>
				<td>
					<div className="form-group bet-stake">
						<input value={this.state.amountFancybetFirst} name="amountFancybetFirst" type="text" onChange={this.handleChange} id="btn_val" style={{ width: "52px" }} maxLength="10" required="required" />
					</div>
				</td>  </tr>);
		}
	}
	getFancybetPoint = () => {

		if (this.state.getFancybet === true) {

			return (<tr style={{ background: "#F3DCE2" }}>
				<td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
					<button className="btn btn-success btn_dyn" value="4" onClick={e => this.onTestClickFancyFirst(e)}>4</button>
					<button className="btn btn-success btn_dyn" value="20" onClick={e => this.onTestClickFancyFirst(e)}>20</button>
					<button className="btn btn-success btn_dyn" value="30" onClick={e => this.onTestClickFancyFirst(e)}>30</button>
					<button className="btn btn-success btn_dyn" value="50" onClick={e => this.onTestClickFancyFirst(e)}>50</button>
					<button className="btn btn-success btn_dyn" value="500" onClick={e => this.onTestClickFancyFirst(e)}>500</button>
					<button className="btn btn-success btn_dyn" value="1000" onClick={e => this.onTestClickFancyFirst(e)}>1000</button>
				</td></tr>);
		}
	}


	getFirstLayPoint = () => {

		if (this.state.getFirstLay === true) {
			

			return (<tr style={{ background: "#F3DCE2" }}>
				<td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
					<button className="btn btn-success btn_dyn" value="4" onClick={e => this.onTestClick(e)}>4</button>
					<button className="btn btn-success btn_dyn" value="20" onClick={e => this.onTestClick(e)}>20</button>
					<button className="btn btn-success btn_dyn" value="30" onClick={e => this.onTestClick(e)}>30</button>
					<button className="btn btn-success btn_dyn" value="50" onClick={e => this.onTestClick(e)}>50</button>
					<button className="btn btn-success btn_dyn" value="500" onClick={e => this.onTestClick(e)}>500</button>
					<button className="btn btn-success btn_dyn" value="1000" onClick={e => this.onTestClick(e)}>1000</button>
				</td></tr>);
		}
	}
	// getFirstLayLiability = () => {

	// 	if (this.state.getFirstLay === true) {

	// 		return (<tr style={{ background: "#F3DCE2" }}>
	// 			<td></td><td></td><td></td><td>Liability</td>
	// 			<td> {this.state.proFitfirstval}</td></tr>);
	// 	}
	// }
	getSecondLayPoint = () => {

		if (this.state.getSecondBack === true) {

			return (<tr style={{ background: "#BEDDF4" }}>
				<td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
					<button className="btn btn-success btn_dyn" value="4" onClick={e => this.onTestClickSecond(e)}>4</button>
					<button className="btn btn-success btn_dyn" value="20" onClick={e => this.onTestClickSecond(e)}>20</button>
					<button className="btn btn-success btn_dyn" value="30" onClick={e => this.onTestClickSecond(e)}>30</button>
					<button className="btn btn-success btn_dyn" value="50" onClick={e => this.onTestClickSecond(e)}>50</button>
					<button className="btn btn-success btn_dyn" value="500" onClick={e => this.onTestClickSecond(e)}>500</button>
					<button className="btn btn-success btn_dyn" value="1000" onClick={e => this.onTestClickSecond(e)}>1000</button>
				</td></tr>);
		}
	}
	getSecondFancybetPoint = () => {

		if (this.state.getFancySecondbet === true) {

			return (<tr style={{ background: "#BEDDF4" }}>
				<td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
					<button className="btn btn-success btn_dyn" value="4" onClick={e => this.onTestClickFancySecond(e)}>4</button>
					<button className="btn btn-success btn_dyn" value="20" onClick={e => this.onTestClickFancySecond(e)}>20</button>
					<button className="btn btn-success btn_dyn" value="30" onClick={e => this.onTestClickFancySecond(e)}>30</button>
					<button className="btn btn-success btn_dyn" value="50" onClick={e => this.onTestClickFancySecond(e)}>50</button>
					<button className="btn btn-success btn_dyn" value="500" onClick={e => this.onTestClickFancySecond(e)}>500</button>
					<button className="btn btn-success btn_dyn" value="1000" onClick={e => this.onTestClickFancySecond(e)}>1000</button>
				</td></tr>);
		}
	}
	// getSecondLayLiability = () => {
	// 	if (this.state.getSecondBack === true) {
	// 		return (<tr style={{ background: "#BEDDF4" }}>
	// 			<td></td><td></td><td></td><td>Liability</td>
	// 			<td>{this.state.proFitsecondval}</td></tr>);
	// 	}
	// }

	getFirstLay = () => {
		if (this.state.getFirstLay === true) {
			return (<tr style={{ background: "#F3DCE2" }}>
				<td className="text-center"><a href="#" className="text-danger"> <i className="fa fa-times"></i> </a></td>
				<td id="team_nm">{this.state.teamname1}</td>
				<td style={{ width: "75px" }} >
					<div className="form-group">
						<input value={this.state.lastPriceTraded1} name="lastPriceTraded1" className="amountint" onChange={this.handleChange} type="text" style={{ float: "left", width: "45px", verticalAlign: "middle" }} id="odds" required="required" readOnly/>
					</div>
				</td>
				<td>
					<div className="form-group bet-stake">
						<input value={this.state.amountshowFirst} name="amountshowFirst" type="text" onChange={this.handleChange} id="btn_val" style={{ width: "52px" }} maxLength="10" required="required" />
					</div>
				</td> <td id="prft" className="text-right"><input value={this.state.proFitfirstval} name="proFitsecondval" onChange={this.handleChange} type="text" readOnly style={{ float: "left", width: "45px", verticalAlign: "middle" }} /></td></tr>);
		}
	}
	getSecondBack = () => {
		if (this.state.getSecondBack === true) {
			return (<tr style={{ background: "#BEDDF4" }}>
				<td className="text-center"><a href="#" className="text-danger"> <i className="fa fa-times"></i> </a></td>
				<td id="team_nm">{this.state.teamname2}</td>
				<td style={{ width: "75px" }} >
					<div className="form-group">
						<input value={this.state.lastPriceTraded2} name="lastPriceTraded2" className="amountint" onChange={this.handleChange} type="number" required="required" maxLength="4" style={{ float: "left", width: "45px", verticalAlign: "middle" }} id="odds" />
					</div>
				</td>
				<td>
					<div className="form-group bet-stake">
						<input id="btn_val" style={{ width: "52px" }} maxLength="10" value={this.state.amountshowSecond} type="text" onChange={this.handleChange} required="required" />
					</div>
				</td>
				<td id="prft" className="text-right"><input value={this.state.proFitsecondval} name="proFitsecondval" onChange={this.handleChange} type="text" readOnly style={{ float: "left", width: "45px", verticalAlign: "middle" }} /></td></tr>);
		}
	}
	getFancySecondbet = () => {
		if (this.state.getFancySecondbet === true) {
			return (<tr style={{ background: "#BEDDF4" }}>
				<td className="text-center"><a href="#" className="text-danger"> <i className="fa fa-times"></i> </a></td>
				<td id="team_nm">{this.state.teamname2}</td>
				<td style={{ width: "75px" }} >
					<div className="form-group">
						<input value={this.state.amountFancybetBalSecond} name="lastPriceTraded2" className="amountint" onChange={this.handleChange} type="number" required="required" maxLength="4" style={{ float: "left", width: "45px", verticalAlign: "middle" }} id="odds" readOnly />
					</div>
				</td>
				<td>
					<div className="form-group bet-stake">
						<input id="btn_val" style={{ width: "52px" }} maxLength="10" value={this.state.amountFancybetSecond} type="text" onChange={this.handleChange} required="required" />
					</div>
				</td> </tr>);
		}
	}

	onTestClick(e) {
		e.preventDefault();
		const buttonValue = e.target.value;
		var minusone = (this.state.lastPriceTraded1 - 1);
		var multiplyval = (minusone * buttonValue);
		var numValue = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(multiplyval);

		this.setState({
			amountshowFirst: buttonValue,
			proFitfirstval: numValue
		})
	}
	onTestClickSecond(e) {
		e.preventDefault();
		const buttonValue = e.target.value;
		var minusone = (this.state.lastPriceTraded2 - 1);
		var multiplyval = (minusone * buttonValue);
		var numValue = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(multiplyval);
 
		this.setState({
			amountshowSecond: buttonValue,
			proFitsecondval: numValue
		})
	}

	onTestClickFancyFirst(e) {
		e.preventDefault();
		const buttonValue = e.target.value;
		var minusone = (this.state.lastPriceTraded1 - 1);
		var multiplyval = (minusone * buttonValue);
		var numValue = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(multiplyval);

		this.setState({
			amountFancybetFirst: buttonValue 
		})
	}
onTestClickFancySecond(e) {
		e.preventDefault();
		const buttonValue = e.target.value;
		var minusone = (this.state.lastPriceTraded1 - 1);
		var multiplyval = (minusone * buttonValue);
		var numValue = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 2 }).format(multiplyval);

		this.setState({
			amountFancybetSecond: buttonValue 
		})
	}
	cancelCourse = () => {
		window.location = "/matchdetail/" + this.state.matchids;
		//this.setState({ amountshowFirst: "", amountshowSecond: "", proFitfirstval: "", proFitsecondval: "" });
	}

	handleSubmit = (event) => {
	
		event.preventDefault();
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		
		let matchid = this.props.match.params.id;
		let compareMainAmount = "";
		let current_market_odds = "";
		let type = "unmatch";
		if(this.state.betMatchType==="teamone" && this.state.type==="back"){
			 compareMainAmount = this.state.teamOneFirstBack;
			 current_market_odds = this.state.teamOneFirstBack;
		}
		else if(this.state.betMatchType==="teamone" && this.state.type==="lay"){
			 compareMainAmount = this.state.teamOneFirstLay;
			 current_market_odds = this.state.teamOneFirstLay;
		}
		else if(this.state.betMatchType==="teamtwo" && this.state.type==="back"){
			 compareMainAmount = this.state.teamTwoFirstBack;
			 current_market_odds = this.state.teamTwoFirstBack;
		}
		else if(this.state.betMatchType==="teamtwo" && this.state.type==="lay"){
			 compareMainAmount = this.state.teamTwoFirstLay;
			 current_market_odds = this.state.teamTwoFirstLay;
		}
		else if(this.state.betMatchType==="draw" && this.state.type==="back"){
			 compareMainAmount = this.state.drawFirstBack;
			 current_market_odds = this.state.drawFirstBack;
		}
		else if(this.state.betMatchType==="draw" && this.state.type==="lay"){
			 compareMainAmount = this.state.drawFirstLay;
			 current_market_odds = this.state.drawFirstLay;
		}
		if(compareMainAmount === this.state.oddVal){
			type = "match";
		}
		

		var loss="";
		var new_array=[];
		var loss_team="";
		var newpath =0;
		if(this.state.betMatchType=="teamone"){
			 // ////////console.log(this.state.stackAmount_team2);
			loss=this.state.stackAmount_team2;
			if(this.state.stackAmount_team2!=undefined){
				 newpath=Math.abs(this.state.stackAmount_team2);
					
					
				
				
			}	
			
			loss_team="teamtwo";
		}
		 if(this.state.betMatchType=="teamtwo"){
			loss=this.state.stackAmount_team1;
			if(this.state.stackAmount_team1!=undefined){
				 newpath=Math.abs(this.state.stackAmount_team1);
					
					
			}	
			
			
			loss_team="teamone";
		}

		
		
		
		if(isNaN(parseInt(this.state.oddVal)) || this.state.oddVal<=0){
			this.setState({emptyField:true,errMsg:"Enter Valid Odds"});
			return false;
		}
		if(isNaN(parseInt(this.state.stake_amount)) || this.state.stake_amount<=0){
			this.setState({emptyField:true,errMsg:"Enter Stake"});
			return false;
		}		
			
		let savebet = {
			event_id: this.props.match.params.id,
			event_name: this.state.eventName,
			odds: this.state.oddVal,
			stake: this.state.stake_amount,
			profit: this.state.profit,
			bet_type: this.state.type,
			type: type,
			team_name: this.state.teamName,
			selection_id: this.state.betSelectionId,
			market_id: this.state.betMarketId,
			current_market_odds:current_market_odds,
			profit_team:this.state.betMatchType,
			loss_team:loss_team,
			loss:newpath,
			color:this.state.color
		}; 
		

		axios.post(baseUrl + '/createbetuser', savebet,{headers}).then((resp) => {
			var resp = resp.data;
			if(resp.success === true){
				this.setState({
					respStatus: resp.success,
					respMessage:resp.message,
					oddVal:"",
					stake_amount:"",
					profit:"",
					team_profit1:"",
					stackAmount_team1:"",
					team_profit2:"",
					stackAmount_team2:"",
					stackAmount_team3:"",
					team_profit3:"",
						   
				});
				this.getUserCurrentBalance();
				this.showTableHtml();
				setTimeout(() => {this.setState({ respStatus: "" });}, 7000);
			} else {
				this.setState({
					respStatus: resp.success,
					respMessage:resp.message
				});
				setTimeout(() => {this.setState({ respStatus: "" });}, 7000);
			}
			this.callUserBetListApi();
		});

	}
	handleSubmitSession = (event) => {
	
		event.preventDefault();
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		
		let matchid = this.props.match.params.id;
		var yes_amount="";
		var no_amount ="";
		var new_value="";
		if(this.state.no==="no"){
				no_amount=this.state.session_input;
				new_value =this.state.session_input;
		}
		if(this.state.yes==="yes"){
				yes_amount=this.state.session_input;
				new_value =this.state.session_input;

		}
		let savebet = {
			event_id: this.props.match.params.id,
			event_name: this.state.eventName,
			yes: this.state.yes,
			no: this.state.no,
			market_id: this.state.betMarketId,
			yes_amount:yes_amount,
			no_amount: no_amount,
			stake:this.state.stake_amount,
			headname:this.state.headname,
			team_name:this.state.headname,
			odds:new_value,
			bet_type:"fancy",
			color:this.state.color,
			key_index:this.state.key_index
			
			
		}; 
		

		axios.post(baseUrl + '/createbetuser', savebet,{headers}).then((resp) => {
			var resp = resp.data;
			if(resp.success === true){
				this.setState({
					respStatus: resp.success,
					respMessage:resp.message,
					oddVal:"",
					stake_amount:"",
					profit:"",
					team_profit1:"",
					stackAmount_team1:"",
					team_profit2:"",
					stackAmount_team2:""
				});
				this.getUserCurrentBalance();
				this.showTableHtml();
				setTimeout(() => {this.setState({ respStatus: "" });}, 7000);
			} else {
				this.setState({
					respStatus: resp.success,
					respMessage:resp.message
				});
				setTimeout(() => {this.setState({ respStatus: "" });}, 7000);
			}
			this.callUserBetListApi();
		});

	}
	
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
	
	
	handleFancybetSubmit = (event) => {

		event.preventDefault();
		let savebet = {
			event_id: this.props.match.params.id,
			user_id: this.state.user_id,
			team_id: this.state.teamid1,
			team_id_second: this.state.teamid2,
			matchids: this.state.matchids,
			eventName: this.state.eventName,
			Odds: this.state.marketName,
			odds_first_lay: this.state.amountFancybetBal,
			odds_second_lay: this.state.amountFancybetBalSecond,
			teamname: this.state.teamname1,
			teamname_second: this.state.teamname2,
			BatAmount: this.state.amountFancybetFirst*this.state.amountFancybetBal,
			BatAmount_second: this.state.amountFancybetSecond*this.state.amountFancybetBalSecond,
			eventTypeId: this.state.eventTypeId,
			color:this.state.color

		};
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		axios.post(baseUrl + '/createbetuser', savebet,{headers}).then((resp) => {
			if (resp.data.success != false) {
				this.setState({
					respStatus: resp.success,
				});
				window.location.href = "/matchdetail/" + resp.data.result.matchids;
			} else {
				this.setState({
					respMessage: resp.data.message,
				});
			}
		});

	}
	

	componentWillMount() {
		
		/* let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		// $(".blockUI").show();
		this.callMatchOddsApi();
		
		 let matchid = this.props.match.params.id;
		

		
		axios.get(baseUrl + '/fancybetlistFront', { headers }).then((resp) => {
			var resps = resp.data;

			if (resps.success === true) {
				this.setState({ fancybet_getResults: resps.fancybetlist, fancybet_betDataFound: true });
			}
		});
		// $(".blockUI").hide();
		this.getUserCurrentBalance();
		
		this.callFancyListApi();
		var market_id ="";
		 */
		
	}
	
	
	callFancyLIstFrontApi=()=>{
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		// $(".blockUI").show();
		this.callMatchOddsApi();
		
		 let matchid = this.props.match.params.id;
		

		
		axios.get(baseUrl + '/fancybetlistFront', { headers }).then((resp) => {
			var resps = resp.data;

			if (resps.success === true) {
				this.setState({ fancybet_getResults: resps.fancybetlist, fancybet_betDataFound: true });
			}
		});
		// $(".blockUI").hide();
		this.getUserCurrentBalance();
		
		this.callFancyListApi();
		var market_id ="";
	}
	
	
	callFancyListApi =()=>{
		/* let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		
		 let matchid = this.props.match.params.id;
		// this.callMatchOddsApi()
		axios.get(baseUrl + '/fancyapi/'+matchid, { headers }).then((resp) => {
			
			this.setState({ getFancyResults: resp.data.alldata.data, fancyDataFound: true });
		});
		$(".blockUI").hide(); */
		
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		
		 let matchid = this.props.match.params.id;
		 let matchType = this.props.match.params.id1;
		 
		 let sendObj  = {
			 event_id : matchid,
			 event_type : matchType
		 };
		// this.callMatchOddsApi()
		axios.get(baseUrl + '/getfancylistbymatch/'+matchid, { headers }).then((resp) => {
			
			this.setState({ getFancyResults: resp.data.data, fancyDataFound: true });
		});
		$(".blockUI").hide();
	}
	handleModelShow =(id,no,yes,no_stake,yes_stake)=>{
		//console.log(no);
		//console.log(yes);
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		
		 let matchid = this.props.match.params.id;
		// this.callMatchOddsApi()
		axios.get(baseUrl + '/userbetdata/'+id, { headers }).then((resp) => {
			this.setState({no_data_model:no,yes_data_model:yes,color_data_model:resp.data,showUserAmountPopup:true,})
			
		});
	}
	
	handleclick = (id) => {

	$('div[data-target="show_data' + id + '"]').show();

	}
	
	
	handleFancyButton=(fancyId,operationType,operationValue)=>{
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		
		 let sendObj = {fancy_id:fancyId,operation_type:operationType,operation_value:operationValue};
		 
		// this.callMatchOddsApi()
		axios.post(baseUrl + '/fancy_update',sendObj, { headers }).then((resp) => {
			this.callFancyListApi();
			//this.setState({no_data_model:no,yes_data_model:yes,color_data_model:resp.data,showUserAmountPopup:true,})
			
		});
	}	
	
	handleResultDeclareButton=(headname)=>{
		
		this.setState({fancy_headname:headname,resultDeclareModelShow:true});
	}

	showFancyApiHtml = () => {
		if (this.state.fancyDataFound === true) {
			const html = [];
			var new_array=[];
			var new_array1=[];
			var new_array2=[];
			
			if(this.state.getResults!=undefined){
				for(var i=0;i<this.state.getResults.length;i++){
					if(this.state.getResults[i].bet_type=="fancy"){
						if(this.state.getResults[i].key_index!=null && this.state.getResults[i].key_index!=undefined){
							new_array[this.state.getResults[i].key_index]=(this.state.getResults[i].key_index);
							new_array1[this.state.getResults[i].key_index]=(this.state.getResults[i].stake);
							new_array2[this.state.getResults[i].key_index]=(this.state.getResults[i]._id);
						}
							
							
							
						
					}
				
				}
			}
			
			
			
		
			
			if(this.state.getFancyResults!==undefined){
				var index=0;
				var i=0;
				for(let fancyNewData of Object.values(this.state.getFancyResults))
			{
				
				var new_value="";
				var new_value1="";
			
				
				//console.log(new_array[index]);
				
				
						console.log(fancyNewData.matchID);
							var activeStatus = fancyNewData.is_active==="yes" ? "Active" : "InActive";
							var activeOperation = fancyNewData.is_active==="yes" ? "InActivate" : "Activate";
							var activeUpdateValue = fancyNewData.is_active==="yes" ? "no" : "yes";
							
							var suspendStatus = fancyNewData.is_suspended==="yes" ? "Suspend" : "Un-Suspend";
							var suspendOperation = fancyNewData.is_suspended==="yes" ? "Click To Un-Suspend" : "Click To Suspend";
							var suspendUpdateValue = fancyNewData.is_suspended==="yes" ? "no" : "yes";
							var showActionBtn = fancyNewData.result_declare==="yes" ? <a style={{color:'#faa9ba'}} href="javascript:void(0);" onClick={this.rollBackConfirm.bind(this,fancyNewData.fancy_name)}>Result RollBack</a> : <a href="javascript:void(0);" onClick={this.handleResultDeclareButton.bind(this,fancyNewData.fancy_name)}>Result Declare</a>
							if(this.state.customSuperAdmin===true && this.state.match_result_declare===true){
								html.push(<tr role="row" className="odd">
									
									<td className="text-left"><a href="javascript:void(0);" onClick={this.handlefancyOddsListModelOpen.bind(this,fancyNewData.event_id,fancyNewData.event_type,fancyNewData.fancy_name)}>{fancyNewData.fancy_name}</a></td>
									<td className="box-w1 lay-color fb_td"><button className="bet-sec lay"><span className="odd layprice">{fancyNewData.lay_price}</span>{fancyNewData.lay_size}</button></td>
									<td className="box-w1 back-color fb_td"><button className="bet-sec back"><span className="odd backprice">{fancyNewData.back_price}</span>{fancyNewData.back_size}</button></td>
									<td  className="text-left">{activeStatus}</td>
									<td  className="text-left">{suspendStatus}</td>
									<td  className="text-left">{showActionBtn}</td>
									
									
								</tr>);
							}
							else {
								html.push(<tr role="row" className="odd">
									
									<td className="text-left"><a href="javascript:void(0);" onClick={this.handlefancyOddsListModelOpen.bind(this,fancyNewData.event_id,fancyNewData.event_type,fancyNewData.fancy_name)}>{fancyNewData.fancy_name}</a></td>
									<td className="box-w1 lay-color fb_td"><button className="bet-sec lay"><span className="odd layprice">{fancyNewData.lay_price}</span>{fancyNewData.lay_size}</button></td>
									<td className="box-w1 back-color fb_td"><button className="bet-sec back"><span className="odd backprice">{fancyNewData.back_price}</span>{fancyNewData.back_size}</button></td>
									<td  className="text-left">{activeStatus}</td>
									<td  className="text-left">{suspendStatus}</td>
									<td  className="text-left"><a href="javascript:void(0);" onClick={this.handleFancyButton.bind(this,fancyNewData._id,'activate',activeUpdateValue)}>{activeOperation}</a></td><td  className="text-left"><a href="javascript:void(0);" onClick={this.handleFancyButton.bind(this,fancyNewData._id,"suspend",suspendUpdateValue)}>{suspendOperation}</a></td>
									<td  className="text-left">{showActionBtn}</td>
									
								</tr>);
							}
					
				
				
				
				//if(fancyNewData.SessInptNo > 0 && fancyNewData.SessInptYes>0) {
					
				//}
				index++
				i++;
			}
			var data="";
			setTimeout(() => {this.callUserBetListApi(data,this.props.match.params.id)}, );
		}
			

				
			
			
		loadjs(['/js/custom.js'], function() {
      
		});
		return <tbody>{html}</tbody>;
		}
	}
	
	
	
	
	callUserBetListApi=( market_id,match_id)=>{
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		
		if(market_id==undefined || market_id==null || market_id=="" ){
			axios.get(baseUrl + '/fancy_result_admin/'+1+"/"+match_id, { headers }).then((resp) => {
				var resps = resp.data;
				var hide_show = resp.data;
				if (resps.success === true) {
					
						for(var i=0;i<resps.data.length;i++){
								
							$('a[data-target="data_' + resps.data[i].market_id + '"]').html(resps.data[i].oods);
							$('a[data-target="yes_no_' + resps.data[i].market_id + '"]').html(resps.data[i].type);

							$('button[data-target="button_' + resps.data[i].market_id + '"]').html("RollBack");
							

						}
						for(var j=0;j<hide_show.hide_show.length;j++){
							
								
								
							$('span[data-target="hide_show_match' + hide_show.hide_show[j].market_id + '"]').html(hide_show.hide_show[j].hide +" Match");

						}
					//this.setState({ getResults: resps.Betlist, betDataFound: true });
				}
			});
			
		}else{
			axios.get(baseUrl + '/fancy_result_admin/'+market_id+"/"+match_id, { headers }).then((resp) => {
				var resps = resp.data;
				var hide_show = resp.data;
				if (resps.success === true) {
					
					for(var i=0;i<resps.data.length;i++){
							
						//$('#data_1'+resps.data[i].market_id).html(resps.data[i].oods)

						
							$('a[data-target="data_' + resps.data[i].market_id + '"]').html(resps.data[i].oods);
							$('a[data-target="yes_no_' + resps.data[i].market_id + '"]').html(resps.data[i].type);
							$('button[data-target="button_' + resps.data[i].market_id + '"]').html("RollBack");
							

						
					}
					for(var j=0;j<hide_show.hide_show.length;j++){
						
							
						

						$('span[data-target="hide_show_match' + hide_show.hide_show[j].market_id + '"])').html(hide_show.hide_show[j].hide +" Match");


					}
					//this.setState({ getResults: resps.Betlist, betDataFound: true });
				}
			});
		}
		//  let matchid = this.props.match.params.id;
		// this.callMatchOddsApi()
		
	}
	
	async	callMatchOddsApi(){
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		};
		let matchid = this.props.match.params.id;
		
		const new_array = {};
		axios.get(baseUrl + '/bookmaker/'+matchid, {headers}).then((resp) => {
		var bookmaker =resp.data.data.data;
		
		if(bookmaker!=undefined ){
			if(bookmaker.t2!=undefined){
				if(bookmaker.t2[0]!=undefined && bookmaker.t2[0]!=''){
				
		   
				


					for(var i=0; i<bookmaker.t2[0].length;i++){
						if(bookmaker.t2[0][i].sid==1){
							new_array['bookmaker_team_a']=       bookmaker.t2[0][i].nat;
							new_array['bookmaker_a_back_1']      =bookmaker.t2[0][i].b1;
							new_array['bookmaker_a_back_2']      =bookmaker.t2[0][i].b2;
							new_array['bookmaker_a_back_3'] 		=bookmaker.t2[0][i].b3;
							new_array['bookmaker_a_lay_1']			=bookmaker.t2[0][i].l1;
							new_array['bookmaker_a_lay_2']			=bookmaker.t2[0][i].l2;
							new_array['bookmaker_a_lay_3']			=bookmaker.t2[0][i].l3;
							new_array['bookmaker_a_status']     =bookmaker.t2[0][i].s;
							new_array['bookmaker_a_back_4']       =bookmaker.t2[0][i].bs1;
							new_array['bookmaker_a_back_5']       =bookmaker.t2[0][i].bs2;
							new_array['bookmaker_a_back_6']           =bookmaker.t2[0][i].bs3;
							new_array['bookmaker_a_lay_4']            =bookmaker.t2[0][i].ls1;
							new_array['bookmaker_a_lay_5']            =bookmaker.t2[0][i].ls2;
							new_array['bookmaker_a_lay_6']			=bookmaker.t2[0][i].ls3;
						}
						else if(bookmaker.t2[0][i].sid==2){
								new_array['min_bookmaker']=bookmaker.t2[0][i].min;
								new_array['max_bookmaker']=bookmaker.t2[0][i].max;
								new_array['bookmaker_team_a']=bookmaker.t2[0][i].nat;
								new_array['bookmaker_b_back_1']=bookmaker.t2[0][i].b1;
								new_array['bookmaker_b_back_4']=bookmaker.t2[0][i].bs1;
								new_array['bookmaker_b_back_2']=bookmaker.t2[0][i].b2;
								new_array['bookmaker_b_back_5']=bookmaker.t2[0][i].bs2;
								new_array['bookmaker_b_back_3']=bookmaker.t2[0][i].b3;
								new_array['bookmaker_b_back_6']=bookmaker.t2[0][i].bs3;
								new_array['bookmaker_b_lay_1']=bookmaker.t2[0][i].l1;
								new_array['bookmaker_b_lay_2']=bookmaker.t2[0][i].l2;
								new_array['bookmaker_b_lay_3']=bookmaker.t2[0][i].l3;
								new_array['bookmaker_b_lay_4']=bookmaker.t2[0][i].ls1;
								new_array['bookmaker_b_lay_5']=bookmaker.t2[0][i].ls2;
								new_array['bookmaker_b_lay_6']=bookmaker.t2[0][i].ls3;
								new_array['bookmaker_b_status']=bookmaker.t2[0][i].s;
						}
						else if(bookmaker.t2[0][i].sid==3){
							new_array['bookmaker_team_b']=bookmaker.t2[0][i].nat;
							new_array['bookmaker_d_back_1']=bookmaker.t2[0][i].b1;
							new_array['bookmaker_d_back_2']=bookmaker.t2[0][i].b2;
							new_array['bookmaker_d_back_3']=bookmaker.t2[0][i].b3;
							new_array['bookmaker_d_status']=bookmaker.t2[0][i].s;
							new_array['bookmaker_d_back_4']=bookmaker.t2[0][i].bs1;
							new_array['bookmaker_d_back_5']=bookmaker.t2[0][i].bs2;
							new_array['bookmaker_d_back_6']=bookmaker.t2[0][i].bs3;
							new_array['bookmaker_d_lay_1']=bookmaker.t2[0][i].l1;
							new_array['bookmaker_d_lay_2']=bookmaker.t2[0][i].l2;
							new_array['bookmaker_d_lay_3']=bookmaker.t2[0][i].l3;
							new_array['bookmaker_d_lay_4']=bookmaker.t2[0][i].ls1;
							new_array['bookmaker_d_lay_5']=bookmaker.t2[0][i].ls2;
							new_array['bookmaker_d_lay_6']=bookmaker.t2[0][i].ls3;
					}
	
				}
	
	
	
	
	
	
					
	
	
					
	
	
	
	
	
	
				 }
			}
			
		}


	});









		axios.get(baseUrl + '/usermatchdetail/'+matchid+'/'+this.props.match.params.id1, {headers}).then((resp) => {
			var resp = resp.data;
			var resp2 = resp.data1;
			var bookmaker = "";
			 // ////////console.log(bookmaker);
			var buttonvalue_new = resp.buttonvalue;
			this.setState({loading:false,})
			  
			  var getResult1 = resp.data
			  this.setState({getResult11:resp})
			 
			  //new_array['bookmaker_min']=bookmaker[0]
			 // ////////console.log(bookmaker.t2[0]);
				
				
				







				
			if (resp.success === true) {
				
				Object.values(getResult1[0]).forEach(getResult => {
					
				
				var explode = resp2[0].match_name.split(" v ");
			
				if(getResult.status==="SUSPENDED") {
					axios.get(baseUrl + '/savematchresult/'+getResult.marketId, {headers}).then((respMain) => {
						// // ////////console.log(respMain);
					});
				}
				
				new_array['loading']=false;
				new_array['eventName']=resp2[0].match_name;
				new_array['firstTeamName']=  explode[0];
				new_array['status']=  getResult.status
new_array['secondTeamName']= explode[1];
new_array['marketId']=getResult.marketId;
new_array['teamOneSelectionId']=   getResult.runners[0].selectionId;
new_array['teamOneFirstBack']=     getResult.runners[0].ex.availableToBack[0].price;
new_array['teamOneFirstBackSize']=   getResult.runners[0].ex.availableToBack[0].size;
new_array['teamOneMiddleBack']=     getResult.runners[0].ex.availableToBack[1].price;
new_array['teamOneMiddleBackSize']=  getResult.runners[0].ex.availableToBack[1].size;
new_array['teamOneLastBack']=       getResult.runners[0].ex.availableToBack[2].price;
new_array['teamOneLastBackSize']=   getResult.runners[0].ex.availableToBack[2].size;
new_array['teamOneFirstLay']=       getResult.runners[0].ex.availableToLay[0].price;
new_array['teamOneFirstLaySize']=  getResult.runners[0].ex.availableToLay[0].size;
new_array['teamOneMiddleLay']=     getResult.runners[0].ex.availableToLay[1].price;
new_array['teamOneMiddleLaySize']= getResult.runners[0].ex.availableToLay[1].size;
new_array['teamOneLastLay']=      getResult.runners[0].ex.availableToLay[2].price;
new_array['teamOneLastLaySize']=   getResult.runners[0].ex.availableToLay[2].size;


new_array['teamTwoSelectionId']=  getResult.runners[1].selectionId;
new_array['teamTwoFirstBack']=    getResult.runners[1].ex.availableToBack[0].price;
new_array['teamTwoFirstBackSize']= getResult.runners[1].ex.availableToBack[0].size;
new_array['teamTwoMiddleBack']=    getResult.runners[1].ex.availableToBack[1].price;
new_array['teamTwoMiddleBackSize']=getResult.runners[1].ex.availableToBack[1].size;
new_array['teamTwoLastBack']=      getResult.runners[1].ex.availableToBack[2].price;
new_array['teamTwoLastBackSize']=  getResult.runners[1].ex.availableToBack[2].size;
new_array['teamTwoFirstLay']=     getResult.runners[1].ex.availableToLay[0].price;
new_array['teamTwoFirstLaySize']=  getResult.runners[1].ex.availableToLay[0].size;
new_array['teamTwoMiddleLay']=     getResult.runners[1].ex.availableToLay[1].price;
new_array['teamTwoMiddleLaySize']= getResult.runners[1].ex.availableToLay[1].size;
new_array['teamTwoLastLay']=       getResult.runners[1].ex.availableToLay[2].price;
new_array['teamTwoLastLaySize']=   getResult.runners[1].ex.availableToLay[2].size;







if(getResult.runners[2]!=undefined){
	new_array['draw']= true,

new_array['drawSelectionId']= getResult.runners[2].selectionId;
new_array['drawFirstBack']= getResult.runners[2].ex.availableToBack[0].price;
new_array['drawFirstBackSize']= getResult.runners[2].ex.availableToBack[0].size;
new_array['drawMiddleBack']= getResult.runners[2].ex.availableToBack[1].price;
new_array['drawMiddleBackSize']= getResult.runners[2].ex.availableToBack[1].size;
new_array['drawLastBack']= getResult.runners[2].ex.availableToBack[2].price;
new_array['drawLastBackSize']= getResult.runners[2].ex.availableToBack[2].size;
new_array['drawFirstLay']= getResult.runners[2].ex.availableToLay[0].price;
new_array['drawFirstLaySize']= getResult.runners[2].ex.availableToLay[0].size;
new_array['drawMiddleLay']= getResult.runners[2].ex.availableToLay[1].price;
new_array['drawMiddleLaySize']= getResult.runners[2].ex.availableToLay[1].size;
new_array['drawLastLay']= getResult.runners[2].ex.availableToLay[2].price;
new_array['drawLastLaySize']= getResult.runners[2].ex.availableToLay[2].size;

new_array['status']=  getResult.status









	new_array['drawTeamName']= "The Draw";
	
				}

			});
			this.setState(new_array);
			}else{
				this.setState({loading:false})
			}
			this.setState({buttonvalue_new:buttonvalue_new});
			var teamOneSelectionId=this.state.teamOneSelectionId;
			var teamTwoSelectionId=this.state.teamTwoSelectionId;
			var profit12=0;
			var profit13 =0;
			var profit14 =0;
			var html1=[];
			var new11=0;
			var team_a =0;
			var team_b =0;
			var team_c =0;
			var new12=0;
			var new13=0;
			var profit15=0;
			var profit16=0;
			var profit17=0;		
					let promises = [];
			 ////console.log(this.state.getResults);
			if(this.state.getResults!=undefined){

				axios.get(baseUrl + '/current',{headers}).then((resp) => {   
					
					//console.log(resp.data.userType);
					
					if(resp.data.userType===1){
						let matchid = this.props.match.params.id;
						
						
							
						for(let i=0;i<this.state.getResults.length;i++){
						
							for (var b = 0; b < this.state.getResults[i].length;b++) {
								
								const value = this.state.getResults[i][b];
								let headers = {
									Authorization: "Bearer " + this.state.accessToken,
								};
									
									promises[i]=
									axios.get(baseUrl + '/current_user_data/'+value.user_id.parentid,{headers}).then((resp1) => {  
									
									    html1[i]=(resp1.data);
									})
									
								
								
						if(value.selection_id === teamOneSelectionId && value.team_name!="The Draw" && value.bet_type!="fancy"){
							profit12= profit12-value.profit;
							if(value.loss!=undefined){
								profit13=parseFloat(profit13)+parseFloat(value.loss)
								profit14=parseFloat(profit14)+parseFloat(value.loss)
							}
						}
						else if(value.selection_id === teamTwoSelectionId  && value.team_name!="The Draw" && value.bet_type!="fancy"){
							profit13= profit13-value.profit;
							if(value.loss!=undefined){
								profit12=parseFloat(profit12)+parseFloat(value.loss)
								profit14=parseFloat(profit14)+parseFloat(value.loss)
							}
						}else {
							if(value.bet_type!="fancy"){
								profit14= profit14-value.profit;
								if(value.loss!=undefined){
									profit12=parseFloat(profit12)+parseFloat(value.loss)
									profit13=parseFloat(profit13)+parseFloat(value.loss)
								}
							}
							
						}

						
						Promise.all(promises).then(()=> {  
							console.log(html1);
						for(var c=0;c<html1.length;c++){
							
							var result =html1[c].data.cricket_partnership_own!=0 ?(html1[c].data.cricket_partnership_own) : 100;
	
							
							
								profit12=parseFloat(profit12)*parseFloat(result)/100;
								if(result!=100){
									profit15=profit12-profit15;
								}
								
								
								profit13=parseFloat(profit13)*parseFloat(result)/100;
								if(result!=100){
									profit16=profit13-profit16;
								}
								

								profit14=parseFloat(profit14)*parseFloat(result)/100;
								if(result!=100){
									
									profit17=profit14-profit17;
								}
								


								
								
								//team_a=new11+new11;
								team_b=team_b +new12;
								team_c=team_c +new13;
								//console.log("team_a----------------------------  "+team_a)
								this.setState({profit12:profit15,profit13:profit16,profit14:profit17,promises_data:1})	
							
							

						
							
						}
					
						
								
							
							
							
							
							
							
							
							
							//console.log(profit14);
								//console.log(profit13);
							
						})	




					
							}

							
						
							
						}
					
					
								
							
						console.log(profit12);

					}else{
						
						for(let i=0;i<this.state.getResults.length;i++){
							//console.log(this.state.getResults[i]);
							for (var b = 0; b < this.state.getResults[i].length;b++) {
								const value = this.state.getResults[i][b];
						if(value.selection_id === teamOneSelectionId && value.team_name!="The Draw" && value.bet_type!="fancy"){
							profit12= profit12-value.profit;
							if(value.loss!=undefined){
								profit13=parseFloat(profit13)+parseFloat(value.loss)
								profit14=parseFloat(profit14)+parseFloat(value.loss)
							}
						}
						else if(value.selection_id === teamTwoSelectionId  && value.team_name!="The Draw" && value.bet_type!="fancy"){
							profit13= profit13-value.profit;
							if(value.loss!=undefined){
								profit12=parseFloat(profit12)+parseFloat(value.loss)
								profit14=parseFloat(profit14)+parseFloat(value.loss)
							}
						}else {
							if(value.bet_type!="fancy"){
								profit14= profit14-value.profit;
								if(value.loss!=undefined){
									profit12=parseFloat(profit12)+parseFloat(value.loss)
									profit13=parseFloat(profit13)+parseFloat(value.loss)
								}
							}
							
						}
						
						
						
						
					}
						 
					}


					profit12 =profit12*resp.data.cricket_partnership_own/100;
					profit13 =profit13*resp.data.cricket_partnership_own/100;
					profit14 =profit14*resp.data.cricket_partnership_own/100;
					this.setState({profit12:profit12,profit13:profit13,profit14:profit14})	

					}
		
					
				

			});
	}
			
			
		});





			
	
					
			





	}
	data11=(html1)=>{
							console.log(html1)
							var cricket_partnership_own =100;
							// if(resp11.data.data.cricket_partnership_own!=0){
							// 	cricket_partnership_own =resp11.data.data.cricket_partnership_own;
							// }
							// profit12 =profit12*cricket_partnership_own/100;
							// profit13 =profit13*cricket_partnership_own/100;
							// profit14 =profit14*cricket_partnership_own/100;
							// if(this.state.getResults.length==i){
							// 	this.setState({profit12:profit12,profit13:profit13,profit14:profit14})
							}
	
	showDrawHtml =()=>{
		
		if(this.state.draw===true){
			var status=this.state.status;
			if(status!="OPEN"){
				var status=this.state.status;
			}else{
				var status="";

			}

			return (
				<tr className="bet-info ">
					<td className="team-name nation" >
						<span ><strong>The Draw</strong></span>
						<p className="box-w4"><span className="float-left book" id="book_349" style={{ color: "black" }}>{this.state.profit14}</span> <span className="float-right profit" id="profit_349" style={{ color: "black" }} >
						
									{this.state.team_profit3}							 {this.state.stackAmount_team3}
							</span></p>
					</td>
					
					<td className="box-w1 back-color" style={{backgroundColor:'#B2D6F0'}}>{status}
						<button className="bet-sec back "  onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawLastBack,'#B2D6F0',"back",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status)}> <span className="odd backprice">{this.state.drawLastBack}</span>{this.state.drawLastBackSize}  </button>
					</td>
					<td className="box-w1 back-color" style={{backgroundColor:'#92C9F0'}}>
						<button className="bet-sec back " onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawMiddleBack,'#92C9F0',"back",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status)} > <span className="odd backprice">{this.state.drawMiddleBack}</span> {this.state.drawMiddleBackSize} </button>
					</td>
					
					<td className="box-w1 back-color">{status}
						<button className="bet-sec back " onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawFirstBack,'#72bbef',"back",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status)} > <span className="odd backprice">{this.state.drawFirstBack}</span> {this.state.drawFirstBackSize} </button>
					</td>
					
					
					
					<td className="box-w1 lay-color">{status}
						<button className="bet-sec lay" onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawFirstLay,'#faa9ba',"lay",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status)} value={this.state.lastPriceTraded1} ><span className="odd layprice">{this.state.drawFirstLay}</span>{this.state.drawFirstLaySize}</button>
					</td>
					<td className="box-w1 lay-color" style={{backgroundColor:'#F8BBC8'}}>{status}
						<button className="bet-sec lay" value={this.state.lastPriceTraded1} onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawMiddleLay,'#F8BBC8',"lay",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status)} ><span className="odd layprice">{this.state.drawMiddleLay}</span>{this.state.drawMiddleLaySize}</button>
					</td>
					<td className="box-w1 lay-color" style={{backgroundColor:'#F6CDD6'}}>{status}
						<button className="bet-sec lay" value={this.state.lastPriceTraded1} onClick={this.handleBidClick.bind(this,this.state.drawTeamName,this.state.drawLastLay,'#F6CDD6',"lay",this.state.drawSelectionId,this.state.marketId,'draw',this.state.status)}><span className="odd layprice">{this.state.drawLastLay}</span>{this.state.drawLastLaySize}</button>
					</td>															
					
				</tr>
			);
		}
	}
	showTableHtml = () => {
		////console.log(this.state.getResults);
		
		if (this.state.betDataFound === true) {
			const html = []
			var profit12=0;
			var profit13= 0;
			var loss=0;
			//var custom_this=this;
			var teamOneSelectionId=this.state.teamOneSelectionId;
			var teamTwoSelectionId=this.state.teamOneSelectionId;
			for(let i=0;i<this.state.getResults.length;i++){
				//console.log(this.state.getResults[i]);
				for (var b = 0; b < this.state.getResults[i].length;b++) {
					const value = this.state.getResults[i][b];
				
				var inPlayClass = (value.inPlay === true) ? "active" : "";
				var colorClass = (value.color!=undefined ) ? value.color : "";
				var fullname = (value.user_id!=undefined ) ? value.user_id.username : "";
				html.push(<tr style={{background: colorClass }} >
					<td  style={{ textAlign: "center",}}> {fullname}  </td>
					<td  style={{ textAlign: "center",}}> {value.team_name}  </td>
					<td style={{ textAlign: "center" }}> {value.odds}  </td>
					<td style={{ textAlign: "center" }}> {value.stake}  </td>
				</tr>);
				
				

				}
				 
				 
			}
			
				//// // ////////console.log(this.state.profit12);
				
	
					
			
			
			
			
				
				
			
			
			return <table className="table coupon-table">
				<thead>
					<tr>
						<th style={{ textAlign: "center" }} > User Name</th>
						<th style={{ textAlign: "center" }} > Team Name</th>
						<th style={{ textAlign: "center" }} > Odds</th>
						<th style={{ textAlign: "center" }} > Stake</th>
					</tr>
				</thead>
				<tbody>{html}</tbody>
			</table>;
		}
	}
	onFancybetClick = (e) => {
		let currVal = e.target.value;
		const { getFancybet } = this.state;
		this.setState(() => ({
			getFancybet: !getFancybet,
			amountFancybetBal:currVal
		}));    
	};
	onFancybetSecondClick = (f) => {
		let currSecVal = f.target.value; 
		const { getFancySecondbet } = this.state;
		this.setState(() => ({
			getFancySecondbet: !getFancySecondbet, 
			amountFancybetBalSecond:currSecVal
			
		}))
		$(".pancypick").click(function(){
		
		}); 
	};
	showFancyTableHtml = () => {

		if (this.state.fancybet_betDataFound === true) {
			const html = []
		
			for(var a=0;a<this.state.fancybet_getResults.length;a++){
				const value=this.state.fancybet_getResults[a];
				 ////////console.log()
				html.push(
					<tr className="bet-info">
						<td className="team-name nation"> <span><strong style={{ color: "font-weight:normal" }} >{value.title}</strong></span>
							<p><span className="float-left book" id="book_175" style={{ color: "black" }}>0</span> <span className="float-right profit" id="profit_175"></span></p>
						</td>
						<td className="lay-color box-w1">
							<button className="bet-sec lay ses_row pancypick" value={value.no_first} onClick={this.onFancybetClick.bind(this)}> 
								<span className="odd Jaya" id={"nofirstpink"+a}>{value.no_first}</span>
								{value.no_second}
							</button></td>
						<td className="text-center back box-w1">
							<button className="bet-sec lay ses_row" value={value.yes_first} onClick={this.onFancybetSecondClick.bind(this)} >
							<span className="odd">{value.yes_first}</span>{value.yes_second}
							</button></td>
						<td className="text-right p-r-10 box-w2"><span>Min/Max</span><br></br> {value.minimum}/{value.maximum}</td>
					</tr>);	 
			}
			/*this.state.fancybet_getResults.map(function (value, i) { 
				html.push(
					<tr className="bet-info">
						<td className="team-name nation"> <span><strong style={{ color: "font-weight:normal" }} >{value.title}</strong></span>
							<p><span className="float-left book" id="book_175" style={{ color: "black" }}>0</span> <span className="float-right profit" id="profit_175"></span></p>
						</td>
						<td className="lay-color box-w1">
							<button className="bet-sec lay ses_row pancypick" onClick={fancyPink}>
								
								<span className="odd Jaya" id={"nofirstpink"+i}>{value.no_first}</span>
								<span className="span1">{value.no_second}</span>
							</button>
						</td>
						<td className="text-center back box-w1"><button className="bet-sec lay ses_row" onClick={fancySkyblue}>
							<span className="odd">{value.yes_first}</span><span className="span1">{value.yes_second}</span></button></td>
						<td className="text-right p-r-10 box-w2"><span>Min/Max</span><br></br> {value.minimum}/{value.maximum}</td>
					</tr>);
			})*/
			return <table className="coupon-table table table-bordered">
				<thead>
					<tr>
						<th></th>
						<th className="text-center  box-w1 lay">No</th>
						<th className="text-center  box-w1 lay">Yes</th>
						<th className="box-w2"></th>
					</tr>
				</thead>

				<tbody>{html} </tbody>
			</table>;
		}
	}
	handleChange = (event) => {
		
		this.setState({	 [name]: event})
	


	
		
	}
	
	handleChangeInput = (event) => {
		let {name,value} = event.target;
		this.setState({	 [name]: value,resultDeclareField:false})
	}
	handleChangeStakeamount = (event) => {
		
		this.setState({stake_amount:event.target.value})
	}
	handleChange_session_input = (event) => {
		var profit = this.state.profit;
		
		////console.log(event.target);
		return false;
		this.setState({session_input:event.target.value})
	}
	
	handleButtonsClick = (getAmount) =>{
		
		var profit = "";
		if(this.state.type === "back") {
			profit = parseFloat(this.state.oddVal)-1;
			profit = profit.toFixed(2) * getAmount;
			
			 // ////////console.log(this.state.betMatchType);
			if(this.state.betMatchType=="teamone"){
				this.setState({team_profit1:profit})
				
			}
			 if(this.state.betMatchType=="teamtwo"){
				this.setState({team_profit2:profit})
	
	
			}
			if(this.state.betMatchType=="draw"){
				this.setState({team_profit3:profit})
			}
			
			if(this.state.betMatchType=="teamone"){
				this.setState({stackAmount_team2:"-"+getAmount})
				this.setState({stackAmount_team3:"-"+getAmount})
			}
			 if(this.state.betMatchType=="teamtwo"){
				this.setState({stackAmount_team1:"-"+getAmount})
				this.setState({stackAmount_team3:"-"+getAmount})
			}

			if(this.state.betMatchType=="draw"){
				this.setState({stackAmount_team1:"-"+getAmount})
				this.setState({stackAmount_team2:"-"+getAmount})
			}


			
		}
		else if(this.state.type === "lay"){
			
			profit = parseFloat(this.state.oddVal)-1;
				profit = profit.toFixed(2) * getAmount;
				profit = profit.toFixed(0);
			if(this.state.betMatchType=="teamone"){
				this.setState({team_profit1:"-"+profit})
			}
			else if(this.state.betMatchType=="teamtwo"){
				this.setState({team_profit2:"-"+profit,})
	
	
			}

			if(this.state.betMatchType=="draw"){
				this.setState({team_profit3:"-"+profit})
			}
	
			if(this.state.betMatchType=="teamone"){
				this.setState({stackAmount_team2:getAmount})
				this.setState({stackAmount_team3:getAmount})
			}
			else if(this.state.betMatchType=="teamtwo"){
				this.setState({stackAmount_team1:getAmount})
				this.setState({stackAmount_team3:getAmount})
			}

			if(this.state.betMatchType=="draw"){
				this.setState({stackAmount_team1:getAmount})
				this.setState({stackAmount_team2:getAmount})
			}
		}
		
		this.setState({stake_amount:getAmount,profit:profit});
	}
	handleButtonsNewClick = (getAmount) =>{
		
		
		this.setState({stake_amount:getAmount});
	}
	
	handleBidClick = (teamName,oddVal,color,type,selectionId,marketId,getMatchType,status) =>{
		
	
		

		
			this.setState({betClick:true,betClick1:false});
		
			this.setState({
						   teamName:teamName,
						   oddVal:oddVal,
						   color:color,
						   type:type,
						   betSelectionId:selectionId,
						   betMarketId:marketId,
						   betMatchType:getMatchType,
						   stake_amount:"",
						   profit22:"",
						   profit:"",
						   team_profit1:"",
						   team_profit2:"",
						   stackAmount_team3:"",
						   stackAmount_team1:"",
						   stackAmount_team2:"",
						   team_profit3:"",


						});
	}
	
	handleBid11 = (market_id,index1,type,match_id,oods) =>{
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 
		
let savebet={
	market_id :market_id,
	type:type,
	match_id:match_id,
	oods:oods
}

		axios.post(baseUrl + '/fancy_result', savebet,{headers}).then((resp) => {
			var resp = resp.data;
			if(resp.success === true){
				this.setState({
					
				});
				
				
			} else {
				this.setState({
					respStatus: resp.success,
					respMessage:resp.message
				});
				
			}
			this.callUserBetListApi(market_id,match_id);
		});











	}
	handleBidClickSession = (color,headname,no,marketId,SessInptNo,yes,index1) =>{
		
		//console.log(index1);

// // ////////console.log(SessInptNo);
		
			this.setState({betClick1:true,betClick:false,});
		
			this.setState({
						   color:color,
						   headname:headname,
						   session_input:SessInptNo,
						   yes:yes,
						   no:no,
						   stake_amount:"",
						   profit22:"",
						   profit:"",
						   team_profit1:"",
						   team_profit2:"",
						   stackAmount_team1:"",
						   stackAmount_team2:"",
						   key_index:index1,
						});
	}
	handleBidCrossClick = () =>{
		this.setState({betClick:false,
			betClick1:false,
						   teamName:"",
						   oddVal:"",
						   color:"",
						   type:"",
						   betSelectionId:"",
						   betMarketId:"",
						   betMatchType:"",
						   stake_amount:"",
						   profit:""});
	}
	
	showBidClickHtml = () =>{
		
		
		if(this.state.betClick===true) {
			var button_1 =1000;
			var button_2 =5000;
			var button_3 =10000;
			var button_4 =25000;
			var button_5 =50000;
			var button_6 =100000;
			var button_7 =200000;
			var button_8 =500000;
			var button_9 =1000000;
			var button_10 =2500000;

			
			var value_1 =1000;
			var value_2 =5000;
			var value_3 =10000;
			var value_4 =25000;
			var value_5 =50000;
			var value_6 =100000;
			var value_7 =200000;
			var value_8 =500000;
			var value_9 =1000000;
			var value_10 =2500000;

			if(this.state.buttonvalue_new!=undefined){
				button_1 =this.state.buttonvalue_new.button_1;
				
			}
			

			if(this.state.buttonvalue_new!=undefined){
				button_2 =this.state.buttonvalue_new.button_2;
			}

			if(this.state.buttonvalue_new!=undefined){
				button_3 =this.state.buttonvalue_new.button_3;
			}
			if(this.state.buttonvalue_new!=undefined){
				button_4 =this.state.buttonvalue_new.button_4;
			}
			if(this.state.buttonvalue_new!=undefined){
				button_5 =this.state.buttonvalue_new.button_5;
			}
			if(this.state.buttonvalue_new!=undefined){
				button_6 =this.state.buttonvalue_new.button_6;
			}

			if(this.state.buttonvalue_new!=undefined){
				button_7 =this.state.buttonvalue_new.button_7;
			}
			if(this.state.buttonvalue_new!=undefined){
				button_8 =this.state.buttonvalue_new.button_8;
			}
			if(this.state.buttonvalue_new!=undefined){
				button_9=this.state.buttonvalue_new.button_9;
			}
			if(this.state.buttonvalue_new!=undefined){
				button_10=this.state.buttonvalue_new.button_10;
			}
			if(this.state.buttonvalue_new!=undefined){
				value_1 =this.state.buttonvalue_new.value_1;
			}
			
			if(this.state.buttonvalue_new!=undefined){
				value_2 =this.state.buttonvalue_new.value_2;
			}
			
			if(this.state.buttonvalue_new!=undefined){
				value_3 =this.state.buttonvalue_new.value_3;
			}
			if(this.state.buttonvalue_new!=undefined){
				value_4 =this.state.buttonvalue_new.value_4;
			}
			if(this.state.buttonvalue_new!=undefined){
				value_5 =this.state.buttonvalue_new.value_5;
			}
			if(this.state.buttonvalue_new!=undefined){
				value_6 =this.state.buttonvalue_new.value_6;
			}
			
			if(this.state.buttonvalue_new!=undefined){
				value_7 =this.state.buttonvalue_new.value_7;
			}
			if(this.state.buttonvalue_new!=undefined){
				value_8 =this.state.buttonvalue_new.value_8;
			}
			if(this.state.buttonvalue_new!=undefined){
				value_9=this.state.buttonvalue_new.value_9;
			}
			if(this.state.buttonvalue_new!=undefined){
				value_10=this.state.buttonvalue_new.value_10;
			}

		return (
			<div className="table-responsive hide-box-click hide-box-click22" style={{ paddingBottom: "4px", display: "block",background: this.state.color }} >
			 <div className=" popop_cancial">Placebet<i className="fa fa-times close22" ></i></div>
				<form onSubmit={this.handleSubmit} method="post" id="frm_placebet">
				
					<table className="coupon-table table table-borderedless">
						<thead>
							<tr>
								<th></th>
								<th style={{ width: "35%", textAlign: "left" }} >(Bet for)</th>
								<th style={{ width: "35%", textAlign: "left" }} >Odds</th>
								<th style={{ width: "35%", textAlign: "left" }} >Stake</th>
								<th style={{ width: "35%", textAlign: "right" }} id="profit-head">Profit</th>
							</tr>
						</thead>
					<tbody>
						<tr>
							<td className="text-center"><a href="#;" className="text-danger" onClick={this.handleBidCrossClick}> <i className="fa fa-times"></i> </a></td>
							<td id="team_nm">{this.state.teamName}</td>
							<td style={{ width: "75px" }} >
								<div className="form-group">
								<input value={this.state.type} name="type" type="hidden" />
									<input value={this.state.oddVal} name="oddVal" className="amountint"  onChange={this.handleChange} type="number" required="required" maxLength="4" style={{ float: "left", width: "45px", verticalAlign: "middle" }} id="odds" step="0.01" />
								</div>
							</td>
							<td>
								<div className="form-group bet-stake">
									<input id="btn_val" style={{ width: "52px" }} maxLength="10" value={this.state.stake_amount} name="stake_amount" type="text" onChange={this.handleChange} required="required" />
								</div>
							</td> 
							<td>
							{this.state.profit}
							</td> 
						</tr>
						<tr>
						  <td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_1} onClick={this.handleButtonsClick.bind(this,value_1)}>{button_1}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_2} onClick={this.handleButtonsClick.bind(this,value_2)}>{button_2}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_3} onClick={this.handleButtonsClick.bind(this,value_3)}>{button_3}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_4} onClick={this.handleButtonsClick.bind(this,value_4)}>{button_4}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_5} onClick={this.handleButtonsClick.bind(this,value_5)}>{button_5}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_6} onClick={this.handleButtonsClick.bind(this,value_6)}>{button_6}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_7} onClick={this.handleButtonsClick.bind(this,value_7)}>{button_7}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_8} onClick={this.handleButtonsClick.bind(this,value_8)}>{button_8}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_9} onClick={this.handleButtonsClick.bind(this,value_9)}>{button_9}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_10} onClick={this.handleButtonsClick.bind(this,value_10)}>{button_10}</a>
							</td>
						</tr>
					  </tbody>
					</table>
					<div className="col-md-12">
					{this.responseHtml()}
					{this.emptyHtml()}
						<button className="btn btn-sm btn-danger float-left" type="button" onClick={this.handleBidCrossClick}>Reset</button>
						<button className="btn btn-sm btn-success float-right" type="submit" id="submit_btn">Submit</button>
						
					</div>
				</form>
			</div>
				);
		}
	}

	showBidClickSessionHtml = () =>{
		if(this.state.betClick1===true) {
			var button_1 =1000;
			var button_2 =5000;
			var button_3 =10000;
			var button_4 =25000;
			var button_5 =50000;
			var button_6 =100000;
			var button_7 =200000;
			var button_8 =500000;
			var button_9 =1000000;
			var button_10 =2500000;

			
			var value_1 =1000;
			var value_2 =5000;
			var value_3 =10000;
			var value_4 =25000;
			var value_5 =50000;
			var value_6 =100000;
			var value_7 =200000;
			var value_8 =500000;
			var value_9 =1000000;
			var value_10 =2500000;

			if(this.state.buttonvalue_new!=undefined){
				button_1 =this.state.buttonvalue_new.button_1;
			}

			if(this.state.buttonvalue_new!=undefined){
				button_2 =this.state.buttonvalue_new.button_2;
			}

			if(this.state.buttonvalue_new!=undefined){
				button_3 =this.state.buttonvalue_new.button_3;
			}
			if(this.state.buttonvalue_new!=undefined){
				button_4 =this.state.buttonvalue_new.button_4;
			}
			if(this.state.buttonvalue_new!=undefined){
				button_5 =this.state.buttonvalue_new.button_5;
			}
			if(this.state.buttonvalue_new!=undefined){
				button_6 =this.state.buttonvalue_new.button_6;
			}

			if(this.state.buttonvalue_new!=undefined){
				button_7 =this.state.buttonvalue_new.button_7;
			}
			if(this.state.buttonvalue_new!=undefined){
				button_8 =this.state.buttonvalue_new.button_8;
			}
			if(this.state.buttonvalue_new!=undefined){
				button_9=this.state.buttonvalue_new.button_9;
			}
			if(this.state.buttonvalue_new!=undefined){
				button_10=this.state.buttonvalue_new.button_10;
			}
			if(this.state.buttonvalue_new!=undefined){
				value_1 =this.state.buttonvalue_new.value_1;
			}
			
			if(this.state.buttonvalue_new!=undefined){
				value_2 =this.state.buttonvalue_new.value_2;
			}
			
			if(this.state.buttonvalue_new!=undefined){
				value_3 =this.state.buttonvalue_new.value_3;
			}
			if(this.state.buttonvalue_new!=undefined){
				value_4 =this.state.buttonvalue_new.value_4;
			}
			if(this.state.buttonvalue_new!=undefined){
				value_5 =this.state.buttonvalue_new.value_5;
			}
			if(this.state.buttonvalue_new!=undefined){
				value_6 =this.state.buttonvalue_new.value_6;
			}
			
			if(this.state.buttonvalue_new!=undefined){
				value_7 =this.state.buttonvalue_new.value_7;
			}
			if(this.state.buttonvalue_new!=undefined){
				value_8 =this.state.buttonvalue_new.value_8;
			}
			if(this.state.buttonvalue_new!=undefined){
				value_9=this.state.buttonvalue_new.value_9;
			}
			if(this.state.buttonvalue_new!=undefined){
				value_10=this.state.buttonvalue_new.value_10;
			}
			return (
			<div className="table-responsive hide-box-click " style={{ paddingBottom: "4px", display: "block",background: this.state.color }} >
				<form onSubmit={this.handleSubmitSession} method="post" id="frm_placebet">
				
					<table className="coupon-table table table-borderedless">
						<thead>
							<tr>
								<th></th>
								<th style={{ width: "35%", textAlign: "left" }} >(Bet for)</th>
								<th style={{ width: "35%", textAlign: "left" }} >Odds</th>
								<th style={{ width: "35%", textAlign: "left" }} >Stake</th>
								<th style={{ width: "35%", textAlign: "right" }} id="profit-head">Profit</th>
							</tr>
						</thead>
					<tbody>
						<tr>
							<td className="text-center"><a href="#;" className="text-danger" onClick={this.handleBidCrossClick}> <i className="fa fa-times"></i> </a></td>
							<td id="team_nm">{this.state.headname}</td>
							<td style={{ width: "75px" }} >
								<div className="form-group">
								<input value={this.state.no} name="no" type="hidden" />
								<input value={this.state.yes} name="yes" type="hidden" />
									<input value={this.state.SessInptNo} 
									
									name="session_input" value= {this.state.session_input} className="amountint"  onChange={this.handleChange_session_input} type="number" required="required" maxLength="4" style={{ float: "left", width: "45px", verticalAlign: "middle" }} id="odds" step="0.01" />
								</div>
							</td>
							<td>
								<div className="form-group bet-stake">
									<input id="stake_amount" style={{ width: "52px" }} maxLength="10" value={this.state.stake_amount} name="stake_amount" type="text" onChange={this.handleChangeStakeamount} required="required" />
								</div>
							</td> 
							<td>
							{this.state.profit}
							</td> 
						</tr>
						<tr>
						  <td colSpan="5" style={{ padding: "5px" }} className="value-buttons">
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_1} onClick={this.handleButtonsNewClick.bind(this,value_1)}>{button_1}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_2} onClick={this.handleButtonsNewClick.bind(this,value_2)}>{button_2}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_3} onClick={this.handleButtonsNewClick.bind(this,value_3)}>{button_3}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_4} onClick={this.handleButtonsNewClick.bind(this,value_4)}>{button_4}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_5} onClick={this.handleButtonsNewClick.bind(this,value_5)}>{button_5}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_6} onClick={this.handleButtonsNewClick.bind(this,value_6)}>{button_6}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_7} onClick={this.handleButtonsNewClick.bind(this,value_7)}>{button_7}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_8} onClick={this.handleButtonsNewClick.bind(this,value_8)}>{button_8}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_9} onClick={this.handleButtonsNewClick.bind(this,value_9)}>{button_9}</a>
							<a href="#" style={{padding:'6px',color:'#000'}} className="btn btn-success btn_dyn" value={value_10} onClick={this.handleButtonsNewClick.bind(this,value_10)}>{button_10}</a>
							</td>
						</tr>
					  </tbody>
					</table>
					<div className="col-md-12">
					{this.responseHtml()}
					{this.emptyHtml()}
						<button className="btn btn-sm btn-danger float-left" type="button" onClick={this.handleBidCrossClick}>Reset</button>
						<button className="btn btn-sm btn-success float-right" type="submit" id="submit_btn">Submit</button>
						
					</div>
				</form>
			</div>
				);
		}
	}





	handleDepoWithdrPopupClose=()=>{
		this.setState({showUserAmountPopup:false})
   }
   
   
     
	handlefancyOddsListModelClose=()=>{
	 
	  this.setState({fancyOddsListModelShow:false})
	}
	
	handlefancyOddsListModelOpen=(get_row_event_id,get_row_event_type,get_row_fancy_name)=>{
		
		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 
		
		let sendNewObj= {event_id:get_row_event_id,
						 event_type:get_row_event_type,
						 team_name:get_row_fancy_name
						 }
		axios.post(baseUrl + '/getfancybetlist/',sendNewObj,{headers}).then((resp) => {  
			var resp = resp.data;
			var htmlData = [];
			
			if(resp.success===true){
				htmlData.push(<tr><td>UserName</td><td>Stake</td><td>Lay </td><td >Back</td></tr>);
				var listData = resp.data;
				for(var i=0;i<listData.length;i++){
					var singleListData = listData[i];
					var backBorder = (singleListData.no==="yes") ? "2px solid" : "0px";
					var layBorder = (singleListData.no==="no") ? "2px solid" : "0px";
					
					 var htmlDataRow = <tr><td>{singleListData.user_id.username}</td><td>{singleListData.stake}</td><td className="box-w1 lay-color fb_td" style={{border:layBorder}}><button className="bet-sec lay"><span className="odd layprice">{singleListData.lay_price}</span>{singleListData.lay_size}</button></td><td  style={{border:backBorder}} className="box-w1 back-color fb_td"><button className="bet-sec back"><span className="odd backprice">{singleListData.back_price}</span>{singleListData.back_size}</button></td></tr>;
					htmlData.push(htmlDataRow);
				}
				
			}
			this.setState({fancyOddsHtmlData:htmlData,fancyOddsListModelShow:true,row_fancy_name:get_row_fancy_name});
		});  
	  /* this.setState({fancyOddsListModelShow:true,
					row_user_id:get_row_user_id,
					row_user_status:get_row_user_status,
					row_user_bet:get_row_user_bet,
					row_user_name:get_row_user_username,
					row_user_username:name
				}) */
	}



   	getComponent(market_id){
		var oods=$('input[data-target="data_' + market_id + '"]').val();
		var type=$('input[data-target="yes_' + market_id + '"]').val();
		
		if(oods==undefined||type==undefined || oods==""|| type==""){
		
			$('span[data-target="error_' + market_id + '"]').html("Please Enter Required fileds");
			return false;
		}	

		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 

		let savebet={
			market_id :market_id,
			type:type,
			match_id:this.props.match.params.id,
			oods:oods
		}
		
				axios.post(baseUrl + '/fancy_result', savebet,{headers}).then((resp) => {
					var resp = resp.data;
					if(resp.success === true){
						this.setState({
							
						});
						
						
					} else {
						this.setState({
							respStatus: resp.success,
							respMessage:resp.message
						});
						
					}
					this.callUserBetListApi(market_id,this.props.match.params.id);
				});
		
	}
	getComponentNew(market_id){
		
		var hide=$('select[data-target="hide_show_' + market_id + '"]').val();
		
		console.log(hide);
		if(hide==undefined||hide==undefined || hide=="" ){
		
			$('span[data-target="error_' + market_id + '"]').html("Plase Select Match Hide Or Show");
			return false;
		}	

		let headers = {
			Authorization: "Bearer " + this.state.accessToken,
		}; 

		let savebet={
			market_id :market_id,
			hide:hide,
			match_id:this.props.match.params.id,
			
		}
		
				axios.post(baseUrl + '/fancy_result_hide', savebet,{headers}).then((resp1) => {
					var resp11 = resp1.data;
					if(resp11.success === true){
						this.setState({
							
						});
						
						
					} else {
						this.setState({
							respStatus: resp11.success,
							respMessage:resp11.message
						});
						
					}
					this.callUserBetListApi(market_id,this.props.match.params.id);
				});
		
	}




	handleResultDeclareModelClose=()=>{
		this.setState({resultDeclareModelShow:false,fancy_score:0,fancy_headname:""});
	}	
					
					
	render() {
		
		if(this.state.promises_data==1){
			var data=Math.sign(this.state.profit12);
			if(data==1)
			{
				this.state.profit12 ="-"+this.state.profit12;
			}
			var data2=Math.sign(this.state.profit13);
			if(data2==-1)
			{
				this.state.profit13 =Math.abs(this.state.profit13);
			}
		
		}
		
		var change_password=localStorage.getItem("change_password")
		if (change_password!=""  && change_password!=null) {
			return (
				<Redirect to="/change_password" />
			);
		}
		var suspended ="bet-info row";
		if(this.state.bookmaker_a_status==="SUSPENDED"){
			suspended ="bet-info suspended row";
		}
		var suspended1 ="bet-info row";
		if(this.state.bookmaker_b_status==="SUSPENDED"){
			 suspended1 ="bet-info suspended row";
		}
		var suspended2 ="bet-info row";
		if(this.state.bookmaker_d_status==="SUSPENDED"){
			suspended2 ="bet-info suspended row";
		}
		 ////////console.log(this.state.bookmaker_b_back_6);
		var status=this.state.status;
		if(status!="OPEN"){
			 status=this.state.status;
		}else{
			status="";
		}
	var maximum_bet_limit=	this.state.maxminBet.adminlist;
	if(maximum_bet_limit!=undefined){
		maximum_bet_limit=maximum_bet_limit.maximum_bet_limit;
	}else{
		maximum_bet_limit ="N/A";
	}
	var minimum_bet_limit=	this.state.maxminBet.adminlist;
	if(minimum_bet_limit!=undefined){
		minimum_bet_limit=minimum_bet_limit.minimum_bet_limit;
	}else{
		minimum_bet_limit ="N/A";
	}
	
		var accessToken = this.state.accessToken;

		if (accessToken === "" || accessToken === null) {
			return (
				<Redirect to="/login" />
			);
		}
	var newdata11=this.state.getResult11;
	//console.log()
var amount_data2="";
var amount_data1="";
var amount_data3="";
var amount_data4="";
var stake="";
if(this.state.color_data_model!="" && this.state.color_data_model!=undefined){
	if(this.state.color_data_model.showdata.yes!=undefined && this.state.color_data_model.showdata.yes!=''){
	
		amount_data3="-";
	}
	if(this.state.color_data_model.showdata.no!=undefined && this.state.color_data_model.showdata.no!=''){
		
		amount_data4="-";
	}
	stake=this.state.color_data_model.showdata.stake;
	
	//console.log(this.state.color_data_model.showdata.yes_amount);
}

//console.log(amount_data3);
	
	// no_data_model:no,yes_data_model:yes,color_data_model:resp.data.color,showUserAmountPopup:true





	


		
		return (
			
			<div>
		
		<Header />
				{/* <div className="blockUI blockMsg blockPage"  ><div className="loading-hold" id="overlay"> <div className="loaderGif"> </div> </div></div> */}
				<div id="wrapper">
				
					<div id="content-wrapper">
						<div className="container-fluid">
							<div className="man_bglight">
								
					<div className="featured-box-detail" style={{maxWidth:'100%'}}>
					<table className="table coupon-table table table-striped table-bordered m-t-10">
					  

					  {this.showFancyApiHtml()}
					</table>
				 </div>
				 </div>
				 </div>
			  
				{/* <DataTable  columns={columns} data={this.state.html11} pagination={true} /> */}
					  
				 </div>
			  </div>
									
			
			 <Modal show={this.state.fancyOddsListModelShow}>
				
				<Modal.Header >
				  <Modal.Title>{this.state.row_fancy_name} <sub>Bet List </sub></Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="featured-box-detail" style={{maxWidth:'100%'}}>
					<table className="table coupon-table table table-striped table-bordered m-t-10">
					 {this.state.fancyOddsHtmlData}
					</table>
					</div>
				</Modal.Body>
				<Modal.Footer>
			
				 <button type="button" className="btn btn-info2" data-dismiss="modal" onClick={this.handlefancyOddsListModelClose}><i className="fas fa-undo-alt"></i> Close</button>
				
				 
				</Modal.Footer>
				
			  </Modal>
			  
			  
			  
			   <Modal show={this.state.resultDeclareModelShow}  onHide={this.handleResultDeclareModelClose}>
				<form  className="form loginform" onSubmit={this.handleResultDeclareSubmit}>
				<Modal.Header >
				  <Modal.Title>{this.state.fancy_headname} <sub>Result Declare </sub></Modal.Title>
				</Modal.Header>
				<Modal.Body>
				
					<div className="featured-box-detail" style={{maxWidth:'100%'}}>
					<input type="text" name="fancy_score" value={this.state.fancy_score} onChange={this.handleChangeInput} placeHolder="Fancy Score"  className="form-controle" />
					</div>
				</Modal.Body>
				<Modal.Footer>
				{this.responseResultDeclareHtml()}
				{this.emptyResultDeclareHtml()}
				 <button type="button" className="btn btn-info2" data-dismiss="modal" onClick={this.handleResultDeclareModelClose}><i className="fas fa-undo-alt"></i> Close</button>
				<button type="submit" className="btn btn-primary"><i className="fas fa-paper-plane"></i> Submit</button>	
				
				 
				</Modal.Footer>
				</form>
			  </Modal>


			
				</div>
			
		);

		
	

	}
}

export default Index;
