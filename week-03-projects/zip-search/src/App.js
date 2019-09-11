import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (<div></div>);
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
      <label>Zip Code:</label>
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
      zipcode: code
    })

    console.log(this.state.zipcode)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField getCode={this.getZipCodeHandler}/>
        <div className="text-center">
          <City />
          <City />
        </div>
      </div>
    );
  }
}

export default App;
