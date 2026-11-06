// Hasan Emre Mırık - LoL, Pasta & 3-4-5 Yayınları Simülatörü

const state = {
  lolMatches: 1453,
  cakeSlices: 842,
  booksEaten: 19,
  pagesEaten: 142,
  lp: 345,
  level: 345,
  studyPercent: 0
};

const quotes = {
  lol: [
    '"Kanka yemin ederim bu son el, kazanınca direkt 3-4-5 çözeceğim (çözmedi, yedi)."',
    '"Ormancı gank atsa sınavdan 100 alacaktım, tamamen takım farkı!"',
    '"Sınav sabah 09:00\'da ama saat henüz 04:45, en az 3 dereceli maç daha sığar."',
    '"LP kaybetmek sınavdan kalmaktan daha çok acıtıyor kanka."'
  ],
  cake: [
    '"Çikolatalı yaş pasta zihin açıyor dediler, bütün tepsiyi gömdüm."',
    '"Bir el LoL, bir çatal pasta... Gerçi çatala gerek yok direkt dalıyorum."',
    '"Pastanın kreması klavyenin Q tuşuna yapıştı ama oynamaya engel değil!"',
    '"Şeker oranı düşerse koridorda minyon kaçırırım, bu pasta hayati önem taşıyor."'
  ],
  book: [
    '"3-4-5 Yayınları \'ÖSYM Tadında\' yazmış, baktım harbiden lezzetliymiş komple yedim."',
    '"Türev ve integral sorularını çözemiyorsan sayfayı koparıp yutacaksın, bilgi doğrudan mideye iniyor."',
    '"Kitabın kapağı biraz sertti ama üstüne yaş pasta sürünce 10 numara gitti."',
    '"Soru bankasını çözmek 3 ay sürer, yemek 15 dakika. Hız ve verimlilik!"'
  ],
  study: [
    '"HATA! Kalem tutmaya çalışırken yanlışlıkla LoL istemcisini açtım."',
    '"İlk soruyu okudum, başım döndü. Acil pasta ve 3-4-5 sayfası takviyesi lazım!"',
    '"Ders çalışmak mı? O hangi şampiyonun pasifi kanka?"'
  ]
};

const rankTiers = [
  { minLp: 0, name: 'Pasta Ustası I' },
  { minLp: 400, name: '3-4-5 Gurmesi' },
  { minLp: 500, name: 'Grandmaster Pastacı' },
  { minLp: 650, name: 'Sihirdar & Pasta Şampiyonu' }
];

// DOM Elements
const statLolEl = document.getElementById('stat-lol');
const statCakeEl = document.getElementById('stat-cake');
const statBooksEl = document.getElementById('stat-books');
const bannerPagesEl = document.getElementById('banner-pages');
const lpCounterEl = document.getElementById('lp-counter');
const rankTierEl = document.getElementById('rank-tier-text');
const summonerLevelEl = document.getElementById('summoner-level');
const liveQuoteEl = document.getElementById('live-quote');
const quoteIconEl = document.getElementById('quote-icon');
const matchListEl = document.getElementById('match-list');
const errorToastEl = document.getElementById('error-toast');
const errorToastBodyEl = document.getElementById('error-toast-body');

function formatNum(num) {
  return num.toLocaleString('tr-TR');
}

function updateUI() {
  statLolEl.textContent = formatNum(state.lolMatches);
  statCakeEl.textContent = formatNum(state.cakeSlices);
  statBooksEl.textContent = `${state.booksEaten} Kitap`;
  bannerPagesEl.textContent = formatNum(state.pagesEaten);
  lpCounterEl.textContent = formatNum(state.lp);
  summonerLevelEl.textContent = `SV ${state.level}`;

  for (let i = rankTiers.length - 1; i >= 0; i--) {
    if (state.lp >= rankTiers[i].minLp) {
      rankTierEl.textContent = rankTiers[i].name;
      break;
    }
  }
}

function spawnFloatingParticle(x, y, text, color) {
  const el = document.createElement('div');
  el.className = 'floating-particle';
  el.textContent = text;
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.color = color || '#f4d068';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1100);
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function prependMatchHistory(icon, title, subtitle, rightTop, rightBottom, isDefeat = false) {
  const card = document.createElement('div');
  card.className = `match-card${isDefeat ? ' defeat' : ''}`;
  card.innerHTML = `
    <div class="match-left">
      <span class="match-champ">${icon}</span>
      <div class="match-details">
        <h5>${title}</h5>
        <span>${subtitle}</span>
      </div>
    </div>
    <div class="match-kda" style="color: ${isDefeat ? 'var(--red-danger)' : 'var(--green-win)'};">
      ${rightTop}<br />${rightBottom}
    </div>
  `;
  matchListEl.prepend(card);
  if (matchListEl.children.length > 5) {
    matchListEl.lastElementChild.remove();
  }
}

