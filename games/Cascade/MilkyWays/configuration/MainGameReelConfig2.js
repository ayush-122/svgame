 
const { GameRTPLevel } = require("./GameRtpLevel");
console.log("used base reel 2");
const {AA,BB,CC,DD,EE,FF,GG,HH,II,JJ,WD} = require("./GameReelSymbol").GameReelSymbol.symbols;

let baseGameReels2 = new Map();

baseGameReels2.set(GameRTPLevel.RTP_60, new Map());
baseGameReels2.get(GameRTPLevel.RTP_60).set(1, [II, JJ, II, GG, JJ, GG, JJ, JJ, GG, JJ, JJ, II, JJ, JJ, JJ, HH, II, BB, JJ, JJ, II, HH, GG, JJ, II, GG, FF, HH, II, II, HH, GG, JJ, JJ, JJ, HH, GG, HH, JJ, JJ, GG, GG, HH, JJ, HH, JJ, GG, II, II, II, II, II, JJ, II, II, GG, GG, II, GG, JJ, GG, HH, II, GG, GG, JJ, HH, HH, II, JJ, II, JJ, JJ, II, II, II, HH, JJ, II, HH, II, HH, II, JJ, GG, HH, HH, HH, II, CC, JJ, JJ, HH, JJ, GG, HH, II, JJ, JJ, JJ, HH, JJ, II, HH, JJ, JJ, HH, II, HH, GG, HH, GG, JJ, II, HH, HH, JJ, JJ, GG, JJ, II, GG, JJ, JJ, HH, II, JJ, GG, II, GG, GG, JJ, JJ, GG, HH, JJ, II, GG, II, GG, EE, II, JJ, JJ, HH, GG, JJ, HH, HH, HH, II, HH, GG, JJ, JJ, II, II, GG, JJ, GG, HH, JJ, JJ, JJ, HH, JJ, II, GG, JJ, HH, II, GG, HH, II, II, II, GG, JJ, GG, HH, HH, JJ, HH, II, JJ, GG, GG, JJ, JJ, HH, II, GG, HH, HH, II, II, II, GG, HH, II, DD, HH, II, GG, HH, JJ, HH, II, GG, GG, II, JJ, JJ, GG, JJ, II, HH, GG, JJ, HH, II, JJ, HH, JJ, II, GG, JJ, HH, GG, II, II, JJ, JJ, HH, HH, II, HH, II, II, GG, JJ, II, JJ, JJ, HH, HH, AA, HH, HH, II, II, JJ, JJ, GG, JJ, HH, HH, II, JJ, GG, II, II, II, II, II, JJ]);
baseGameReels2.get(GameRTPLevel.RTP_60).set(2, [CC, CC, BB, DD, DD, BB, BB, WD, AA, DD, DD, BB, CC, AA, DD, DD, CC, DD, CC, CC, AA, DD, WD, CC, CC, AA, CC, DD, DD, CC, AA, AA, DD, CC, DD, CC, DD, CC, AA, BB, BB, CC, DD, WD, DD, BB, DD, CC, BB, DD, CC, BB, AA, DD, AA, BB, CC, AA, CC, CC, CC, DD, BB, AA, DD, DD, BB, DD, DD, BB, CC, DD, CC, CC, CC, BB, CC, CC, BB, AA, BB, BB, BB, DD, DD, DD, DD, BB, CC, DD, CC, WD, DD, DD, DD, DD, CC, DD, DD, DD, BB, CC, DD, DD, CC, AA, AA, DD, DD, BB, AA, BB, BB, DD, CC, CC, DD, DD, AA, AA, BB, CC, DD, BB, BB, AA, DD, AA, DD, BB, FF, CC, WD, JJ, II, AA, CC, AA, DD, DD, BB, BB, AA, CC, BB, AA, AA, DD, BB, DD, DD, CC, WD, CC, AA, CC, BB, GG, BB, DD, DD, AA, CC, CC, AA, DD, AA, BB, DD, BB, AA, AA, CC, DD, WD, BB, CC, DD, EE, CC, BB, CC, CC, BB, CC, BB, CC, BB, CC, DD, AA, CC, AA, DD, BB, CC, AA, BB, CC, HH, AA, CC, AA, AA, DD, DD, AA, DD, BB, AA, DD, AA, DD, DD, BB, BB, AA, AA, DD, BB, DD, AA, CC, BB, DD, BB, DD, BB, AA, AA, CC, CC, CC, AA, AA, WD, CC, DD, DD, BB, DD, AA, BB, DD, BB, CC, BB, BB, AA, CC, CC, CC, DD, BB, CC, CC, BB, AA, AA, DD, WD, WD, BB, CC, DD, CC, DD, BB, BB, BB, CC, DD, CC, DD, DD, CC]);
baseGameReels2.get(GameRTPLevel.RTP_60).set(3, [HH, DD, JJ, CC, JJ, JJ, GG, II, JJ, JJ, WD, II, II, FF, WD, II, HH, II, II, GG, JJ, HH, JJ, HH, GG, GG, GG, JJ, GG, GG, HH, JJ, GG, GG, GG, HH, II, GG, WD, HH, II, II, GG, II, JJ, HH, HH, HH, JJ, II, JJ, II, HH, GG, JJ, HH, WD, AA, HH, JJ, JJ, GG, JJ, GG, II, JJ, JJ, JJ, JJ, HH, JJ, GG, II, GG, HH, JJ, GG, JJ, JJ, HH, HH, JJ, HH, JJ, II, II, HH, HH, WD, II, HH, JJ, JJ, GG, JJ, JJ, HH, GG, HH, JJ, GG, JJ, II, II, HH, II, II, HH, JJ, JJ, II, HH, JJ, II, HH, HH, JJ, JJ, WD, JJ, II, JJ, HH, JJ, HH, II, JJ, GG, HH, HH, JJ, HH, II, II, GG, HH, EE, II, HH, WD, GG, JJ, JJ, GG, GG, WD, GG, JJ, HH, JJ, II, HH, II, II, HH, HH, JJ, JJ, HH, GG, JJ, II, HH, JJ, GG, HH, II, II, JJ, GG, JJ, GG, II, II, JJ, II, GG, JJ, II, HH, JJ, HH, II, JJ, JJ, GG, II, II, JJ, II, WD, II, JJ, II, II, GG, HH, GG, II, II, JJ, II, GG, JJ, JJ, II, II, GG, HH, HH, JJ, HH, HH, HH, GG, JJ, HH, GG, JJ, JJ, HH, HH, II, II, GG, JJ, GG, GG, JJ, GG, HH, JJ, HH, II, GG, II, II, GG, II, II, JJ, JJ, HH, WD, II, II, JJ, II, JJ, II, HH, GG, GG, JJ, II, HH, JJ, HH, II, II, BB, JJ, II, GG, HH, II, JJ, JJ, GG, II, JJ, GG, II, II, II, JJ]);
baseGameReels2.get(GameRTPLevel.RTP_60).set(4, [DD, DD, CC, DD, AA, CC, AA, DD, DD, DD, CC, CC, AA, CC, DD, DD, BB, CC, DD, BB, CC, CC, CC, DD, DD, CC, CC, DD, DD, WD, BB, AA, BB, CC, CC, CC, DD, DD, CC, DD, DD, DD, AA, BB, CC, BB, BB, BB, DD, CC, DD, CC, BB, DD, CC, DD, AA, BB, WD, DD, BB, BB, AA, DD, BB, DD, AA, CC, DD, AA, AA, AA, CC, AA, AA, AA, BB, BB, AA, AA, CC, BB, AA, BB, FF, AA, WD, DD, DD, WD, BB, CC, CC, CC, CC, BB, AA, DD, DD, DD, DD, DD, DD, CC, AA, AA, DD, EE, DD, CC, AA, AA, CC, DD, CC, AA, CC, DD, DD, CC, CC, CC, BB, DD, BB, AA, BB, AA, BB, BB, BB, BB, DD, AA, CC, AA, DD, CC, DD, DD, BB, DD, CC, AA, CC, BB, BB, CC, DD, AA, CC, BB, BB, DD, HH, CC, BB, DD, BB, DD, DD, CC, BB, BB, AA, CC, DD, CC, CC, DD, DD, DD, II, CC, CC, CC, DD, CC, BB, BB, AA, CC, DD, BB, DD, AA, BB, CC, DD, DD, BB, AA, DD, BB, AA, AA, DD, CC, BB, BB, CC, JJ, BB, CC, CC, WD, DD, AA, CC, CC, DD, AA, CC, WD, DD, BB, DD, DD, DD, DD, BB, CC, AA, DD, DD, DD, BB, BB, BB, CC, BB, CC, BB, CC, DD, BB, DD, BB, WD, DD, AA, BB, BB, CC, AA, DD, CC, DD, AA, DD, BB, CC, AA, BB, GG, CC, CC, WD, CC, WD, AA, DD, DD, AA, BB, AA, CC, DD, WD, BB, AA, CC, AA, AA, AA, BB]);
baseGameReels2.get(GameRTPLevel.RTP_60).set(5, [JJ, GG, GG, JJ, HH, JJ, II, JJ, GG, HH, II, GG, II, II, GG, II, JJ, HH, II, II, II, WD, II, HH, HH, JJ, GG, HH, II, JJ, JJ, HH, JJ, HH, HH, GG, JJ, GG, JJ, HH, HH, GG, II, HH, II, II, JJ, II, BB, II, JJ, WD, JJ, GG, DD, JJ, JJ, JJ, GG, GG, GG, II, GG, HH, JJ, II, GG, II, GG, HH, JJ, II, II, GG, GG, II, II, JJ, GG, II, GG, JJ, GG, HH, II, JJ, II, JJ, GG, JJ, JJ, II, JJ, GG, GG, JJ, II, II, II, HH, JJ, HH, JJ, II, HH, II, JJ, JJ, JJ, JJ, GG, II, II, HH, JJ, HH, JJ, II, WD, HH, HH, WD, HH, GG, JJ, HH, HH, JJ, II, JJ, HH, JJ, HH, HH, II, WD, JJ, II, JJ, JJ, GG, II, JJ, GG, HH, JJ, HH, II, II, GG, HH, JJ, GG, WD, GG, JJ, GG, II, HH, II, II, CC, JJ, JJ, HH, HH, JJ, FF, GG, JJ, HH, II, JJ, JJ, HH, GG, II, HH, JJ, II, GG, II, GG, HH, GG, GG, II, II, JJ, HH, HH, JJ, HH, GG, HH, JJ, WD, WD, HH, HH, HH, JJ, WD, HH, JJ, HH, II, GG, HH, GG, JJ, JJ, GG, HH, JJ, JJ, JJ, HH, EE, II, HH, II, HH, II, II, GG, HH, II, II, II, II, II, JJ, GG, HH, II, JJ, GG, II, HH, JJ, JJ, II, GG, II, JJ, II, HH, JJ, JJ, GG, JJ, JJ, II, GG, GG, HH, HH, JJ, JJ, JJ, JJ, II, II, II, JJ, II, JJ, JJ, HH, HH, JJ, II, WD, AA, GG]);
baseGameReels2.get(GameRTPLevel.RTP_60).set(6, [BB, DD, DD, CC, DD, AA, DD, DD, AA, BB, DD, BB, AA, DD, CC, CC, DD, DD, CC, DD, DD, BB, DD, DD, DD, CC, CC, BB, BB, DD, DD, AA, CC, DD, JJ, AA, CC, AA, CC, AA, BB, DD, DD, AA, AA, BB, CC, CC, AA, AA, CC, DD, DD, CC, CC, CC, DD, BB, DD, BB, DD, DD, BB, DD, CC, DD, CC, HH, DD, DD, BB, BB, BB, CC, GG, CC, AA, CC, AA, AA, AA, CC, CC, DD, DD, FF, BB, CC, CC, CC, AA, AA, AA, CC, DD, CC, CC, BB, BB, BB, DD, CC, BB, DD, CC, DD, BB, BB, CC, DD, DD, CC, CC, CC, BB, BB, BB, CC, DD, AA, DD, BB, CC, DD, BB, BB, CC, CC, BB, DD, CC, CC, DD, AA, BB, DD, DD, BB, DD, DD, BB, CC, BB, AA, DD, CC, AA, DD, CC, BB, AA, CC, DD, DD, DD, AA, CC, AA, AA, DD, AA, DD, DD, AA, DD, BB, CC, DD, BB, CC, DD, BB, BB, CC, DD, AA, DD, BB, CC, CC, CC, AA, CC, BB, BB, CC, EE, AA, BB, BB, AA, BB, DD, DD, AA, AA, CC, DD, DD, AA, AA, AA, CC, DD, BB, BB, CC, CC, BB, AA, BB, DD, II, AA, BB, DD, BB, DD, BB, AA, DD, CC, AA, BB, AA, AA, DD, CC, CC, CC, AA, DD, BB, BB, AA, DD, BB, CC, DD, AA, BB, DD, CC, DD, DD, AA, AA, CC, CC, DD, CC, CC, DD, BB, BB, AA, AA, BB, CC, DD, CC, CC, DD, DD, BB]);
 
