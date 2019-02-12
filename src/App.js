import React, { Component } from 'react';
import './App.css';
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
  apiKey: "AIzaSyBTRGCHrhQSGEhJl0ppks9cQfUtGLoHr0o",
  authDomain: "dilizents.firebaseapp.com"
})

class App extends Component {
  state = {isSignIn : false, user : []}
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  }
  componentDidMount = () =>{
    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignIn : !!user , user : user})
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.isSignIn ?
        (<span>
            <div>Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <img
              alt="broken"
              src={firebase.auth().currentUser.photoURL}
              width='50px'
            />
          </span>) 
          :
        (<StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />)
           }
      </div>
    );
  }
}

export default App;
