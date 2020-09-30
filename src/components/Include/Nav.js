import React, { Component } from 'react';
import {Link,Redirect} from "react-router-dom";


class Nav extends Component {
  render() {
    return (

        <nav className="navbar navbar-expand navbar-dark static-top">
			<a className="navbar-brand mr-1" href="#"><img src="img/logo.png" className="logoman" /></a>
		   <button className="btn btn-link btn-sm  order-1 order-sm-0" id="sidebarToggle" href="#">
			  <i className="fas fa-bars"></i>
			</button>
		   
			<form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
			  <div className="input-group">
				<input type="text" className="form-control" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
				<div className="input-group-append">
				  <button className="btn"  type="button">
					<i className="fas fa-search"></i>
				  </button>
				</div>
			  </div>
			</form>

			
			<ul className="navbar-nav ml-auto ml-md-0 right_nav">
			<li className="nav-item  no-arrow">
				<div>
				<span>Balance:</span>
				<b><span id="u_bal">0.00</span></b>
				</div>
				<div>
				<span>Exposure:</span>
				<b><span id="expose">0</span></b>
				</div>
				</li>
			  <li className="nav-item dropdown no-arrow">
				<a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				  <span>dpm000 <i className="fas fa-chevron-down fa-fw"></i></span>
				</a>
			   <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
					<a className="dropdown-item" href="account-statement.html">Account Statement</a>
					<a className="dropdown-item" href="unsetteledbet.html">UnSetteled Bet</a>
					<a className="dropdown-item" href="profitloss.html">Profit Loss</a>
					<a className="dropdown-item" href="bethistory.html">Bet History</a>
					<a className="dropdown-item" href="change-button-value.html">Set Button Values </a>
					<a className="dropdown-item" href="change-password.html">Change Password </a>
					<hr />
					<a className="dropdown-item" onclick="userLogout()" href="javascript:void(0)">Signout</a>
				</div>
			  </li>
			</ul>
		  </nav>
				
    );
  }
}

export default Nav;