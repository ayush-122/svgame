const {SC,WC} = require("./GameReelSymbol").GameReelSymbol.symbols;

const           GAME_NAME                                        =                             "StampedeFury";
const       	GAME_DESC                                        =                             "StampedeFury"; 
const           BASE_CREDITS_BET                                 =                             30;
const           BUY_FEATURE_BET                                  =                             200;
const           MIN_MULTIPLIER                                   =                             1;
const           MAX_MULTIPLIER                                   =                             1;
const           DISPLAY_HEIGHT                                   =                             3;
const           NUM_REELS                                        =                             5;
const           NUM_SCATTER_FG_TRIGGER                           =                             3;
const           NUM_LINES                                        =                             30;
const           SCATTER_SYMBOL   		                         =                             SC;
const           WILD_SYMBOL   			                         =                             WC;
const           SPIN_REQUEST                                     =                             "BASE";
const           FREE_GAME_REQUEST                                =                             "FREE";
const           BUY_FEATURE_SPIN_REQUEST                         =                             "BUYFEATURE"; //exception
const           DONE_REQUEST                                     =                             "COMPLETED";  
const           BUY_FEATURE                                      =                             100;  //exception
const           RtpLevel                                         =                             5;
const           CREDITVALUE                                      =                             [0.1, 0.2, 0.5, 0.7, 1, 2, 3, 5, 8, 10, 15, 20];

module.exports = {
    GAME_NAME               ,
    GAME_DESC               ,
    BASE_CREDITS_BET        ,
    MIN_MULTIPLIER          ,
    MAX_MULTIPLIER          ,
    DISPLAY_HEIGHT          ,
    NUM_REELS               ,
    NUM_SCATTER_FG_TRIGGER  ,
    NUM_LINES               ,
    SCATTER_SYMBOL   	    ,
    WILD_SYMBOL   		    ,
    SPIN_REQUEST            ,
    BUY_FEATURE_SPIN_REQUEST,
    BUY_FEATURE             ,
    RtpLevel                ,
    CREDITVALUE             ,
    FREE_GAME_REQUEST       ,
    DONE_REQUEST            ,
    BUY_FEATURE_BET
};

 