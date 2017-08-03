import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';


class Square extends React.Component {
  render() {
    return (
      <button className="btn-square">X</button>
    )
  }
}
class BoardGame extends React.Component {
  renderSquare(i) {
    return (
      <Square
      />
    )
  }
  render() {
    return (
      <div className="board-game">
        <div className="row-square">
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>
          <div className="row-square">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
        </div>
          <div className="row-square">
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
        </div>   
      </div>
    )
  }
}
class PlayerButton extends React.Component {
  render() {
    return (
      <button 
        className={this.props.className}
        onClick={this.props.onClick}
      >
      {this.props.text}</button>
    )
  }
}
class OneOrTwoPlayer extends React.Component {
  renderButton(i) {
    let temp = i === 1 ? "One Player" : "Two Player";
    return (
      <PlayerButton
        className="btn-player"
        text={temp} 
        onClick={() => this.props.onClick(i)}
      />
    )
  }
  render() {
    return (
      <div className="intro">
        <p>How do you want to play?</p>
        <div className="intro-btn">
          {this.renderButton(1)}
          {this.renderButton(2)}
        </div>
      </div>
    )
  }
}
class ChooseChar extends React.Component {
  renderButton(i) {
    let temp = i === 1 ? "X" : "O";
    return (
      <PlayerButton
        className ="btn-char"
        text={temp} 
        onClick={() => this.props.onClick(i)}
      />
    )
  }
  render() {
    return (
      <div className="intro-choose">
        <p>Would you like to be X or O?</p>
        <div className="intro-choose-btn">
          {this.renderButton(1)}
          {this.renderButton(2)}          
        </div>
      </div>
    )
  }
}
class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      numPlayer: 0,
      player1: '',
      player2: ''
    }
    this.handleClickPlayer = this.handleClickPlayer.bind(this);
    this.handleClickChar = this.handleClickChar.bind(this);
  }
  handleClickPlayer(i) {
    this.setState({
      page: 2,
      numPlayer: i
    });
  }
  handleClickChar(i) {
    // let char = i.target.value;
    console.log(i.value);
    // this.setState({
    //   page: 3,
    //   player1: char,
    //   player2: char === 'X' ? 'O' : 'X'
    // });
  }
  render() {
    let myComponent = undefined;
    if (this.state.page === 1) {
      myComponent = <OneOrTwoPlayer onClick={(i) => this.handleClickPlayer(i)} /> ;
    } else if (this.state.page === 2) {
      myComponent = <ChooseChar onClick={(i) => this.handleClickChar(i)}/>;
    }
    return (
      <div className="outer-board">
        <div className="inner-board">
          {myComponent}
        </div>
      </div>
    )
  }
}


ReactDOM.render(<Board />, document.getElementById('root'));
registerServiceWorker();

