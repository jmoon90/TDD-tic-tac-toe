describe("Create board", function() {
  it("has 3 rows and 3 columns", function() {
    var board = new Board();
    var new_board = board.newBoard();
    var matchBoard = [[1,2,3],
                      [4,5,6],
                      [7,8,9]]

    expect(new_board[0]).toMatch(matchBoard[0]);
    expect(new_board[1]).toMatch(matchBoard[1]);
    expect(new_board[2]).toMatch(matchBoard[2]);
  });

  it("initializes current state", function() {
    var board = new Board();
    expect(board.state).toEqual([]);
  });
});

describe("Render state", function() {
  it("after each turn", function() {
    var board = new Board();
    board.state = [[1,2,3],
                   [4,5,6],
                   [7,8,9]]
    var matchBoard = [['o','x','o'],
                      [4,5,6],
                      [7,8,9]]

    expect(board.currentState([1,2,3])).toEqual(matchBoard);
  });

  it("continus from previous", function() {
    countPlace = 0
    var board = new Board();
    board.state = [[1,2,3],
                   [4,5,6],
                   [7,8,9]]
    var matchBoard = [['o','x','o'],
                      [4,'x',6],
                      [7,8,9]]

    expect(board.currentState([1,2,3,5])).toEqual(matchBoard);
  });
});
