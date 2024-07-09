const baseRewardTable = {
  //?    0    1     2      3      4      5      6      7      8       9      10
  0:  [  0,   0,    0,     0,     0,     0,     0,     0,     0,      0,     0     ],
  1:  [  0,   0,    1,     0,     0,     0,     0,     0,     0,      0,     0     ],
  2:  [  0,   0,    9.5,   2,     1.5,   1.5,   1,     0,     0,      0,     0     ],
  3:  [  0,   0,    0,     48.5,  10,    4,     1.5,   1.5,   1,      1,     1     ],
  4:  [  0,   0,    0,     0,     65,    12,    10,    8,     4,      2.5,   1.5   ],
  5:  [  0,   0,    0,     0,     0,     100,   44,    21,    10,     8,     4     ],
  6:  [  0,   0,    0,     0,     0,     0,     200,   100,   57,     20,    10    ],
  7:  [  0,   0,    0,     0,     0,     0,     0,     600,   500,    44,    42    ],
  8:  [  0,   0,    0,     0,     0,     0,     0,     0,     2500,   500,   500   ],
  9:  [  0,   0,    0,     0,     0,     0,     0,     0,     0,      3000,  1000  ],
  10: [  0,   0,    0,     0,     0,     0,     0,     0,     0,      0,     5000  ],

};

module.exports = { baseRewardTable };