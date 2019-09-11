import React, { Component } from 'react';
import './App.css';

class Zip extends React.Component {

  render(){
    return (<div></div>);
  }
}

class CitySearchField extends React.Component {
  
  state = {
    inputValue: ''
  }

  inputHandler = (event) => {
    
    this.setState({
      inputValue: event.target.value
    })

    this.props.getCode(event.target.value)

  }
  
  render(){
    return (<div className="text-center">
      <label><b>City Name:</b>&nbsp;</label>
      <input onChange={this.inputHandler} type="text"
         value={this.state.inputValue}></input>
    </div>);
    }
}


class App extends Component {

  state = {
    CityName: ''
  }

  getCityCodeHandler = (name) => {

    this.setState({
      CityName: name
    })

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField getCode={this.getCityCodeHandler}/>
        <div>
          <Zip city={this.state.CityName}/>
        </div>
      </div>
    );
  }
}

export default App;
