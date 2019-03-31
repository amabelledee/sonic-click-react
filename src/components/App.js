import React, { Component } from "react";
import Navbar from "./Navbar";
import Container from "./Container";
import Footer from "./Footer";
import Banner from "./Banner";
import images from "../images";

class App extends Component {
  state = {
    score: 0,
    highScore: 0,

    // class value for message color based on user click value
    navMsgColor: "",

    // class value click for message on nav bar based on user click value or start of app
    navMessage: "Click an image to start the Sonic",

    // class value for image array
    allCharacters: this.shuffleArray(),

    // class value for array of clicked images
    wasClicked: [],

    // shake container if the guess is incorrect
    shake: false
  };

  // binds click event to this keyword so we can have access
  clickEvent = this.checkClicked.bind(this);

  // shuffle images on page load
  shuffleArray() {
    // creates an image array to access each by value
    const newArray = images.slice();

    // will store the shuffled array
    const shuffleArr = [];

    // loop for the shuffle array so images randomize
    while (newArray.length > 0) {
      shuffleArr.push(
        newArray.splice(Math.floor(Math.random() * newArray.length), 1)[0]
      );
    }

    return shuffleArr;
  }

  checkClicked(clickedElem) {
    // copy of state to see if it wasClicked
    const prevState = this.state.wasClicked.slice();

    // invoking shuffleArray to shuffle images
    const shuffled = this.shuffleArray();

    // track user score
    let score = this.state.score;
    let highScore = this.state.highScore;

    // if the element hasn't been clicked, increase the score
    if (!this.state.wasClicked.includes(clickedElem)) {
      // if score and highScore are exactly equal, increase the highScore
      if (score === highScore) {
        score++;
        highScore++;

        // else, just update the score
      } else {
        score++;
      }

      // adds clicked item to wasClicked array
      prevState.push(clickedElem);
    }

    // if the element has been clicked, reset the score
    if (this.state.wasClicked.includes(clickedElem)) {
      let score = 0;
      return this.setState({
        score: score,
        highScore: highScore,
        navMsgColor: "incorrect",
        navMessage: "Soniced me twice!",
        allCharacters: shuffled,
        wasClicked: [],
        shake: true
      });
    }

    // if the element hasn't been clicked, run this
    this.setState({
      score: score,
      highScore: highScore,
      navMsgColor: "correct",
      navMessage: "Yowza! You got it",
      allCharacters: shuffled,
      wasClicked: prevState,
      shake: false
    });

    // timeout for color on the nav bar
    return setTimeout(() => this.setState({ navMsgColor: "" }), 500);
  }

  // renders elements to page
  render() {
    const state = this.state;
    return (
      <div>
        <Navbar
          score={state.score}
          highScore={state.highScore}
          navMessage={state.navMessage}
          navMsgColor={state.navMsgColor}
        />
        <Banner />
        <Container
          shake={state.shake}
          characters={state.allCharacters}
          clickEvent={this.clickEvent}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