baseGameReels2.set(GameRTPLevel.RTP_70, new Map());
baseGameReels2.get(GameRTPLevel.RTP_70).set(1, [II, JJ, II, GG, JJ, GG, JJ, JJ, GG, JJ, JJ, II, JJ, JJ, JJ, HH, II, BB, JJ, JJ, II, HH, GG, JJ, II, GG, FF, HH, II, II, HH, GG, JJ, JJ, JJ, HH, GG, HH, JJ, JJ, GG, GG, HH, JJ, HH, JJ, GG, II, II, II, II, II, JJ, II, II, GG, GG, II, GG, JJ, GG, HH, II, GG, GG, JJ, HH, HH, II, JJ, II, JJ, JJ, II, II, II, HH, JJ, II, HH, II, HH, II, JJ, GG, HH, HH, HH, II, CC, JJ, JJ, HH, JJ, GG, HH, II, JJ, JJ, JJ, HH, JJ, II, HH, JJ, JJ, HH, II, HH, GG, HH, GG, JJ, II, HH, HH, JJ, JJ, GG, JJ, II, GG, JJ, JJ, HH, II, JJ, GG, II, GG, GG, JJ, JJ, GG, HH, JJ, II, GG, II, GG, EE, II, JJ, JJ, HH, GG, JJ, HH, HH, HH, II, HH, GG, JJ, JJ, II, II, GG, JJ, GG, HH, JJ, JJ, JJ, HH, JJ, II, GG, JJ, HH, II, GG, HH, II, II, II, GG, JJ, GG, HH, HH, JJ, HH, II, JJ, GG, GG, JJ, JJ, HH, II, GG, HH, HH, II, II, II, GG, HH, II, DD, HH, II, GG, HH, JJ, HH, II, GG, GG, II, JJ, JJ, GG, JJ, II, HH, GG, JJ, HH, II, JJ, HH, JJ, II, GG, JJ, HH, GG, II, II, JJ, JJ, HH, HH, II, HH, II, II, GG, JJ, II, JJ, JJ, HH, HH, AA, HH, HH, II, II, JJ, JJ, GG, JJ, HH, HH, II, JJ, GG, II, II, II, II, II, JJ]);
baseGameReels2.get(GameRTPLevel.RTP_70).set(2, [CC, CC, BB, DD, DD, BB, BB, WD, AA, DD, DD, BB, CC, AA, DD, DD, CC, DD, CC, CC, AA, DD, WD, CC, CC, AA, CC, DD, DD, CC, AA, AA, DD, CC, DD, CC, DD, CC, AA, BB, BB, CC, DD, WD, DD, BB, DD, CC, BB, DD, CC, BB, AA, DD, AA, BB, CC, AA, CC, CC, CC, DD, BB, AA, DD, DD, BB, DD, DD, BB, CC, DD, CC, CC, CC, BB, CC, CC, BB, AA, BB, BB, BB, DD, DD, DD, DD, BB, CC, DD, CC, WD, DD, DD, DD, DD, CC, DD, DD, DD, BB, CC, DD, DD, CC, AA, AA, DD, DD, BB, AA, BB, BB, DD, CC, CC, DD, DD, AA, AA, BB, CC, DD, BB, BB, AA, DD, AA, DD, BB, FF, CC, WD, JJ, II, AA, CC, AA, DD, DD, BB, BB, AA, CC, BB, AA, AA, DD, BB, DD, DD, CC, WD, CC, AA, CC, BB, GG, BB, DD, DD, AA, CC, CC, AA, DD, AA, BB, DD, BB, AA, AA, CC, DD, WD, BB, CC, DD, EE, CC, BB, CC, CC, BB, CC, BB, CC, BB, CC, DD, AA, CC, AA, DD, BB, CC, AA, BB, CC, HH, AA, CC, AA, AA, DD, DD, AA, DD, BB, AA, DD, AA, DD, DD, BB, BB, AA, AA, DD, BB, DD, AA, CC, BB, DD, BB, DD, BB, AA, AA, CC, CC, CC, AA, AA, WD, CC, DD, DD, BB, DD, AA, BB, DD, BB, CC, BB, BB, AA, CC, CC, CC, DD, BB, CC, CC, BB, AA, AA, DD, WD, WD, BB, CC, DD, CC, DD, BB, BB, BB, CC, DD, CC, DD, DD, CC]);
baseGameReels2.get(GameRTPLevel.RTP_70).set(3, [HH, DD, JJ, CC, JJ, JJ, GG, II, JJ, JJ, WD, II, II, FF, WD, II, HH, II, II, GG, JJ, HH, JJ, HH, GG, GG, GG, JJ, GG, GG, HH, JJ, GG, GG, GG, HH, II, GG, WD, HH, II, II, GG, II, JJ, HH, HH, HH, JJ, II, JJ, II, HH, GG, JJ, HH, WD, AA, HH, JJ, JJ, GG, JJ, GG, II, JJ, JJ, JJ, JJ, HH, JJ, GG, II, GG, HH, JJ, GG, JJ, JJ, HH, HH, JJ, HH, JJ, II, II, HH, HH, WD, II, HH, JJ, JJ, GG, JJ, JJ, HH, GG, HH, JJ, GG, JJ, II, II, HH, II, II, HH, JJ, JJ, II, HH, JJ, II, HH, HH, JJ, JJ, WD, JJ, II, JJ, HH, JJ, HH, II, JJ, GG, HH, HH, JJ, HH, II, II, GG, HH, EE, II, HH, WD, GG, JJ, JJ, GG, GG, WD, GG, JJ, HH, JJ, II, HH, II, II, HH, HH, JJ, JJ, HH, GG, JJ, II, HH, JJ, GG, HH, II, II, JJ, GG, JJ, GG, II, II, JJ, II, GG, JJ, II, HH, JJ, HH, II, JJ, JJ, GG, II, II, JJ, II, WD, II, JJ, II, II, GG, HH, GG, II, II, JJ, II, GG, JJ, JJ, II, II, GG, HH, HH, JJ, HH, HH, HH, GG, JJ, HH, GG, JJ, JJ, HH, HH, II, II, GG, JJ, GG, GG, JJ, GG, HH, JJ, HH, II, GG, II, II, GG, II, II, JJ, JJ, HH, WD, II, II, JJ, II, JJ, II, HH, GG, GG, JJ, II, HH, JJ, HH, II, II, BB, JJ, II, GG, HH, II, JJ, JJ, GG, II, JJ, GG, II, II, II, JJ]);
baseGameReels2.get(GameRTPLevel.RTP_70).set(4, [DD, DD, CC, DD, AA, CC, AA, DD, DD, DD, CC, CC, AA, CC, DD, DD, BB, CC, DD, BB, CC, CC, CC, DD, DD, CC, CC, DD, DD, WD, BB, AA, BB, CC, CC, CC, DD, DD, CC, DD, DD, DD, AA, BB, CC, BB, BB, BB, DD, CC, DD, CC, BB, DD, CC, DD, AA, BB, WD, DD, BB, BB, AA, DD, BB, DD, AA, CC, DD, AA, AA, AA, CC, AA, AA, AA, BB, BB, AA, AA, CC, BB, AA, BB, FF, AA, WD, DD, DD, WD, BB, CC, CC, CC, CC, BB, AA, DD, DD, DD, DD, DD, DD, CC, AA, AA, DD, EE, DD, CC, AA, AA, CC, DD, CC, AA, CC, DD, DD, CC, CC, CC, BB, DD, BB, AA, BB, AA, BB, BB, BB, BB, DD, AA, CC, AA, DD, CC, DD, DD, BB, DD, CC, AA, CC, BB, BB, CC, DD, AA, CC, BB, BB, DD, HH, CC, BB, DD, BB, DD, DD, CC, BB, BB, AA, CC, DD, CC, CC, DD, DD, DD, II, CC, CC, CC, DD, CC, BB, BB, AA, CC, DD, BB, DD, AA, BB, CC, DD, DD, BB, AA, DD, BB, AA, AA, DD, CC, BB, BB, CC, JJ, BB, CC, CC, WD, DD, AA, CC, CC, DD, AA, CC, WD, DD, BB, DD, DD, DD, DD, BB, CC, AA, DD, DD, DD, BB, BB, BB, CC, BB, CC, BB, CC, DD, BB, DD, BB, WD, DD, AA, BB, BB, CC, AA, DD, CC, DD, AA, DD, BB, CC, AA, BB, GG, CC, CC, WD, CC, WD, AA, DD, DD, AA, BB, AA, CC, DD, WD, BB, AA, CC, AA, AA, AA, BB]);
baseGameReels2.get(GameRTPLevel.RTP_70).set(5, [JJ, GG, GG, JJ, HH, JJ, II, JJ, GG, HH, II, GG, II, II, GG, II, JJ, HH, II, II, II, WD, II, HH, HH, JJ, GG, HH, II, JJ, JJ, HH, JJ, HH, HH, GG, JJ, GG, JJ, HH, HH, GG, II, HH, II, II, JJ, II, BB, II, JJ, WD, JJ, GG, DD, JJ, JJ, JJ, GG, GG, GG, II, GG, HH, JJ, II, GG, II, GG, HH, JJ, II, II, GG, GG, II, II, JJ, GG, II, GG, JJ, GG, HH, II, JJ, II, JJ, GG, JJ, JJ, II, JJ, GG, GG, JJ, II, II, II, HH, JJ, HH, JJ, II, HH, II, JJ, JJ, JJ, JJ, GG, II, II, HH, JJ, HH, JJ, II, WD, HH, HH, WD, HH, GG, JJ, HH, HH, JJ, II, JJ, HH, JJ, HH, HH, II, WD, JJ, II, JJ, JJ, GG, II, JJ, GG, HH, JJ, HH, II, II, GG, HH, JJ, GG, WD, GG, JJ, GG, II, HH, II, II, CC, JJ, JJ, HH, HH, JJ, FF, GG, JJ, HH, II, JJ, JJ, HH, GG, II, HH, JJ, II, GG, II, GG, HH, GG, GG, II, II, JJ, HH, HH, JJ, HH, GG, HH, JJ, WD, WD, HH, HH, HH, JJ, WD, HH, JJ, HH, II, GG, HH, GG, JJ, JJ, GG, HH, JJ, JJ, JJ, HH, EE, II, HH, II, HH, II, II, GG, HH, II, II, II, II, II, JJ, GG, HH, II, JJ, GG, II, HH, JJ, JJ, II, GG, II, JJ, II, HH, JJ, JJ, GG, JJ, JJ, II, GG, GG, HH, HH, JJ, JJ, JJ, JJ, II, II, II, JJ, II, JJ, JJ, HH, HH, JJ, II, WD, AA, GG]);
baseGameReels2.get(GameRTPLevel.RTP_70).set(6, [BB, DD, DD, CC, DD, AA, DD, DD, AA, BB, DD, BB, AA, DD, CC, CC, DD, DD, CC, DD, DD, BB, DD, DD, DD, CC, CC, BB, BB, DD, DD, AA, CC, DD, JJ, AA, CC, AA, CC, AA, BB, DD, DD, AA, AA, BB, CC, CC, AA, AA, CC, DD, DD, CC, CC, CC, DD, BB, DD, BB, DD, DD, BB, DD, CC, DD, CC, HH, DD, DD, BB, BB, BB, CC, GG, CC, AA, CC, AA, AA, AA, CC, CC, DD, DD, FF, BB, CC, CC, CC, AA, AA, AA, CC, DD, CC, CC, BB, BB, BB, DD, CC, BB, DD, CC, DD, BB, BB, CC, DD, DD, CC, CC, CC, BB, BB, BB, CC, DD, AA, DD, BB, CC, DD, BB, BB, CC, CC, BB, DD, CC, CC, DD, AA, BB, DD, DD, BB, DD, DD, BB, CC, BB, AA, DD, CC, AA, DD, CC, BB, AA, CC, DD, DD, DD, AA, CC, AA, AA, DD, AA, DD, DD, AA, DD, BB, CC, DD, BB, CC, DD, BB, BB, CC, DD, AA, DD, BB, CC, CC, CC, AA, CC, BB, BB, CC, EE, AA, BB, BB, AA, BB, DD, DD, AA, AA, CC, DD, DD, AA, AA, AA, CC, DD, BB, BB, CC, CC, BB, AA, BB, DD, II, AA, BB, DD, BB, DD, BB, AA, DD, CC, AA, BB, AA, AA, DD, CC, CC, CC, AA, DD, BB, BB, AA, DD, BB, CC, DD, AA, BB, DD, CC, DD, DD, AA, AA, CC, CC, DD, CC, CC, DD, BB, BB, AA, AA, BB, CC, DD, CC, CC, DD, DD, BB]);

