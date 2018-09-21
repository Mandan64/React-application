import React, { Component } from 'react';
import logo from './logo.png'
class Loginpage extends Component {
  render(){

    return(

      <div className="container">


      <div className="header">
      <img className="logo" src={logo} />
      <h1>Learn Code Online</h1>
      <p className="sub-heading">Your Journey to magical world of programming starts here !</p>
      <div className="entrance">
      <a className="login" href="#">login</a>
      <a className="register" href="#">register</a>
      </div>
      </div>

      <div className="login-center">
      <input type="email" placeholder="Email" /> <br />
      <input type="password" placeholder="passwords" /> <br />

      <div className="btn">
       <a className="signin">SIGNIN</a>
       <a className="signinGoogle">signin with google</a>
       </div>
      </div>


      </div>
    );
  }
}


export default Loginpage;
