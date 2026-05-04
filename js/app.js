'use strict';

// ---- 定数 ----
const STAT_KEYS  = ['H', 'A', 'B', 'C', 'D', 'S'];
const STAT_LABEL = ['H', 'A', 'B', 'C', 'D', 'S'];
const ARTWORK_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{}.png';

// フォーム違い・表記ゆれで専用IDを使いたいもの
const SPECIAL_FORM_SPRITE_ID = {
  'メガリザードンY': 10035,
  'メガリザードンＹ': 10035,
  'メガリザードンX': 10034,
  'メガリザードンＸ': 10034,
  'メガゲンガー': 10038,
  'メガボーマンダ': 10087,
  'メガガルーラ': 10039,
  'メガフーディン': 10037,
  'メガフシギバナ': 10031,
  'メガカメックス': 10032,
  'メガヤドラン': 10071,
  'メガピジョット': 10073,
  'メガスピアー': 10090,
  'メガガブリアス': 10058,
  'メガハッサム': 10046,
  'メガカイリュー': 10230,
  'メガギャラドス': 10041,
  'メガスコヴィラン': 10320,
  'メガエアームド': 10094,
  'メガキラフロル': 10271,
  'メガニウム': 154,
  'メガメガニウム': 154,
  'ロトムW': 10008,
  'ロトム (FC)': 10008,
  'ウォッシュロトム': 10009,
};

// 通常種族ID（calc-stats の収録ポケモンを広くカバー）
const BASE_SPRITE_ID = {
  'アーボック': 24,
  'アーマーガア': 823,
  'アシレーヌ': 730,
  'アップリュー': 841,
  'アブソル': 359,
  'アマージョ': 763,
  'アマルルガ': 699,
  'アヤシシ': 899,
  'アリアドス': 168,
  'イダイトウ': 902,
  'イッカネズミ': 925,
  'イルカマン': 964,
  'ウインディ': 59,
  'ウェーニバル': 914,
  'ウツボット': 71,
  'ウルガモス': 637,
  'エアームド': 227,
  'エーフィ': 196,
  'エモンガ': 587,
  'エルフーン': 547,
  'エルレイド': 475,
  'エレザード': 695,
  'エンニュート': 758,
  'エンブオー': 500,
  'エンペルト': 395,
  'オーダイル': 160,
  'オオニューラ': 903,
  'オーロット': 709,
  'オニゴーリ': 362,
  'オニシズクモ': 752,
  'オンバーン': 715,
  'カイリキー': 68,
  'カイリュー': 149,
  'カイロス': 127,
  'ガオガエン': 727,
  'ガチゴラス': 697,
  'カバルドン': 450,
  'カビゴン': 143,
  'ガブリアス': 445,
  'カミツオロチ': 1019,
  'カメックス': 9,
  'ガルーラ': 115,
  'ギャラドス': 130,
  'キュウコン': 38,
  'キョジオーン': 934,
  'キラフロル': 970,
  'ギルガルド': 681,
  'クエスパトラ': 956,
  'グライオン': 472,
  'グレイシア': 471,
  'クレッフィ': 707,
  'クレベース': 713,
  'グレンアルマ': 936,
  'ケケンカニ': 740,
  'ゲッコウガ': 658,
  'ゲンガー': 94,
  'ケンタロス': 128,
  'ゴウカザル': 392,
  'コータス': 324,
  'ゴルーグ': 623,
  'ゴロンダ': 675,
  'サーナイト': 282,
  'サーフゴー': 1000,
  'サザンドラ': 635,
  'サダイジャ': 844,
  'サメハダー': 319,
  'サンダース': 135,
  'ジジーロン': 780,
  'ジャラランガ': 784,
  'ジャローダ': 497,
  'シャワーズ': 134,
  'シャンデラ': 609,
  'ジュナイパー': 724,
  'ジュペッタ': 354,
  'スコヴィラン': 952,
  'スターミー': 121,
  'スピアー': 15,
  'ソウブレイズ': 937,
  'ゾロアーク': 571,
  'ダイケンキ': 503,
  'ダストダス': 569,
  'タブンネ': 531,
  'タルップル': 842,
  'チャーレム': 308,
  'チリーン': 358,
  'チルタリス': 334,
  'ツンベアー': 614,
  'デカヌチャン': 959,
  'デスカーン': 563,
  'デスバーン': 867,
  'デデンネ': 702,
  'デンリュウ': 181,
  'ドクロッグ': 454,
  'ドサイドン': 464,
  'ドダイトス': 389,
  'ドデカバシ': 733,
  'ドドゲザン': 983,
  'ドヒドイデ': 748,
  'ドラパルト': 887,
  'トリデプス': 411,
  'トリミアン': 676,
  'ドリュウズ': 530,
  'ナゲツケサル': 766,
  'ニャオニクス': 678,
  'ニョロトノ': 186,
  'ニンフィア': 700,
  'ヌメルゴン': 706,
  'バイバニラ': 584,
  'バオッキー': 514,
  'ハガネール': 208,
  'バクーダ': 323,
  'バクフーン': 157,
  'バサギリ': 900,
  'ハッサム': 212,
  'ハラバリー': 939,
  'バリコオル': 866,
  'バンギラス': 248,
  'バンバドロ': 750,
  'パンプジン': 711,
  'ピカチュウ': 25,
  'ピクシー': 36,
  'ピジョット': 18,
  'ビビヨン': 666,
  'ヒヤッキー': 516,
  'ファイアロー': 663,
  'ブースター': 136,
  'フーディン': 65,
  'フォレトス': 205,
  'フシギバナ': 3,
  'プテラ': 142,
  'フラージェス': 671,
  'フラエッテ': 670,
  'ブラッキー': 197,
  'ブリガロン': 652,
  'ブリジュラス': 1018,
  'ブリムオン': 858,
  'フレフワン': 683,
  'ブロスター': 693,
  'ヘラクロス': 214,
  'ペリッパー': 279,
  'ヘルガー': 229,
  'ペロリーム': 685,
  'ボスゴドラ': 306,
  'ポットデス': 855,
  'ホルード': 660,
  'ポワルン': 351,
  'マスカーニャ': 908,
  'マッギョ': 618,
  'マニューラ': 461,
  'マフォクシー': 655,
  'マホイップ': 869,
  'マリルリ': 184,
  'マンムー': 473,
  'ミカルゲ': 442,
  'ミミズズ': 968,
  'ミミッキュ': 778,
  'ミミロップ': 428,
  'ミルホッグ': 505,
  'ミロカロス': 350,
  'メタモン': 132,
  'モルペコ': 877,
  'ヤドキング': 199,
  'ヤドラン': 80,
  'ヤナッキー': 512,
  'ヤバソチャ': 1013,
  'ヤミラミ': 302,
  'ヤレユータン': 765,
  'ユキノオー': 460,
  'ユキメノコ': 478,
  'ライチュウ': 26,
  'ライボルト': 310,
  'ラウドボーン': 911,
  'ラムパルド': 409,
  'ランクルス': 579,
  'リーフィア': 470,
  'リキキリン': 981,
  'リザードン': 6,
  'ルカリオ': 448,
  'ルガルガン': 745,
  'ルチャブル': 701,
  'レパルダス': 510,
  'レントラー': 405,
  'ローブシン': 534,
  'ロズレイド': 407,
  'ロトム': 479,
  'ワルビアル': 553,
};

