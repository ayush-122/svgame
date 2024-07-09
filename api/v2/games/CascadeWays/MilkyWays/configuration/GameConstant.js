const {WD} = require("./GameReelSymbol").GameReelSymbol.symbols;

const           GAME_NAME                                        =                             "MilkyWays";
const       	GAME_DESC                                        =                             "MilkyWays"; 
const           BASE_CREDITS_BET                                 =                             20;
const           BUY_FEATURE_BET                                  =                             200;
const           MIN_MULTIPLIER                                   =                             1;
const           MAX_MULTIPLIER                                   =                             1;
const           DISPLAY_HEIGHT                                   =                             6;
const           NUM_REELS                                        =                             6;
const           NUM_SCATTER_FG_TRIGGER                           =                             3;
const           WILD_SYMBOL   			                         =                             WD;
const           SPIN_REQUEST                                     =                             "BASE";
const           CASCADE_PROCESS_REQUEST                          =                             "CASCADE";
const           BLANK_POSITIONS                                  =                             "-1";
const           FREE_GAME_REQUEST                                =                             "FREE";
const           BUY_FEATURE_SPIN_REQUEST                         =                             "BUYFEATURE"; //exception
const           DONE_REQUEST                                     =                             "COMPLETED";  
const           BUY_FEATURE                                      =                             100;  //exception
const           RtpLevel                                         =                             1;
const           CREDITVALUE                                      =                             [0.1, 0.2, 0.5, 0.7, 1, 2, 3, 5, 8, 10, 15, 20];
const           STAR_WEIGHT_BASE                                 =                             180;
const           STAR_WEIGHT_FREE                                 =                             30;
const           MAX_CASCADE_COUNT                                =                             3;
const           STAR_MULTIPLIER_MAX_WEIGHT                       =                             111;
    
module.exports = {
    GAME_NAME               ,
    GAME_DESC               ,
    BASE_CREDITS_BET        ,
    MIN_MULTIPLIER          ,
    MAX_MULTIPLIER          ,
    DISPLAY_HEIGHT          ,
    NUM_REELS               ,
    NUM_SCATTER_FG_TRIGGER  ,
    WILD_SYMBOL   		    ,
    SPIN_REQUEST            ,
    BUY_FEATURE_SPIN_REQUEST,
    BUY_FEATURE             ,
    RtpLevel                ,
    CREDITVALUE             ,
    FREE_GAME_REQUEST       ,
    DONE_REQUEST            ,
    BLANK_POSITIONS         ,
    BUY_FEATURE_BET         ,
    CASCADE_PROCESS_REQUEST ,
    STAR_WEIGHT_BASE        ,
    STAR_WEIGHT_FREE        ,
    MAX_CASCADE_COUNT       ,
    STAR_MULTIPLIER_MAX_WEIGHT,
};

 