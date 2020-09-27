import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'; 
import Index from './components/HomePage/Index';
import LoginPage from './components/LoginPage/LoginPage';
import Register from './components/Register/Register';
import emailVerify from './components/Register/emailVerify';
import Receive from './components/Receive/Receive';
import Transactions from './components/Transactions/Transactions';
import Adminlist from './components/Admin/adminlist';
import Accountlist from './components/Admin/accountlist';
import Addadmin from './components/Admin/addadmin';
import Userlist from './components/User/userlist';
import Adduser from './components/User/adduser';
import Gameassign from './components/User/gameassign';  
import Profile from './components/User/profile';
import Fancybetlist from './components/Admin/fancybetlist';
import Userbetlist from './components/Admin/userbetlist';
import Fancybetadd from './components/Admin/fancybetadd';
import Logout from './components/LoginPage/Logout'; 
import GameTypeList from './components/Admin/gametypelist'; 
import MatchList from './components/Admin/matchlist';
 
import andarbaharlist from './components/Admin/andarbaharlist'; 
import lucky7list from './components/Admin/lucky7list'; 
import dt from './components/Admin/dt'; 
import teenpatti from './components/Admin/teenpatti'; 
import card32 from './components/Admin/card32'; 
import livepoker from './components/Admin/livepoker'; 
import worlilist from './components/Admin/worlilist'; 

import Matchdetail from './components/Admin/Matchdetail'; 
import ChangePass from './components/Admin/changepass'; 
import AdminBetList from './components/Admin/adminbetlist'; 
import UserTransactions from './components/Admin/user_trans';
import AdminTransactions from './components/Admin/admin_trans';
import adminText from './components/Admin/admintext';
import minmaxbet from './components/Admin/min-max-bet';
import userlogs from './components/Admin/user-logs';
import Addsport from './components/Admin/addsport';
import Sportdetails from './components/Admin/sports-details';
import manage_market from './components/Admin/manage_market';
import fancy_details from './components/Admin/fancy_details';
import match_history from './components/Admin/match_history';
import userbetlistmatch from './components/Admin/userbetlistmatch';
import market_analysis from './components/Admin/market-analysis';
import profitloss from './components/Admin/profitloss';
import profitlossnew from './components/Admin/profitlossnew';
import matchoodsresult from './components/Admin/matchoodsresult'; 
import manage_fancy from './components/Admin/manage_fancy'; 
import my_market from './components/Admin/mymarket'; 
import addnewmatch from './components/Admin/addnewmatch'; 
import fancy_history from './components/Admin/fancy_history'; 
import match_history_new from './components/Admin/match_history_new'; 
import addbookmaker from './components/Admin/addbookmaker'; 
import one_day_teenpatti from './components/Admin/one_day_teenpatti';
import teenpatti20 from './components/Admin/teenpatti20'; 
import dt_one_day from './components/Admin/dt_one_day';
 import marketsport  from './components/Admin/market';
import diamondsports  from './components/Admin/diamond';
import vipcasino  from './components/Admin/vip_casino';
import casino from './components/Admin/casino';
import addprivilege from './components/Admin/addprivilege';
import editprivilege from './components/Admin/editprivilege';
import listprivilege from './components/Admin/listprivilege';
import worli2 from './components/Admin/worli2';
import card32a from './components/Admin/card32a';
import card32b from './components/Admin/card32b';
import casino_andar_bahar from './components/Admin/casino_andar_bahar';
import ab2 from './components/Admin/ab2';
import aaa from './components/Admin/aaa';
import GeneralReport from './components/Admin/general_report';
import GameReport from './components/Admin/game_report';
import CasinoReport from './components/Admin/casino_report';
import CasinoResultReport from './components/Admin/casino_result_report';
import './App.css';

/* const Home = () => (
  <HomePage />
);
 */
