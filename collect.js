//对象替换
export function objectReplace(oriObj, replaceObject) {
    let newObj = JSON.parse(JSON.stringify(oriObj));
    for (const key in replaceObject) {
        if (replaceObject.hasOwnProperty(key)) {
            if (key in newObj) {
                //值为字符包是新键 值为对象则key为新键 fun执行方法返回新值
                let newKey = (typeof replaceObject[key] == 'string') ? replaceObject[key] : replaceObject[key].key;
                let values = (typeof replaceObject[key] == 'string') ? newObj[key] : replaceObject[key].fun(newObj[key], newObj)
                delete newObj[key]
                let tmp = {};
                tmp[newKey] = values
                newObj = Object.assign({}, newObj, tmp);
            } else {
                let values = replaceObject[key].fun(newObj)
                let tmp = {};
                tmp[key] = values
                newObj = Object.assign({}, newObj, tmp);
            }
        }
    }
    return newObj
}

//筛选指定键
export function objectOnly(oriObj, keys) {
    let newObj = JSON.parse(JSON.stringify(oriObj));
    for (const key in newObj) {
        if (keys.indexOf(key) === -1) {
            delete newObj[key];
        }
    }
    return newObj;
}

//排除指定键
export function objectExcept(oriObj, keys) {
    let newObj = JSON.parse(JSON.stringify(oriObj));
    for (const key in newObj) {
        if (keys.indexOf(key) !== -1) {
            delete newObj[key];
        }
    }
    return newObj;
}

//集合替换
export function collectReplace(oriObj, replaceObject) {
    let tmp = []
    oriObj.forEach(function (value) {
        tmp.push(objectReplace(value, replaceObject));
    })
    return tmp;
}

//集合筛选指定键组成新数组 [1,2,3]
export function collectPluck(oriObj, key) {
    let tmp = []
    oriObj.forEach(function (value) {
        tmp.push(value[key]);
    })
    return tmp;
}

//集合筛选指定值
export function collectOnly(oriObj, keys) {
    let tmp = []
    oriObj.forEach(function (value) {
        tmp.push(objectOnly(value, keys));
    })
    return tmp;
}

//集合去除指定值
export function collectExcept(oriObj, keys) {
    let tmp = []
    oriObj.forEach(function (value) {
        tmp.push(objectExcept(value, keys));
    })
    return tmp;
}

//集合筛选
export function collectWhere(oriObj) {
    let tmp = oriObj.slice(0);
    let r1 = arguments[1];
    let r2 = arguments[2];
    let r3 = arguments[3];
    if (Object.prototype.toString.call(r1) == "[object Function]") {
        return tmp.filter((item, index) => {
            return r1(item, index);
        })
    } else {
        if (r2 == undefined) {
            return tmp.filter((item, index) => {
                return item[r1];
            })
        } else {
            if (r3 == undefined) {
                return tmp.filter((item, index) => {
                    return item[r1] == r2
                })
            } else {
                return tmp.filter((item, index) => {
                    return eval(`item['${r1}'] ${r2} ${r3}`)
                })
            }
        }
    }
}

//集合筛选获取第一项
export function collectFirst() {
    if (arguments.length == 1 && arguments[0].length) {
        return arguments[0][0];
    }
    var collect = collectWhere(...arguments)
    if (collect && collect.length) {
        return collect[0]
    }
    return false;
}

//集合筛选获取最后一项
export function collectLast() {
    if (arguments.length == 1 && arguments[0].length) {
        return arguments[0][arguments[0].length - 1];
    }
    var collect = collectWhere(...arguments)
    if (collect && collect.length) {
        return collect[collect.length - 1]
    }
    return false;
}

//去重
export function collectUnique(oriObj) {
    return Array.from(new Set(oriObj))
}

//交集
export function interSet(a, b) {
    return new Set([...a].filter(x => b.has(x)));
}
//并集
export function unionSet(a, b) {
    return Array.from(new Set([...a, ...b]))
}
//差集
export function diffSet(a, b) {
    return new Set([...a].filter(x => !b.has(x)))
}