baseGameReels2.set(GameRTPLevel.RTP_80, new Map());
baseGameReels2.get(GameRTPLevel.RTP_80).set(1, [II, JJ, II, GG, JJ, GG, JJ, JJ, GG, JJ, JJ, II, JJ, JJ, JJ, HH, II, BB, JJ, JJ, II, HH, GG, JJ, II, GG, FF, HH, II, II, HH, GG, JJ, JJ, JJ, HH, GG, HH, JJ, JJ, GG, GG, HH, JJ, HH, JJ, GG, II, II, II, II, II, JJ, II, II, GG, GG, II, GG, JJ, GG, HH, II, GG, GG, JJ, HH, HH, II, JJ, II, JJ, JJ, II, II, II, HH, JJ, II, HH, II, HH, II, JJ, GG, HH, HH, HH, II, CC, JJ, JJ, HH, JJ, GG, HH, II, JJ, JJ, JJ, HH, JJ, II, HH, JJ, JJ, HH, II, HH, GG, HH, GG, JJ, II, HH, HH, JJ, JJ, GG, JJ, II, GG, JJ, JJ, HH, II, JJ, GG, II, GG, GG, JJ, JJ, GG, HH, JJ, II, GG, II, GG, EE, II, JJ, JJ, HH, GG, JJ, HH, HH, HH, II, HH, GG, JJ, JJ, II, II, GG, JJ, GG, HH, JJ, JJ, JJ, HH, JJ, II, GG, JJ, HH, II, GG, HH, II, II, II, GG, JJ, GG, HH, HH, JJ, HH, II, JJ, GG, GG, JJ, JJ, HH, II, GG, HH, HH, II, II, II, GG, HH, II, DD, HH, II, GG, HH, JJ, HH, II, GG, GG, II, JJ, JJ, GG, JJ, II, HH, GG, JJ, HH, II, JJ, HH, JJ, II, GG, JJ, HH, GG, II, II, JJ, JJ, HH, HH, II, HH, II, II, GG, JJ, II, JJ, JJ, HH, HH, AA, HH, HH, II, II, JJ, JJ, GG, JJ, HH, HH, II, JJ, GG, II, II, II, II, II, JJ]);
baseGameReels2.get(GameRTPLevel.RTP_80).set(2, [CC, CC, BB, DD, DD, BB, BB, WD, AA, DD, DD, BB, CC, AA, DD, DD, CC, DD, CC, CC, AA, DD, WD, CC, CC, AA, CC, DD, DD, CC, AA, AA, DD, CC, DD, CC, DD, CC, AA, BB, BB, CC, DD, WD, DD, BB, DD, CC, BB, DD, CC, BB, AA, DD, AA, BB, CC, AA, CC, CC, CC, DD, BB, AA, DD, DD, BB, DD, DD, BB, CC, DD, CC, CC, CC, BB, CC, CC, BB, AA, BB, BB, BB, DD, DD, DD, DD, BB, CC, DD, CC, WD, DD, DD, DD, DD, CC, DD, DD, DD, BB, CC, DD, DD, CC, AA, AA, DD, DD, BB, AA, BB, BB, DD, CC, CC, DD, DD, AA, AA, BB, CC, DD, BB, BB, AA, DD, AA, DD, BB, FF, CC, WD, JJ, II, AA, CC, AA, DD, DD, BB, BB, AA, CC, BB, AA, AA, DD, BB, DD, DD, CC, WD, CC, AA, CC, BB, GG, BB, DD, DD, AA, CC, CC, AA, DD, AA, BB, DD, BB, AA, AA, CC, DD, WD, BB, CC, DD, EE, CC, BB, CC, CC, BB, CC, BB, CC, BB, CC, DD, AA, CC, AA, DD, BB, CC, AA, BB, CC, HH, AA, CC, AA, AA, DD, DD, AA, DD, BB, AA, DD, AA, DD, DD, BB, BB, AA, AA, DD, BB, DD, AA, CC, BB, DD, BB, DD, BB, AA, AA, CC, CC, CC, AA, AA, WD, CC, DD, DD, BB, DD, AA, BB, DD, BB, CC, BB, BB, AA, CC, CC, CC, DD, BB, CC, CC, BB, AA, AA, DD, WD, WD, BB, CC, DD, CC, DD, BB, BB, BB, CC, DD, CC, DD, DD, CC]);
baseGameReels2.get(GameRTPLevel.RTP_80).set(3, [HH, DD, JJ, CC, JJ, JJ, GG, II, JJ, JJ, WD, II, II, FF, WD, II, HH, II, II, GG, JJ, HH, JJ, HH, GG, GG, GG, JJ, GG, GG, HH, JJ, GG, GG, GG, HH, II, GG, WD, HH, II, II, GG, II, JJ, HH, HH, HH, JJ, II, JJ, II, HH, GG, JJ, HH, WD, AA, HH, JJ, JJ, GG, JJ, GG, II, JJ, JJ, JJ, JJ, HH, JJ, GG, II, GG, HH, JJ, GG, JJ, JJ, HH, HH, JJ, HH, JJ, II, II, HH, HH, WD, II, HH, JJ, JJ, GG, JJ, JJ, HH, GG, HH, JJ, GG, JJ, II, II, HH, II, II, HH, JJ, JJ, II, HH, JJ, II, HH, HH, JJ, JJ, WD, JJ, II, JJ, HH, JJ, HH, II, JJ, GG, HH, HH, JJ, HH, II, II, GG, HH, EE, II, HH, WD, GG, JJ, JJ, GG, GG, WD, GG, JJ, HH, JJ, II, HH, II, II, HH, HH, JJ, JJ, HH, GG, JJ, II, HH, JJ, GG, HH, II, II, JJ, GG, JJ, GG, II, II, JJ, II, GG, JJ, II, HH, JJ, HH, II, JJ, JJ, GG, II, II, JJ, II, WD, II, JJ, II, II, GG, HH, GG, II, II, JJ, II, GG, JJ, JJ, II, II, GG, HH, HH, JJ, HH, HH, HH, GG, JJ, HH, GG, JJ, JJ, HH, HH, II, II, GG, JJ, GG, GG, JJ, GG, HH, JJ, HH, II, GG, II, II, GG, II, II, JJ, JJ, HH, WD, II, II, JJ, II, JJ, II, HH, GG, GG, JJ, II, HH, JJ, HH, II, II, BB, JJ, II, GG, HH, II, JJ, JJ, GG, II, JJ, GG, II, II, II, JJ]);
baseGameReels2.get(GameRTPLevel.RTP_80).set(4, [DD, DD, CC, DD, AA, CC, AA, DD, DD, DD, CC, CC, AA, CC, DD, DD, BB, CC, DD, BB, CC, CC, CC, DD, DD, CC, CC, DD, DD, WD, BB, AA, BB, CC, CC, CC, DD, DD, CC, DD, DD, DD, AA, BB, CC, BB, BB, BB, DD, CC, DD, CC, BB, DD, CC, DD, AA, BB, WD, DD, BB, BB, AA, DD, BB, DD, AA, CC, DD, AA, AA, AA, CC, AA, AA, AA, BB, BB, AA, AA, CC, BB, AA, BB, FF, AA, WD, DD, DD, WD, BB, CC, CC, CC, CC, BB, AA, DD, DD, DD, DD, DD, DD, CC, AA, AA, DD, EE, DD, CC, AA, AA, CC, DD, CC, AA, CC, DD, DD, CC, CC, CC, BB, DD, BB, AA, BB, AA, BB, BB, BB, BB, DD, AA, CC, AA, DD, CC, DD, DD, BB, DD, CC, AA, CC, BB, BB, CC, DD, AA, CC, BB, BB, DD, HH, CC, BB, DD, BB, DD, DD, CC, BB, BB, AA, CC, DD, CC, CC, DD, DD, DD, II, CC, CC, CC, DD, CC, BB, BB, AA, CC, DD, BB, DD, AA, BB, CC, DD, DD, BB, AA, DD, BB, AA, AA, DD, CC, BB, BB, CC, JJ, BB, CC, CC, WD, DD, AA, CC, CC, DD, AA, CC, WD, DD, BB, DD, DD, DD, DD, BB, CC, AA, DD, DD, DD, BB, BB, BB, CC, BB, CC, BB, CC, DD, BB, DD, BB, WD, DD, AA, BB, BB, CC, AA, DD, CC, DD, AA, DD, BB, CC, AA, BB, GG, CC, CC, WD, CC, WD, AA, DD, DD, AA, BB, AA, CC, DD, WD, BB, AA, CC, AA, AA, AA, BB]);
baseGameReels2.get(GameRTPLevel.RTP_80).set(5, [JJ, GG, GG, JJ, HH, JJ, II, JJ, GG, HH, II, GG, II, II, GG, II, JJ, HH, II, II, II, WD, II, HH, HH, JJ, GG, HH, II, JJ, JJ, HH, JJ, HH, HH, GG, JJ, GG, JJ, HH, HH, GG, II, HH, II, II, JJ, II, BB, II, JJ, WD, JJ, GG, DD, JJ, JJ, JJ, GG, GG, GG, II, GG, HH, JJ, II, GG, II, GG, HH, JJ, II, II, GG, GG, II, II, JJ, GG, II, GG, JJ, GG, HH, II, JJ, II, JJ, GG, JJ, JJ, II, JJ, GG, GG, JJ, II, II, II, HH, JJ, HH, JJ, II, HH, II, JJ, JJ, JJ, JJ, GG, II, II, HH, JJ, HH, JJ, II, WD, HH, HH, WD, HH, GG, JJ, HH, HH, JJ, II, JJ, HH, JJ, HH, HH, II, WD, JJ, II, JJ, JJ, GG, II, JJ, GG, HH, JJ, HH, II, II, GG, HH, JJ, GG, WD, GG, JJ, GG, II, HH, II, II, CC, JJ, JJ, HH, HH, JJ, FF, GG, JJ, HH, II, JJ, JJ, HH, GG, II, HH, JJ, II, GG, II, GG, HH, GG, GG, II, II, JJ, HH, HH, JJ, HH, GG, HH, JJ, WD, WD, HH, HH, HH, JJ, WD, HH, JJ, HH, II, GG, HH, GG, JJ, JJ, GG, HH, JJ, JJ, JJ, HH, EE, II, HH, II, HH, II, II, GG, HH, II, II, II, II, II, JJ, GG, HH, II, JJ, GG, II, HH, JJ, JJ, II, GG, II, JJ, II, HH, JJ, JJ, GG, JJ, JJ, II, GG, GG, HH, HH, JJ, JJ, JJ, JJ, II, II, II, JJ, II, JJ, JJ, HH, HH, JJ, II, WD, AA, GG]);
baseGameReels2.get(GameRTPLevel.RTP_80).set(6, [BB, DD, DD, CC, DD, AA, DD, DD, AA, BB, DD, BB, AA, DD, CC, CC, DD, DD, CC, DD, DD, BB, DD, DD, DD, CC, CC, BB, BB, DD, DD, AA, CC, DD, JJ, AA, CC, AA, CC, AA, BB, DD, DD, AA, AA, BB, CC, CC, AA, AA, CC, DD, DD, CC, CC, CC, DD, BB, DD, BB, DD, DD, BB, DD, CC, DD, CC, HH, DD, DD, BB, BB, BB, CC, GG, CC, AA, CC, AA, AA, AA, CC, CC, DD, DD, FF, BB, CC, CC, CC, AA, AA, AA, CC, DD, CC, CC, BB, BB, BB, DD, CC, BB, DD, CC, DD, BB, BB, CC, DD, DD, CC, CC, CC, BB, BB, BB, CC, DD, AA, DD, BB, CC, DD, BB, BB, CC, CC, BB, DD, CC, CC, DD, AA, BB, DD, DD, BB, DD, DD, BB, CC, BB, AA, DD, CC, AA, DD, CC, BB, AA, CC, DD, DD, DD, AA, CC, AA, AA, DD, AA, DD, DD, AA, DD, BB, CC, DD, BB, CC, DD, BB, BB, CC, DD, AA, DD, BB, CC, CC, CC, AA, CC, BB, BB, CC, EE, AA, BB, BB, AA, BB, DD, DD, AA, AA, CC, DD, DD, AA, AA, AA, CC, DD, BB, BB, CC, CC, BB, AA, BB, DD, II, AA, BB, DD, BB, DD, BB, AA, DD, CC, AA, BB, AA, AA, DD, CC, CC, CC, AA, DD, BB, BB, AA, DD, BB, CC, DD, AA, BB, DD, CC, DD, DD, AA, AA, CC, CC, DD, CC, CC, DD, BB, BB, AA, AA, BB, CC, DD, CC, CC, DD, DD, BB]);

