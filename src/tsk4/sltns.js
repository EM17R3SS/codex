/*
4. Напишите на js функцию, которая принимает два аргумента: массив из уникальных целых чисел и сумму в виде целого числа.
!!!поставить огранчиение на массив(на компоненты)

Если сумма двух любых чисел массива из аргумента равна числу, которое приходит вторым аргументом,
функция должна вернуть новый массив из этих двух чисел в любом порядке.

Если решения нет, вернуть пустой массив.
!!!Текущее число само с собой складывать нельзя.

Пример входных данных:

array = [3, 5, -4, 8, 11, 1, -1, 6]
targetSum = 10
На выходе:
[-1, 11] или [11, -1], так как -1 + 11 = 10 = targetSum
Код написанной функции прокомментируйте.

*/

function myFunc(numArray, targetSum) {
  if (!Array.isArray(numArray)) {
    throw new TypeError("First arg be arr");
  }
  if (typeof targetSum != "number" || !Number.isFinite(targetSum)) {
    throw new TypeError("sec arg need to be a number and finite");
  }
  if (!Number.isInteger(targetSum)) {
    throw new TypeError("sec arg is int");
  }
  const MAX_ARRAY_LENGTH = 1000000;
  if (numArray.length > MAX_ARRAY_LENGTH) {
    throw new RangeError("len arr more t maxlen");
  }

  const validNumber = [];
  const uniqNumbers = new Set();

  for (let i = 0; i < numArray.length; i++) {
    const elementOfArr = numArray[i];

    if (typeof elementOfArr != "number" || !Number.isFinite(elementOfArr)) {
      throw new TypeError("element not num");
    }
    if (!Number.isInteger(elementOfArr)) {
      throw new TypeError("el is not int");
    }
    if (uniqNumbers.has(elementOfArr)) {
      throw new Error("el alr in arr");
    }

    uniqNumbers.add(elementOfArr);
    validNumber.push(elementOfArr);
  }

  if (validNumber.length < 2) {
    return [];
  }

  const numSet = new Set();
  const foundPair = [];

  for (const currNum of validNumber) {
    const cmpl = targetSum - currNum;

    if (!Number.isSafeInteger(cmpl)) {
      continue;
    }
    if (numSet.has(cmpl) && cmpl != currNum) {
      foundPair.push([cmpl, currNum]);
      break;
    }

    numSet.add(currNum);
    if (numSet.size > MAX_ARRAY_LENGTH) {
      throw new Error("is more  uniq num");
    }
  }
  return foundPair.length > 0 ? foundPair[0] : [];
}

function runTest() {
  let pass = 0;
  let fail = 0;

  const testCase = [
    {
      array: [3, 5, -4, 8, 11, 1, -1, 6],
      target: 10,
      expected: [11, -1],
    },
    {
      array: [1, 2, 3, 4],
      target: 10,
      expected: [],
    },
    {
      array: [],
      target: 5,
      expected: [],
    },
  ];

  testCase.forEach((test, index) => {
    try {
      const res = myFunc(test.array, test.target);
      let isValid = false;
      if (test.expected.length == 0) {
        isValid = res.length == 0;
      } else {
        const [a, b] = test.expected;
        isValid = (res[0] == a && res[1] == b) || (res[0] == b && res[1] == a);
      }

      if (isValid) {
        console.log(`Test ${index + 1}`);
        console.log(`Res: [${res}]`);
        pass++;
      } else {
        console.log(`Test${index + 1}`);
        console.log(`Wait: [${test.expected}]`);
        console.log(`Res:  [${res}]`);
        fail++;
      }
    } catch (error) {
      console.log("Test ${index + 1}: Error: ${error.message}");
      fail++;
    }
    console.log();
  });
  console.log(`Res: ${pass} pass, ${fail} fail`);
}
runTest();
