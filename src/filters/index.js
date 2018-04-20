export function format(num) {
    num = Number(num)
    //num = num.toString().replace(/\$|\,/g,'');
    if(isNaN(num)) num = 0;
    var sign = (num == (num = Math.abs(num)));
    num = Math.floor(num*100+0.50000000001);
    var cents = num%100;
    num = Math.floor(num/100).toString();
    if(cents<10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
        num = num.substring(0,num.length-(4*i+3))+','+
                num.substring(num.length-(4*i+3));
    return (((sign)?'':'-') + num + '.' + cents);
    
   //  if(!value) return '0.00';
   // var intPart = Number(value).toFixed(0); //获取整数部分
   // var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
   // var floatPart = ".00"; //预定义小数部分
   // var value2Array = value.split(".");
   // //=2表示数据有小数位
   // if(value2Array.length == 2) {
   //  floatPart = value2Array[1].toString(); //拿到小数部分
   //  if(floatPart.length == 1) { //补0,实际上用不着
   //   return intPartFormat + "." + floatPart + '0';
   //  } else {
   //   return intPartFormat + "." + floatPart;
   //  }
   // } else {
   //  return intPartFormat + floatPart;
   // }
}
//售卖单位转换
export function sellNnit(value) {
    let unit = {
        unit_jin:'斤',
        unit_kg:'公斤',
        unit_pie:'件',
        unit_cbd:'公担'
    }
    return unit[value]
}

//订单类型
export function order(value) {
    let order = {
        order_knot:'现结订单',
        order_credit:'赊账订单',

    };
    return order[value]
}

//支付|支出方式
export function paymentWay(value) {
    let pay = {
        type_alipay:'支付宝',
        type_wechat:'微信',
        type_cash:'现金',
        type_card:'银行卡',

    };
    return pay[value]
}