baseGameReels2.set(GameRTPLevel.RTP_90, new Map());
baseGameReels2.get(GameRTPLevel.RTP_90).set(1, [II, JJ, II, GG, JJ, GG, JJ, JJ, GG, JJ, JJ, II, JJ, JJ, JJ, HH, II, BB, JJ, JJ, II, HH, GG, JJ, II, GG, FF, HH, II, II, HH, GG, JJ, JJ, JJ, HH, GG, HH, JJ, JJ, GG, GG, HH, JJ, HH, JJ, GG, II, II, II, II, II, JJ, II, II, GG, GG, II, GG, JJ, GG, HH, II, GG, GG, JJ, HH, HH, II, JJ, II, JJ, JJ, II, II, II, HH, JJ, II, HH, II, HH, II, JJ, GG, HH, HH, HH, II, CC, JJ, JJ, HH, JJ, GG, HH, II, JJ, JJ, JJ, HH, JJ, II, HH, JJ, JJ, HH, II, HH, GG, HH, GG, JJ, II, HH, HH, JJ, JJ, GG, JJ, II, GG, JJ, JJ, HH, II, JJ, GG, II, GG, GG, JJ, JJ, GG, HH, JJ, II, GG, II, GG, EE, II, JJ, JJ, HH, GG, JJ, HH, HH, HH, II, HH, GG, JJ, JJ, II, II, GG, JJ, GG, HH, JJ, JJ, JJ, HH, JJ, II, GG, JJ, HH, II, GG, HH, II, II, II, GG, JJ, GG, HH, HH, JJ, HH, II, JJ, GG, GG, JJ, JJ, HH, II, GG, HH, HH, II, II, II, GG, HH, II, DD, HH, II, GG, HH, JJ, HH, II, GG, GG, II, JJ, JJ, GG, JJ, II, HH, GG, JJ, HH, II, JJ, HH, JJ, II, GG, JJ, HH, GG, II, II, JJ, JJ, HH, HH, II, HH, II, II, GG, JJ, II, JJ, JJ, HH, HH, AA, HH, HH, II, II, JJ, JJ, GG, JJ, HH, HH, II, JJ, GG, II, II, II, II, II, JJ]);
baseGameReels2.get(GameRTPLevel.RTP_90).set(2, [CC, CC, BB, DD, DD, BB, BB, WD, AA, DD, DD, BB, CC, AA, DD, DD, CC, DD, CC, CC, AA, DD, WD, CC, CC, AA, CC, DD, DD, CC, AA, AA, DD, CC, DD, CC, DD, CC, AA, BB, BB, CC, DD, WD, DD, BB, DD, CC, BB, DD, CC, BB, AA, DD, AA, BB, CC, AA, CC, CC, CC, DD, BB, AA, DD, DD, BB, DD, DD, BB, CC, DD, CC, CC, CC, BB, CC, CC, BB, AA, BB, BB, BB, DD, DD, DD, DD, BB, CC, DD, CC, WD, DD, DD, DD, DD, CC, DD, DD, DD, BB, CC, DD, DD, CC, AA, AA, DD, DD, BB, AA, BB, BB, DD, CC, CC, DD, DD, AA, AA, BB, CC, DD, BB, BB, AA, DD, AA, DD, BB, FF, CC, WD, JJ, II, AA, CC, AA, DD, DD, BB, BB, AA, CC, BB, AA, AA, DD, BB, DD, DD, CC, WD, CC, AA, CC, BB, GG, BB, DD, DD, AA, CC, CC, AA, DD, AA, BB, DD, BB, AA, AA, CC, DD, WD, BB, CC, DD, EE, CC, BB, CC, CC, BB, CC, BB, CC, BB, CC, DD, AA, CC, AA, DD, BB, CC, AA, BB, CC, HH, AA, CC, AA, AA, DD, DD, AA, DD, BB, AA, DD, AA, DD, DD, BB, BB, AA, AA, DD, BB, DD, AA, CC, BB, DD, BB, DD, BB, AA, AA, CC, CC, CC, AA, AA, WD, CC, DD, DD, BB, DD, AA, BB, DD, BB, CC, BB, BB, AA, CC, CC, CC, DD, BB, CC, CC, BB, AA, AA, DD, WD, WD, BB, CC, DD, CC, DD, BB, BB, BB, CC, DD, CC, DD, DD, CC]);
baseGameReels2.get(GameRTPLevel.RTP_90).set(3, [HH, DD, JJ, CC, JJ, JJ, GG, II, JJ, JJ, WD, II, II, FF, WD, II, HH, II, II, GG, JJ, HH, JJ, HH, GG, GG, GG, JJ, GG, GG, HH, JJ, GG, GG, GG, HH, II, GG, WD, HH, II, II, GG, II, JJ, HH, HH, HH, JJ, II, JJ, II, HH, GG, JJ, HH, WD, AA, HH, JJ, JJ, GG, JJ, GG, II, JJ, JJ, JJ, JJ, HH, JJ, GG, II, GG, HH, JJ, GG, JJ, JJ, HH, HH, JJ, HH, JJ, II, II, HH, HH, WD, II, HH, JJ, JJ, GG, JJ, JJ, HH, GG, HH, JJ, GG, JJ, II, II, HH, II, II, HH, JJ, JJ, II, HH, JJ, II, HH, HH, JJ, JJ, WD, JJ, II, JJ, HH, JJ, HH, II, JJ, GG, HH, HH, JJ, HH, II, II, GG, HH, EE, II, HH, WD, GG, JJ, JJ, GG, GG, WD, GG, JJ, HH, JJ, II, HH, II, II, HH, HH, JJ, JJ, HH, GG, JJ, II, HH, JJ, GG, HH, II, II, JJ, GG, JJ, GG, II, II, JJ, II, GG, JJ, II, HH, JJ, HH, II, JJ, JJ, GG, II, II, JJ, II, WD, II, JJ, II, II, GG, HH, GG, II, II, JJ, II, GG, JJ, JJ, II, II, GG, HH, HH, JJ, HH, HH, HH, GG, JJ, HH, GG, JJ, JJ, HH, HH, II, II, GG, JJ, GG, GG, JJ, GG, HH, JJ, HH, II, GG, II, II, GG, II, II, JJ, JJ, HH, WD, II, II, JJ, II, JJ, II, HH, GG, GG, JJ, II, HH, JJ, HH, II, II, BB, JJ, II, GG, HH, II, JJ, JJ, GG, II, JJ, GG, II, II, II, JJ]);
baseGameReels2.get(GameRTPLevel.RTP_90).set(4, [DD, DD, CC, DD, AA, CC, AA, DD, DD, DD, CC, CC, AA, CC, DD, DD, BB, CC, DD, BB, CC, CC, CC, DD, DD, CC, CC, DD, DD, WD, BB, AA, BB, CC, CC, CC, DD, DD, CC, DD, DD, DD, AA, BB, CC, BB, BB, BB, DD, CC, DD, CC, BB, DD, CC, DD, AA, BB, WD, DD, BB, BB, AA, DD, BB, DD, AA, CC, DD, AA, AA, AA, CC, AA, AA, AA, BB, BB, AA, AA, CC, BB, AA, BB, FF, AA, WD, DD, DD, WD, BB, CC, CC, CC, CC, BB, AA, DD, DD, DD, DD, DD, DD, CC, AA, AA, DD, EE, DD, CC, AA, AA, CC, DD, CC, AA, CC, DD, DD, CC, CC, CC, BB, DD, BB, AA, BB, AA, BB, BB, BB, BB, DD, AA, CC, AA, DD, CC, DD, DD, BB, DD, CC, AA, CC, BB, BB, CC, DD, AA, CC, BB, BB, DD, HH, CC, BB, DD, BB, DD, DD, CC, BB, BB, AA, CC, DD, CC, CC, DD, DD, DD, II, CC, CC, CC, DD, CC, BB, BB, AA, CC, DD, BB, DD, AA, BB, CC, DD, DD, BB, AA, DD, BB, AA, AA, DD, CC, BB, BB, CC, JJ, BB, CC, CC, WD, DD, AA, CC, CC, DD, AA, CC, WD, DD, BB, DD, DD, DD, DD, BB, CC, AA, DD, DD, DD, BB, BB, BB, CC, BB, CC, BB, CC, DD, BB, DD, BB, WD, DD, AA, BB, BB, CC, AA, DD, CC, DD, AA, DD, BB, CC, AA, BB, GG, CC, CC, WD, CC, WD, AA, DD, DD, AA, BB, AA, CC, DD, WD, BB, AA, CC, AA, AA, AA, BB]);
baseGameReels2.get(GameRTPLevel.RTP_90).set(5, [JJ, GG, GG, JJ, HH, JJ, II, JJ, GG, HH, II, GG, II, II, GG, II, JJ, HH, II, II, II, WD, II, HH, HH, JJ, GG, HH, II, JJ, JJ, HH, JJ, HH, HH, GG, JJ, GG, JJ, HH, HH, GG, II, HH, II, II, JJ, II, BB, II, JJ, WD, JJ, GG, DD, JJ, JJ, JJ, GG, GG, GG, II, GG, HH, JJ, II, GG, II, GG, HH, JJ, II, II, GG, GG, II, II, JJ, GG, II, GG, JJ, GG, HH, II, JJ, II, JJ, GG, JJ, JJ, II, JJ, GG, GG, JJ, II, II, II, HH, JJ, HH, JJ, II, HH, II, JJ, JJ, JJ, JJ, GG, II, II, HH, JJ, HH, JJ, II, WD, HH, HH, WD, HH, GG, JJ, HH, HH, JJ, II, JJ, HH, JJ, HH, HH, II, WD, JJ, II, JJ, JJ, GG, II, JJ, GG, HH, JJ, HH, II, II, GG, HH, JJ, GG, WD, GG, JJ, GG, II, HH, II, II, CC, JJ, JJ, HH, HH, JJ, FF, GG, JJ, HH, II, JJ, JJ, HH, GG, II, HH, JJ, II, GG, II, GG, HH, GG, GG, II, II, JJ, HH, HH, JJ, HH, GG, HH, JJ, WD, WD, HH, HH, HH, JJ, WD, HH, JJ, HH, II, GG, HH, GG, JJ, JJ, GG, HH, JJ, JJ, JJ, HH, EE, II, HH, II, HH, II, II, GG, HH, II, II, II, II, II, JJ, GG, HH, II, JJ, GG, II, HH, JJ, JJ, II, GG, II, JJ, II, HH, JJ, JJ, GG, JJ, JJ, II, GG, GG, HH, HH, JJ, JJ, JJ, JJ, II, II, II, JJ, II, JJ, JJ, HH, HH, JJ, II, WD, AA, GG]);
baseGameReels2.get(GameRTPLevel.RTP_90).set(6, [BB, DD, DD, CC, DD, AA, DD, DD, AA, BB, DD, BB, AA, DD, CC, CC, DD, DD, CC, DD, DD, BB, DD, DD, DD, CC, CC, BB, BB, DD, DD, AA, CC, DD, JJ, AA, CC, AA, CC, AA, BB, DD, DD, AA, AA, BB, CC, CC, AA, AA, CC, DD, DD, CC, CC, CC, DD, BB, DD, BB, DD, DD, BB, DD, CC, DD, CC, HH, DD, DD, BB, BB, BB, CC, GG, CC, AA, CC, AA, AA, AA, CC, CC, DD, DD, FF, BB, CC, CC, CC, AA, AA, AA, CC, DD, CC, CC, BB, BB, BB, DD, CC, BB, DD, CC, DD, BB, BB, CC, DD, DD, CC, CC, CC, BB, BB, BB, CC, DD, AA, DD, BB, CC, DD, BB, BB, CC, CC, BB, DD, CC, CC, DD, AA, BB, DD, DD, BB, DD, DD, BB, CC, BB, AA, DD, CC, AA, DD, CC, BB, AA, CC, DD, DD, DD, AA, CC, AA, AA, DD, AA, DD, DD, AA, DD, BB, CC, DD, BB, CC, DD, BB, BB, CC, DD, AA, DD, BB, CC, CC, CC, AA, CC, BB, BB, CC, EE, AA, BB, BB, AA, BB, DD, DD, AA, AA, CC, DD, DD, AA, AA, AA, CC, DD, BB, BB, CC, CC, BB, AA, BB, DD, II, AA, BB, DD, BB, DD, BB, AA, DD, CC, AA, BB, AA, AA, DD, CC, CC, CC, AA, DD, BB, BB, AA, DD, BB, CC, DD, AA, BB, DD, CC, DD, DD, AA, AA, CC, CC, DD, CC, CC, DD, BB, BB, AA, AA, BB, CC, DD, CC, CC, DD, DD, BB]);

