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

describe("Play game", function() {
  it("decides who goes first", function() {
    var game = new PlayGame();
    var play_game = game.firstMove();
    var fp = ''
    if(counter % 2 == 0) {
      var fp = "Human";
    } else {
      var fp = "Computer";
    }
    expect(firstPlayer).toMatch(fp)
  });

  it("player places piece", function() {
    var game = new PlayGame();
    game.placePiece(1);

    expect(game.piecesPlayed).toEqual([1]);
  });

  it('calls board to render current board state', function() {
    var game = new PlayGame();
    counter = 2;
    game.placePiece(1);
    game.placePiece(1);
    game.placePiece(2);
    pieces = game.piecesPlayed

    expect(pieces).toEqual([1,2]);
    expect(counter).toEqual(4);
  });

  it("takes turn playing pieces", function() {
    counter = 1;
    game = new PlayGame();
    game.move()

    expect(counter).toEqual(2)
  });
});

describe('Game result', function() {
  it('determines if computer won',function() {
    var game_result = new GameResult();
    var play_game = new PlayGame();
    play_game.computerPieces = [1,4,7];
    result = game_result.checkHands(play_game.computerPieces);
    expect(result).toEqual('Would you like to play again?');
  });

  it('determines if they tied', function() {
    var game_result = new GameResult();
    var play_game = new PlayGame();
    play_game.computerPieces = [1,7,5,6];
    counter = 11;
    result = game_result.checkHands(play_game.computerPieces);
    expect(result).toEqual('Would you like to play again?');
  });
});