const Login = () => (
  <LoginPage />
);  
class App extends Component {
  render() {
    return (
      <Router>  
        <div className="App">
          <Route exact path="/" component={Index} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Route path="/register" component={Register} />
		  <Route path="/changepass" component={ChangePass} />
		   <Route path="/transactions" component={Transactions} />
		   <Route path="/emailverify/:vcode" component={emailVerify} />
       <Route path="/adminlist" component={Adminlist} />  
       <Route path="/accountlist/:id" component={Accountlist} />    
         
         <Route path="/addadmin" component={Addadmin} />
         <Route path="/adduser" component={Adduser} />
         <Route path="/gametypelist" component={GameTypeList} />
         <Route path="/matchlist/:id" component={MatchList} />
		 
         <Route path="/userlist" component={Userlist} /> 
         <Route path="/fancybetlist" component={Fancybetlist} />   
         <Route path="/userbetlist" component={Userbetlist} /> 
         <Route path="/fancybetadd" component={Fancybetadd} />
         <Route path="/gameassign/:id" component={Gameassign} />
         <Route path="/profile/:id" component={Profile} />
         <Route path="/adminbetlist/:id" component={AdminBetList} />
         <Route path="/user-transactions/:id" component={UserTransactions} />
         <Route path="/user-transactions/:id" component={UserTransactions} />

         <Route path="/admin-transactions" component={AdminTransactions} />
         <Route path="/matchdetail/:id/:id1" component={Matchdetail} />
         <Route path="/admin-text" component={adminText} />
         <Route path="/min-max-bet/:id" component={minmaxbet} />
         
         <Route path="/user-logs/:id" component={userlogs} />
         <Route path="/add-sports" component={Addsport} />
         <Route path="/sports-details" component={Sportdetails} />
         <Route path="/manage-market" component={manage_market} />
         <Route path="/fancy-details/:id/:id1" component={fancy_details} />
         <Route path="/match-history" component={match_history} />
         <Route path="/user-bet-list" component={userbetlistmatch} />
         <Route path="/market-analysis" component={market_analysis} />
         <Route path="/profit-loss" component={profitloss} />
         <Route path="/profitloss" component={profitlossnew} />
        <Route path="/addnewmatch/:sport_id" component={addnewmatch} />
        <Route path="/addbookmaker/:match_id" component={addbookmaker} />
         <Route path="/match-odds-result" component={matchoodsresult} />
         <Route path="/manage_fancy/:id" component={manage_fancy} />
         <Route path="/my-market" component={my_market} />
          <Route path="/fancy_history/:id" component={fancy_history} /> 
         <Route path="/match_history_details" component={match_history_new} />
		   <Route path="/market-sports" component={marketsport} /> 
      <Route path="/diamond-sports" component={diamondsports} />
      <Route path="/vip-casino" component={vipcasino} />
	   <Route path="/add-privilege" component={addprivilege} />
	   <Route path="/edit_privilege/:id" component={editprivilege} />
	   <Route path="/list-privilege" component={listprivilege} />
	  
      <Route path="/andar-bahar-list" component={andarbaharlist} />
      <Route path="/lucky7-list" component={lucky7list} />
	  
      <Route path="/d-t" component={dt} />
      <Route path="/teenpatti-list" component={teenpatti} />
      
      <Route path="/card32-list" component={card32} />
      <Route path="/livepoker-list" component={livepoker} />
      <Route path="/worli-list" component={worlilist} />
	  <Route path="/casino/teenpatti20" component={teenpatti20} />

      
         <Route path="/casino/dt20" component={casino} />
         <Route path="/casino/one-day-teenpatti" component={one_day_teenpatti} />
         <Route path="/casino/dt-one-day" component={dt_one_day} />


         <Route path="/casino/worli2" component={worli2} />
       <Route path="/casino/card32a" component={card32a} />
       <Route path="/casino/card32b" component={card32b} />
       <Route path="/casino/andar-bahar" component={casino_andar_bahar} />
       <Route path="/casino/aaa" component={aaa} />
	   <Route path="/casino/ab2" component={ab2} />
       <Route path="/general-report" component={GeneralReport} />
       <Route path="/game-report" component={GameReport} />
       <Route path="/casino-report" component={CasinoReport} />
       <Route path="/casino-result-report" component={CasinoResultReport} />

       
        </div>

      </Router>
    );
  }
}

export default App;
