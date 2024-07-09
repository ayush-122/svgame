const { GameRTPLevel } = require("./GameRtpLevel");
const { WD, AA, BB, CC, DD, EE, FF, GG, HH, II, JJ, KK, SC} = require("./GameReelSymbol").GameReelSymbol.symbols;

const freeGameReels = new Map();

freeGameReels.set(GameRTPLevel.RTP_60, new Map());
freeGameReels.get(GameRTPLevel.RTP_60).set(1, []);
freeGameReels.get(GameRTPLevel.RTP_60).set(2, []);
freeGameReels.get(GameRTPLevel.RTP_60).set(3, []);
freeGameReels.get(GameRTPLevel.RTP_60).set(4, []);
freeGameReels.get(GameRTPLevel.RTP_60).set(5, []);

freeGameReels.set(GameRTPLevel.RTP_70, new Map());
freeGameReels.get(GameRTPLevel.RTP_70).set(1, []);
freeGameReels.get(GameRTPLevel.RTP_70).set(2, []);
freeGameReels.get(GameRTPLevel.RTP_70).set(3, []);
freeGameReels.get(GameRTPLevel.RTP_70).set(4, []);
freeGameReels.get(GameRTPLevel.RTP_70).set(5, []);

freeGameReels.set(GameRTPLevel.RTP_80, new Map());
freeGameReels.get(GameRTPLevel.RTP_80).set(1, []);
freeGameReels.get(GameRTPLevel.RTP_80).set(2, []);
freeGameReels.get(GameRTPLevel.RTP_80).set(3, []);
freeGameReels.get(GameRTPLevel.RTP_80).set(4, []);
freeGameReels.get(GameRTPLevel.RTP_80).set(5, []);

freeGameReels.set(GameRTPLevel.RTP_90, new Map());
freeGameReels.get(GameRTPLevel.RTP_90).set(1, []);
freeGameReels.get(GameRTPLevel.RTP_90).set(2, []);
freeGameReels.get(GameRTPLevel.RTP_90).set(3, []);
freeGameReels.get(GameRTPLevel.RTP_90).set(4, []);
freeGameReels.get(GameRTPLevel.RTP_90).set(5, []);