// Action Handlers
function handlePlayLol(e) {
  state.lolMatches += 1;
  state.lp += 18;
  state.level += 1;
  liveQuoteEl.textContent = pickRandom(quotes.lol);
  quoteIconEl.textContent = '⚔️';
  updateUI();

  const x = e ? e.clientX : window.innerWidth / 2;
  const y = e ? e.clientY : window.innerHeight / 2;
  spawnFloatingParticle(x, y, '+1 LoL Maçı (+18 LP)', '#00d2d3');

  prependMatchHistory(
    '⚔️',
    'Dereceli Tek/Çift • Sınavdan Kaçış Serisi',
    'Az önce • Pasta yiyerek oynandı',
    'ZAFER',
    '+18 LP / 0 Soru'
  );
}

function handleEatCake(e) {
  state.cakeSlices += 2;
  state.lp += 12;
  liveQuoteEl.textContent = pickRandom(quotes.cake);
  quoteIconEl.textContent = '🎂';
  updateUI();

  const x = e ? e.clientX : window.innerWidth / 2;
  const y = e ? e.clientY : window.innerHeight / 2;
  spawnFloatingParticle(x, y, '🍰 +2 Dilim Yaş Pasta!', '#ff6b81');

  prependMatchHistory(
    '🍰',
    'Çift Katlı Çikolatalı Pasta Baskını',
    'Az önce • Çatalsız tek lokmada',
    'AFİYET OLSUN',
    '+2500 Kalori'
  );
}

function handleEatBook(e, customBookName, customPages) {
  const pages = customPages || 20;
  const bookName = customBookName || '3-4-5 Yayınları Soru Bankası';
  state.pagesEaten += pages;
  if (state.pagesEaten % 100 < pages) {
    state.booksEaten += 1;
  }
  state.lp += 15;
  liveQuoteEl.textContent = pickRandom(quotes.book);
  quoteIconEl.textContent = '📕';
  updateUI();

  const x = e ? e.clientX : window.innerWidth / 2;
  const y = e ? e.clientY : window.innerHeight / 2;
  spawnFloatingParticle(x, y, `📕 +${pages} Sayfa 3-4-5 Yendi!`, '#ff9f43');

  prependMatchHistory(
    '📕',
    `3-4-5 Yayınları ${bookName}`,
    'Az önce • Çözmek yerine çiğnendi',
    'LEZZETLİ',
    `+${pages} Sayfa Yutuldu`
  );
}

let toastTimeout = null;
function handleTryStudy(e) {
  state.cakeSlices += 1;
  state.pagesEaten += 5;
  liveQuoteEl.textContent = pickRandom(quotes.study);
  quoteIconEl.textContent = '🚨';
  updateUI();

  const x = e ? e.clientX : window.innerWidth / 2;
  const y = e ? e.clientY : window.innerHeight / 2;
  spawnFloatingParticle(x, y, '❌ 404: Ders Çalışma Reddedildi!', '#ee5253');

  errorToastBodyEl.textContent =
    'Hasan Emre Mırık "Ders Çalış" tuşuna bastı ancak sistem bunu reddedip otomatik olarak 1 dilim pasta ve 5 sayfa 3-4-5 Yayınları yedirdi!';
  errorToastEl.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    errorToastEl.classList.remove('show');
  }, 4000);
}

// Button Event Listeners
document.getElementById('btn-lol').addEventListener('click', handlePlayLol);
document.getElementById('btn-cake').addEventListener('click', handleEatCake);
document.getElementById('btn-book').addEventListener('click', (e) => handleEatBook(e));
document.getElementById('btn-study').addEventListener('click', handleTryStudy);

document.querySelectorAll('.eat-book-btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const book = btn.getAttribute('data-book');
    const pages = parseInt(btn.getAttribute('data-pages'), 10);
    handleEatBook(e, book, pages);
  });
});

// Keyboard Q / W / E / R shortcuts
window.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  const key = e.key.toLowerCase();
  if (key === 'q') handlePlayLol();
  if (key === 'w') handleEatCake();
  if (key === 'e') handleEatBook();
  if (key === 'r') handleTryStudy();
});

// Exam Countdown Timer
let countdownSeconds = 4 * 3600 + 12 * 60 + 59;
const examCountdownEl = document.getElementById('exam-countdown');

setInterval(() => {
  if (countdownSeconds > 0) countdownSeconds--;
  const hrs = String(Math.floor(countdownSeconds / 3600)).padStart(2, '0');
  const mins = String(Math.floor((countdownSeconds % 3600) / 60)).padStart(2, '0');
  const secs = String(countdownSeconds % 60).padStart(2, '0');
  examCountdownEl.textContent = `00 Gün ${hrs} Saat ${mins} Dk ${secs} Sn`;
}, 1000);