function normalizePokemonName(name) {
  return String(name || '')
    .replace(/\s+/g, '')
    .replace(/（[^）]*）/g, '')
    .replace(/\([^)]*\)/g, '')
    .replace(/[♂♀]/g, '');
}

function toSpriteRules(map) {
  return Object.entries(map)
    .map(([name, id]) => ({ key: normalizePokemonName(name), id }))
    .sort((a, b) => b.key.length - a.key.length);
}

const SPECIAL_SPRITE_RULES = toSpriteRules(SPECIAL_FORM_SPRITE_ID);
const BASE_SPRITE_RULES = toSpriteRules(BASE_SPRITE_ID);
const SPECIAL_EXACT_ID = Object.fromEntries(SPECIAL_SPRITE_RULES.map(r => [r.key, r.id]));
const BASE_EXACT_ID = Object.fromEntries(BASE_SPRITE_RULES.map(r => [r.key, r.id]));

// ---- State ----
const state = {
  format:      'champions', // 'champions' | 'sv'
  bases:       [100, 100, 100, 100, 100, 100],
  evs:         [0, 0, 0, 0, 0, 0],
  natureUp:    -1,  // stat index 1-5 (-1 = none)
  natureDown:  -1,
  iv:          31,
};

// ---- Helper ----
function isHP(idx)   { return idx === 0; }
function isUp(idx)   { return state.natureUp   === idx; }
function isDown(idx) { return state.natureDown === idx; }

