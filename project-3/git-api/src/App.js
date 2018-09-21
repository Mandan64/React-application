import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {

	constructor(props){
		super(props);

		this.state = {
			username: 'mandanprasad',
			data:''
		};
	}

	submit(event) {
		event.preventDefault();
		let value = this.refs.username.value;
		this.fetchData(value)
	}


	fetchData(username) {

		fetch(`https://api.github.com/users/${username}`)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			if(data.message === "Not Found") {
				this.setState({data: "Please ensure that the username is correct"})
			} else{
				this.setState({data: JSON.stringify(data)})
			}


		})
		.catch(error => this.state.data({data: "Error is" + error}))
	}

	componentWillMount() {
		this.fetchData(this.state.username)

	}
	render() {

		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">I am  suraj and i study in iit</h1>
				</header>
				<input className="gitSearch" placeholder="Enter the github username" ref="username" />
			<form onClick={this.submit.bind(this)}>
			<button className="searchBtn" >Search</button>
			</form>
			{this.state.data}
			</div>
		);
	}
}

export default App;