// Mini-Game Logic
const arenaEl = document.getElementById('game-arena');
const overlayEl = document.getElementById('game-overlay');
const startBtnEl = document.getElementById('start-game-btn');
const catcherEl = document.getElementById('player-catcher');
const scoreEl = document.getElementById('game-score');
const timerEl = document.getElementById('game-timer');
const highscoreEl = document.getElementById('game-highscore');

let gameActive = false;
let gameScore = 0;
let gameHighscore = 0;
let gameTimeLeft = 30;
let playerXPercent = 50;
let fallingItems = [];
let gameLoopId = null;
let spawnIntervalId = null;
let timerIntervalId = null;

function movePlayerFromClientX(clientX) {
  const rect = arenaEl.getBoundingClientRect();
  const relX = clientX - rect.left;
  const pct = Math.max(6, Math.min(94, (relX / rect.width) * 100));
  playerXPercent = pct;
  catcherEl.style.left = `${pct}%`;
}

arenaEl.addEventListener('mousemove', (e) => {
  if (!gameActive) return;
  movePlayerFromClientX(e.clientX);
});

arenaEl.addEventListener(
  'touchmove',
  (e) => {
    if (!gameActive || !e.touches[0]) return;
    movePlayerFromClientX(e.touches[0].clientX);
  },
  { passive: true }
);

function spawnGameItem() {
  if (!gameActive) return;
  const types = [
    { emoji: '🍰', pts: 15, label: '+15 Pasta', color: '#ff6b81' },
    { emoji: '🎂', pts: 20, label: '+20 Yaş Pasta', color: '#ff6b81' },
    { emoji: '📕', pts: 25, label: '+25 3-4-5 Kitabı', color: '#ff9f43' },
    { emoji: '🏆', pts: 20, label: '+20 LoL LP', color: '#00d2d3' },
    { emoji: '📄', pts: -40, label: '-40 Sınav Kağıdı!', color: '#ee5253' }
  ];
  // Weight good items higher, exam paper ~22% chance
  const pool = [types[0], types[1], types[2], types[3], types[0], types[2], types[4]];
  const chosen = pickRandom(pool);

  const el = document.createElement('div');
  el.className = 'falling-item';
  el.textContent = chosen.emoji;
  const xPct = Math.random() * 86 + 7;
  el.style.left = `${xPct}%`;
  el.style.top = `-20px`;
  arenaEl.appendChild(el);

  fallingItems.push({
    el,
    xPct,
    yPx: -20,
    speed: 2.3 + Math.random() * 2.1,
    pts: chosen.pts,
    label: chosen.label,
    color: chosen.color
  });
}

function updateGameLoop() {
  if (!gameActive) return;
  const arenaHeight = arenaEl.clientHeight;
  const arenaRect = arenaEl.getBoundingClientRect();

  for (let i = fallingItems.length - 1; i >= 0; i--) {
    const item = fallingItems[i];
    item.yPx += item.speed;
    item.el.style.top = `${item.yPx}px`;

    // Check collision near bottom
    if (item.yPx >= arenaHeight - 68 && item.yPx <= arenaHeight - 15) {
      if (Math.abs(item.xPct - playerXPercent) < 11) {
        gameScore += item.pts;
        scoreEl.textContent = gameScore;

        if (item.pts > 0) {
          state.lp += 2;
          state.cakeSlices += 1;
          updateUI();
        }

        const screenX = arenaRect.left + (item.xPct / 100) * arenaRect.width;
        const screenY = arenaRect.top + item.yPx;
        spawnFloatingParticle(screenX, screenY, item.label, item.color);

        item.el.remove();
        fallingItems.splice(i, 1);
        continue;
      }
    }

    if (item.yPx > arenaHeight + 30) {
      item.el.remove();
      fallingItems.splice(i, 1);
    }
  }

  gameLoopId = requestAnimationFrame(updateGameLoop);
}

function endGame() {
  gameActive = false;
  clearInterval(spawnIntervalId);
  clearInterval(timerIntervalId);
  cancelAnimationFrame(gameLoopId);

  fallingItems.forEach((it) => it.el.remove());
  fallingItems = [];

  if (gameScore > gameHighscore) {
    gameHighscore = gameScore;
    highscoreEl.textContent = gameHighscore;
  }

  overlayEl.classList.remove('hidden');
  overlayEl.querySelector('h3').textContent = `Oyun Bitti! Toplam Skor: ${gameScore}`;
  startBtnEl.textContent = 'Tekrar Oyna';
}

startBtnEl.addEventListener('click', () => {
  gameActive = true;
  gameScore = 0;
  gameTimeLeft = 30;
  scoreEl.textContent = '0';
  timerEl.textContent = '30';
  overlayEl.classList.add('hidden');

  spawnIntervalId = setInterval(spawnGameItem, 480);
  timerIntervalId = setInterval(() => {
    gameTimeLeft -= 1;
    timerEl.textContent = String(gameTimeLeft);
    if (gameTimeLeft <= 0) {
      endGame();
    }
  }, 1000);

  gameLoopId = requestAnimationFrame(updateGameLoop);
});
