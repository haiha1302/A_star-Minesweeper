//Khởi tạo bàn chơi 
const chessBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let w; // = width / 3;
let h; // = height / 3;
const AI = 'O';
const Human = 'X';
let currentPlayer = Human;

function setup() {
  createCanvas(300, 300);
  w = width / 3;
  h = height / 3;
}

function draw() {
  background(255);
  stroke(1);

  // Vẽ các đường ngang dọc chia bàn cờ 3x3
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      const x = w * i + w / 2;
      const y = h * j + h / 2;
      const r = w / 4;
      let box = chessBoard[i][j];
      textSize(32);
      if (box == Human) {
        noFill();
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      } else if (box == AI) {
        ellipse(x, y, r * 2);
      }
    }
  }

  let result = evalusionFunction();
  if (result != null) {
    noLoop();
    const resultP = createP('');
    resultP.style('font-size', '32pt');
    if (result == 'tie') {
      resultP.html('Draw!');
    } else {
      resultP.html(`${result} is Win!`);
    }
  }
}

function evalusion(a, b, c) {
  return a == b && b == c && a != '';
}

function evalusionFunction() {
  let winner = null;
  // Kiểm tra theo chiều ngang
  for (let i = 0; i < 3; i++) {
    if (evalusion(chessBoard[i][0], chessBoard[i][1], chessBoard[i][2])) {
      winner = chessBoard[i][0];
    }
  }
  // Kiểm tra theo chiều dọc
  for (let i = 0; i < 3; i++) {
    if (evalusion(chessBoard[0][i], chessBoard[1][i], chessBoard[2][i])) {
      winner = chessBoard[0][i];
    }
  }
  // Kiểm tra theo đường chéo chính
  if (evalusion(chessBoard[0][0], chessBoard[1][1], chessBoard[2][2])) {
    winner = chessBoard[0][0];
  }
  // Kiểm tra theo đường chéo phụ
  if (evalusion(chessBoard[2][0], chessBoard[1][1], chessBoard[0][2])) {
    winner = chessBoard[2][0];
  }
  // Tính số ô còn trống
  let blankBox = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (chessBoard[i][j] == '') {
        blankBox++;
      }
    }
  }
  if (winner == null && blankBox == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function mousePressed() {
  if (currentPlayer == Human) {
    let i = floor(mouseX / w);// Lấy vị trí được click
    let j = floor(mouseY / h);

    if (chessBoard[i][j] == '') {
      chessBoard[i][j] = Human; // Đặt vị trí hiện tại là human
      currentPlayer = AI; // Đăt lượt chơi cho AI và gọi hàm bestmove cho AI đánh
      bestMove();
    }
  }
}

const bestMove = () => {
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
};

const scores = {
  O: 10,
  X: -10,
  tie: 0,
};

const minimax = (board, depth, isMaximizing) => {
  let result = evalusionFunction();
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
};
