const { SC, WD, AA, BB } = require("./GameReelSymbol").GameReelSymbol.symbols;
const GameStateConfig = require("../../../../../../config/common/GameStateConfig");

const                 GAME_ID                                     =                                                 1015;
const                 GAME_NAME                                   =                                                 "Infective Wild";
const                 GAME_DESC                                   =                                                 "Infective Wild";
const                 BASE_CREDITS_BET                            =                                                 50;
const                 BUY_FEATURE_BET                             =                                                 2000;
const                 MIN_MULTIPLIER                              =                                                 1;
const                 MAX_MULTIPLIER                              =                                                 1;
const                 DISPLAY_HEIGHT                              =                                                 5;
const                 NUM_REELS                                   =                                                 5;
const                 NUM_SCATTER_FG_TRIGGER                      =                                                 3;
const                 NUM_LINES                                   =                                                 50;
const                 BASE_FEAT_WEIGHT                            =                                                 14;
const                 FREE_FEAT_WEIGHT                            =                                                 8;
const                 SCATTER_SYMBOL                              =                                                 SC;
const                 WILD_SYMBOL                                 =                                                 WD;
const                 INFECTED_SYMBOLS                            =                                                 [AA, BB];
const                 SPIN_REQUEST                                =                                                 GameStateConfig.BASE_GAME_REQUEST; //"BASE"
const                 FREE_GAME_REQUEST                           =                                                 GameStateConfig.FREE_GAME_REQUEST; //"FREE"
const                 BUY_FEATURE_SPIN_REQUEST                    =                                                 GameStateConfig.BUY_FEATURE_BASE; //"BUYFEATURE"
const                 DONE_REQUEST                                =                                                 GameStateConfig.DONE_REQUEST; //"COMPLETED"
const                 BUY_FEATURE                                 =                                                 1000;
const                 RTP_LEVEL                                   =                                                 5;
const                 CREDITVALUE                                 =                                                 [0.1, 0.2, 0.5, 0.7, 1, 2, 3, 5, 8, 10, 15, 20];

module.exports = {
  GAME_ID,
  GAME_NAME,
  GAME_DESC,
  BASE_CREDITS_BET,
  MIN_MULTIPLIER,
  MAX_MULTIPLIER,
  DISPLAY_HEIGHT,
  NUM_REELS,
  NUM_SCATTER_FG_TRIGGER,
  NUM_LINES,
  BASE_FEAT_WEIGHT,
  FREE_FEAT_WEIGHT,
  SCATTER_SYMBOL,
  WILD_SYMBOL,
  INFECTED_SYMBOLS,
  SPIN_REQUEST,
  BUY_FEATURE_SPIN_REQUEST,
  BUY_FEATURE,
  RTP_LEVEL,
  CREDITVALUE,
  FREE_GAME_REQUEST,
  DONE_REQUEST,
  BUY_FEATURE_BET,
};
