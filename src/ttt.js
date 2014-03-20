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

