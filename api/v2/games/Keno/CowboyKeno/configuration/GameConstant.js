// const {SC,WC,BO} = require("./GameReelSymbol").GameReelSymbol.symbols;

const           GAME_NAME                                        =                             "Cowboy Keno";
const       	GAME_DESC                                        =                             "Cowboy Keno"; 
const           BASE_CREDITS_BET                                 =                             2;
const           BUY_FEATURE_BET                                  =                             200;
const           MIN_MULTIPLIER                                   =                             1;
const           MAX_MULTIPLIER                                   =                             1;
const           SPIN_REQUEST                                     =                             "BASE";
const           WHEEL_BONUS_REQUEST                              =                             "WHEEL_BONUS";
const           FREE_GAME_REQUEST                                =                             "FREE";
const           EXTRA_DRAW                                       =                             "EXTRA_DRAW";
const           BONUS_MULTIPLIER                                 =                             "BONUS_MULTIPLIER";
const           DONE_REQUEST                                     =                             "COMPLETED";  
const           BUY_FEATURE                                      =                             100;  //exception
const           RTP_LEVEL                                        =                             5;
const           CREDITVALUE                                      =                             [1, 5, 10, 15, 20, 25, 50, 75, 100];
const           MAX_RANGE                                        =                             10;

module.exports = {
    GAME_NAME               ,
    GAME_DESC               ,
    BASE_CREDITS_BET        ,
    MIN_MULTIPLIER          ,
    MAX_MULTIPLIER          ,
    SPIN_REQUEST            ,
    WHEEL_BONUS_REQUEST     ,
    FREE_GAME_REQUEST       ,
    EXTRA_DRAW                  ,
    BONUS_MULTIPLIER        ,
    CREDITVALUE             ,
    DONE_REQUEST            ,
    BUY_FEATURE_BET         ,
    BUY_FEATURE             ,
    RTP_LEVEL               ,
    MAX_RANGE
};

 