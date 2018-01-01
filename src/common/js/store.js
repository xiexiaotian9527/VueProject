// 向localStorage中保存数据的函数
export function saveToLocal(id, key, value) {
  // 首先定义一个变量保存localStorage存储的本地商家信息
  let seller = window.localStorage._seller_;

  // 然后检查本地有没有这个商家信息
  if (seller) {
    // 如果有这个商家信息，就先将本地存储中的字符串解析成json对象
    seller = JSON.parse(seller);
    // 再判断此对象中是否有想要的信息类
    if (!seller[id]) {
      // 如果没有，就创建一个新的空对象赋值给这个类
      seller[id] = {};
    }
  } else {
    // 如果没有这个商家信息，就依次创建好与传入参数对应的新的空对象
    seller = {};
    seller[id] = {};
  }

  //   再依次将参数传入的键值对保存进相应localStorage对象中
  seller[id][key] = value;

  //   localStorage中只能保存字符串， 所以要将对象解析成字符串再存进localStorage中去
  window.localStorage._seller_ = JSON.stringify(seller);
}

// 获取localStorage中商家数据的函数
export function loadFromLocal(id, key, def) {
  // 首先定义一个变量保存localStorage存储的本地商家信息
  let seller = window.localStorage._seller_;

  // 判断localStorage中如果没有这个类，就直接返回传入的默认值
  if (!seller) {
    return def;
  }

  // 如果有这个类， 就把这个localStorage对象先解析成JSON对象
  seller = JSON.parse(seller);

  // 再次判断这个类中有没有想要的类，如果没有，就直接返回传入的默认值
  if (!seller[id]) {
    return def;
  }

  // 接着判断有传入的键，有值返回对象中对应的值，没有值返回传入的默认值
  return seller[id][key] || def;
}