freeGameReels.set(GameRTPLevel.RTP_95, new Map());
freeGameReels.get(GameRTPLevel.RTP_95).set(1, [II, FF, EE, BB, KK, DD, FF, GG, HH, FF, FF, HH, II, BB, HH, FF, EE, EE, CC, II, II, JJ, KK, KK, CC, JJ, BB, FF, II, HH, CC, AA, II, GG, FF, GG, KK, DD, JJ, JJ, DD, HH, DD, KK, DD, KK, EE, BB, DD, BB, AA, CC, JJ, CC, II, BB, AA, HH, DD, HH, JJ, EE, KK, GG, CC, BB, EE, AA, DD, BB, FF, EE, KK, HH, EE, BB, AA, BB, FF, FF, FF, GG, II, JJ, CC, GG, DD, KK, II, BB, AA, BB, II, II, II, KK, KK, EE, CC, EE, CC, AA, AA, EE, KK, EE, AA, II, GG, HH, EE, HH, KK, JJ, EE, CC, HH, AA, JJ, EE, EE, GG, BB, EE, AA, CC, JJ, HH, BB, DD, GG, BB, KK, HH, DD, EE, FF, BB, EE, EE, JJ, JJ, HH, BB, HH, DD, EE, EE, EE, FF, AA, FF, FF, HH, FF, DD, II, DD, II, CC, EE, CC, DD, AA, HH, HH, JJ, AA, HH, II, GG, DD, DD, II, FF, BB, GG, FF, JJ, JJ, GG, EE, EE, AA, FF, BB, KK, DD, GG, JJ, JJ, II, GG, HH, BB, EE, II, AA, HH, FF, HH, KK, DD, DD, AA, KK, II, DD, AA, FF, FF, KK, KK, EE, KK, II, EE, CC, GG, HH, DD, II, CC, JJ, II, GG, JJ, HH, BB, AA, DD, JJ, JJ, DD, JJ, CC, DD, FF, HH, HH, AA, JJ, GG, DD, II, GG, GG, DD, FF, FF, BB, GG, AA, EE, KK, HH, CC, JJ, GG, FF, JJ, CC, KK, HH, AA, DD, FF, II, KK, CC, HH, AA, CC, HH, HH, CC, HH, EE, GG, DD, EE, GG, II, JJ, II, FF, HH, BB, GG, HH, GG, DD, AA, II, II, EE, JJ, KK, HH, DD, EE, GG, AA, HH, HH, DD, KK, AA, II, BB, EE, CC, AA, BB, BB, AA, GG, JJ, EE, GG, KK, BB, DD, JJ, AA, EE, FF, EE, CC, FF, FF, JJ, GG, EE, DD, EE, CC, GG, GG, AA, HH, CC, EE, FF, KK, EE, KK, AA, EE, BB, KK, BB, CC, II, AA, BB, II, KK, HH, GG, BB, II, FF, JJ, GG, DD, II, GG, HH, CC, II, GG, AA, JJ, JJ, GG, JJ, CC, CC, BB, II, GG, II, II, HH, FF, EE, EE, BB, JJ, HH, HH, HH, FF, JJ, AA, JJ, AA, GG, BB, DD, II, CC, BB, JJ, GG, BB, II, GG, CC, GG, II, FF, BB, DD, BB, HH, BB, KK, CC, AA, KK, FF, CC, FF, FF, JJ, CC, FF, BB, CC, DD, CC, II, AA, GG, CC, GG, FF, FF, II, AA, II, FF, DD, KK, DD, GG, DD, KK, BB, GG, EE, BB, AA, JJ, HH, EE, BB, AA, II, AA, GG, FF, DD, DD, JJ, DD, II, CC, DD, CC, HH, EE, JJ, II, DD, JJ, HH, KK, CC, AA, AA, DD, JJ, JJ, AA, EE, AA, EE, DD, FF, DD, EE, II, KK, GG, HH, II, GG, EE, II, BB, KK, JJ, GG, FF, AA, DD, JJ, GG, DD, HH, KK, II, HH, DD, BB, AA, CC, AA, II, CC, GG, CC, KK, FF, BB, II, AA, JJ, CC, KK, HH, FF, CC, CC, DD, HH, JJ, JJ, HH, AA, EE, EE, CC, JJ, DD, GG, II, FF, BB, AA, KK, HH, FF, HH, BB, FF, CC, EE, KK, KK, CC, JJ, KK, FF, JJ, KK, CC, GG, KK, HH, BB, EE, BB, BB, DD, CC, BB, GG, AA, KK, BB, AA, EE, KK, GG, FF, EE, HH, HH, GG, JJ, FF, BB, II, AA, DD, KK, II, CC, II, CC, GG, BB, DD, EE, DD, HH, CC, EE, KK, JJ, JJ, KK, AA, EE, DD, GG, JJ, GG, CC, II, AA, AA, BB, HH, HH, EE, JJ, II, AA, II, II, HH, KK, JJ, BB, AA, JJ, JJ, CC, CC, BB, CC, FF, FF, DD, CC, JJ, GG, BB, II, II, AA, GG, AA, BB, HH, BB, II, JJ, CC, BB, FF, HH, JJ, FF, KK, DD, GG, HH, KK, GG, AA, GG, II, KK, EE, BB, FF, CC, HH, CC, CC, II, DD, FF, II, CC, EE, BB, JJ, II, AA, KK, II, KK, KK, GG, HH, JJ, GG, II, KK, KK, CC, EE, GG, BB, DD, BB, FF, JJ, CC, GG, BB, II, II, EE, CC, AA, KK, DD, BB, BB, AA, CC, FF, FF, HH, AA, JJ, GG, GG, FF, HH, HH, CC, GG, FF, JJ, AA, FF, II, HH, BB, DD, FF, FF, AA, KK, HH, FF, HH, EE, HH, DD, BB, DD, CC, KK, CC, BB, HH, DD, EE, KK, DD, AA, BB, AA, KK, FF, KK, KK, JJ, CC, CC, II, DD, FF, GG, II, CC, DD, DD, AA, FF, FF, JJ, JJ, HH, DD, JJ, GG, II, BB, EE, EE, FF, AA, BB, AA, AA, KK, DD, JJ, AA, AA, II, BB, GG, BB, GG, FF, GG, FF, BB, DD, HH, KK, EE, BB, EE, BB, KK, CC, DD, HH, FF, EE, FF, BB, EE, DD, EE, HH, EE, JJ, BB, GG, DD, JJ, CC, JJ, JJ, FF, HH, HH, DD, EE, II, EE, CC, AA, BB, II, BB, EE, BB, JJ, FF, II, KK, JJ, DD, FF, AA, JJ, CC, II, GG, FF, HH, BB, JJ, AA, DD, CC, EE, CC, CC, HH, CC, AA, AA, CC, GG, CC, KK, II, CC, KK, AA, II, BB, FF, AA, CC, BB, EE, EE, DD, HH, AA, EE, KK, GG, BB, DD, EE, GG, BB, AA, HH, FF, KK, FF, AA, BB, DD, AA, AA, BB, AA, HH, FF, KK, KK, HH, BB, DD, EE, KK, KK, JJ, FF, GG, CC, KK, BB, EE, DD, DD, KK, JJ, CC, AA, CC, KK, DD, EE, FF, EE, GG, EE, JJ, FF, AA, II, JJ, GG, FF, AA, EE, GG, GG, KK, CC, DD, HH, CC, JJ, EE, AA, FF, BB, CC, GG, DD, HH, EE, EE, GG, BB, BB, CC, EE, KK, JJ, DD, DD, CC, AA, KK, II, BB, AA, FF, AA, GG, KK, BB, FF, CC, KK, HH, CC, JJ, KK, GG, II, II, CC, CC, GG, GG, DD, EE, GG, AA, II, FF, DD, KK, AA, JJ, KK, DD, II, JJ, EE, AA, HH, II, II, AA, II, DD, DD, GG, FF, HH]);
freeGameReels.get(GameRTPLevel.RTP_95).set(2, [HH, JJ, II, BB, AA, FF, BB, FF, KK, BB, DD, DD, AA, EE, DD, HH, JJ, GG, II, BB, GG, FF, EE, HH, GG, EE, EE, DD, GG, FF, AA, JJ, JJ, GG, BB, GG, CC, KK, GG, II, HH, II, JJ, KK, AA, AA, II, KK, II, JJ, GG, KK, FF, II, AA, CC, BB, II, FF, AA, JJ, HH, AA, HH, CC, II, EE, FF, AA, KK, AA, GG, GG, FF, JJ, GG, HH, CC, CC, KK, HH, EE, BB, DD, GG, HH, EE, EE, HH, KK, KK, EE, II, EE, FF, AA, HH, AA, II, AA, FF, BB, CC, GG, EE, JJ, JJ, GG, GG, KK, BB, CC, CC, JJ, BB, GG, HH, BB, DD, JJ, GG, JJ, JJ, HH, AA, GG, KK, DD, AA, DD, KK, KK, GG, JJ, JJ, FF, AA, HH, CC, JJ, CC, FF, AA, CC, CC, GG, GG, HH, EE, DD, II, KK, FF, CC, BB, HH, DD, DD, EE, KK, HH, BB, DD, GG, GG, KK, FF, BB, AA, FF, FF, DD, HH, JJ, FF, EE, CC, GG, JJ, DD, EE, KK, AA, HH, EE, JJ, FF, DD, DD, BB, HH, GG, II, FF, EE, BB, CC, JJ, GG, KK, GG, GG, II, DD, CC, DD, KK, EE, AA, KK, DD, KK, HH, KK, CC, KK, GG, DD, AA, CC, II, CC, DD, CC, HH, EE, HH, BB, HH, BB, JJ, GG, AA, DD, EE, FF, CC, KK, HH, BB, EE, HH, II, EE, GG, BB, DD, JJ, EE, JJ, II, FF, AA, AA, AA, DD, CC, AA, GG, CC, EE, JJ, DD, BB, II, CC, HH, JJ, JJ, GG, II, II, KK, FF, EE, BB, GG, KK, II, FF, EE, HH, II, AA, II, BB, CC, HH, EE, CC, DD, II, II, GG, EE, AA, KK, AA, DD, EE, JJ, KK, GG, AA, AA, DD, FF, AA, EE, FF, AA, HH, EE, HH, KK, EE, BB, CC, HH, FF, BB, CC, KK, HH, AA, KK, KK, HH, II, KK, KK, GG, II, HH, CC, FF, II, EE, AA, KK, AA, HH, EE, AA, FF, FF, GG, II, AA, II, DD, JJ, DD, II, KK, AA, BB, DD, BB, EE, II, BB, HH, II, DD, HH, HH, CC, HH, GG, AA, BB, GG, KK, AA, JJ, HH, EE, EE, JJ, BB, II, DD, BB, BB, II, CC, EE, GG, CC, GG, FF, GG, II, FF, EE, FF, EE, DD, FF, AA, DD, CC, DD, DD, KK, BB, KK, CC, DD, FF, CC, AA, KK, KK, KK, AA, EE, FF, JJ, DD, JJ, II, JJ, EE, AA, AA, KK, GG, FF, JJ, CC, FF, CC, FF, AA, BB, BB, CC, DD, AA, EE, HH, JJ, EE, EE, CC, DD, BB, BB, BB, EE, FF, BB, JJ, BB, GG, CC, II, HH, CC, GG, II, JJ, HH, AA, KK, DD, JJ, GG, CC, DD, EE, CC, HH, EE, BB, EE, HH, KK, KK, EE, FF, KK, HH, AA, CC, JJ, FF, AA, CC, FF, CC, EE, GG, CC, EE, DD, KK, II, KK, BB, BB, DD, BB, BB, JJ, GG, GG, KK, JJ, HH, KK, DD, II, BB, CC, II, II, GG, CC, HH, AA, JJ, II, JJ, DD, BB, HH, AA, BB, II, EE, JJ, II, EE, II, FF, JJ, AA, II, CC, II, HH, GG, EE, DD, EE, AA, DD, JJ, FF, DD, GG, DD, KK, KK, KK, DD, II, EE, DD, AA, DD, FF, FF, AA, HH, JJ, AA, GG, CC, AA, FF, AA, DD, JJ, FF, HH, HH, JJ, JJ, BB, KK, JJ, JJ, JJ, CC, FF, BB, DD, FF, BB, FF, FF, BB, EE, II, GG, HH, II, JJ, DD, KK, DD, GG, GG, KK, GG, CC, CC, HH, HH, DD, CC, KK, BB, JJ, JJ, HH, KK, HH, FF, GG, EE, KK, FF, II, BB, II, EE, KK, AA, DD, CC, DD, BB, FF, CC, GG, EE, FF, AA, II, KK, FF, II, KK, GG, BB, KK, KK, JJ, GG, FF, GG, EE, AA, EE, EE, DD, CC, II, BB, KK, II, EE, DD, AA, DD, II, EE, AA, DD, AA, HH, FF, HH, BB, EE, EE, HH, JJ, KK, CC, DD, II, GG, EE, HH, BB, FF, FF, DD, HH, DD, KK, JJ, BB, GG, II, EE, CC, II, CC, HH, BB, FF, KK, FF, KK, KK, AA, FF, AA, GG, DD, CC, BB, JJ, CC, FF, CC, II, HH, BB, BB, AA, DD, FF, JJ, BB, FF, DD, CC, CC, HH, FF, CC, HH, AA, CC, FF, BB, FF, CC, CC, JJ, DD, BB, BB, BB, BB, BB, GG, BB, II, GG, EE, DD, JJ, CC, EE, JJ, GG, II, CC, GG, FF, BB, BB, HH, GG, EE, JJ, FF, AA, CC, FF, AA, EE, AA, JJ, FF, HH, CC, FF, BB, GG, II, DD, FF, JJ, FF, BB, II, DD, KK, EE, EE, JJ, KK, GG, DD, II, EE, EE, KK, KK, JJ, FF, AA, HH, KK, II, JJ, AA, BB, EE, DD, FF, HH, CC, AA, EE, BB, DD, GG, GG, CC, CC, HH, FF, KK, II, BB, CC, AA, BB, GG, GG, FF, DD, II, CC, AA, II, II, KK, FF, DD, II, HH, CC, CC, HH, GG, CC, BB, DD, JJ, JJ, II, AA, AA, FF, EE, II, KK, BB, FF, HH, KK, II, EE, DD, BB, II, FF, AA, JJ, HH, AA, AA, EE, JJ, HH, BB, HH, EE, JJ, GG, II, JJ, II, KK, II, HH, BB, CC, DD, JJ, DD, FF, HH, EE, II, BB, JJ, HH, EE, GG, JJ, DD, DD, HH, HH, AA, CC, CC, DD, KK, GG, DD, II, KK, EE, EE, HH, JJ, KK, AA, CC, KK, FF, CC, BB, JJ, KK, FF, AA, GG, AA, BB, HH, II, AA, II, GG, CC, II, DD, AA, CC, BB, BB, II, GG, JJ, BB, BB, GG, GG, KK, JJ, AA, HH, AA, JJ, GG, AA, FF, EE, CC, KK, HH, AA, EE, BB, II, DD, JJ, BB, GG, DD, GG, FF, GG, AA, CC, HH, FF, II, EE, BB, HH, EE, DD, CC, CC, HH, BB, DD, FF, EE, II, AA, FF, CC, JJ, EE, FF, JJ, AA, DD, DD, KK, BB, GG, GG, FF, CC, CC, II, CC, HH, BB, AA, II, AA, CC, JJ, AA, JJ, EE, EE, DD, BB, KK, JJ, AA, GG, HH, GG, DD]);
freeGameReels.get(GameRTPLevel.RTP_95).set(3, [AA, FF, FF, DD, GG, GG, BB, CC, HH, FF, JJ, II, II, KK, II, EE, FF, FF, HH, KK, AA, GG, EE, KK, JJ, AA, II, KK, II, AA, JJ, II, BB, CC, CC, CC, KK, FF, DD, DD, FF, BB, JJ, DD, BB, FF, CC, JJ, CC, DD, KK, AA, FF, HH, CC, CC, EE, EE, DD, CC, II, DD, KK, FF, AA, EE, KK, FF, BB, GG, HH, CC, GG, DD, DD, AA, BB, II, DD, BB, BB, AA, EE, II, AA, BB, EE, DD, II, CC, AA, HH, FF, CC, DD, GG, EE, DD, BB, AA, CC, BB, AA, GG, CC, GG, CC, BB, HH, GG, FF, JJ, DD, DD, DD, GG, AA, JJ, AA, BB, GG, CC, II, CC, BB, CC, FF, GG, GG, AA, HH, HH, HH, JJ, JJ, EE, CC, DD, AA, KK, GG, KK, DD, II, KK, JJ, AA, DD, EE, JJ, CC, AA, KK, DD, EE, DD, CC, II, EE, DD, KK, EE, DD, CC, KK, EE, CC, JJ, BB, EE, EE, BB, HH, BB, FF, GG, II, DD, FF, BB, AA, BB, BB, BB, FF, GG, KK, HH, AA, HH, DD, II, JJ, AA, EE, CC, BB, GG, DD, EE, GG, EE, GG, BB, EE, HH, JJ, GG, CC, KK, EE, JJ, AA, CC, HH, KK, CC, BB, AA, DD, JJ, EE, CC, AA, II, HH, KK, II, GG, BB, KK, JJ, HH, FF, BB, KK, CC, JJ, AA, DD, HH, EE, BB, DD, AA, CC, FF, DD, EE, BB, KK, KK, FF, AA, BB, JJ, JJ, HH, GG, II, FF, DD, AA, FF, GG, BB, EE, EE, JJ, KK, II, GG, CC, EE, DD, JJ, HH, II, HH, HH, AA, CC, JJ, AA, HH, AA, DD, GG, CC, FF, GG, CC, HH, FF, EE, JJ, HH, KK, FF, JJ, DD, AA, AA, CC, HH, JJ, II, BB, JJ, KK, GG, DD, AA, EE, II, BB, CC, HH, AA, AA, GG, II, HH, HH, II, KK, FF, EE, EE, GG, GG, DD, HH, II, DD, BB, FF, DD, HH, GG, GG, JJ, KK, DD, AA, II, GG, KK, KK, II, AA, KK, HH, AA, KK, FF, II, GG, DD, EE, DD, GG, BB, EE, GG, AA, DD, BB, II, FF, II, II, GG, BB, KK, BB, KK, II, GG, JJ, GG, KK, HH, II, II, KK, FF, FF, GG, II, FF, FF, HH, CC, BB, BB, GG, JJ, CC, BB, DD, KK, JJ, HH, KK, HH, HH, GG, AA, GG, EE, CC, DD, CC, II, BB, GG, JJ, JJ, HH, CC, II, JJ, II, AA, BB, HH, GG, EE, EE, KK, BB, GG, EE, KK, HH, FF, AA, AA, BB, AA, KK, EE, AA, JJ, BB, BB, EE, HH, II, GG, BB, II, AA, KK, FF, DD, FF, JJ, BB, II, KK, BB, II, DD, GG, BB, GG, FF, BB, FF, FF, GG, JJ, AA, BB, FF, JJ, BB, HH, JJ, BB, AA, HH, GG, EE, GG, FF, EE, FF, BB, HH, AA, EE, KK, DD, FF, GG, DD, EE, GG, AA, DD, DD, EE, JJ, II, JJ, BB, DD, HH, KK, AA, JJ, DD, JJ, AA, II, EE, EE, BB, EE, DD, II, FF, JJ, DD, II, BB, HH, II, BB, CC, DD, BB, KK, EE, JJ, FF, FF, KK, BB, HH, EE, BB, II, HH, EE, HH, FF, HH, FF, AA, GG, GG, II, AA, EE, KK, FF, FF, II, JJ, KK, HH, II, GG, CC, KK, CC, CC, DD, EE, GG, KK, BB, AA, FF, II, FF, BB, GG, AA, DD, CC, KK, AA, CC, HH, EE, BB, FF, CC, GG, AA, II, FF, HH, FF, AA, CC, II, DD, II, DD, CC, KK, DD, KK, BB, HH, KK, DD, DD, KK, DD, CC, FF, FF, II, AA, HH, EE, AA, JJ, JJ, AA, II, DD, CC, EE, AA, AA, DD, GG, GG, BB, JJ, JJ, JJ, AA, II, II, JJ, II, CC, CC, DD, II, GG, JJ, AA, II, KK, KK, KK, CC, JJ, DD, JJ, EE, EE, AA, GG, EE, HH, FF, CC, BB, AA, CC, CC, DD, II, FF, GG, AA, FF, CC, HH, II, II, II, JJ, EE, EE, EE, KK, FF, FF, GG, JJ, BB, BB, FF, DD, HH, JJ, JJ, GG, CC, BB, CC, DD, FF, EE, CC, KK, FF, CC, JJ, FF, II, II, BB, KK, BB, GG, EE, HH, DD, FF, DD, EE, KK, II, DD, KK, CC, HH, BB, JJ, KK, HH, EE, AA, II, KK, CC, EE, HH, CC, CC, JJ, KK, GG, BB, II, EE, HH, FF, CC, DD, KK, FF, EE, CC, JJ, CC, II, FF, EE, EE, II, AA, FF, GG, BB, HH, HH, II, EE, DD, II, AA, JJ, BB, KK, DD, JJ, DD, BB, HH, HH, AA, EE, FF, FF, BB, II, HH, AA, BB, HH, FF, EE, HH, HH, AA, CC, II, BB, FF, CC, GG, GG, KK, KK, II, GG, BB, EE, JJ, CC, HH, AA, BB, DD, HH, KK, FF, EE, BB, KK, AA, KK, AA, KK, AA, AA, II, CC, BB, DD, JJ, AA, EE, CC, BB, KK, AA, CC, KK, CC, CC, DD, EE, DD, II, JJ, GG, AA, DD, HH, JJ, HH, BB, JJ, II, JJ, CC, KK, FF, JJ, FF, GG, FF, HH, CC, JJ, BB, JJ, JJ, CC, EE, DD, CC, CC, HH, FF, FF, EE, EE, HH, II, KK, CC, DD, GG, HH, GG, EE, AA, BB, GG, GG, EE, AA, FF, AA, GG, HH, AA, HH, KK, JJ, II, BB, CC, CC, DD, EE, AA, GG, EE, FF, HH, CC, KK, EE, GG, GG, GG, BB, AA, JJ, AA, EE, GG, CC, JJ, II, DD, HH, EE, HH, II, CC, BB, GG, KK, JJ, BB, FF, FF, DD, JJ, FF, HH, EE, BB, AA, EE, AA, CC, HH, KK, FF, FF, JJ, DD, DD, BB, FF, II, GG, DD, AA, AA, JJ, FF, BB, CC, DD, AA, II, AA, EE, GG, JJ, DD, BB, EE, HH, II, JJ, HH, EE, JJ, FF, KK, JJ, HH, DD, EE, CC, GG, II, GG, DD, KK, CC, GG, II, EE, FF, II, JJ, HH, JJ, FF, KK, BB, JJ, GG, CC, AA, DD, FF, FF, AA, CC, CC, JJ, II, CC, BB, CC, EE, HH, AA, DD, HH, KK, GG, KK, JJ, GG, DD, EE, KK, HH, KK, KK, HH]);
freeGameReels.get(GameRTPLevel.RTP_95).set(4, [II, BB, GG, HH, HH, BB, EE, DD, BB, CC, FF, FF, BB, KK, GG, EE, EE, CC, BB, CC, DD, JJ, KK, GG, HH, DD, CC, II, JJ, KK, II, CC, HH, HH, HH, AA, AA, II, CC, HH, JJ, II, AA, DD, FF, DD, BB, HH, BB, KK, II, JJ, FF, CC, KK, BB, GG, II, KK, II, GG, FF, CC, HH, AA, DD, GG, GG, BB, AA, DD, HH, EE, BB, BB, II, FF, BB, DD, BB, KK, CC, HH, FF, DD, KK, BB, EE, AA, II, KK, HH, CC, AA, BB, HH, HH, CC, BB, JJ, KK, FF, JJ, AA, AA, JJ, II, HH, JJ, DD, GG, BB, JJ, AA, KK, AA, FF, II, AA, II, CC, CC, EE, JJ, KK, KK, EE, HH, EE, JJ, GG, JJ, CC, KK, FF, EE, GG, AA, DD, JJ, DD, II, EE, JJ, EE, DD, HH, FF, JJ, JJ, BB, BB, CC, FF, FF, HH, CC, CC, AA, II, KK, CC, JJ, EE, BB, BB, II, FF, II, AA, AA, HH, EE, BB, AA, AA, KK, GG, DD, FF, DD, II, CC, HH, CC, II, AA, JJ, DD, FF, KK, EE, KK, GG, BB, FF, AA, HH, JJ, HH, EE, HH, BB, CC, AA, KK, HH, BB, EE, FF, FF, DD, AA, II, GG, FF, JJ, HH, GG, JJ, EE, CC, KK, KK, DD, BB, AA, BB, EE, EE, HH, FF, JJ, EE, KK, KK, JJ, FF, II, II, KK, GG, GG, EE, CC, BB, GG, II, EE, KK, CC, CC, II, AA, HH, II, JJ, JJ, DD, EE, HH, AA, DD, KK, CC, CC, CC, DD, II, II, GG, GG, BB, FF, EE, II, GG, II, HH, CC, HH, FF, KK, DD, AA, BB, BB, FF, JJ, FF, EE, II, BB, HH, KK, GG, JJ, EE, FF, DD, II, BB, EE, AA, EE, KK, CC, AA, BB, KK, JJ, BB, AA, BB, II, DD, DD, FF, GG, KK, AA, BB, KK, KK, EE, II, AA, JJ, AA, CC, BB, II, CC, HH, HH, II, AA, AA, DD, AA, CC, DD, GG, AA, HH, CC, CC, FF, AA, AA, CC, CC, FF, CC, JJ, GG, KK, HH, AA, HH, II, KK, KK, EE, II, GG, CC, EE, DD, JJ, EE, HH, FF, CC, II, II, GG, JJ, AA, BB, JJ, AA, EE, DD, KK, II, GG, BB, KK, AA, II, AA, AA, II, AA, JJ, AA, CC, FF, JJ, FF, GG, CC, AA, JJ, EE, AA, AA, HH, AA, CC, FF, CC, HH, HH, AA, FF, HH, JJ, JJ, EE, BB, GG, II, II, FF, EE, EE, JJ, JJ, II, AA, BB, EE, BB, GG, KK, GG, GG, GG, BB, BB, FF, BB, CC, BB, HH, DD, HH, BB, GG, CC, KK, GG, DD, FF, GG, EE, FF, FF, EE, KK, EE, II, AA, FF, GG, JJ, HH, DD, EE, DD, DD, DD, JJ, AA, II, CC, GG, EE, KK, II, CC, HH, HH, AA, GG, DD, GG, DD, BB, HH, CC, DD, CC, CC, EE, II, DD, CC, HH, BB, HH, KK, KK, AA, DD, KK, EE, CC, AA, II, II, DD, HH, EE, BB, GG, EE, BB, AA, GG, CC, AA, EE, KK, II, GG, II, GG, EE, FF, DD, BB, GG, BB, EE, DD, JJ, II, HH, DD, BB, KK, DD, EE, JJ, HH, FF, JJ, FF, FF, BB, FF, II, FF, II, DD, JJ, CC, BB, GG, BB, AA, AA, HH, KK, GG, DD, KK, JJ, EE, II, GG, BB, KK, HH, HH, FF, II, KK, DD, JJ, JJ, GG, AA, KK, KK, EE, CC, KK, DD, KK, JJ, GG, JJ, EE, FF, JJ, EE, AA, DD, DD, EE, AA, JJ, CC, JJ, FF, JJ, BB, KK, FF, DD, JJ, FF, II, AA, EE, KK, JJ, BB, HH, HH, GG, II, FF, KK, JJ, DD, DD, II, GG, EE, FF, AA, JJ, CC, GG, DD, HH, AA, BB, BB, CC, DD, CC, BB, II, DD, HH, DD, AA, FF, FF, EE, KK, EE, FF, II, GG, KK, GG, GG, EE, GG, JJ, JJ, CC, AA, BB, BB, JJ, GG, II, EE, GG, AA, GG, FF, GG, FF, CC, BB, CC, JJ, GG, GG, JJ, AA, II, FF, BB, JJ, AA, BB, HH, FF, CC, KK, BB, DD, FF, GG, CC, II, GG, KK, FF, BB, II, GG, EE, II, EE, DD, CC, JJ, GG, DD, CC, HH, BB, GG, JJ, HH, JJ, EE, II, JJ, II, AA, II, II, FF, GG, EE, EE, KK, BB, HH, AA, JJ, EE, AA, II, AA, BB, DD, DD, JJ, BB, DD, CC, CC, KK, DD, CC, FF, BB, GG, BB, FF, HH, EE, FF, EE, CC, HH, KK, HH, EE, DD, EE, BB, BB, HH, JJ, KK, HH, EE, BB, II, JJ, KK, CC, II, EE, EE, HH, KK, CC, II, FF, KK, FF, DD, DD, EE, EE, FF, CC, DD, GG, JJ, FF, CC, HH, HH, GG, KK, JJ, HH, FF, AA, GG, HH, GG, JJ, GG, EE, KK, BB, BB, HH, FF, GG, KK, DD, HH, AA, EE, FF, AA, HH, DD, BB, CC, EE, II, EE, DD, HH, EE, DD, GG, GG, AA, DD, BB, FF, HH, HH, AA, HH, KK, CC, EE, JJ, KK, KK, HH, EE, GG, CC, II, II, CC, KK, DD, DD, FF, CC, FF, DD, HH, CC, KK, II, EE, AA, II, BB, DD, CC, KK, KK, JJ, GG, HH, CC, II, DD, JJ, AA, CC, BB, EE, FF, AA, FF, AA, CC, JJ, KK, AA, CC, AA, FF, HH, AA, DD, BB, FF, BB, BB, AA, DD, GG, DD, HH, JJ, CC, GG, FF, HH, KK, DD, JJ, BB, GG, DD, KK, AA, CC, DD, AA, BB, CC, JJ, DD, GG, DD, JJ, KK, GG, DD, AA, CC, II, KK, DD, JJ, EE, II, AA, CC, GG, CC, CC, CC, EE, II, AA, FF, GG, JJ, JJ, AA, CC, EE, DD, HH, BB, BB, EE, GG, EE, II, FF, KK, DD, DD, BB, AA, II, KK, FF, GG, JJ, FF, BB, GG, KK, BB, II, FF, FF, FF, AA, II, JJ, FF, HH, JJ, BB, KK, AA, BB, GG, CC, EE, DD, HH, CC, KK, FF, DD, EE, BB, II, II, EE, CC, HH, GG, EE, DD, HH, II, FF, HH, GG, FF, DD, AA, JJ, FF, AA, KK, HH, FF, EE, GG, DD]);
freeGameReels.get(GameRTPLevel.RTP_95).set(5, [GG, AA, HH, CC, BB, II, AA, KK, GG, GG, DD, JJ, FF, HH, HH, JJ, HH, KK, HH, KK, HH, JJ, CC, II, AA, DD, BB, BB, JJ, DD, EE, JJ, CC, HH, DD, EE, KK, JJ, GG, CC, HH, CC, BB, FF, EE, II, BB, EE, BB, JJ, KK, BB, FF, II, BB, FF, KK, KK, DD, JJ, GG, EE, DD, HH, EE, HH, DD, BB, II, AA, DD, HH, EE, EE, CC, BB, GG, AA, FF, DD, BB, CC, DD, BB, HH, FF, DD, FF, KK, II, KK, FF, JJ, GG, AA, BB, JJ, AA, BB, AA, BB, FF, HH, JJ, BB, KK, BB, EE, DD, CC, KK, GG, CC, JJ, CC, GG, BB, II, BB, JJ, FF, HH, CC, FF, CC, II, BB, HH, GG, EE, KK, BB, HH, FF, CC, JJ, KK, FF, DD, FF, FF, AA, JJ, BB, II, FF, DD, AA, HH, CC, AA, JJ, CC, EE, GG, II, HH, GG, JJ, HH, BB, II, II, HH, FF, II, KK, DD, EE, EE, FF, AA, II, II, FF, CC, KK, EE, FF, DD, DD, AA, GG, JJ, EE, GG, BB, HH, CC, AA, EE, HH, HH, AA, CC, HH, JJ, GG, CC, GG, KK, HH, FF, AA, BB, FF, AA, GG, DD, EE, FF, HH, KK, II, DD, JJ, KK, EE, FF, DD, DD, JJ, EE, JJ, GG, II, II, FF, EE, EE, KK, EE, DD, KK, JJ, EE, HH, CC, CC, KK, EE, AA, GG, KK, AA, EE, AA, FF, BB, BB, II, BB, GG, BB, FF, DD, JJ, DD, BB, BB, GG, KK, EE, BB, KK, FF, KK, JJ, FF, CC, CC, HH, DD, HH, CC, DD, CC, CC, CC, FF, BB, AA, EE, EE, GG, FF, DD, JJ, CC, HH, KK, FF, DD, AA, JJ, DD, CC, II, BB, II, DD, GG, II, BB, BB, AA, DD, FF, HH, FF, AA, HH, JJ, FF, BB, FF, KK, II, BB, JJ, JJ, JJ, JJ, II, JJ, BB, KK, EE, II, EE, CC, EE, EE, II, DD, JJ, HH, II, GG, FF, CC, DD, CC, AA, II, EE, FF, KK, JJ, GG, BB, GG, GG, HH, HH, BB, AA, FF, CC, JJ, II, BB, GG, JJ, DD, FF, HH, FF, AA, FF, GG, KK, II, KK, II, JJ, EE, CC, HH, BB, EE, BB, CC, EE, DD, BB, AA, AA, AA, EE, CC, HH, CC, HH, DD, DD, HH, GG, BB, EE, KK, GG, II, KK, GG, EE, AA, CC, GG, CC, HH, AA, KK, II, JJ, AA, BB, FF, CC, DD, GG, CC, CC, CC, GG, GG, CC, BB, KK, GG, JJ, BB, AA, HH, BB, KK, EE, KK, FF, EE, HH, GG, DD, FF, KK, AA, AA, BB, DD, HH, EE, DD, BB, GG, FF, II, AA, JJ, GG, AA, BB, DD, HH, CC, JJ, CC, AA, BB, HH, HH, AA, GG, BB, BB, EE, HH, CC, GG, GG, BB, BB, FF, II, AA, KK, KK, CC, CC, FF, DD, CC, AA, HH, JJ, HH, CC, CC, FF, GG, EE, GG, AA, HH, BB, AA, EE, DD, KK, EE, BB, FF, FF, AA, GG, KK, AA, JJ, II, GG, HH, GG, CC, BB, HH, II, DD, EE, EE, AA, AA, BB, AA, AA, JJ, GG, BB, DD, II, GG, JJ, FF, EE, FF, GG, FF, EE, CC, EE, JJ, EE, KK, AA, II, JJ, KK, GG, DD, JJ, KK, HH, FF, DD, GG, KK, BB, CC, AA, HH, GG, EE, KK, CC, II, CC, GG, EE, DD, EE, AA, DD, DD, JJ, KK, JJ, FF, JJ, EE, BB, KK, II, AA, HH, BB, HH, AA, II, EE, CC, EE, II, GG, KK, FF, JJ, DD, DD, BB, DD, DD, II, AA, EE, JJ, GG, JJ, AA, EE, II, JJ, HH, II, CC, BB, HH, AA, FF, FF, AA, AA, II, GG, KK, JJ, FF, JJ, JJ, HH, DD, JJ, FF, AA, HH, GG, CC, CC, FF, BB, DD, FF, AA, II, FF, EE, GG, EE, FF, DD, BB, BB, CC, II, FF, FF, EE, EE, JJ, JJ, CC, AA, GG, II, CC, BB, BB, GG, EE, FF, JJ, AA, II, JJ, CC, GG, HH, GG, EE, BB, II, FF, DD, II, JJ, II, CC, II, FF, FF, GG, KK, EE, DD, AA, HH, HH, KK, KK, CC, GG, KK, BB, DD, DD, II, GG, EE, KK, JJ, JJ, DD, II, JJ, DD, FF, EE, II, II, DD, CC, AA, JJ, AA, KK, II, HH, GG, GG, II, AA, EE, II, DD, GG, CC, KK, CC, DD, CC, KK, EE, DD, EE, KK, FF, CC, DD, AA, CC, JJ, II, BB, FF, FF, JJ, FF, JJ, AA, KK, BB, HH, JJ, JJ, HH, HH, AA, KK, JJ, JJ, BB, CC, HH, AA, II, CC, GG, FF, HH, AA, HH, EE, II, CC, BB, FF, AA, KK, HH, KK, FF, AA, JJ, KK, II, HH, BB, KK, BB, EE, CC, II, AA, AA, CC, JJ, II, KK, HH, GG, II, HH, JJ, BB, FF, CC, II, KK, HH, AA, KK, HH, JJ, KK, AA, GG, EE, GG, CC, BB, HH, FF, EE, DD, AA, HH, CC, CC, FF, FF, EE, KK, BB, CC, KK, II, BB, BB, AA, DD, DD, EE, II, FF, EE, GG, KK, AA, FF, GG, DD, AA, DD, EE, EE, GG, AA, AA, CC, CC, AA, BB, GG, FF, HH, DD, EE, DD, GG, GG, DD, BB, DD, DD, KK, EE, HH, II, II, FF, JJ, BB, HH, AA, EE, KK, BB, BB, JJ, AA, DD, KK, HH, EE, KK, EE, AA, HH, DD, KK, AA, GG, GG, JJ, HH, CC, CC, CC, BB, KK, JJ, GG, KK, FF, FF, FF, DD, II, AA, JJ, JJ, BB, II, JJ, DD, GG, JJ, II, II, HH, II, II, DD, BB, FF, KK, HH, DD, DD, EE, KK, CC, GG, CC, JJ, BB, AA, CC, FF, KK, II, AA, II, GG, AA, II, DD, KK, EE, II, CC, GG, BB, AA, KK, II, HH, HH, AA, AA, GG, GG, CC, AA, II, DD, EE, DD, EE, II, GG, DD, DD, II, GG, JJ, KK, FF, BB, II, DD, FF, CC, HH, EE, DD, EE, GG, AA, CC, II, HH, DD, EE, II, II, AA, CC, FF, EE, KK, HH, KK, HH, DD, BB, DD, DD, KK, GG, CC, EE, BB, JJ, GG, EE, KK, CC]);

