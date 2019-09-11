import React, { Component } from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';


class City extends React.Component {
  state = {
    cities: [],
    found: false,
    data: []
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.zip === nextProps.zip && this.state.cities === nextState.cities) {
      return false;
    } else {
      return true;
    }
  }

  renderCity = async () => {
    
    const response = await fetch(`http://ctp-zip-api.herokuapp.com/zip/${this.props.zip}`);
    
    if(response.ok){

      const data = await response.json();

      let citylist = [];

      for( let i = 0; i < data.length; i++){
        let citydata = data[i]
        citylist.push(citydata)
      }
    
      let jaxOutList = citylist.map( (city) =>
        <div key={city.RecordNumber}>
          <Card style={{ width: '20rem', margin: 'auto' }}>
            <Card.Header><b>{city.City}, {city.State}</b></Card.Header>
            <Card.Body>
              <ul>
                <li>State: {city.State}</li>
                <li>Location: ({city.Lat}, {city.Long})</li>
                <li>Population(estimated): {city.EstimatedPopulation}</li>
                <li>Total Wages: {city.TotalWages}</li>
              </ul>
            </Card.Body>
          </Card>
        </div>
      )

      this.setState({
        cities: jaxOutList,
        found: true
      })
  }

  }

  render(){

    this.renderCity();
    
    return (<div>
      {this.state.cities}
    </div>);
  }
}

class ZipSearchField extends React.Component {
  
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
      <label><b>Zip Code:</b>&nbsp;</label>
      <input onChange={this.inputHandler} type="text"
         value={this.state.inputValue}></input>
    </div>);
    }
}


class App extends Component {

  state = {
    zipcode: ''
  }

  getZipCodeHandler = (code) => {

    this.setState({
      zipcode: code,
      showCities: true
    })

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField getCode={this.getZipCodeHandler}/>
        <div>
          <City zip={this.state.zipcode}/>
        </div>
      </div>
    );
  }
}

export default App;
