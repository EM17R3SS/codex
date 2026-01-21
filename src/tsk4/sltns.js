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
    //проверка на массив
    throw new TypeError("First arg be arr");
  }
  if (typeof targetSum != "number" || !Number.isFinite(targetSum)) {
    //проверка что таргет это число и конечно
    throw new TypeError("sec arg need to be a number and finite");
  }
  if (!Number.isInteger(targetSum)) {
    //проверка что таргет инт
    throw new TypeError("sec arg is int");
  }
  const MAX_ARRAY_LENGTH = 1000000; //установили лимит
  if (numArray.length > MAX_ARRAY_LENGTH) {
    //проверка что длина массива меньше лимита
    throw new RangeError("len arr more t maxlen");
  }

  const validNumber = []; //массив валидных чисел
  const uniqNumbers = new Set(); //сет для уникальности элементов

  for (let i = 0; i < numArray.length; i++) {
    //проверка каждого элемента
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

    uniqNumbers.add(elementOfArr); //добавляем в сет и массив валидных
    validNumber.push(elementOfArr);
  }

  if (validNumber.length < 2) {
    //пары не будет если меньше 2 элементов
    return [];
  }

  const numSet = new Set(); //сет для просмотренных
  const foundPair = []; //найденные пары

  for (const currNum of validNumber) {
    //основной алгоритм поиска
    const cmpl = targetSum - currNum; //вычисление дополнения

    if (!Number.isSafeInteger(cmpl)) {
      //те же проверки, я их уже не комментирую, но тут от переполнения
      continue;
    }
    if (numSet.has(cmpl) && cmpl != currNum) {
      //нашли доп и это не тоже самое число то пушим в массив фп и стопим фор
      foundPair.push([cmpl, currNum]);
      break;
    }

    numSet.add(currNum); //добавка в сет
    if (numSet.size > MAX_ARRAY_LENGTH) {
      //проверка на переполнение
      throw new Error("is more  uniq num");
    }
  }
  return foundPair.length > 0 ? foundPair[0] : []; //собственно возврат результата
}

function runTest() {
  let pass = 0; //сколько прошло или провалилось
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
