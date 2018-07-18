const maxlength = 50;
const maxTextare = 420;
const maxNumber = 12;
const checkNumber = (rule, value, callback) => {
	if (value != '') {
		var myreg = /^\d+(?:.\d{1,2})?$/;
		var ref= /^\d+(\.\d+)?$/;
		if(!ref.test(value)){
			callback(new Error('输入数字'));
		}
		else if (value<0) {
			callback(new Error('输入金额应不小于0'));
		}
		else if(value>999.99){
			callback(new Error('输入值应小于999.99'));
		}
		else if(!myreg.test(value)) {
			callback(new Error('小数点后只能输入两位小数'));
		}else{
			callback();
		}
	} else {
		callback();
	}
}
const checkTeleMoney = (rule, value, callback) => {
	if (value != '') {
		var myreg = /^\d+(?:.\d{1,2})?$/;
		//var ref= /^[0-9]+.?[0-9]*$/;
		var ref= /^\d+(\.\d+)?$/;
		if(!ref.test(value)){
			callback(new Error('输入数字'));
		}
		else if (value<=0) {
			callback(new Error('输入金额应大于0'));
		}
		else if(value>99999999.99){
			callback(new Error('输入金额应小于99999999.99'));
		}
		else if(!myreg.test(value)) {
			callback(new Error('小数点后只能输入两位小数'));
		}else{
			callback();
		}
	} else {
		callback();
	}
};
export default
{
	maxlength,
	maxTextare,
	maxNumber,
	checkTeleMoney,
	checkNumber
}