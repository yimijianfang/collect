## JS对象、数组封装

1. objectReplace方法

```
场景：替换对象键
使用方法：
var obj = {name:'liuning',sex:'man',age:18}
1.普通替换
objectReplace(obj,
    {
        'name':'name1',
        'sex':'xingbie'
    }
)
// {name1:'liuning',xingbie:'man',age:18}
2.复杂替换
objectReplace(obj,
    {
        age:{
           key:'age',
           func: function(age, item){
               return age+'岁'
           }
        }
    }
)
// {name:'liuning',sex:'man',age:'18岁'}
3.新增列
objectReplace(obj,
    {
        desc:{
           func: function(item){
               return `name: ${item.name} age: ${item.age}`
           }
        }
    }
)
// {name:'liuning',sex:'man',age:18,desc:'name liuning age:18'}
```
2. objectOnly方法

```
场景：form表单提交剩余指定项
使用方法：
var obj = {name:'liuning',sex:'man',age:18}
objectOnly(obj, 
    ['name', 'sex']
)
// {name:'liuning',sex:'man'}
```
3. objectExcept方法

```
场景：form表单提交剔除指定项
使用方法：
var obj = {name:'liuning',sex:'man',age:18}
objectExcept(obj, 
    ['age']
)
// {name:'liuning',sex:'man'}
```
4. collectReplace方法

```
场景：列表页格式化日期等
使用方法：同objectReplace
var coll = [
        {
            company:'百度',
            age:12,
            time:'2018-11-21 23:10:10'
        },
        {
            company:'华为',
            age:21,
            time:'2012-11-01 22:11:10'
        },
        {
            company:'腾讯',
            age:14,
            time:'2015-01-11 12:18:09'
        }
    ]
collectReplace(coll, {
    time:{
        key:'created_time',
        fun:function(time){
            return Moment(time).format("YYYY-MM-DD")
        }
    }
})
```
5. collectPluck方法

```
场景：获取筛选指定键组成新的数组
使用方法：
var checkedCitys = [
    {
        name:'申请书',
        code:'1101'
    },
    {
        name:'车辆登记证书',
        code:'3601'
    },
    {
        name:'身份证复印件',
        code:'1106'
    },
]
collectPluck(checkedCitys, 'code')
// ['1101', '3601', '1106']
```
6. collectOnly方法

```
场景：去除多余键
使用方法：同objectOnly
```
7. collectExcept方法

```
场景：去除多余键
使用方法：同objectExcept
```
8. collectWhere方法

```
场景：根据筛选条件获取筛选后的数组
使用方法：
var checkedCitys = [
    {
        name:'申请书',
        code:1101
    },
    {
        name:'车辆登记证书',
        code:3601
    },
    {
        name:'身份证复印件',
        code:1106,
        ss:true
    },
]
1.一个筛选参数
collectWhere(checkedCitys, 'ss')
// [{name:'身份证复印件',code:1106,ss:true}]
2.两个筛选参数
collectWhere(checkedCitys, 'name', '申请书')
// [{name:'申请书',code:1101}]
3.三个筛选参数 支持【==】 【!=】 【>=】 【<=】 暂不支持【===】
collectWhere(checkedCitys, 'name', '!=', '申请书')
// [{name:'车辆登记证书',code:3601},{name:'身份证复印件',code:1106,ss:true}]
4.传入方法 使用方法同filter
collectWhere(checkedCitys, function(item,index){
    return item.code==1101
})
```
9. collectFirst方法

```
场景：根据筛选条件获取筛选后的数组的第一项 无内容返回false
使用方法：
var checkedCitys = [
    {
        name:'申请书',
        code:1101
    },
    {
        name:'车辆登记证书',
        code:3601
    },
    {
        name:'身份证复印件',
        code:1106,
        ss:true
    },
]
1.无筛选参数
collectFirst(checkedCitys)
// {name:'申请书',code:1101}
2.一个筛选参数
collectFirst(checkedCitys, 'ss')
// {name:'身份证复印件',code:1106, ss:true}
3.两个筛选参数
collectFirst(checkedCitys, 'name', '申请书')
// {name:'申请书',code:1101}
4.三个筛选参数 支持【==】 【!=】 【>=】 【<=】 暂不支持【===】
collectFirst(checkedCitys, 'name', '!=', '申请书')
// {name:'车辆登记证书',code:3601}
5.传入方法 使用方法同filter
collectWhere(checkedCitys, function(item,index){
    return item.code==1101
})
```
10. collectLast方法

```
场景：根据筛选条件获取筛选后的数组的最后一项 无内容返回false
使用方法 同collectFirst
```