// swaggerSchemas.js

module.exports = {
  PlayerData: {
    type: "object",
    properties: {
      player_id: {
        type: "string",
        description: "The unique identifier of the player",
        example: "3",
      },
      username: {
        type: "string",
        description: "The username of the player",
        example: "test",
      },
      fullname: {
        type: "string",
        description: "The full name of the player",
        example: null,
      },
      email: {
        type: "string",
        description: "The email address of the player",
        example: null,
      },
      balance: {
        type: "number",
        format: "float",
        description: "The balance of the player",
        example: 1000012.5,
      },
    },
  },
  GameData: {
    type: "object",
    properties: {
      game_id: {
        type: "number",
        description: "The unique identifier of the game",
        example: "1001",
      },
      game_name: {
        type: "string",
        description: "The name of the game",
        example: "test",
      },
      type: {
        type: "string",
        description: "The type of the game",
        example: "slot",
      },
    },
  },
  SpinSchema: {
    type: "object",
    properties: {
      status: {
        type: "boolean",
        description: "Indicates whether the request was successful or not.",
        example: true,
      },
      message: {
        type: "string",
        description: "A message providing information about the request outcome.",
        example: "Data received successfully!",
      },
      data: {
        type: "object",
        description: "Contains the player data",
        properties: {
          balance: {
            type: "number",
            description: "The balance of the player.",
          },
          baseBet: {
            type: "number",
            description: "The base bet amount.",
          },
          creditValue: {
            type: "number",
            description: "The credit value.",
          },
          betMultiplier: {
            type: "number",
            description: "The bet multiplier.",
          },
          reelMode: {
            type: "number",
            description: "TO BE REMOVED :The reel mode (FOR RTP)",
          },
          state: {
            type: "object",
            description: "The state of the game",
            properties: {
              current: {
                type: "string",
                description: "The current state.",
                example: "BASE | FREE | WHEEL_BONUS | PICK_BONUS | RESPIN ",
              },
              next: {
                type: "string",
                description: "The next state.",
                example: "COMPLETED | FREE | WHEEL_BONUS | PICK_BONUS | RESPIN ",
              },
            },
          },
          reelStops: {
            type: "object",
            description: "TO BE REMOVED : The reel stops.",
            example: {
              0: 9,
              1: 17,
              2: 30,
              3: 37,
              4: 28,
            },
          },
          matrix: {
            type: "array",
            description: "The game matrix. Giving position of symbols via symbol ID, (2D array)",
            example: [
              [1, 7, 8],
              [6, 3, 5],
              [0, 5, 2],
              [5, 1, 3],
              [5, 6, 2],
            ],
            items: {
              type: "array",
              items: {
                type: "number",
              },
            },
          },
          payline: {
            type: "array",
            description: "The paylines. Each object represents a payline.",
            items: {
              type: "object",
              properties: {
                paylineNo: {
                  type: "number",
                  description: "The payline number.",
                  example: 9,
                },
                symbol: {
                  type: "number",
                  description: "The symbol number the payline has appeared for.",
                  example: 6,
                },
                symbolCount: {
                  type: "number",
                  description: "The number of times the symbol has appeared.",
                  example: 5,
                },
                positions: {
                  type: "array",
                  description: "The positions where the symbol is present.",
                  items: {
                    type: "number",
                  },
                  example: [1, 0, 1, 0, 1],
                },
                multiplier: {
                  type: "number",
                  description: "Multiplier won.",
                  example: 1,
                },
                won: {
                  type: "number",
                  description: "Winnings on the particular payline.",
                  example: 30,
                },
              },
            },
            example: [
              {
                paylineNo: 9,
                symbol: 6,
                symbolCount: 5,
                positions: [1, 0, 1, 0, 1],
                multiplier: 1,
                won: 30,
              },
            ],
          },
          scatter: {
            type: "object",
            description: "The scatter details.",
            properties: {
              count: {
                type: "number",
                description: "The count of scatter symbols.",
                example: 4,
              },
              position: {
                type: "array",
                description: "The positions where scatter symbols appear.",
                items: {
                  type: "string",
                  pattern: "^\\d+,\\d+$",
                },
                example: ["1,0", "4,0", "4,1", "4,2"],
              },
              freeGameTrigger: {
                type: "boolean",
                description: "Indicates if the scatter triggered a free game.",
                example: true,
              },
              freeGameRetrigger: {
                type: "boolean",
                description: "Indicates if the scatter triggered a free game retrigger.",
                example: false,
              },
              creditWon: {
                type: "number",
                description: "The amount of credit won from scatter symbols.",
                example: 0,
              },
              freeSpinWon: {
                type: "number",
                description: "The number of free spins won from scatter symbols.",
                example: 0,
              },
            },
            example: {
              count: 4,
              position: ["1,0", "4,0", "4,1", "4,2"],
              freeGameTrigger: true,
              freeGameRetrigger: false,
              creditWon: 0,
              freeSpinWon: 0,
            },
          },
          freeGame: {
            type: "object",
            description: "The free game details.",
            properties: {
              currentFreeSpin: {
                type: "number",
                description: "The current number of free spins.",
                example: 0,
              },
              totalFreeSpin: {
                type: "number",
                description: "The total number of free spins.",
                example: 8,
              },
            },
            example: {
              currentFreeSpin: 0,
              totalFreeSpin: 8,
            },
          },
          bonus: {
            type: "object",
            description: "The bonus details.",
            properties: {
              wheelSpin: {
                type: "object",
                description: "Details about the wheel spin bonus.",
                properties: {
                  award: {
                    type: "string",
                    description: "The award received during the wheel spin bonus.",
                    example: "GRAND",
                  },
                  amount: {
                    type: "number",
                    description: "The amount won during the wheel spin bonus.",
                    example: 9000,
                  },
                },
              },
              bonusTrigger: {
                type: "boolean",
                description: "Indicates whether the bonus feature has been triggered.",
                example: true,
              },
              bonusSymbolCount: {
                type: "number",
                description: "The count of bonus symbols that triggered the bonus feature.",
                example: 3,
              },
              bonusSymbolPos: {
                type: "array",
                description: "The positions of the bonus symbols that triggered the bonus feature.",
                items: {
                  type: "string",
                  description: "The position of a bonus symbol in row,column format.",
                  example: ["1,0", "2,2", "4,0"],
                },
              },
              TotalBonusWin: {
                type: "number",
                description: "The total winnings from the bonus feature.",
                example: 9000,
              },
            },
          },
          mainSpinCreditsWon: {
            type: "number",
            description: "The credits won during the main spin.",
            example: 18,
          },
          creditsWonOnBaseSpin: {
            type: "number",
            description: "The credits won on the base spin.",
            example: 0,
          },
          freeSpinCreditsWon: {
            type: "number",
            description: "The credits won during the free spins.",
            example: 0,
          },
          freeSpinTotalWon: {
            type: "number",
            description: "The total credits won during the free spins.",
            example: 0,
          },
          totalCreditsWon: {
            type: "number",
            description: "The total credits won across all spins.",
            example: 18,
          },
          creditsWagered: {
            type: "number",
            description: "The number of credits wagered on the spin.",
            example: 30,
          },
          finalWinnings: {
            type: "object",
            description: "Details about final winnings",
            properties: {
              TotalWon: {
                type: "number",
                description: "The total winnings after all spins.",
                example: 18,
              },
              net: {
                type: "number",
                description: "The net winnings after deducting wagered credits.",
                example: -2.0,
              },
            },
          },
          next: {
            type: "string",
            description: "The state of the next spin.",
            example: "FREE",
          },
        },
      },
    },
  },
  KenoSchema: {
    type: "object",
    properties: {
      status: {
        type: "boolean",
        description: "Indicates whether the request was successful.",
      },
      message: {
        type: "string",
        description: "A message describing the result of the request.",
      },
      data: {
        type: "object",
        properties: {
          gameId: {
            type: ["integer", "null"],
            description: "ID of the game, or null if not applicable.",
          },
          balance: {
            type: "number",
            description: "The player's balance.",
          },
          balanceType: {
            type: "string",
            description: "Type of balance (e.g., WALLET).",
          },
          drawnNumbers: {
            type: "array",
            items: {
              type: "integer",
            },
            description: "Array of numbers drawn in the game.",
          },
          winNumbers: {
            type: "array",
            items: {
              type: "integer",
            },
            description: "Array of winning numbers.",
          },
          payoutMultiplier: {
            type: "number",
            description: "Multiplier for calculating payout.",
          },
          totalWon: {
            type: "string",
            description: "Total amount won.",
          },
          totalBet: {
            type: "integer",
            description: "Total amount bet.",
          },
          win: {
            type: "string",
            description: "Amount won in the game.",
          },
          provablyFair: {
            type: "object",
            properties: {
              serverSeed: {
                type: "string",
                description: "Server seed for provably fair mechanism.",
              },
              playerSeed: {
                type: "string",
                description: "Player seed for provably fair mechanism.",
              },
              initialShuffle: {
                type: "string",
                description: "Initial shuffle for provably fair mechanism.",
              },
              finalShuffle: {
                type: "string",
                description: "Final shuffle for provably fair mechanism.",
              },
              hash: {
                type: "string",
                description: "Hash value for provably fair mechanism.",
              },
              blockCount: {
                type: "integer",
                description: "Block count for provably fair mechanism.",
              },
            },
            description: "Details of provably fair mechanism.",
          },
          winCoef: {
            type: "number",
            description: "Win coefficient.",
          },
          protocolVersion: {
            type: "integer",
            description: "Protocol version.",
          },
        },
        description: "Data related to the game.",
      },
    },
    description: "Schema for the Keno game API response.",
  },
  FeatureKenoSchema: {
    type: "object",
    properties: {
      status: {
        type: "boolean",
        description: "Indicates whether the request was successful or not.",
        example: true,
      },
      message: {
        type: "string",
        description: "A message providing information about the request outcome.",
        example: "Data received successfully!",
      },
      data: {
        type: "object",
        description: "Contains the game data.",
        properties: {
          gameId: {
            type: "number",
            description: "The ID of the game.",
            example: 2010,
          },
          balance: {
            type: "number",
            description: "The balance of the player.",
            example: 10058679,
          },
          balanceType: {
            type: "string",
            description: "The type of balance (e.g., WALLET).",
            example: "WALLET",
          },
          currentState: {
            type: "string",
            description: "The current state of the game.",
            example: "BASE",
          },
          numberCount: {
            type: "number",
            description: "The count of numbers.",
            example: 10,
          },
          nextState: {
            type: "string",
            description: "The next state of the game.",
            example: "FREE",
          },
          nextStateDetails: {
            type: "object",
            description: "Details about the next state of the game.",
            properties: {
              states: {
                type: "array",
                description: "The possible states.",
                items: {
                  type: "string",
                  example: ["COMPLETED", "FREE"],
                },
              },
              isWheelBonusTriggered: {
                type: "boolean",
                description: "Indicates if the wheel bonus is triggered.",
                example: false,
              },
              currentWheelBonusSpin: {
                type: "number",
                description: "The current wheel bonus spin count.",
                example: 0,
              },
              totalWheelBonusSpin: {
                type: "number",
                description: "The total wheel bonus spin count.",
                example: 0,
              },
              wheelBonusWin: {
                type: "number",
                description: "The winnings from the wheel bonus.",
                example: 0,
              },
              totalWheelBonusWon: {
                type: "number",
                description: "The total winnings from the wheel bonus.",
                example: 0,
              },
              increaseDrawCount: {
                type: "boolean",
                description: "Indicates if the draw count should be increased.",
                example: false,
              },
              extraDrawnNumbers: {
                type: "array",
                description: "The extra drawn numbers.",
                items: {
                  type: "number",
                },
                example: [],
              },
              extraDrawCount: {
                type: "number",
                description: "The count of extra draws.",
                example: 8,
              },
              extraDrawWon: {
                type: "number",
                description: "The winnings from extra draws.",
                example: 0,
              },
              isFreeTriggered: {
                type: "boolean",
                description: "Indicates if the free game is triggered.",
                example: true,
              },
              currentFreeSpin: {
                type: "number",
                description: "The current free spin count.",
                example: 0,
              },
              totalFreeSpin: {
                type: "number",
                description: "The total free spin count.",
                example: 10,
              },
              currentFreeSpinWon: {
                type: "number",
                description: "The winnings from the current free spins.",
                example: 0,
              },
              totalFreeSpinWon: {
                type: "number",
                description: "The total winnings from all free spins.",
                example: 0,
              },
            },
          },
          betNumbers: {
            type: "array",
            description: "The numbers bet on.",
            items: {
              type: "number",
            },
            example: [27, 5, 21, 9, 13, 29, 24, 35, 32, 25],
          },
          drawnNumbers: {
            type: "array",
            description: "The numbers drawn.",
            items: {
              type: "number",
            },
            example: [6, 77, 40, 47, 69, 62, 55, 4, 68, 32, 71, 53, 48, 10, 66, 74, 80, 72, 24, 18],
          },
          extraDrawCount: {
            type: "number",
            description: "The count of extra draws.",
            example: 8,
          },
          winNumbers: {
            type: "array",
            description: "The winning numbers.",
            items: {
              type: "number",
            },
            example: [24, 32],
          },
          featureSymbols: {
            type: "array",
            description: "The feature symbols.",
            items: {
              type: "string",
            },
            example: ["H4", "H3", "H2", "H1"],
          },
          featureSymbolHit: {
            type: "object",
            description: "Details about the hit feature symbols.",
            properties: {
              skullSymbols: {
                type: "array",
                description: "The skull symbols hit.",
                items: {
                  type: "object",
                  properties: {},
                },
                example: [],
              },
              hatSymbols: {
                type: "array",
                description: "The hat symbols hit.",
                items: {
                  type: "object",
                  properties: {
                    H1: {
                      type: "number",
                      example: 47,
                    },
                    H2: {
                      type: "number",
                      example: 40,
                    },
                    H3: {
                      type: "number",
                      example: 77,
                    },
                    H4: {
                      type: "number",
                      example: 6,
                    },
                  },
                },
                example: [{ H1: 47 }, { H2: 40 }, { H3: 77 }, { H4: 6 }],
              },
              bulletSymbols: {
                type: "array",
                description: "The bullet symbols hit.",
                items: {
                  type: "object",
                  properties: {},
                },
                example: [],
              },
              gunSymbols: {
                type: "array",
                description: "The gun symbols hit.",
                items: {
                  type: "object",
                  properties: {},
                },
                example: [],
              },
              wildSymbols: {
                type: "array",
                description: "The wild symbols hit.",
                items: {
                  type: "object",
                  properties: {},
                },
                example: [],
              },
              horseShoeSymbols: {
                type: "array",
                description: "The horse shoe symbols hit.",
                items: {
                  type: "object",
                  properties: {},
                },
                example: [],
              },
            },
          },
          payoutMultiplier: {
            type: "number",
            description: "The payout multiplier.",
            example: 0,
          },
          bonusMultiplier: {
            type: "number",
            description: "The bonus multiplier.",
            example: 1,
          },
          totalWon: {
            type: "number",
            description: "The total winnings.",
            example: 0,
          },
          totalBet: {
            type: "number",
            description: "The total bet amount.",
            example: 1,
          },
          win: {
            type: "number",
            description: "The current win amount.",
            example: 0,
          },
        },
      },
    },
  },
  WaysSchema: {
    type: "object",
    properties: {
      status: {
        type: "boolean",
        description: "Indicates whether the request was successful or not.",
        example: true,
      },
      message: {
        type: "string",
        description: "A message providing information about the request outcome.",
        example: "Data received successfully!",
      },
      data: {
        type: "object",
        description: "Contains the game data.",
        properties: {
          balance: {
            type: "number",
            description: "The balance of the player.",
            example: 10059573.5,
          },
          baseBet: {
            type: ["number", "null"],
            description: "The base bet amount.",
          },
          creditValue: {
            type: "number",
            description: "The credit value.",
            example: 1,
          },
          betMultiplier: {
            type: "number",
            description: "The bet multiplier.",
            example: 1,
          },
          reelMode: {
            type: "number",
            description: "The reel mode.",
            example: 0,
          },
          state: {
            type: "object",
            description: "The state of the game.",
            properties: {
              current: {
                type: "string",
                description: "The current state of the game.",
                example: "BASE",
              },
              next: {
                type: "string",
                description: "The next state of the game.",
                example: "COMPLETED",
              },
            },
          },
          matrix: {
            type: "array",
            description: "The game matrix.",
            items: {
              type: "array",
              items: {
                type: "number",
              },
            },
            example: [
              [9, 9, 9],
              [2, 3, 5],
              [8, 8, 8],
              [12, 5, 8],
              [9, 9, 9],
            ],
          },
          payline: {
            type: "array",
            description: "The paylines.",
            items: {
              type: "object",
              properties: {
                symbol: {
                  type: "string",
                  description: "The symbol of the payline.",
                },
                symbolCount: {
                  type: "number",
                  description: "The number of symbols in the payline.",
                },
                positions: {
                  type: "string",
                  description: "The positions of the symbols in the payline.",
                },
                noOfPosition: {
                  type: "number",
                  description: "The number of positions in the payline.",
                },
                multiplier: {
                  type: "number",
                  description: "The multiplier for the payline.",
                },
                won: {
                  type: "number",
                  description: "The winnings on the particular payline.",
                },
              },
            },
            example: [],
          },
          scatter: {
            type: "object",
            description: "The scatter details.",
            properties: {
              count: {
                type: "number",
                description: "The count of scatter symbols.",
              },
              position: {
                type: "number",
                description: "The position of scatter symbols.",
              },
              freegametrigger: {
                type: "boolean",
                description: "Indicates if the scatter triggered a free game.",
              },
              freeGameRetrigger: {
                type: "boolean",
                description: "Indicates if the scatter triggered a retrigger for free game.",
              },
              creditWon: {
                type: "number",
                description: "The credits won from scatter symbols.",
              },
              freeSpinWon: {
                type: "number",
                description: "The number of free spins won.",
              },
            },
            example: {
              count: 0,
              position: 0,
              freegametrigger: false,
              freeGameRetrigger: false,
              creditWon: 0,
              freeSpinWon: 0,
            },
          },
          freeGame: {
            type: "object",
            description: "The free game details.",
            properties: {
              currentFreeSpin: {
                type: "number",
                description: "The current number of free spins.",
              },
              totalFreeSpin: {
                type: "number",
                description: "The total number of free spins.",
              },
            },
            example: {
              currentFreeSpin: 0,
              totalFreeSpin: 0,
            },
          },
          bonus: {
            type: "object",
            description: "The bonus details.",
            properties: {
              count: {
                type: "number",
                description: "The count of bonus symbols.",
              },
              position: {
                type: "number",
                description: "The position of bonus symbols.",
              },
              bonusGameTrigger: {
                type: "boolean",
                description: "Indicates if the bonus game is triggered.",
              },
              creditWon: {
                type: "number",
                description: "The credits won from bonus symbols.",
              },
              RespinWon: {
                type: "number",
                description: "The credits won from bonus respins.",
              },
            },
            example: {
              count: 0,
              position: 0,
              bonusGameTrigger: false,
              creditWon: 0,
              RespinWon: 0,
            },
          },
          reSpinGame: {
            type: "object",
            description: "Details about the respin game.",
          },
          mainSpinCreditsWon: {
            type: "number",
            description: "The credits won in the main spin.",
          },
          creditsWonOnBaseSpin: {
            type: "number",
            description: "The credits won on the base spin.",
          },
          freeSpinCreditsWon: {
            type: "number",
            description: "The credits won in free spins.",
          },
          freeSpinTotalWon: {
            type: "number",
            description: "The total credits won in free spins.",
          },
          baseRespinCreditWon: {
            type: "number",
            description: "The credits won on base respin.",
          },
          baseRespinTotalWon: {
            type: "number",
            description: "The total credits won on base respin.",
          },
          totalCreditsWon: {
            type: "number",
            description: "The total credits won.",
          },
          creditsWagered: {
            type: "number",
            description: "The credits wagered.",
          },
          finalWinnings: {
            type: "object",
            description: "Details about final winnings.",
            properties: {
              TotalWon: {
                type: "number",
                description: "The total winnings.",
              },
              net: {
                type: "number",
                description: "The net winnings.",
              },
            },
          },
          next: {
            type: "string",
            description: "The next state of the game.",
          },
          expandingWild: {
            type: "number",
            description: "The expanding wild symbol count.",
          },
          expandingPosition: {
            type: "number",
            description: "The expanding position count.",
          },
          featurePaylines: {
            type: "number",
            description: "The feature payline count.",
          },
          featureReels: {
            type: "number",
            description: "The feature reel count.",
          },
        },
        example: {
          balance: 10059573.5,
          baseBet: null,
          creditValue: 1,
          betMultiplier: 1,
          reelMode: 0,
          state: {
            current: "BASE",
            next: "COMPLETED",
          },
          matrix: [
            [9, 9, 9],
            [2, 3, 5],
            [8, 8, 8],
            [12, 5, 8],
            [9, 9, 9],
          ],
          payline: [],
          scatter: {
            count: 0,
            position: 0,
            freegametrigger: false,
            freeGameRetrigger: false,
            creditWon: 0,
            freeSpinWon: 0,
          },
          freeGame: {
            currentFreeSpin: 0,
            totalFreeSpin: 0,
          },
          bonus: {
            count: 0,
            position: 0,
            bonusGameTrigger: false,
            creditWon: 0,
            RespinWon: 0,
          },
          reSpinGame: {},
          mainSpinCreditsWon: 0,
          creditsWonOnBaseSpin: 0,
          freeSpinCreditsWon: 0,
          freeSpinTotalWon: 0,
          baseRespinCreditWon: 0,
          baseRespinTotalWon: 0,
          totalCreditsWon: 0,
          creditsWagered: 30,
          finalWinnings: {
            TotalWon: 0,
            net: -20,
          },
          next: "COMPLETED",
          expandingWild: 20,
          expandingPosition: 20,
          featurePaylines: 20,
          featureReels: 20,
        },
      },
    },
  },
  CascadeWaysSchema: {
    type: "object",
    properties: {
      status: {
        type: "boolean",
        description: "Indicates whether the request was successful or not.",
        example: true,
      },
      message: {
        type: "string",
        description: "A message providing information about the request outcome.",
        example: "Data received successfully!",
      },
      data: {
        type: "object",
        description: "Contains the game data.",
        properties: {
          balance: {
            type: "number",
            description: "The balance of the player.",
            example: 10059593.5,
          },
          baseBet: {
            type: "number",
            description: "The base bet amount.",
            example: 20,
          },
          creditValue: {
            type: "number",
            description: "The credit value.",
            example: 1,
          },
          betMultiplier: {
            type: "number",
            description: "The bet multiplier.",
            example: 1,
          },
          reelMode: {
            type: "number",
            description: "The reel mode.",
            example: 0,
          },
          currentState: {
            type: "string",
            description: "The current state of the game.",
            example: "BASE",
          },
          nextState: {
            type: "string",
            description: "The next state of the game.",
            example: "COMPLETED",
          },
          matrix: {
            type: "object",
            description: "The game matrix.",
            properties: {
              1: {
                type: "array",
                items: { type: "number" },
                example: [2, 3, 5, 5, 2, 3],
              },
              2: {
                type: "array",
                items: { type: "number" },
                example: [6, 10, 9, 7, 2, 9],
              },
              3: {
                type: "array",
                items: { type: "number" },
                example: [4, 5, 10, 3, 4, 4],
              },
              4: {
                type: "array",
                items: { type: "number" },
                example: [9, 8, 7, 9, 10, 7],
              },
              5: {
                type: "array",
                items: { type: "number" },
                example: [4, 0, 5, 0, 5, 4],
              },
              6: {
                type: "array",
                items: { type: "number" },
                example: [9, 7, 8, 7, 8, 9],
              },
            },
          },
          payline: {
            type: "array",
            description: "The paylines.",
            items: {
              type: "object",
              properties: {
                symbol: { type: "string", example: "CC" },
                symbolCount: { type: "number", example: 4 },
                positions: { type: "string", example: "0,0;0,4;1,1;1,4;2,2;3,4" },
                noOfPosition: { type: "number", example: 6 },
                multiplier: { type: "number", example: 4 },
                won: { type: "number", example: 320 },
              },
            },
            example: [
              {
                symbol: "CC",
                symbolCount: 4,
                positions: "0,0;0,4;1,1;1,4;2,2;3,4",
                noOfPosition: 6,
                multiplier: 4,
                won: 320,
              },
              {
                symbol: "DD",
                symbolCount: 4,
                positions: "0,1;0,5;1,1;2,2;2,3;3,4",
                noOfPosition: 6,
                multiplier: 4,
                won: 240,
              },
              {
                symbol: "FF",
                symbolCount: 5,
                positions: "0,2;0,3;1,1;2,1;2,2;3,4;4,2;4,4",
                noOfPosition: 8,
                multiplier: 8,
                won: 280,
              },
            ],
          },
          starPositions: {
            type: "object",
            description: "Star positions data.",
            properties: {
              matrixDataPos: {
                type: "array",
                description: "Positions in the matrix.",
                items: { type: "number" },
                example: [],
              },
              elementCount: {
                type: "number",
                description: "Count of elements.",
                example: 0,
              },
            },
          },
          cascadingWinProgress: {
            type: "object",
            description: "Cascading win progress data.",
            additionalProperties: {
              type: "object",
              properties: {
                cascadeId: { type: "number", example: 1 },
                matrix: {
                  type: "object",
                  description: "Matrix for the cascade.",
                  additionalProperties: {
                    type: "array",
                    items: { type: "number" },
                  },
                },
                payline: {
                  type: "array",
                  description: "Paylines for the cascade.",
                  items: {
                    type: "object",
                    properties: {
                      symbol: { type: "string", example: "AA" },
                      symbolCount: { type: "number", example: 3 },
                      positions: { type: "string", example: "0,0;0,1;0,4;1,1;2,2" },
                      noOfPosition: { type: "number", example: 5 },
                      multiplier: { type: "number", example: 3 },
                      won: { type: "number", example: 30 },
                    },
                  },
                },
                cascade: {
                  type: "object",
                  description: "Cascaded data for the cascade.",
                  additionalProperties: {
                    type: "array",
                    items: { type: "number" },
                  },
                },
                won: { type: "number", example: 30 },
              },
            },
          },
          star: {
            type: "object",
            description: "Star details.",
            properties: {
              count: { type: "number", example: 0 },
              position: { type: "number", example: 0 },
              freegametrigger: { type: "boolean", example: false },
              freeGameRetrigger: { type: "boolean", example: false },
              creditWon: { type: "number", example: 0 },
              freeSpinWon: { type: "number", example: 0 },
            },
          },
          freeGame: {
            type: "object",
            description: "Free game details.",
            properties: {
              currentFreeSpin: { type: "number", example: 0 },
              totalFreeSpin: { type: "number", example: 0 },
            },
          },
          mainSpinCreditsWon: { type: "number", example: 840 },
          creditsWonOnBaseSpin: { type: "number", example: 0 },
          baseGameCascadeWon: { type: "number", example: 0 },
          freeSpinCreditsWon: { type: "number", example: 0 },
          freeGameCascadeWon: { type: "number", example: 0 },
          freeSpinTotalWon: { type: "number", example: 0 },
          totalCreditsWon: { type: "number", example: 840 },
          creditsWagered: { type: "number", example: 30 },
          finalWinnings: {
            type: "object",
            description: "Details about final winnings.",
            properties: {
              TotalWon: { type: "number", example: 840 },
              net: { type: "string", example: "820.000" },
            },
          },
          cascadeProgress: { type: "number", example: -1 },
          lastCascadingReels: { type: "number", example: -1 },
          next: { type: "string", example: "COMPLETED" },
        },
      },
    },
  },
};
