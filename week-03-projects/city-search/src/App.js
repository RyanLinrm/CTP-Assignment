import React, { Component } from 'react';
import './App.css';

class Zip extends React.Component {

  state = {
    zipcode: [],
    found: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.city === nextProps.city && this.state.zipcode === nextState.zipcode) {
      return false;
    } else {
      return true;
    }
  }

  renderCity = async () => {
    
    let cityName = this.props.city.toUpperCase();

    const response = await fetch(`http://ctp-zip-api.herokuapp.com/city/${cityName}`);
    
    if(response.ok){

      const data = await response.json();

      let ziplist = data;
    
      let jaxOutList = ziplist.map( (zipcode) =>
        <div key={zipcode} style={ {textAlign:'center'}}>
          <li>{zipcode}</li>
        </div>
      )

      this.setState({
        zipcode: jaxOutList,
        found: true
      })
    }
    else{
      this.setState({
        found: false
      })
    }

  }

  render(){

    this.renderCity();
    
    return (<div>
    {this.state.found && <div>
      {this.state.zipcode}
    </div>}
    {!this.state.found && <div style={ {textAlign:'center'}}><b>No Results</b></div>}
    </div>);
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

    this.props.getName(event.target.value)

  }
  
  render(){
    return (
    <div style={ {textAlign:'center'}}>
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

  getCityNameHandler = (name) => {

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
        <CitySearchField getName={this.getCityNameHandler}/>
        <div>
          <Zip city={this.state.CityName}/>
        </div>
      </div>
    );
  }
}

export default App;
