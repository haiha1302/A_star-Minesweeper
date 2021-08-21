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
  strokeWeight(4);

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

  let result = checkWinner();
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

function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWinner() {
  let winner = null;
  // Kiểm tra theo chiều ngang
  for (let i = 0; i < 3; i++) {
    if (equals3(chessBoard[i][0], chessBoard[i][1], chessBoard[i][2])) {
      winner = chessBoard[i][0];
    }
  }
  // Kiểm tra theo chiều dọc
  for (let i = 0; i < 3; i++) {
    if (equals3(chessBoard[0][i], chessBoard[1][i], chessBoard[2][i])) {
      winner = chessBoard[0][i];
    }
  }
  // Kiểm tra theo đường chéo chính
  if (equals3(chessBoard[0][0], chessBoard[1][1], chessBoard[2][2])) {
    winner = chessBoard[0][0];
  }
  // Kiểm tra theo đường chéo phụ
  if (equals3(chessBoard[2][0], chessBoard[1][1], chessBoard[0][2])) {
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
  // Kiểm tra mỗi khi người chơi click vào 
  if (currentPlayer == Human) {
    let i = floor(mouseX / w);// Lấy vị trí được click
    let j = floor(mouseY / h);

    if (chessBoard[i][j] == '') {
      chessBoard[i][j] = Human; // Đặt vị trí hiện tại là human
      currentPlayer = AI; // Đăt lượt chơi cho AI và gọi hàm di chuyển của AI
      AIMove();
    }
  }
}

function reset() {
  currentPlayer = Human
}
