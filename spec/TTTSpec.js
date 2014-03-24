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
    var matchBoard = [['x','o','x'],
                      [4,5,6],
                      [7,8,9]]

    expect(board.currentState([1,2,3])).toEqual(matchBoard);
  });

  it("continus from previous", function() {
    var board = new Board();
    board.state = [[1,2,3],
                   [4,5,6],
                   [7,8,9]]
    var matchBoard = [['x','o','x'],
                      [4,'o',6],
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
      var fp = "Player";
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
  it('outputs computer won and newGame function gets hit',function() {
    var game_result = new GameResult();
    var play_game = new PlayGame();
    play_game.computerPieces = [1,4,7];
    spyOn(game_result, 'checkHands');
    game_result.checkHands(play_game.computerPieces);
    expect(game_result.checkHands).toHaveBeenCalledWith(play_game.computerPieces);

  });

  it('determines if they tied', function() {
    var game_result = new GameResult();
    var play_game = new PlayGame();
    play_game.computerPieces = [1,7,5,6];
    counter = 11;
    spyOn(game_result, 'checkHands');
    game_result.checkHands(play_game.computerPieces);
    expect(game_result.checkHands).toHaveBeenCalledWith(play_game.computerPieces);
  });

  xit("The game should restart if the user says Yes to playing again", function(){
    var game_result = new GameResult();
    var play_game = new PlayGame();
    play_game.computerPieces = [1,4,7];

    expect(counter).toEqual(2);
    expect(firstPlayer).toEqual(2);
  });
});

describe("AI places piece", function() {
  it('prevents Player to win', function() {
    var play_game = new PlayGame();

    play_game.playerPieces = [1,3];
    play_game.computerPieces = [5];

    board.state[1][1] = 'x';
    board.state[0][0] = 'o';
    board.state[0][2] = 'o';
    play_game.move();

    expect(play_game.computerPieces).toEqual([5,2]);
  });

  it('place piece to win', function() {
    var play_game = new PlayGame();

    counter = 3;
    play_game.playerPieces = [1,3,9];
    play_game.computerPieces = [5,2];

    board.state[1][1] = 'x';
    board.state[0][1] = 'x';

    board.state[0][0] = 'o';
    board.state[0][2] = 'o';
    board.state[2][2] = 'o';
    play_game.move();

    expect(play_game.computerPieces.sort()).toEqual([8,5,2].sort());
  });

  it('no adjacent piece, then places piece next to its own to create adjacent', function() {
    var play_game = new PlayGame();
    play_game.playerPieces = [1,9];
    play_game.computerPieces = [5];

    counter = 3;
    board.state[1][1] = 'x';

    board.state[0][0] = 'o';
    board.state[2][2] = 'o';
    play_game.move();

    expect(play_game.computerPieces).toEqual([5, 8]);
  });
});
