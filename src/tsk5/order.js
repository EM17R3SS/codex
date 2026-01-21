function func(arr, call_back) {
  //массив и обратный вызов
  if (
    !Array.isArray(arr) ||
    arr.some((it) => parseInt(it) != it || it < 0)
  ) //проверка на массив, числа на отрицательность и что целое
  {
    call_back(
      null,
      "Неверный формат входящих данных, должен быть массив положительных чисел",
    );
  }

  let res = [];

  const f = (val) => {
    //получает число из массива, пушит в рес, если все добавлены то коллбэк
    res.push(val);
    if (res.length == arr.length) {
      call_back(res);
    }
  };

  for (let i = 0; i < arr.length; i++) {
    setTimeout(f, arr[i], arr[i]); //установка таймаута для каждого числа в размере каждого числа, по итогу сортировка по значению
  }
}
