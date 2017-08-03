import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';


class Square extends React.Component {
  render() {
    return (
      <button className="btn-square" onClick={this.props.onClick} style={this.props.style}>{this.props.val}</button>
    )
  }
}
class BoardGame extends React.Component {
  renderSquare(i) {
    let style = {};
    switch (i) { //offset absolute position
      case 0:
      case 3:
      case 6:
        style={'left': '0px'}
        break;
      case 1:
      case 4:
      case 7:
        style={'left': '101px'}
        break;
      case 2:
      case 5:
      case 8:
        style={'left': '201px'}
        break;  
    }
    return (
      <Square 
        val={this.props.val[i]}
        onClick={() => this.props.onClick(i)}
        style={style}
      />
    )
  }
  render() {
    return (
      <div className="board-game">
        <div className="row-square">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
          <div className="row-square">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
          <div className="row-square">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
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
    if (i < 3) {
      let temp = i === 1 ? "X" : "O";
      return (
        <PlayerButton
          className ="btn-char"
          text={temp} 
          onClick={() => this.props.onClick(i)}
        />
      )
    } else {//back button
      return (
        <PlayerButton
          className ="btn-back"
          text= {String.fromCharCode(10594) + "Back"}
          onClick={() => this.props.onClick(i)}
        />
      )
    }
  }
  render() {
    let question = '';
    if (this.props.numPlayer === 1) {
      question = 'Would you like to be X or O?';
    } else {
      question = 'Player 1 : Would you like X or O?'
    }
    return (
      <div className="intro">
        <p>{question}</p>
        <div className="choose-btn">
          {this.renderButton(1)}
          {this.renderButton(2)}          
        </div>
          {this.renderButton(3)}          
      </div>
    )
  }
}
class Status extends React.Component {
  render() {
    return (
      <span>{this.props.text}</span>
    )
  }
}
class Reset extends React.Component {
  render() {
    return <button className="reset-btn" onClick={this.props.onClick}>Reset All</button>
  }
}
class PlayerStats extends React.Component {
  renderStatus(i) {
    let temp = '';
    switch (i) {
      case 1:
        temp = this.props.win1;
        break;
      case 2:
        temp = "player 1";
        break;
      case 3:
        temp = this.props.win2;
        break;
      case 4:
        temp = this.props.numPlayer === 1 ? "computer" : "player 2";
    }
    return <Status text={temp}/>
  }
  render() {
    return (
      <div>
        <div className="player1-stats">
          {this.renderStatus(1)}
          <br />
          {this.renderStatus(2)} 
        </div>
  
        <div className="player2-stats">
          {this.renderStatus(3)}
          <br />
          {this.renderStatus(4)}
        </div>
        <Reset onClick={this.props.onClick}/>
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
      player2: '',
      win1: 0,
      win2: 0,
      squares: Array(9).fill(null),
      start: true,
      turn: ''
    }
    this.handleClickPlayer = this.handleClickPlayer.bind(this);
    this.handleClickChar = this.handleClickChar.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleClickSquare = this.handleClickSquare.bind(this);
  }
  handleResetClick() {
    this.setState({
      win1: 0,
      win2: 0,
      squares: Array(9).fill(null),
      start: true
    });
  }
  handleClickPlayer(i) {
    this.setState({
      numPlayer: i,
      page: 2
    });
  }
  handleClickChar(i) {
    if (i < 3) {
      this.setState({
        page: 3,
        player1: i === 1 ? 'X' : 'O',
        player2: i === 2 ? 'X' : 'O'
      });
    } else { //back button
      this.setState({page: 1});
    }
  }
  handleClickSquare(i) {
    console.log(this.state.squares[i]);
    let squares = this.state.squares.slice();
    if (squares[i]) return; //if squares clicked before
    let win = calculateWinner(squares);
    if (win) { //if win
      this.setState({page: 4})
      return;
    }
    if (this.state.turn === '1') {
      squares[i] = this.state.player1;
      this.setState({
        turn: '2',
        squares: squares
      });
    } else {
      squares[i] = this.state.player2;
      this.setState({
        turn: '1',
        squares: squares
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    
  }
  render() {
    let myComponent = undefined;
    let myPlayer = undefined;
    if (this.state.page === 1) { //choose One or Two players
      myComponent = <OneOrTwoPlayer onClick={(i) => this.handleClickPlayer(i)} /> ;
      myPlayer = undefined;
    } else if (this.state.page === 2) { //choose X or O
      myComponent = <ChooseChar onClick={(i) => this.handleClickChar(i)} numPlayer={this.state.numPlayer}/>;
      myPlayer = undefined;
    } else if (this.state.page === 3) { //main game
      myComponent = <BoardGame val={this.state.squares} onClick={(i) => this.handleClickSquare(i)} />;
      myPlayer = (<PlayerStats 
        win1={this.state.win1} 
        win2={this.state.win2}
        numPlayer={this.state.numPlayer}
        onClick={this.handleResetClick}
      />);
    // if (this.state.start) {
    //   //random first player
    //   let turn = Math.floor((Math.random() * 2) + 1);
    //   if (turn === 1) {
    //     this.setState({turn: '1', start: false});
    //   } else {
    //     if (this.state.numPlayer === 2) {
    //       this.setState({turn: '2', start: false});
    //     } else {
    //       this.setState({turn: 'c', start: false});
    //     }
    //   }
    // } else { //game logic
    //   if (this.state.turn === 'c') {
    //     console.log('computer');
    //   }
    // }
    } else { //winner announce

    }
    return (
      <div className="outer-board">
        <div className="status-container">
          {myPlayer}
        </div>
        <div className="inner-board">
          {myComponent}
        </div>
      </div>
    )
  }
}


ReactDOM.render(<Board />, document.getElementById('root'));
registerServiceWorker();

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && (squares[a] === squares[b]) && (squares[a] === squares[c])) {
      return squares[a];
    }
  }
  return null;
}