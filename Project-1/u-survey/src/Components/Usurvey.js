import React, { Component } from 'react';
var firebase = require('firebase');
var uuid = require('uuid');

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


class Usurvey extends Component {
  constructor(props){
    super(props);

    this.state = {
      uid: uuid.v1(),
      studentName: '',
      answers: {
        answer1: '',
        answer2: '',
        answer2: ''
      },
      isSubmitted: false
    };
    this.nameSubmit = this.nameSubmit.bind(this);
    this.answerSelected = this.answerSelected.bind(this);
    this.questionSubmit = this.questionSubmit.bind(this);
  }

  nameSubmit(event){
    var studentName = this.refs.username.value;
    this.setState({studentName},()=> {
      console.log(this.state.studentName);
    });
  }

  answerSelected(event) {
 var answers = this.state.answers;
 if(event.target.name === 'answer1'){
   answers.answer1 = event.target.value
 } else if (event.target.name === 'answer2') {
   answers.answer2 = event.target.value
 }

 else if (event.target.name === 'answer3') {
   answers.answer3 = event.target.value
 }

 this.setState({
   answers: answers
 }, function() {
   console.log(this.state)
 })
}

  questionSubmit() {
    firebase.database().ref('uSurvey/' + this.state.uid).set({
      studentName: this.state.studentName,
      answers: this.state.answers
    });
    this.setState({isSubmitted: true});
  }

  render(){
    var studentName;
    var questions;

    if(this.state.studentName === '' && this.state.isSubmitted===false) {
      studentName = <div>
      <h1>Please enter your name</h1>
            <form onSubmit={this.nameSubmit}>
             <input className="namy" type="text" ref="username" placeholder="Enter your name" />
            </form>
      </div>;
      questions = ''
    } else if (this.state.studentName !== '' && this.state.isSubmitted=== false) {
      questions = <div><h1>Welcome to the U-survey, {this.state.studentName}</h1>
    <h2>Here are some questions</h2>

      <form onSubmit={this.questionSubmit}>
      <div className="card">
      <label>What kind of courses you like the most?</label> <br />
      <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected} /> Technology
      <input type="radio" name="answer1" value="Design" onChange={this.answerSelected} /> Design
      <input type="radio" name="answer1" value="Marketing" onChange={this.answerSelected} /> Marketing
      </div>

      <div className="card">
      <label>You are a: </label> <br />
      <input type="radio" name="answer2" value="Student" onChange={this.answerSelected} /> Student
      <input type="radio" name="answer2" value="in-job" onChange={this.answerSelected} /> in-job
      <input type="radio" name="answer2" value="loking-for-job" onChange={this.answerSelected} /> loking-for-job
      </div>

       <div className="card">
      <label>Are online courses helpful?</label> <br />
      <input type="radio" name="answer3" value="Yes" onChange={this.answerSelected} /> Yes
      <input type="radio" name="answer3" value="No" onChange={this.answerSelected} /> No
      <input type="radio" name="answer3" value="Maybe" onChange={this.answerSelected} /> Maybe
      </div>
      <input className="feedback-button" type="submit" value="submit" />
      </form>
      </div>
    }

    else if(this.state.studentName && this.state.isSubmitted === true) {
      studentName = `Thankyou ${this.state.studentName} for your response`
    }
    return(
      <div>
      {studentName} <br />
      -------------------------------------------
      {questions}
      </div>
    );
  }
}
export default Usurvey;
