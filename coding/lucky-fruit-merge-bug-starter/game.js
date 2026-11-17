const FRUITS = [
  { level: 1, icon: '🍓', name: '灵感莓', score: 10 },
  { level: 2, icon: '🍊', name: '勇气橘', score: 20 },
  { level: 3, icon: '🍑', name: '好运桃', score: 40 },
  { level: 4, icon: '🍐', name: '能量梨', score: 80 },
  { level: 5, icon: '🍋', name: '贵人柚', score: 160 },
  { level: 6, icon: '🍉', name: '显化大西瓜', score: 320 }
];

const boardEl = document.querySelector('#board');
const scoreEl = document.querySelector('#score');
const bestScoreEl = document.querySelector('#bestScore');
const restartBtn = document.querySelector('#restartBtn');
const messageEl = document.querySelector('#message');

// BUG 1：HTML 中真实 id 是 next-fruit，这里写成 nextPreview，导致下一颗预览不会刷新。
const nextPreviewEl = document.querySelector('#nextPreview');

let board = [];
let selectedIndex = null;
let score = 0;
let nextFruit = 1;

function getFruit(level) {
  return FRUITS.find(item => item.level === Number(level));
}

function createStarterBoard() {
  return [
    1, 1, 2, null,
    2, 3, null, 1,
    null, 3, 3, 2,
    1, null, 2, null
  ];
}

function renderBoard() {
  boardEl.innerHTML = '';
  board.forEach((level, index) => {
    const cell = document.createElement('button');
    cell.className = 'cell';
    cell.dataset.index = String(index);
    cell.dataset.level = level === null ? '' : String(level);

    if (level === null) {
      cell.innerHTML = '<span class="empty">＋</span>';
    } else {
      const fruit = getFruit(level);
      cell.innerHTML = `<span class="fruit" title="${fruit.name}">${fruit.icon}</span>`;
    }

    if (selectedIndex === index) cell.classList.add('selected');
    cell.addEventListener('click', () => handleCellClick(index));
    boardEl.appendChild(cell);
  });
}

function renderNextFruit() {
  const fruit = getFruit(nextFruit);
  // BUG 1 会让这里什么都不显示。
  if (nextPreviewEl) nextPreviewEl.textContent = fruit.icon;
}

function renderScore() {
  scoreEl.textContent = score;
  // BUG 2：本机无纪录时 localStorage.getItem 返回 null，首屏显示 null 分。
  bestScoreEl.textContent = localStorage.getItem('luckyFruitBest') + ' 分';
}

function handleCellClick(index) {
  const current = board[index];
  if (current === null) {
    messageEl.textContent = '空格子暂时不能点击，试试两个相同水果。';
    return;
  }

  if (selectedIndex === null) {
    selectedIndex = index;
    messageEl.textContent = '已选中一个水果，请再点一个相同水果。';
    renderBoard();
    return;
  }

  if (selectedIndex === index) {
    selectedIndex = null;
    messageEl.textContent = '已取消选择。';
    renderBoard();
    return;
  }

  const first = board[selectedIndex];
  const second = board[index];

  // BUG 3：合成条件写错。相同等级本应合成，但这里要求 second 等于 first + 1。
  if (first + 1 === second) {
    const newLevel = Math.min(first + 1, FRUITS.length);
    board[index] = newLevel;
    board[selectedIndex] = null;

    const gained = getFruit(newLevel).score;
    // BUG 4：从界面文本取值做加法，导致字符串拼接，例如 01020。
    score = scoreEl.textContent + gained;
    scoreEl.textContent = score;

    nextFruit = Math.min(newLevel + 1, FRUITS.length);
    renderNextFruit();
    messageEl.textContent = `合成了 ${getFruit(newLevel).name}！`;
  } else {
    messageEl.textContent = '这两个水果不能合成。';
  }

  selectedIndex = null;
  renderBoard();
}

function restartGame() {
  score = 0;
  selectedIndex = null;
  nextFruit = 1;
  scoreEl.textContent = '0';
  messageEl.textContent = '已重新开始。';

  // BUG 5：没有重置 board，所以棋盘不会清空到初始状态。
  renderBoard();
  renderNextFruit();
}

function init() {
  board = createStarterBoard();
  renderBoard();
  renderNextFruit();
  renderScore();
  restartBtn.addEventListener('click', restartGame);
}

init();

// BUG 6：调用不存在的装饰函数，打开控制台会看到 ReferenceError，但页面已完成初始化。
startSparkleRain();