function computeStat(idx) {
  const base = state.bases[idx];
  const ev   = state.evs[idx];
  if (state.format === 'champions') {
    return calcChampions(base, ev, isHP(idx), isUp(idx), isDown(idx));
  }
  return calcSV(base, ev, isHP(idx), isUp(idx), isDown(idx), state.iv);
}

function reverseStat(stat, idx) {
  const base = state.bases[idx];
  if (state.format === 'champions') {
    return reverseChampions(stat, base, isHP(idx), isUp(idx), isDown(idx));
  }
  return reverseSV(stat, base, isHP(idx), isUp(idx), isDown(idx), state.iv);
}

function evMax()   { return state.format === 'champions' ? CHAMP_EP_MAX   : SV_EV_MAX; }
function evTotal() { return state.format === 'champions' ? CHAMP_EP_TOTAL : SV_EV_TOTAL; }

// ---- DOM References ----
let statInputs = [];
let evInputs   = [];
let baseInputs = [];
let natureBtns = []; // [idx][type] = button

function getEl(id) { return document.getElementById(id); }

function findSpriteId(name) {
  const normalized = normalizePokemonName(name);

  for (const rule of SPECIAL_SPRITE_RULES) {
    if (normalized.includes(rule.key)) return rule.id;
  }
  for (const rule of BASE_SPRITE_RULES) {
    if (normalized.includes(rule.key)) return rule.id;
  }

  if (normalized.startsWith('メガ')) {
    const stripped = normalized.slice(2);
    if (SPECIAL_EXACT_ID[stripped]) return SPECIAL_EXACT_ID[stripped];
    if (BASE_EXACT_ID[stripped]) return BASE_EXACT_ID[stripped];
  }
  return null;
}

function renderSprite(name) {
  const preview = getEl('pokemon-preview');
  const img = getEl('pokemon-sprite');
  const label = getEl('pokemon-preview-name');
  const spriteId = findSpriteId(name);

  if (!spriteId) {
    preview.hidden = true;
    img.removeAttribute('src');
    img.alt = '';
    label.textContent = '';
    return;
  }

  img.src = ARTWORK_URL.replace('{}', String(spriteId));
  img.alt = name;
  label.textContent = `${name} (ID: ${spriteId})`;
  preview.hidden = false;
}

// ---- Build table rows ----
function buildTable() {
  const tbody = getEl('stat-rows');
  tbody.innerHTML = '';
  statInputs = [];
  evInputs   = [];
  baseInputs = [];
  natureBtns = [];

  STAT_KEYS.forEach((label, idx) => {
    const tr = document.createElement('tr');

    // Label
    const tdLabel = document.createElement('td');
    tdLabel.className = 'stat-label';
    tdLabel.textContent = label;
    tr.appendChild(tdLabel);

    // Stat value input
    const tdStat = document.createElement('td');
    const statIn = document.createElement('input');
    statIn.type = 'number';
    statIn.className = 'stat-val';
    statIn.min = 1; statIn.max = 999;
    statIn.dataset.idx = idx;
    tdStat.appendChild(statIn);
    tr.appendChild(tdStat);
    statInputs.push(statIn);

    // EV input + buttons
    const tdEV = document.createElement('td');
    const evIn = document.createElement('input');
    evIn.type = 'number';
    evIn.className = 'ev-val';
    evIn.min = 0; evIn.max = evMax();
    evIn.dataset.idx = idx;
    evIn.value = 0;
    const btnUp = document.createElement('button');
    btnUp.className = 'updown';
    btnUp.textContent = '▲';
    btnUp.dataset.idx = idx; btnUp.dataset.dir = 'up';
    const btnDn = document.createElement('button');
    btnDn.className = 'updown';
    btnDn.textContent = '▼';
    btnDn.dataset.idx = idx; btnDn.dataset.dir = 'dn';
    tdEV.appendChild(evIn);
    tdEV.appendChild(btnUp);
    tdEV.appendChild(btnDn);
    tr.appendChild(tdEV);
    evInputs.push(evIn);

    // Base stat input
    const tdBase = document.createElement('td');
    const baseIn = document.createElement('input');
    baseIn.type = 'number';
    baseIn.className = 'base-val';
    baseIn.min = 1; baseIn.max = 255;
    baseIn.dataset.idx = idx;
    baseIn.value = state.bases[idx];
    tdBase.appendChild(baseIn);
    tr.appendChild(tdBase);
    baseInputs.push(baseIn);

    // Nature buttons (H は無補正固定)
    const tdNature = document.createElement('td');
    tdNature.className = 'nature-cell';
    if (isHP(idx)) {
      const span = document.createElement('span');
      span.textContent = '—';
      span.className = 'nature-neutral-fixed';
      tdNature.appendChild(span);
      natureBtns.push(null);
    } else {
      const btnPlus  = document.createElement('button');
      btnPlus.className = 'nature-btn nature-up';
      btnPlus.textContent = '＋';
      btnPlus.dataset.idx = idx; btnPlus.dataset.type = 'up';
      const btnMinus = document.createElement('button');
      btnMinus.className = 'nature-btn nature-down';
      btnMinus.textContent = '－';
      btnMinus.dataset.idx = idx; btnMinus.dataset.type = 'down';
      tdNature.appendChild(btnPlus);
      tdNature.appendChild(btnMinus);
      natureBtns.push({ up: btnPlus, down: btnMinus });
    }
    tr.appendChild(tdNature);

    tbody.appendChild(tr);
  });

  bindRowEvents();
}

