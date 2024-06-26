document.getElementById('calculate').addEventListener('click', function() {
  const level = parseFloat(document.getElementById('level').value);
  const ivString = document.getElementById('iv').value;
  const maxIv = parseFloat(document.getElementById('max-iv').value);
  const useCandyXL = document.getElementById('use-xl').checked;

  if (isNaN(level) || !ivString.match(/^\d{1,2}\/\d{1,2}\/\d{1,2}$/) || isNaN(maxIv)) {
    alert('Please enter valid values.');
    return;
  }

  const [ivAtk, ivDef, ivSta] = ivString.split('/').map(num => parseInt(num));

  let maxLevel = useCandyXL ? 50 : 40;

  let stardust = 0;
  let candy = 0;
  let candyXL = 0;

  const stardustCosts = [
    200, 400, 600, 800, 1000, 1300, 1600, 1900, 2200, 2500, // 1-10
    3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 9000, 10000, // 11-20
    11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000, // 21-30
    22000, 24000, 26000, 28000, 30000, 32000, 34000, 36000, 38000, 40000, // 31-40
    50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000, 130000, 140000 // 41-50
  ];

  const candyCosts = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 1-10
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, // 11-20
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, // 21-30
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, // 31-40
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5 // 41-50
  ];

  const candyXLCosts = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 1-10
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 11-20
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 21-30
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 31-40
    10, 10, 10, 10, 10, 10, 10, 10, 10, 10 // 41-50
  ];

  for (let i = Math.floor(level) - 1; i < maxLevel - 1; i++) {
    stardust += stardustCosts[i];
    candy += candyCosts[i];
    candyXL += candyXLCosts[i];
  }

  // CP calculation
  const cpMultiplier = levelCPMultiplier(level); // Function to get CP multiplier for the given level
  const cp = Math.floor((ivAtk + 15) * Math.sqrt(ivDef + 15) * Math.sqrt(ivSta + 15) * cpMultiplier / 10);

  document.getElementById('stardust').innerText = stardust;
  document.getElementById('candy').innerText = candy;
  document.getElementById('candy-xl').innerText = candyXL;
  document.getElementById('cp').innerText = cp;
});

// Function to get CP multiplier for the given level
function levelCPMultiplier(level) {
  const cpMultipliers = {
    1: 0.094,
    1.5: 0.135137432,
    2: 0.16639787,
    2.5: 0.192650919,
    3: 0.21573247,
    3.5: 0.236572661,
    4: 0.25572005,
    4.5: 0.273530381,
    5: 0.29024988,
    5.5: 0.306057377,
    6: 0.3210876,
    6.5: 0.335445036,
    7: 0.34921268,
    7.5: 0.362457751,
    8: 0.37523559,
    8.5: 0.387592406,
    9: 0.39956728,
    9.5: 0.411193551,
    10: 0.4225,
    10.5: 0.432926409,
    11: 0.44310755,
    11.5: 0.4530599578,
    12: 0.46279839,
    12.5: 0.472336083,
    13: 0.48168495,
    13.5: 0.4908558,
    14: 0.49985844,
    14.5: 0.508701765,
    15: 0.51739395,
    15.5: 0.525942511,
    16: 0.5343543,
    16.5: 0.542635767,
    17: 0.5507927,
    17.5: 0.558830576,
    18: 0.5667545,
    18.5: 0.574569133,
    19: 0.5822789,
    19.5: 0.589887917,
    20: 0.5974,
    20.5: 0.604818814,
    21: 0.6121573,
    21.5: 0.619399365,
    22: 0.6265671,
    22.5: 0.633644533,
    23: 0.64065295,
    23.5: 0.647576426,
    24: 0.65443563,
    24.5: 0.661214806,
    25: 0.667934,
    25.5: 0.674577537,
    26: 0.6811649,
    26.5: 0.687680648,
    27: 0.69414365,
    27.5: 0.700538673,
    28: 0.7068842,
    28.5: 0.713164996,
    29: 0.7193991,
    29.5: 0.725571552,
    30: 0.7317,
    30.5: 0.734741009,
    31: 0.7377695,
    31.5: 0.740785574,
    32: 0.74378943,
    32.5: 0.746781211,
    33: 0.74976104,
    33.5: 0.752729087,
    34: 0.7556855,
    34.5: 0.758630378,
    35: 0.76156384,
    35.5: 0.764486065,
    36: 0.76739717,
    36.5: 0.770297266,
    37: 0.7731865,
    37.5: 0.776064962,
    38: 0.77893275,
    38.5: 0.781790055,
    39: 0.78463697,
    39.5: 0.787473578,
    40: 0.7903,
    40.5: 0.79280395,
    41: 0.79530001,
    41.5: 0.7978039,
    42: 0.8003,
    42.5: 0.8028039,
    43: 0.8053,
    43.5: 0.8078039,
    44: 0.8103,
    44.5: 0.8128039,
    45: 0.8153,
    45.5: 0.8178039,
    46: 0.8203,
    46.5: 0.8228039,
    47: 0.8253,
    47.5: 0.8278039,
    48: 0.8303,
    48.5: 0.8328039,
    49: 0.8353,
    49.5: 0.8378039,
    50: 0.8403
  };

  return cpMultipliers[level];
}
