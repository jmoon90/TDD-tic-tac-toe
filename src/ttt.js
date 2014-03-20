function Board() {
  this.state = [];
}

Board.prototype = {
  constructor:Board,
  newBoard:function() {
    var new_board = [[1,2,3],
                     [4,5,6],
                     [7,8,9]]
    print(new_board[0]);
    print(new_board[1]);
    print(new_board[2]);
    this.state.push(new_board[0]);
    this.state.push(new_board[1]);
    this.state.push(new_board[2]);
    return new_board
  },
  currentState:function(array) {
    if(countPlace === 0) {
      if(firstPlayer === "Human") {
        countPlace = 2
      } else {
        countPlace = 1
      }
    }
    for(r = 0; r < 3; r++) {
      for(i = 0; i < 9; i++) {
        for(a = 0; a < array.length; a++) {
          if(this.state[r][i] == array[a]){
            this.state[r][i] = players[countPlace % 2];
            countPlace++;
          }
        }
      }
      print(this.state[r]);
    }
    return(this.state);
  }
}

function PlayGame() {
  this.piecesPlayed = [];
  this.computerPieces = [];
  this.playerPieces = [];
}

PlayGame.prototype = {
  constructor:PlayGame,
  runGame:function(n) {
    print(game.firstMove());
    n = 0;
    //call Game Result needs to
    //
    var game_result = new GameResult();
    while(n < 9) {
      this.move();
      this.renderBoard();
      print("the current count: " +counter);
      game_result.checkHands(this.computerPieces)
      n++;
    }
  },

  firstMove:function() {
    if(players[counter % 2] === 'o') {
      firstPlayer = 'Human';
    } else {
      firstPlayer = 'Computer';
    }
    return firstPlayer + ' goes first';
  },

  placePiece:function(n) {
    if(this.piecesPlayed.indexOf(n) >= 0) {
      return
    } else {
      this.piecesPlayed.push(n);
      if(counter % 2 == 0) {
        this.playerPieces.push(n)
      } else {
        this.computerPieces.push(n)
      }
      counter++;
    }
  },

  move:function() {
    if(counter % 2 === 0) {
      print("Enter number between 1 - 9");
      var userInput = readline();
      this.placePiece(userInput)
    } else {
      print("Computers turn");
      var computerInput = readline();
     // var computerInput = 1;
      this.placePiece(computerInput)
    }
  },

  renderBoard:function() {
    pieces = this.piecesPlayed;
    return board.currentState(pieces)
  }
}

function GameResult() {
                         //check rows
  this.winningNumbers = [[1,2,3], [4,5,6], [7,8,9],
                        //check columns
                        [1,4,7], [2,5,8], [3,6,9],
                        //check diagonal
                        [1,5,9], [3,5,7]]
}

GameResult.prototype = {
  constructor:GameResult,
  checkHands:function(hands) {
    for(i = 0; i < this.winningNumbers.length; i++) {
      //toString works because I know everything is numbers
      if(hands.sort().toString() === this.winningNumbers[i].sort().toString()) {
        print("Computer wins!");
        return "Would you like to play again?";
      }
      if(firstPlayer == 'Human' && counter == 11) {
         print("Game was Tied");
         return "Would you like to play again?";
       } else if(firstPlayer == 'Computer' && counter === 10) {
         print("Game was Tied");
         return "Would you like to play again?";
       }
    }
  }
}

var counter = 2;
var countPlace = 0
var firstPlayer = '';
var players = ['o', 'x'];
var board = new Board();
board.newBoard();
var game = new PlayGame();
game.runGame();
