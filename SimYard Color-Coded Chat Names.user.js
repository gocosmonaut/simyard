// ==UserScript==
// @name          SimYard Color-Coded Chat Names
// @description   Color code chat names based on colors of highest-level team
// @include       http://simyard.com/park/*
// @include       http://*.simyard.com/park/*
// @include       http://simyard.com/games/live*
// @include       http://*.simyard.com/games/live/*
// @include       *live-iframe.php*
// @grant         GM_xmlhttpRequest
// @require       https://code.jquery.com/jquery-3.4.1.slim.min.js
// ==/UserScript==
//
// cosmo
// revised February 28, 2020

const $ = window.$;

var chatColors = `
<style>
#chatLocalMod nobr {
visibility: hidden;
}

#chatLocalMod a, #chatLocalMod img  {
visibility: visible;
}

#chatLocalMod .r1c, #chatLocalMod  .r2c {
padding-right: 0;
}

#chatLocalMod a[href^="/account/profile"] {
padding: 2px 4px !important;
text-decoration: none;
color: white;
}
#chatLocalMod a[href^="/account/profile"]:hover {
filter:saturate(2) !important;
text-decoration: none !important;
}
/* Erick */
#chatLocalMod a[href$="account_id=1"] {
background: #FFC0CB;
color: #000 !important;
}
/* cel */
#chatLocalMod a[href$="account_id=3"] {
background: #177245;
color: #fff !important;
}
/* tfence */
#chatLocalMod a[href$="account_id=5"] {
background: #000080;
color: #fff !important;
}
/* elegor */
#chatLocalMod a[href$="account_id=6"] {
background: #00254c;
color: #66FF00 !important;
}
/* cbass */
#chatLocalMod a[href$="account_id=7"] {
background: #fff;
color: #0000C8 !important;
}
/* cody */
#chatLocalMod a[href$="account_id=8"] {
background: #800000;
color: #708090 !important;
}
/* dishnet */
#chatLocalMod a[href$="account_id=9"] {
background: #FDE910;
color: #654321 !important;
}
/* gav */
#chatLocalMod a[href$="account_id=10"] {
background: #ffff00;
color: #ffff00 !important;
}
/* joester */
#chatLocalMod a[href$="account_id=11"] {
background: #FFA6C9;
color: #fff !important;
}
/* dinocam */
#chatLocalMod a[href$="account_id=12"] {
background: #003399;
color: #FBEC5D !important;
}
/* SteelCity */
#chatLocalMod a[href$="account_id=137"] {
background: #fff;
color: #01796F !important;
}
/* jaxx */
#chatLocalMod a[href$="account_id=14"] {
background: #ffcc00;
color: #000 !important;
}
/* oco */
#chatLocalMod a[href$="account_id=15"] {
background: #0000C8;
color: #fff !important;
}
/* dtigers */
#chatLocalMod a[href$="account_id=16"] {
background: #964B00;
color: #000 !important;
}
/* steak */
#chatLocalMod a[href$="account_id=17"] {
background: #003366;
color: #fff !important;
}
/* para */
#chatLocalMod a[href$="account_id=18"] {
background: #0000ff;
color: #4CBB17 !important;
}
/* tone */
#chatLocalMod a[href$="account_id=19"] {
background: #C41E3A;
color: #FFFDD0 !important;
}
/* slices */
#chatLocalMod a[href$="account_id=20"] {
background: #000;
color: #01796F !important;
}
/* jojo */
#chatLocalMod a[href$="account_id=21"] {
background: #CC5500;
color: #654321 !important;
}
/* vox */
#chatLocalMod a[href$="account_id=22"] {
background: #000;
color: #FF0000 !important;
}
/* foulball */
#chatLocalMod a[href$="account_id=25"] {
background: #FFD800;
color: #FF00CC !important;
}
/* SouthPaw */
#chatLocalMod a[href$="account_id=26"] {
background: #003153;
color: #fff !important;
}
/* reed */
#chatLocalMod a[href$="account_id=28"] {
background: #66FF00;
color: #000 !important;
}
/* denton */
#chatLocalMod a[href$="account_id=34"] {
background: #fff;
color: #CC3333 !important;
}
/* mblaser */
#chatLocalMod a[href$="account_id=37"] {
background: #CFB53B;
color: #000 !important;
}
/* roberto */
#chatLocalMod a[href$="account_id=37"] {
background: #fff;
color: #6B8E23 !important;
}
/* droppings */
#chatLocalMod a[href$="account_id=41"] {
background: #fff;
color: #ff0000 !important;
}
/* ceetar */
#chatLocalMod a[href$="account_id=42"] {
background: #967BB6;
color: #654321 !important;
}
/* ballhead */
#chatLocalMod a[href$="account_id=43"] {
background: #FF6600;
color: #C41E3A !important;
}
/* staley */
#chatLocalMod a[href$="account_id=44"] {
background: #0000ff;
color: #FF6600 !important;
}
/* ari */
#chatLocalMod a[href$="account_id=45"] {
background: #FFFF00;
color: #73C2FB !important;
}
/* istanbul */
#chatLocalMod a[href$="account_id=50"] {
background: #FFFF00;
color: #73C2FB !important;
}
/* Nas */
#chatLocalMod a[href$="account_id=52"] {
background: #007FFF;
color: #FFBF00 !important;
}
/* luke */
#chatLocalMod a[href$="account_id=54"] {
background: #fff;
color: #003366 !important;
}
/* Kazoo */
#chatLocalMod a[href$="account_id=61"] {
background: #fff;
color: #0000CB !important;
}
/* bos */
#chatLocalMod a[href$="account_id=66"] {
background: #000;
color: #ff4040 !important;
}
/* BlackHole */
#chatLocalMod a[href$="account_id=70"] {
background: #000;
color: #007FFF !important;
}
/* vtboo */
#chatLocalMod a[href$="account_id=87"] {
background: #000;
color: #ff0000 !important;
}
/* lelfe */
#chatLocalMod a[href$="account_id=88"] {
background: #ff0000;
color: #FFFF00 !important;
}
/* frow78 */
#chatLocalMod a[href$="account_id=91"] {
background: #000;
color: #fff !important;
}
/* gimp */
#chatLocalMod a[href$="account_id=96"] {
background: #000;
color: #fff !important;
}
/* NothingMore */
#chatLocalMod a[href$="account_id=100"] {
background: #FE28A2;
color: #483C32 !important;
}
/* KennyPowers */
#chatLocalMod a[href$="account_id=113"] {
background: #1E90FF;
color: #000 !important;
}
/* chief */
#chatLocalMod a[href$="account_id=121"] {
background: #000;
color: #ff0000 !important;
}
/* Sittch */
#chatLocalMod a[href$="account_id=124"] {
background: #BDBBD7;
color: #0047AB !important;
}
/* adidas */
#chatLocalMod a[href$="account_id=133"] {
background: #fff;
color: #FFD700 !important;
}
/* tdawg14 */
#chatLocalMod a[href$="account_id=136"] {
background: #2A52BE;
color: #FAF0E6 !important;
}
/* NYYfan */
#chatLocalMod a[href$="account_id=144"] {
background: #000;
color: #fff !important;
}
/* feller*/
#chatLocalMod a[href$="account_id=155"] {
background: #0095B6;
color: #000 !important;
}
/* lilsteve */
#chatLocalMod a[href$="account_id=160"] {
background: #000;
color: #FF2400 !important;
}
/* bigjim03 */
#chatLocalMod a[href$="account_id=161"] {
background: #ff0000;
color: #fff !important;
}
/* cosmo */
#chatLocalMod a[href$="account_id=164"] {
background: #00254c;
color: #fff !important;
}
/* ziggy */
#chatLocalMod a[href$="account_id=182"] {
background: #ff0000;
color: #FFff00 !important;
}
/* runawayryan */
#chatLocalMod a[href$="account_id=184"] {
background: #039;
color: #FFFFf0 !important;
}
/* wwcd */
#chatLocalMod a[href$="account_id=189"] {
background: #B87333;
color: #FFFFf0 !important;
}
/* Auburn */
#chatLocalMod a[href$="account_id=194"] {
background: #000;
color: #FFF !important;
}
/* DJKhaled*/
#chatLocalMod a[href$="account_id=197"] {
background: #FFFF00;
color: #FF2400 !important;
}
/* BigStein */
#chatLocalMod a[href$="account_id=225"] {
background: #fff;
color: #000 !important;
}
/* GuDraves */
#chatLocalMod a[href$="account_id=230"] {
background: #000;
color: #ff0 !important;
}
/* buffer */
#chatLocalMod a[href$="account_id=231"] {
background: #000;
color: #fffff0 !important;
}
/* CoachK */
#chatLocalMod a[href$="account_id=233"] {
background: #0000ff;
color: #fff !important;
}
/* Gophy11 */
#chatLocalMod a[href$="account_id=236"] {
background: #800000;
color: #ffd700 !important;
}
/* frankpot2 */
#chatLocalMod a[href$="account_id=241"] {
background: #0000cd;
color: #ff6600 !important;
}
/* jslatts23 */
#chatLocalMod a[href$="account_id=249"] {
background: #ff0000;
color: #0000ff !important;
}
</style> `;

$('head').append(chatColors);