baseGameReels2.set(GameRTPLevel.RTP_95, new Map());
baseGameReels2.get(GameRTPLevel.RTP_95).set(1, [II, JJ, II, GG, JJ, GG, JJ, JJ, GG, JJ, JJ, II, JJ, JJ, JJ, HH, II, BB, JJ, JJ, II, HH, GG, JJ, II, GG, FF, HH, II, II, HH, GG, JJ, JJ, JJ, HH, GG, HH, JJ, JJ, GG, GG, HH, JJ, HH, JJ, GG, II, II, II, II, II, JJ, II, II, GG, GG, II, GG, JJ, GG, HH, II, GG, GG, JJ, HH, HH, II, JJ, II, JJ, JJ, II, II, II, HH, JJ, II, HH, II, HH, II, JJ, GG, HH, HH, HH, II, CC, JJ, JJ, HH, JJ, GG, HH, II, JJ, JJ, JJ, HH, JJ, II, HH, JJ, JJ, HH, II, HH, GG, HH, GG, JJ, II, HH, HH, JJ, JJ, GG, JJ, II, GG, JJ, JJ, HH, II, JJ, GG, II, GG, GG, JJ, JJ, GG, HH, JJ, II, GG, II, GG, EE, II, JJ, JJ, HH, GG, JJ, HH, HH, HH, II, HH, GG, JJ, JJ, II, II, GG, JJ, GG, HH, JJ, JJ, JJ, HH, JJ, II, GG, JJ, HH, II, GG, HH, II, II, II, GG, JJ, GG, HH, HH, JJ, HH, II, JJ, GG, GG, JJ, JJ, HH, II, GG, HH, HH, II, II, II, GG, HH, II, DD, HH, II, GG, HH, JJ, HH, II, GG, GG, II, JJ, JJ, GG, JJ, II, HH, GG, JJ, HH, II, JJ, HH, JJ, II, GG, JJ, HH, GG, II, II, JJ, JJ, HH, HH, II, HH, II, II, GG, JJ, II, JJ, JJ, HH, HH, AA, HH, HH, II, II, JJ, JJ, GG, JJ, HH, HH, II, JJ, GG, II, II, II, II, II, JJ]);
baseGameReels2.get(GameRTPLevel.RTP_95).set(2, [CC, CC, BB, DD, DD, BB, BB, WD, AA, DD, DD, BB, CC, AA, DD, DD, CC, DD, CC, CC, AA, DD, WD, CC, CC, AA, CC, DD, DD, CC, AA, AA, DD, CC, DD, CC, DD, CC, AA, BB, BB, CC, DD, WD, DD, BB, DD, CC, BB, DD, CC, BB, AA, DD, AA, BB, CC, AA, CC, CC, CC, DD, BB, AA, DD, DD, BB, DD, DD, BB, CC, DD, CC, CC, CC, BB, CC, CC, BB, AA, BB, BB, BB, DD, DD, DD, DD, BB, CC, DD, CC, WD, DD, DD, DD, DD, CC, DD, DD, DD, BB, CC, DD, DD, CC, AA, AA, DD, DD, BB, AA, BB, BB, DD, CC, CC, DD, DD, AA, AA, BB, CC, DD, BB, BB, AA, DD, AA, DD, BB, FF, CC, WD, JJ, II, AA, CC, AA, DD, DD, BB, BB, AA, CC, BB, AA, AA, DD, BB, DD, DD, CC, WD, CC, AA, CC, BB, GG, BB, DD, DD, AA, CC, CC, AA, DD, AA, BB, DD, BB, AA, AA, CC, DD, WD, BB, CC, DD, EE, CC, BB, CC, CC, BB, CC, BB, CC, BB, CC, DD, AA, CC, AA, DD, BB, CC, AA, BB, CC, HH, AA, CC, AA, AA, DD, DD, AA, DD, BB, AA, DD, AA, DD, DD, BB, BB, AA, AA, DD, BB, DD, AA, CC, BB, DD, BB, DD, BB, AA, AA, CC, CC, CC, AA, AA, WD, CC, DD, DD, BB, DD, AA, BB, DD, BB, CC, BB, BB, AA, CC, CC, CC, DD, BB, CC, CC, BB, AA, AA, DD, WD, WD, BB, CC, DD, CC, DD, BB, BB, BB, CC, DD, CC, DD, DD, CC]);
baseGameReels2.get(GameRTPLevel.RTP_95).set(3, [HH, DD, JJ, CC, JJ, JJ, GG, II, JJ, JJ, WD, II, II, FF, WD, II, HH, II, II, GG, JJ, HH, JJ, HH, GG, GG, GG, JJ, GG, GG, HH, JJ, GG, GG, GG, HH, II, GG, WD, HH, II, II, GG, II, JJ, HH, HH, HH, JJ, II, JJ, II, HH, GG, JJ, HH, WD, AA, HH, JJ, JJ, GG, JJ, GG, II, JJ, JJ, JJ, JJ, HH, JJ, GG, II, GG, HH, JJ, GG, JJ, JJ, HH, HH, JJ, HH, JJ, II, II, HH, HH, WD, II, HH, JJ, JJ, GG, JJ, JJ, HH, GG, HH, JJ, GG, JJ, II, II, HH, II, II, HH, JJ, JJ, II, HH, JJ, II, HH, HH, JJ, JJ, WD, JJ, II, JJ, HH, JJ, HH, II, JJ, GG, HH, HH, JJ, HH, II, II, GG, HH, EE, II, HH, WD, GG, JJ, JJ, GG, GG, WD, GG, JJ, HH, JJ, II, HH, II, II, HH, HH, JJ, JJ, HH, GG, JJ, II, HH, JJ, GG, HH, II, II, JJ, GG, JJ, GG, II, II, JJ, II, GG, JJ, II, HH, JJ, HH, II, JJ, JJ, GG, II, II, JJ, II, WD, II, JJ, II, II, GG, HH, GG, II, II, JJ, II, GG, JJ, JJ, II, II, GG, HH, HH, JJ, HH, HH, HH, GG, JJ, HH, GG, JJ, JJ, HH, HH, II, II, GG, JJ, GG, GG, JJ, GG, HH, JJ, HH, II, GG, II, II, GG, II, II, JJ, JJ, HH, WD, II, II, JJ, II, JJ, II, HH, GG, GG, JJ, II, HH, JJ, HH, II, II, BB, JJ, II, GG, HH, II, JJ, JJ, GG, II, JJ, GG, II, II, II, JJ]);
baseGameReels2.get(GameRTPLevel.RTP_95).set(4, [DD, DD, CC, DD, AA, CC, AA, DD, DD, DD, CC, CC, AA, CC, DD, DD, BB, CC, DD, BB, CC, CC, CC, DD, DD, CC, CC, DD, DD, WD, BB, AA, BB, CC, CC, CC, DD, DD, CC, DD, DD, DD, AA, BB, CC, BB, BB, BB, DD, CC, DD, CC, BB, DD, CC, DD, AA, BB, WD, DD, BB, BB, AA, DD, BB, DD, AA, CC, DD, AA, AA, AA, CC, AA, AA, AA, BB, BB, AA, AA, CC, BB, AA, BB, FF, AA, WD, DD, DD, WD, BB, CC, CC, CC, CC, BB, AA, DD, DD, DD, DD, DD, DD, CC, AA, AA, DD, EE, DD, CC, AA, AA, CC, DD, CC, AA, CC, DD, DD, CC, CC, CC, BB, DD, BB, AA, BB, AA, BB, BB, BB, BB, DD, AA, CC, AA, DD, CC, DD, DD, BB, DD, CC, AA, CC, BB, BB, CC, DD, AA, CC, BB, BB, DD, HH, CC, BB, DD, BB, DD, DD, CC, BB, BB, AA, CC, DD, CC, CC, DD, DD, DD, II, CC, CC, CC, DD, CC, BB, BB, AA, CC, DD, BB, DD, AA, BB, CC, DD, DD, BB, AA, DD, BB, AA, AA, DD, CC, BB, BB, CC, JJ, BB, CC, CC, WD, DD, AA, CC, CC, DD, AA, CC, WD, DD, BB, DD, DD, DD, DD, BB, CC, AA, DD, DD, DD, BB, BB, BB, CC, BB, CC, BB, CC, DD, BB, DD, BB, WD, DD, AA, BB, BB, CC, AA, DD, CC, DD, AA, DD, BB, CC, AA, BB, GG, CC, CC, WD, CC, WD, AA, DD, DD, AA, BB, AA, CC, DD, WD, BB, AA, CC, AA, AA, AA, BB]);
baseGameReels2.get(GameRTPLevel.RTP_95).set(5, [JJ, GG, GG, JJ, HH, JJ, II, JJ, GG, HH, II, GG, II, II, GG, II, JJ, HH, II, II, II, WD, II, HH, HH, JJ, GG, HH, II, JJ, JJ, HH, JJ, HH, HH, GG, JJ, GG, JJ, HH, HH, GG, II, HH, II, II, JJ, II, BB, II, JJ, WD, JJ, GG, DD, JJ, JJ, JJ, GG, GG, GG, II, GG, HH, JJ, II, GG, II, GG, HH, JJ, II, II, GG, GG, II, II, JJ, GG, II, GG, JJ, GG, HH, II, JJ, II, JJ, GG, JJ, JJ, II, JJ, GG, GG, JJ, II, II, II, HH, JJ, HH, JJ, II, HH, II, JJ, JJ, JJ, JJ, GG, II, II, HH, JJ, HH, JJ, II, WD, HH, HH, WD, HH, GG, JJ, HH, HH, JJ, II, JJ, HH, JJ, HH, HH, II, WD, JJ, II, JJ, JJ, GG, II, JJ, GG, HH, JJ, HH, II, II, GG, HH, JJ, GG, WD, GG, JJ, GG, II, HH, II, II, CC, JJ, JJ, HH, HH, JJ, FF, GG, JJ, HH, II, JJ, JJ, HH, GG, II, HH, JJ, II, GG, II, GG, HH, GG, GG, II, II, JJ, HH, HH, JJ, HH, GG, HH, JJ, WD, WD, HH, HH, HH, JJ, WD, HH, JJ, HH, II, GG, HH, GG, JJ, JJ, GG, HH, JJ, JJ, JJ, HH, EE, II, HH, II, HH, II, II, GG, HH, II, II, II, II, II, JJ, GG, HH, II, JJ, GG, II, HH, JJ, JJ, II, GG, II, JJ, II, HH, JJ, JJ, GG, JJ, JJ, II, GG, GG, HH, HH, JJ, JJ, JJ, JJ, II, II, II, JJ, II, JJ, JJ, HH, HH, JJ, II, WD, AA, GG]);
baseGameReels2.get(GameRTPLevel.RTP_95).set(6, [BB, DD, DD, CC, DD, AA, DD, DD, AA, BB, DD, BB, AA, DD, CC, CC, DD, DD, CC, DD, DD, BB, DD, DD, DD, CC, CC, BB, BB, DD, DD, AA, CC, DD, JJ, AA, CC, AA, CC, AA, BB, DD, DD, AA, AA, BB, CC, CC, AA, AA, CC, DD, DD, CC, CC, CC, DD, BB, DD, BB, DD, DD, BB, DD, CC, DD, CC, HH, DD, DD, BB, BB, BB, CC, GG, CC, AA, CC, AA, AA, AA, CC, CC, DD, DD, FF, BB, CC, CC, CC, AA, AA, AA, CC, DD, CC, CC, BB, BB, BB, DD, CC, BB, DD, CC, DD, BB, BB, CC, DD, DD, CC, CC, CC, BB, BB, BB, CC, DD, AA, DD, BB, CC, DD, BB, BB, CC, CC, BB, DD, CC, CC, DD, AA, BB, DD, DD, BB, DD, DD, BB, CC, BB, AA, DD, CC, AA, DD, CC, BB, AA, CC, DD, DD, DD, AA, CC, AA, AA, DD, AA, DD, DD, AA, DD, BB, CC, DD, BB, CC, DD, BB, BB, CC, DD, AA, DD, BB, CC, CC, CC, AA, CC, BB, BB, CC, EE, AA, BB, BB, AA, BB, DD, DD, AA, AA, CC, DD, DD, AA, AA, AA, CC, DD, BB, BB, CC, CC, BB, AA, BB, DD, II, AA, BB, DD, BB, DD, BB, AA, DD, CC, AA, BB, AA, AA, DD, CC, CC, CC, AA, DD, BB, BB, AA, DD, BB, CC, DD, AA, BB, DD, CC, DD, DD, AA, AA, CC, CC, DD, CC, CC, DD, BB, BB, AA, AA, BB, CC, DD, CC, CC, DD, DD, BB]);


