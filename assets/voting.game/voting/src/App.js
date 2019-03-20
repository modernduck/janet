import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import Grid from '@material-ui/core/Grid';
class App extends Component {
  constructor(props){
    super(props);
    var config = {
      apiKey: "AIzaSyDrA_10ioUAivE32gPiyIECd-YWp9fx3wI",
      authDomain: "janet-3e832.firebaseapp.com",
      databaseURL: "https://janet-3e832.firebaseio.com",
      projectId: "janet-3e832",
      storageBucket: "janet-3e832.appspot.com",
      messagingSenderId: "173783869688"
  };
  this.state = {
    profiles: [],
  }
  firebase.initializeApp(config);
  firebase.database().ref('votingGame').on('value', snap => {
    console.log('voting game na')
    console.log('voting', snap.val())
    var result =  snap.val();
    var profiles = Object.keys(result.profile).map(key => {
       var obj = result.profile[key];
       obj.id = key;
       if(result.status[key] === true)
        obj.status = "Yes"
      else if(result.status[key] === false)
        obj.status = "No"
      else
        obj.status = "Not Vote yet"

      return obj;
    })
    this.setState({profiles});
  })
}
  render() {
    console.log('render with ', this.state.profiles)
    return this.state.profiles.map(item =>(
      <div key={item.id}>
      <img src={item.picture} />
      <h2>{item.name}</h2>

      <h3>Vote {item.status}</h3>
      </div>
    ));
  }
}

export default App;
