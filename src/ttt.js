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
