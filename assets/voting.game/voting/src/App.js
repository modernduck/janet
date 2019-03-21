import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';

import Grid from '@material-ui/core/Grid';

const styleStuff = {
  img:{
    width:"150px",
    height:"auto"

  },
  p:{
    textAlign:"center"
  }
}


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
    profiles: [
      

    ]
  }
  firebase.initializeApp(config);
 firebase.database().ref('votingGame').on('value', snap => {
    console.log('voting game na')
    console.log('voting', snap.val())
    var result =  snap.val();
    var profiles =[]
    if(result.status)
       profiles = Object.keys(result.status).map(key => {
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

    this.setState({profiles });
  })
}

renderStatus(item){
  if(item.status == "Yes")
    return <img src="like.png" />
  else if(item.status =="No")
    return <img src="unlike.png" />
  else
    return ''
}

renderEach() {
  return this.state.profiles.map(item =>(
    <Grid key={item.id}>
    <img src={item.picture} style={styleStuff.img} />
    <p style={styleStuff.p}>{item.name}</p>

    <div>
      {this.renderStatus(item)}
    </div>
    </Grid>
  ));
}
  render() {
    console.log('render with ', this.state.profiles)
    /*return this.state.profiles.map(item =>(
      <div key={item.id}>
      <img src={item.picture} />
      <h2>{item.name}</h2>

      <h3>Vote {item.status}</h3>
      </div>
    ));*/
    return (<Grid  container
      direction="row"
      justify="center"
      alignItems="center">
       {this.renderEach()}
    </Grid>)
  }
}

export default App;