function createReelRandomMap60(randomPools) {
  const reelRandomMap = {};
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  reelRandomMap[5] = randomPools.reel6_at_0_62;
  return reelRandomMap;
}

function createReelRandomMap70(randomPools) {
  const reelRandomMap = {};
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  reelRandomMap[5] = randomPools.reel6_at_0_62;
  return reelRandomMap;
}

function createReelRandomMap80(randomPools) {
  const reelRandomMap = {};
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  reelRandomMap[5] = randomPools.reel6_at_0_62;
  return reelRandomMap;
}

function createReelRandomMap90(randomPools) {
  const reelRandomMap = {};
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  reelRandomMap[5] = randomPools.reel6_at_0_62;
  return reelRandomMap;
}

function createReelRandomMap95(randomPools) {
  const reelRandomMap = {};
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  reelRandomMap[5] = randomPools.reel6_at_0_62;
  return reelRandomMap;
}

function createReelRandomMap(rtpLevel, randomPools) {
  switch (rtpLevel) {
    case 1:
      return createReelRandomMap60(randomPools);
    case 2:
      return createReelRandomMap70(randomPools);
    case 3:
      return createReelRandomMap80(randomPools);
    case 4:
      return createReelRandomMap90(randomPools);
    case 5:
      return createReelRandomMap95(randomPools);
    default:
      throw new Error(`RTP level ${rtpLevel} not recognized`);
  }
}

function createReelMap(rtpLevel) {
  
  switch (rtpLevel) {
    case 1:
      return baseGameReels2.get(GameRTPLevel.RTP_60);
    case 2:
      return baseGameReels2.get(GameRTPLevel.RTP_70);
    case 3:
      return baseGameReels2.get(GameRTPLevel.RTP_80)
    case 4:
      return baseGameReels2.get(GameRTPLevel.RTP_90)
    case 5:
      return baseGameReels2.get(GameRTPLevel.RTP_95)
    default:
      throw new Error(`RTP level ${rtpLevel} not recognized`);
  }
}


 
module.exports = {
  baseGameReels: baseGameReels2,
  createReelRandomMap,
  createReelMap
};