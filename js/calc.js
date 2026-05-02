'use strict';

// =============================================
// Champions format (ポケモンチャンピオンズ)
// EP: 能力ポイント  max=32, total limit=66
// =============================================
const CHAMP_EP_MAX   = 32;
const CHAMP_EP_TOTAL = 66;

/**
 * EP → 実数値 (Champions)
 * @param {number} base 種族値
 * @param {number} ep   能力ポイント (0–32)
 * @param {boolean} isHP
 * @param {boolean} isUp   性格↑
 * @param {boolean} isDown 性格↓
 */
function calcChampions(base, ep, isHP, isUp, isDown) {
  if (isHP) return base + ep + 75;
  const raw = base + ep + 20;
  if (isUp)   return Math.floor(raw * 1.1);
  if (isDown) return Math.floor(raw * 0.9);
  return raw;
}

/**
 * 実数値 → 最小EP (Champions)
 * @returns {number|null} 0–32 の整数、または null（達成不可）
 */
function reverseChampions(stat, base, isHP, isUp, isDown) {
  for (let ep = 0; ep <= CHAMP_EP_MAX; ep++) {
    const s = calcChampions(base, ep, isHP, isUp, isDown);
    if (s === stat) return ep;
    if (s > stat)   return null;
  }
  return null;
}

// =============================================
// Main series SV format (本家 SV, Level 50)
// EV: 努力値  max=252, total limit=510
// IV: 個体値  0–31 (default 31)
// =============================================
const SV_EV_MAX   = 252;
const SV_EV_TOTAL = 510;

/**
 * EV → 実数値 (SV Lv50)
 */
function calcSV(base, ev, isHP, isUp, isDown, iv = 31) {
  if (isHP) {
    return Math.floor((2 * base + iv + Math.floor(ev / 4)) / 2) + 60;
  }
  const raw = Math.floor((2 * base + iv + Math.floor(ev / 4)) / 2) + 5;
  if (isUp)   return Math.floor(raw * 1.1);
  if (isDown) return Math.floor(raw * 0.9);
  return raw;
}

/**
 * 実数値 → 最小EV (SV Lv50)
 * @returns {number|null}
 */
function reverseSV(stat, base, isHP, isUp, isDown, iv = 31) {
  for (let ev = 0; ev <= SV_EV_MAX; ev++) {
    const s = calcSV(base, ev, isHP, isUp, isDown, iv);
    if (s === stat) return ev;
    if (s > stat)   return null;
  }
  return null;
}