// ---- Event binding ----
function bindRowEvents() {
  statInputs.forEach((inp, idx) => {
    inp.addEventListener('change', () => onStatChange(idx));
  });
  evInputs.forEach((inp, idx) => {
    inp.addEventListener('input', () => onEVChange(idx));
  });
  baseInputs.forEach((inp, idx) => {
    inp.addEventListener('change', () => {
      const v = parseInt(inp.value) || 0;
      state.bases[idx] = Math.max(1, Math.min(255, v));
      inp.value = state.bases[idx];
      refreshStat(idx);
      updateEvSummary();
    });
  });

  document.querySelectorAll('.updown').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      const dir = btn.dataset.dir;
      const max = evMax();
      let v = state.evs[idx] + (dir === 'up' ? 1 : -1);
      v = Math.max(0, Math.min(max, v));
      state.evs[idx] = v;
      evInputs[idx].value = v;
      refreshStat(idx);
      updateEvSummary();
    });
  });

  document.querySelectorAll('.nature-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx  = parseInt(btn.dataset.idx);
      const type = btn.dataset.type;
      if (type === 'up') {
        state.natureUp = (state.natureUp === idx) ? -1 : idx;
        if (state.natureDown === idx) state.natureDown = -1;
      } else {
        state.natureDown = (state.natureDown === idx) ? -1 : idx;
        if (state.natureUp === idx) state.natureUp = -1;
      }
      refreshNatureButtons();
      refreshAllStats();
      updateEvSummary();
    });
  });
}

// ---- Stat update logic ----
function onStatChange(idx) {
  const target = parseInt(statInputs[idx].value);
  if (isNaN(target)) return;
  const ep = reverseStat(target, idx);
  if (ep === null) {
    statInputs[idx].classList.add('invalid');
    return;
  }
  statInputs[idx].classList.remove('invalid');
  state.evs[idx] = ep;
  evInputs[idx].value = ep;
  evInputs[idx].classList.toggle('over-max', ep > evMax());
  updateEvSummary();
}

function onEVChange(idx) {
  const ev = parseInt(evInputs[idx].value);
  if (isNaN(ev)) return;
  const clamped = Math.max(0, Math.min(evMax(), ev));
  state.evs[idx] = clamped;
  evInputs[idx].classList.toggle('over-max', ev > evMax());
  refreshStat(idx);
  updateEvSummary();
}

function refreshStat(idx) {
  const s = computeStat(idx);
  statInputs[idx].value = s;
  statInputs[idx].classList.remove('invalid');
}

function refreshAllStats() {
  STAT_KEYS.forEach((_, idx) => refreshStat(idx));
}

function refreshNatureButtons() {
  STAT_KEYS.forEach((_, idx) => {
    if (!natureBtns[idx]) return;
    const up   = natureBtns[idx].up;
    const down = natureBtns[idx].down;
    up.classList.toggle('active',   state.natureUp   === idx);
    down.classList.toggle('active', state.natureDown === idx);
  });
}

// ---- EV summary ----
function updateEvSummary() {
  const used = state.evs.reduce((a, b) => a + b, 0);
  const total = evTotal();
  const remaining = total - used;
  getEl('ev-remaining').textContent = remaining;
  getEl('ev-total-display').textContent = total;
  getEl('ev-remaining').classList.toggle('over', remaining < 0);
}

