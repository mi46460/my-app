import './App.css';
import Logo from './components/Logo/Logo';
import ImageLink from './components/ImageLink/ImageLink';
import Profile from './components/Profile/Profile';
import FaceDetect from './components/FaceDetect/FaceDetect';
import React, { Component } from 'react';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: '701440986a294867b11fa1457cb41fa1'
});

class App extends Component{
  constructor(){
    super();
    this.state = {
      input: '',
      imageurl: '',
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    this.setState({imageurl: this.state.input});
    console.log(this.state.imageurl);
        // <pre class="prettyprint linenums">app.models.predict(Clarifai.COLOR_MODEL,
        // "https://samples.clarifai.com/metro-north.jpg")
        // .then(function(response) {
        //   // do something with responseconsole.log(response);
        //   console.log(Response)
        // },
        // function(err) {// there was an error
        // }
      // );</pre>
  }
  
  render(){
    return (
      <div className="App">
        <Logo />
        <Profile/>
        <ImageLink onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceDetect imgurl={this.state.imageurl}/>
      </div>
    ); 
  }
}

export default App;
