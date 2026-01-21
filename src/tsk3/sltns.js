function isSquare(n) {
  if (n < 0) {
    return false;
  }
  if (n == 0 || n == 1) {
    return true;
  }

  for (let i = 2; i <= n / 2; i++) {
    if (i * i == n) {
      return true;
    }
    if (i * i > n) {
      break;
    }
  }

  return false;
}

function testIsSquare() {
  const tests = [
    [16, true],
    [25, true],
    [14, false],
    [-1, false],
    [0, true],
  ];
  tests.forEach(([input, expected]) => {
    const result = isSquare(input);
    const passed = result == expected;
    console.log(`isSquare(${input}) = ${result} ${passed ? "0" : "1"}`);
  });
}

testIsSquare();
