const AIMove = () => {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (chessBoard[i][j] == '') {
        chessBoard[i][j] = AI;
        // Vì ta cho điểm dựa vào bước đi tiếp theo của đối thủ vì vậy ta sẽ 
        // đặt các tham số cho hàm minimax này là depth = 0 và lượt đi = false
        const score = minimax(chessBoard, 0, false);
        chessBoard[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  chessBoard[move.i][move.j] = AI;
  currentPlayer = Human;
}

let scores = {
  X: 1,
  O: -1,
  tie: 0,
};

const minimax = (board, depth, isMaximizing) => {
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }
  if (isMaximizing) {
    //Nếu là điểm cần tối ưu
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") {
          board[i][j] = AI;
          const score = minimax(board, depth + 1, false); // Tăng độ sâu và đổi lượt
          board[i][j] = "";
          bestScore = max(score, bestScore); //Cập nhật điểm tốt nhất (Maximize)
        }
      }
    }
    return bestScore;
  } else {
    //Nếu là điểm cần tối giản
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") {
          board[i][j] = Human;
          const score = minimax(board, depth + 1, true); //Tăng độ sâu và đổi lượt
          board[i][j] = "";
          bestScore = min(score, bestScore); //Cập nhật điểm kém nhất (Minimize)
        }
      }
    }
    return bestScore;
  }
}

