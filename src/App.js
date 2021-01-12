import './App.css';
import Logo from './components/Logo/Logo';
import ImageLink from './components/ImageLink/ImageLink';
import Profile from './components/Profile/Profile';
import Signin from './components/signin/signin';
import Register from './components/Register/Register';
import FaceDetect from './components/FaceDetect/FaceDetect';
import React, { Component } from 'react';
import Clarifai from 'clarifai';
import 'tachyons';
import SignOut from './components/SignOut/SignOut';
import Particles from 'react-particles-js'; 

const app = new Clarifai.App({
 apiKey: '701440986a294867b11fa1457cb41fa1'
});

const url = "http://localhost:3001";

class App extends Component{
  constructor(){
    super();
    this.state = {
      input: '',
      imageurl: '',
      img: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }

  calculateFaceLoc = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const formData = new FormData();
      files.forEach((file, i) => {
        formData.append(i, file)
      })
      fetch(`${url}/image`, {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(images => {
          this.setState({ input: images[0].url});
        })
    } else {
      this.setState({ input: event.target.value});
    }
  }

  onButtonSubmit = () => {
    this.setState({imageurl: this.state.input});
    app.models.predict( Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if(response){
          fetch(url + "/image", {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
      }
        this.displayFaceBox(this.calculateFaceLoc(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    }else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
  
  render(){
    const { isSignedIn, imageurl, route, box} = this.state;
    return (
      <div className="App">
        <Particles className='Particles'
          params={{
            "particles": {
                "number": {
                    "value": 200,
                    "density": {
                        "enable": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "speed": 4,
                        "size_min": 0.3
                    }
                },
                "line_linked": {
                    "enable": false
                },
                "move": {
                    "random": true,
                    "speed": 1,
                    "direction": "top",
                    "out_mode": "out"
                }
            }
        }} />

        {route === 'home'
          ?<div>
            <div className="box">
              <Logo />       
              <Profile
                name={this.state.user.name}
                entries={this.state.user.entries}
                />
              <SignOut isSignedIn ={isSignedIn} onRouteChange={this.onRouteChange} />
              <ImageLink 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}
                />
              <FaceDetect box={box} imgurl={imageurl}/>
              </div>
          </div>
        : (
           route === 'signin'
           ?
          <Signin onRouteChange={this.onRouteChange}/>
            :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
      }
        </div>
      );
  }
}
export default App;
