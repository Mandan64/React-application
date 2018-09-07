import React, { Component } from 'react';
var firebase = require('firebase');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyA2e09CA-fE6cF1BLB28sPcYrmu30PGX-w",
  authDomain: "u-survey-c6fa6.firebaseapp.com",
  databaseURL: "https://u-survey-c6fa6.firebaseio.com",
  projectId: "u-survey-c6fa6",
  storageBucket: "u-survey-c6fa6.appspot.com",
  messagingSenderId: "376613084261"
};
firebase.initializeApp(config);

class Auth extends Component {
  constructor(props){
    super(props);

    this.state = {
      err:''
    };

  }

  logIn(event) {
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    console.log(`Email is: ${email} and password: ${password}`)

    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email,password);

    promise.then(user => {
      var lout =document.getElementById('logout');
      lout.classList.remove('hide');
      this.setState({err: "You are successfully logged in"});

    })
    promise.catch(err => {

      this.setState({err: err.message})
    })
  }

  signUp() {
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise
    .then(user => {
      var err = `Welcome ${email} your account is created successfully`
      firebase.database().ref('/users/' + user.uid).set({
        email:email,
        password:password
      });
      console.log(user);
      this.setState({err});
    });
    promise.catch(e => {
      var err = e.message;
      console.log(err);
      this.setState({err});
    });
  }

  logOut() {
    firebase.auth().signOut;
    var lout = document.getElementById('logout');
    lout.classList.add('hide');
    this.setState({err: "You are successfully logged out"});
  }

  google() {
   const provider = new firebase.auth.GoogleAuthProvider();
   const promise = firebase.auth().signInWithPopup(provider);
   promise.then(result => {
     var user = result.user;
     console.log(user)
     firebase.database().ref('/user/' + user.uid).set({
       email: user.email,
       name: user.displayName
     });
     this.setState({err: "You are successfully logged in using google"});
   });
   promise.catch(error => {

   })

  }

  render(){
    return(
      <div>
      <h1 className="main-heading">Welcome to the authentication with firebase</h1>
      <form>
      <input id="email" type="email" placeholder="Enter your email" ref="email"/> <br />
      <input id="pass" type="password" placeholder="Enter your password" ref="password" />
      </form>
      {this.state.err} <br />
      <button onClick={this.logIn.bind(this)}>Log In</button>
      <button onClick={this.signUp.bind(this)}>Sign Up</button>
      <button id="logout" className="hide" onClick={this.logOut.bind(this)}>Log out</button> <br />
      <button id="google" className="google" onClick={this.google.bind(this)}>Sign In with google</button>
      </div>
    );
  }
}

export default Auth;
