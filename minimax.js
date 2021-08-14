function AIMove() {
  // AI to make its turn
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      //Nếu là ô trống
      if (board[i][j] == '') {
        board[i][j] = ai;
        //Vì ta cho điểm dựa vào bước đi tiếp theo của đối thủ vì vậy ta sẽ đặt
        //các tham số cho hàm minimax này là depth = 0 và lượt đi = false
        let score = minimax(board, 0, false);
        board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  board[move.i][move.j] = ai;
  currentPlayer = human;
}

let scores = {
  X: 10,
  O: -10,
  tie: 0
};

function minimax(board, depth, isMaximizing) {
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {//Nếu là điểm cần tối ưu, bot win
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        //Nếu là ô trống
        if (board[i][j] == '') {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false);//Tăng độ sâu và đổi lượt
          board[i][j] = '';
          bestScore = max(score, bestScore);//Cập nhật điểm tốt nhất (Maximize)
        }
      }
    }
    return bestScore;
  } else {//Nếu là điểm cần tối giản, hoa
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == '') {
          board[i][j] = human;
          let score = minimax(board, depth + 1, true);//Tăng độ sâu và đổi lượt
          board[i][j] = '';
          bestScore = min(score, bestScore);//Cập nhật điểm kém nhất (Minimize)
        }
      }
    }
    return bestScore;
  }
}