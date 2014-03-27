function Board() {
  this.players = ['o', 'x'];
  this.state = [];
  this.countPlace = 0;
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
    if(this.countPlace === 0) {
      if(firstPlayer === "Player") {
        this.countPlace = 2
      } else {
        this.countPlace = 1
      }
    }
    for(r = 0; r < 3; r++) {
      for(i = 0; i < 9; i++) {
        for(a = 0; a < array.length; a++) {
          if(this.state[r][i] == array[a]){
            this.state[r][i] = this.players[this.countPlace % 2];
            this.countPlace++;
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
  this.players = ['o', 'x'];
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
      game_result.checkHands(this.computerPieces)
      n++;
    }
  },

  firstMove:function() {
    if(this.players[counter % 2] === 'o') {
      firstPlayer = 'Player';
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
      print("Players Turn");
      print("Enter number between 1 - 9");
      var userInput = readline();
      this.placePiece(userInput);
    } else {
      print("Computers turn");
      this.callAI();
      this.placePiece(ai.move);
    }
  },

  renderBoard:function() {
    pieces = this.piecesPlayed;
    return board.currentState(pieces)
  },

  callAI:function() {
    ai = new AI();
    ai.runAI();
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
        this.output();
      } else if(firstPlayer == 'Player' && counter == 11) {
        print("Game was Tied");
         this.output();
      } else if(firstPlayer == 'Computer' && counter === 10) {
        print("Game was Tied");
        this.output();
      }
    }
  },
  newGame:function() {
    counter = Math.floor((Math.random()*2));
    countPlace = 0;
    firstPlayer = '';

    board = new Board();
    board.newBoard();
    game = new PlayGame();
    game.runGame();
  },
  output:function() {
    print("Would you like to play again?('Y' or 'Yes')");
    var userInput = readline();
    if(userInput == 'Y' || userInput == 'Yes') {
      this.newGame();
    } else {
      print('Have a nice day');
      return;
    }
  }
}

function AI() {
  this.move = 0;
}

AI.prototype = {
  constructor:AI,
  runAI:function() {
    this.bestMove();
  },

  bestMove:function() {
    this.base = this.move;
    if(this.move == undefined) {
      this.move = 0;
    }
    var i = 0;
    var x = 'x';
    var o = 'o';
    while(i < 3) {
        if(this.base != this.move) {
        } else {
          this.checkRowIfSomeoneCanWin(i,x);
          this.checkColumnIfSomeoneCanWin(i,x);
          this.checkDiagonalIfSomeoneCanWin(i,x);
        }
      i++;
    };
    var i = 0;
    while(i < 3) {
        if(this.base != this.move) {
        } else {
          this.checkRowIfSomeoneCanWin(i,o);
          this.checkColumnIfSomeoneCanWin(i,o);
          this.checkDiagonalIfSomeoneCanWin(i,o);
        }
      i++;
    };
    var i = 0;
    while(i < 3) {
      if(this.base != this.move) {
        return;
      } else {
        this.noPlayersHaveAdjacentPieces(i,x);
      }
      i++;
    }
  },
  checkRowIfSomeoneCanWin:function(i, p) {
    var numbers = [];
    var letters = [];
    for(n = 0; n < 3; n++) {
      if(board.state[i][n] != parseInt(board.state[i][n])) {
        if(board.state[i][n] == p) {
          letters.push(board.state[i][n]);
        }
      } else {
        numbers.push(board.state[i][n]);
      }
    }
    if(letters.length > 1) {
      if(numbers[0] != undefined) {
        return this.move = numbers[0];
      }
    }
  },
  checkColumnIfSomeoneCanWin:function(i, p) {
    var numbers = [];
    var letters = [];
    for(n = 0; n < 3; n++) {
      if(board.state[n][i] != parseInt(board.state[n][i])) {
        if(board.state[n][i] == p) {
          letters.push(board.state[n][i]);
        }
      } else {
        numbers.push(board.state[n][i]);
      }
    }
    if(letters.length > 1) {
      if(numbers[0] != undefined) {
        return this.move = numbers[0];
      }
    }
  },
  checkDiagonalIfSomeoneCanWin:function(i, p) {
    if(board.state[0] != undefined) {
      if([board.state[0][0] == 1 && board.state[1][1] == p && board.state[2][2]] == p) {
        return this.move = board.state[0][0];
      } else if([board.state[0][0] == p && board.state[1][1] == 5 && board.state[2][2]] == p) {
        return this.move = board.state[1][1];
      } else if([board.state[0][0] == p && board.state[1][1] == p && board.state[2][2]] == 9) {
        return this.move = board.state[2][2];
      } else if([board.state[2][0] == 7 && board.state[1][1] == p && board.state[0][2]] == p) {
        return this.move = board.state[2][0];
      } else if([board.state[2][0] == p && board.state[1][1] == 5 && board.state[0][2]] == p) {
        return this.move = board.state[1][1];
      } else if([board.state[2][0] == p && board.state[1][1] == p && board.state[0][2]] == 3) {
        return this.move = board.state[0][2];
      };
    };
  },
  noPlayersHaveAdjacentPieces:function(r, p) {
    var i = 0;
    while(i < 4) {
      if(board.state[1][1] != 'o' && board.state[1][1] != 'x') {
        this.move = board.state[1][1];
      } else {
        for(n = 0; n < 3; n++) {
          //check row;
          if(board.state[n].join('').indexOf('x') >= 0) {
            for(i = 0; i < 3; i++) {
              if(board.state[n][i] > 0) {
                return this.move = board.state[n][i];
              }
            }
          }
          //check column;
          if(board.state[i]) {
          }
        }
      }
      i++;
    }
  }
}

var counter = Math.floor((Math.random()*2));
var firstPlayer = '';
var board = new Board();
board.newBoard();
var game = new PlayGame();
game.runGame();
