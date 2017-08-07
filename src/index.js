import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
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
      <span style={this.props.style}>{this.props.text}</span>
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
    let style = {};
    switch (i) {
      case 1:
        temp = this.props.win1;
        break;
      case 2:
        temp = "player 1";
        if (this.props.turn === '1') {
          style = { 
            'font-weight': 'bold',
            'color': 'red'
          } 
        } else style = {};
        break;
      case 3:
        temp = this.props.win2;
        break;
      case 4:
        temp = this.props.numPlayer === 1 ? "computer" : "player 2";
        if (this.props.turn === '2') {
          style = { 
            'font-weight': 'bold',
            'color': 'red'
          } 
        } else style = {};
    }
    return <Status text={temp} style={style}/>
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
class AnnouceWinner extends React.Component {
  render() {
    return (
      <div onClick={this.props.onClick}>
        <p>Player {this.props.winner} wins!!!</p>
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
      turn: '', 
      winner: ''
    }
    this.handleClickPlayer = this.handleClickPlayer.bind(this);
    this.handleClickChar = this.handleClickChar.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleClickSquare = this.handleClickSquare.bind(this);
    this.handleWinnerClick = this.handleWinnerClick.bind(this);
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
      //set first player
      if (this.state.start) {
        let turn = Math.floor((Math.random() * 2) + 1);
        if (turn === 1) {
          this.setState({turn: '1', start: false});
        } else {
          if (this.state.numPlayer === 2) {
            this.setState({turn: '2', start: false});
          } else {
            this.setState({turn: 'c', start: false});
          }
        }
      }
      //update
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
    let squares = this.state.squares.slice();
    if (squares[i]) return; //if squares clicked before

    if (this.state.turn === '1') {
      squares[i] = this.state.player1;
      this.setState({
        turn: this.state.numPlayer === 1 ? 'c' : '2',
        squares: squares
      });
    } else if (this.state.turn === '2') {
      squares[i] = this.state.player2;
      this.setState({
        turn: '1',
        squares: squares
      });
    }
  }
  handleWinnerClick() {
    this.setState({
      page: 3,
      squares: Array(9).fill(null),
      start: true,
      turn: '1',  //TEMP MUST BE CHANGED
      winner: ''
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.turn === 'c') {  //computer turn
      let squares = this.state.squares.slice();
                    // human
                    let huPlayer = this.state.player1;
                    // computer
                    let aiPlayer = this.state.player2;


                    // keep track of function calls
                    let fc = 0;

                    // finding the ultimate play on the game that favors the computer
                    let bestSpot = minimax(squares, aiPlayer);

                    //loging the results
                    // console.log("index: " + bestSpot.index);
                    // console.log("function calls: " + fc);

                    // the main minimax function
                    function minimax(newBoard, player){
                      
                      //keep track of function calls;
                      fc++;

                      //available spots
                      var availSpots = emptyIndexies(newBoard);

                      // checks for the terminal states such as win, lose, and tie and returning a value accordingly
                      if (winning(newBoard, huPlayer)){
                        return {score:-10};
                      }
                      else if (winning(newBoard, aiPlayer)){
                        return {score:10};
                      }
                      else if (availSpots.length === 0){
                        return {score:0};
                      }

                    // an array to collect all the objects
                      var moves = [];

                      // loop through available spots
                      for (var i = 0; i < availSpots.length; i++){
                        //create an object for each and store the index of that spot that was stored as a number in the object's index key
                        var move = {};
                        move.index = newBoard[availSpots[i]];

                        // set the empty spot to the current player
                        newBoard[availSpots[i]] = player;

                        //if collect the score resulted from calling minimax on the opponent of the current player
                        if (player == aiPlayer){
                          var result = minimax(newBoard, huPlayer);
                          move.score = result.score;
                        }
                        else{
                          var result = minimax(newBoard, aiPlayer);
                          move.score = result.score;
                        }

                        //reset the spot to empty
                        newBoard[availSpots[i]] = move.index;

                        // push the object to the array
                        moves.push(move);
                      }

                    // if it is the computer's turn loop over the moves and choose the move with the highest score
                      var bestMove;
                      if(player === aiPlayer){
                        var bestScore = -10000;
                        for(var i = 0; i < moves.length; i++){
                          if(moves[i].score > bestScore){
                            bestScore = moves[i].score;
                            bestMove = i;
                          }
                        }
                      }else{

                    // else loop over the moves and choose the move with the lowest score
                        var bestScore = 10000;
                        for(var i = 0; i < moves.length; i++){
                          if(moves[i].score < bestScore){
                            bestScore = moves[i].score;
                            bestMove = i;
                          }
                        }
                      }

                    // return the chosen move (object) from the array to the higher depth
                      return moves[bestMove];
                    }

                    // returns the available spots on the board
                    function emptyIndexies(board){
                      return  board.filter(s => s != "O" && s != "X");
                    }
                    // winning combinations using the board indexies for instace the first win could be 3 xes in a row
                    function winning(board, player){
                    if (
                            (board[0] == player && board[1] == player && board[2] == player) ||
                            (board[3] == player && board[4] == player && board[5] == player) ||
                            (board[6] == player && board[7] == player && board[8] == player) ||
                            (board[0] == player && board[3] == player && board[6] == player) ||
                            (board[1] == player && board[4] == player && board[7] == player) ||
                            (board[2] == player && board[5] == player && board[8] == player) ||
                            (board[0] == player && board[4] == player && board[8] == player) ||
                            (board[2] == player && board[4] == player && board[6] == player)
                            ) {
                            return true;
                        } else {
                            return false;
                        }
                    }



      



    }
    if (!_.isEqual(prevState.squares, this.state.squares)) {
      let win = calculateWinner(this.state.squares);
      if (win) { //if win
        if (this.state.turn === '2') {
          this.setState({
            page: 4,
            win1: this.state.win1 + 1,
            winner: '1'
          });
        } else {
          this.setState({
            page: 4,
            win2: this.state.win2 + 1,
            winner: '2'
          });
        }
        return;
      }
    }
  }
  render() {
    let myComponent = undefined;
    let myPlayer = undefined;
    if (this.state.page === 1) { //choose One or Two players
      myComponent = <OneOrTwoPlayer onClick={(i) => this.handleClickPlayer(i)} /> ;
    } else if (this.state.page === 2) { //choose X or O
      myComponent = <ChooseChar onClick={(i) => this.handleClickChar(i)} numPlayer={this.state.numPlayer}/>;
    } else if (this.state.page === 3) { //main game
      myComponent = <BoardGame val={this.state.squares} onClick={(i) => this.handleClickSquare(i)} />;
      myPlayer = (<PlayerStats 
        win1={this.state.win1} 
        win2={this.state.win2}
        numPlayer={this.state.numPlayer}
        onClick={this.handleResetClick}
        turn={this.state.turn}
      />);
    
    } else { //winner announce
      myComponent = <AnnouceWinner winner={this.state.winner} onClick={this.handleWinnerClick} />;
      myPlayer = (<PlayerStats 
        win1={this.state.win1} 
        win2={this.state.win2}
        numPlayer={this.state.numPlayer}
        onClick={this.handleResetClick}
      />);
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