// ---- Pokemon search autocomplete ----
function buildSuggestList(query) {
  const list = getEl('suggest-list');
  list.innerHTML = '';
  if (!query) { list.hidden = true; return; }
  const q = query.toLowerCase();
  const matches = POKEMON_DATA.filter(p => p[0].includes(query) || p[0].toLowerCase().includes(q)).slice(0, 20);
  if (!matches.length) { list.hidden = true; return; }
  matches.forEach(p => {
    const li = document.createElement('li');
    li.textContent = p[0];
    li.addEventListener('mousedown', () => applyPokemon(p));
    list.appendChild(li);
  });
  list.hidden = false;
}

function applyPokemon(p) {
  const nameIn = getEl('pokemon-input');
  nameIn.value = p[0];
  state.bases = [p[1], p[2], p[3], p[4], p[5], p[6]];
  baseInputs.forEach((inp, idx) => { inp.value = state.bases[idx]; });
  getEl('suggest-list').hidden = true;
  renderSprite(p[0]);
  refreshAllStats();
  updateEvSummary();
}

// ---- Format toggle ----
function onFormatChange(fmt) {
  state.format = fmt;
  const evLabel = getEl('ev-label');
  evLabel.textContent = fmt === 'champions' ? '能力ポイント' : '努力値';
  getEl('iv-row').hidden = (fmt !== 'sv');
  // EV max が変わるので clamp
  const max = evMax();
  state.evs = state.evs.map(v => Math.min(v, max));
  evInputs.forEach((inp, idx) => {
    inp.max = max;
    inp.value = state.evs[idx];
  });
  refreshAllStats();
  updateEvSummary();
}

// ---- URL share ----
function buildURL() {
  const p = new URLSearchParams();
  p.set('f', state.format === 'champions' ? 'c' : 's');
  const name = getEl('pokemon-input').value.trim();
  if (name) p.set('p', name);
  p.set('e', state.evs.join(','));
  p.set('n', `${state.natureUp},${state.natureDown}`);
  if (state.format === 'sv') p.set('iv', state.iv);
  return location.href.split('?')[0] + '?' + p.toString();
}

function loadFromURL() {
  const p = new URLSearchParams(location.search);
  if (!p.size) return;

  const fmt = p.get('f') === 's' ? 'sv' : 'champions';
  state.format = fmt;
  document.querySelector(`input[name="format"][value="${fmt}"]`).checked = true;

  if (p.has('iv')) {
    state.iv = parseInt(p.get('iv')) || 31;
    getEl('iv-input').value = state.iv;
  }
  if (p.has('n')) {
    const [nu, nd] = p.get('n').split(',').map(Number);
    state.natureUp   = isNaN(nu) ? -1 : nu;
    state.natureDown = isNaN(nd) ? -1 : nd;
  }
  if (p.has('e')) {
    const evs = p.get('e').split(',').map(Number);
    if (evs.length === 6) state.evs = evs;
  }
  if (p.has('p')) {
    const name = p.get('p');
    const found = POKEMON_DATA.find(d => d[0] === name);
    if (found) applyPokemon(found);
    getEl('pokemon-input').value = name;
  }

  onFormatChange(fmt);
  refreshNatureButtons();
  evInputs.forEach((inp, idx) => { inp.value = state.evs[idx]; });
  refreshAllStats();
  updateEvSummary();
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  buildTable();

  // Format radio
  document.querySelectorAll('input[name="format"]').forEach(radio => {
    radio.addEventListener('change', () => onFormatChange(radio.value));
  });

  // IV input
  getEl('iv-input').addEventListener('change', () => {
    state.iv = Math.max(0, Math.min(31, parseInt(getEl('iv-input').value) || 31));
    getEl('iv-input').value = state.iv;
    if (state.format === 'sv') { refreshAllStats(); updateEvSummary(); }
  });

  // Pokemon search
  const nameIn = getEl('pokemon-input');
  nameIn.addEventListener('input', () => {
    const name = nameIn.value.trim();
    buildSuggestList(name);
    if (!name) renderSprite('');
  });
  nameIn.addEventListener('blur',  () => setTimeout(() => { getEl('suggest-list').hidden = true; }, 150));
  nameIn.addEventListener('focus', () => { if (nameIn.value) buildSuggestList(nameIn.value.trim()); });

  // Share button
  getEl('share-btn').addEventListener('click', () => {
    const url = buildURL();
    history.replaceState(null, '', url);
    navigator.clipboard.writeText(url).then(() => {
      const msg = getEl('share-msg');
      msg.hidden = false;
      setTimeout(() => { msg.hidden = true; }, 2000);
    });
  });

  // Load from URL
  loadFromURL();

  // Initial render
  refreshAllStats();
  updateEvSummary();
});