// Generic Random Reel Map function
function createFreeReelRandomMap(rtpLevel, randomPools) {
  switch (rtpLevel) {
    case 1:
      return createFreeReelRandomMap60(randomPools);
    case 2:
      return createFreeReelRandomMap70(randomPools);
    case 3:
      return createFreeReelRandomMap80(randomPools);
    case 4:
      return createFreeReelRandomMap90(randomPools);
    case 5:
      return createFreeReelRandomMap95(randomPools);
    default:
      throw new Error(`RTP level ${rtpLevel} not recognized`);
  }
}

function createReelMap(rtpLevel) {
  switch (rtpLevel) {
    case 1:
      return freeGameReels.get(GameRTPLevel.RTP_60);
    case 2:
      return freeGameReels.get(GameRTPLevel.RTP_70);
    case 3:
      return freeGameReels.get(GameRTPLevel.RTP_80);
    case 4:
      return freeGameReels.get(GameRTPLevel.RTP_90);
    case 5:
      return freeGameReels.get(GameRTPLevel.RTP_95);
    default:
      throw new Error(`RTP level ${rtpLevel} not recognized`);
  }
}

function createFreeReelRandomMap60(randomPools) {
  const reelRandomMap = new Map();
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createFreeReelRandomMap70(randomPools) {
  const reelRandomMap = new Map();
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createFreeReelRandomMap80(randomPools) {
  const reelRandomMap = new Map();
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createFreeReelRandomMap90(randomPools) {
  const reelRandomMap = new Map();
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

function createFreeReelRandomMap95(randomPools) {
  const reelRandomMap = new Map();
  reelRandomMap[0] = randomPools.reel1_at_0_62;
  reelRandomMap[1] = randomPools.reel2_at_0_62;
  reelRandomMap[2] = randomPools.reel3_at_0_62;
  reelRandomMap[3] = randomPools.reel4_at_0_62;
  reelRandomMap[4] = randomPools.reel5_at_0_62;
  return reelRandomMap;
}

module.exports = {
  freeGameReels,
  createFreeReelRandomMap,
  createReelMap,
};
