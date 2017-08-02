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
        className="btn-player"
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
class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      numPlayer: 0
    }
    this.handleClickPlayer = this.handleClickPlayer.bind(this);
  }
  handleClickPlayer(i) {
      this.setState({
        page: 2,
        numPlayer: i
      });
  }
  render() {
    let myComponent = undefined;
    if (this.state.page === 1) {
      myComponent = <OneOrTwoPlayer onClick={(i) => this.handleClickPlayer(i)} /> ;
    } else if (this.state.page === 2) {
      myComponent = <h1>BERHASIL</h1>;
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

