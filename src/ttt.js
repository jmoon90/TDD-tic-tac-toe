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
