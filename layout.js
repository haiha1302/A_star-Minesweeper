//Khởi tạo bàn chơi 
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let w; // = width / 3;
let h; // = height / 3;

let ai = 'X';
let human = 'O';
let currentPlayer = human;

function setup() {
  createCanvas(300, 300);
  w = width / 3;
  h = height / 3;
}

function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWinner() {
  let winner = null;
  //Kiểm tra 3 ô liên tiếp theo các hướng
  // Chiều ngang
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Chiều dọc
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Chéo
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }
  //Đếm số ô trống còn lại
  let blankSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        blankSpots++;
      }
    }
  }

  if (winner == null && blankSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function mousePressed() {//Kiểm tra mỗi khi người chơi click vào 
  if (currentPlayer == human) {
    // Lượt đi của Human
    let i = floor(mouseX / w);//Lấy vị trí chuột được click
    let j = floor(mouseY / h);
    // Nếu đó là ô trống
    if (board[i][j] == '') {
      board[i][j] = human;;//Đặt vị trí hiện tại là human
      currentPlayer = ai;//Đăt lượt chơi cho AI và gọi hàm đi của AI
      AIMove();
    }
  }
}

function draw() {
  background(255);
  strokeWeight(4);

  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(32);
      let r = w / 4;
      if (spot == human) {
        noFill();
        ellipse(x, y, r * 2);
      } else if (spot == ai) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }

  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '32pt');
    if (result == 'tie') {
      resultP.html('Hòa!');
    } else {
      resultP.html(`${result} thắng!`);
    }
  }
}