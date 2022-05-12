import moment from 'moment';

function formatTime(date) {
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();

	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();

	return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
}

function formatNumber(n) {
	n = n.toString();
	return n[1] ? n : '0' + n;
}
/**
 * 封装微信的的request
 */
function request(url, data = {}, method = 'GET', errCallBack = '') {

		return new Promise(function(resolve, reject) {
			
			uni.request({
				url: url,
				data: data,
				method: method,
				// withCredentials:true,
				header: {
					'Content-Type': 'application/json',
					// 'X-Token': "1e6b399238a74fa697e944bdc8e52072",
					'X-Token':localStorage.getItem('userToken')|| "",
					'thToken':localStorage.getItem('thToken') || "",
					'organize': null,
					'source':localStorage.getItem('source') || "",
					'os':localStorage.getItem('os') || "",
				},
				success: function(res) {
					if (res.statusCode == 200) {
						if (res.data.success) {
							resolve(res.data);
						}
					} else if (res.statusCode == 403) {
						reject(res.data);
						let source =  localStorage.getItem('source');
						//此处为处理app登录
						if(source == "iosApp" || source == "androidApp"){
							window.toNative('toLogin')
						}
						//根据环境判断全局处理未登录状态
						errCallBack && errCallBack();
					} else {
						reject(res)
						errCallBack && errCallBack();
					}
					
				},
				fail: function(err) {
					reject(err);
					uni.showToast({
						title: '网络异常',
						icon: 'none'
					});
					errCallBack && errCallBack();
				},
			});
		});
}
function get(url, data = {}, header) {
	return request(url, data, 'GET', header);
}

function post(url, data = {}, header) {
	return request(url, data, 'POST', header);
}
// 格式化倒计时
function getOverTime(timeString, paymentType, traceTime, traceType) {
	// 到期日期的时间戳
	let time;
	// 现在的时间戳 
	let now = Date.parse(new Date());
	let obtain = '';
	//未出场 到期-现在
	if (paymentType == 1) {
		//分钟
		if (traceType == 0) {
			//15*60*1000=900000
			time = traceTime * 60 * 1000;
			timeString = timeString + time;
		}
		//小时
		else if (traceType == 1) {
			time = traceTime * 60 * 60 * 1000;
			timeString = timeString + time;
		}
		// 时间戳间隔
		let interval = timeString - now;
		// 将时间段转换为时分秒
		obtain = fortime(interval, "计时")
	}
	//超时未出场  现在-最后一次支付时间
	else if (paymentType == 2) {
		// 时间戳间隔
		let interval = now - timeString;
		// 将时间段转换为时分秒
		obtain = fortime(interval, "时长")
	}
	return obtain;
}

// 计算时长
//type--时长（..小时..分钟）/计时 （..:..:）
function calculationTime(startTime, endTime,type) {
	//如果有结束时间 结束-开始
	let interval
	let obtain = '';
	if(endTime){
		// 时间戳间隔
		interval = endTime - startTime;
	}
	//没有结束时间 现在-开始
	else{
		// 现在的时间戳
		let now = Date.parse(new Date());
		interval = now - startTime;
	}
	if(type){
		obtain = fortime(interval, type);
	}
	else{
		// 将时间段转换为时分秒
		obtain = fortime(interval, "计时")
	}
	// 将时间段转换为时分秒
	obtain = fortime(interval, "计时")
	return obtain;
}

// 将倒计时时间戳转换为时分秒
function fortime(sj, type) {
	var day = parseInt(sj / (1000 * 60 * 60 * 24))
	var hours = parseInt((sj % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = parseInt((sj % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = parseInt((sj % (1000 * 60)) / 1000);
	if (hours == 0 && minutes == 0 && seconds == 0) {
		return "00:00";
	}
	seconds = seconds < 10 && seconds >= 1 ? ('0' + seconds) : seconds;
	seconds = seconds <= 0 ? '00' : seconds;
	//计算停车时长
	if (type == "时长") {
		minutes = minutes < 10 && minutes >= 1 && hours != 0 ? ('0' + minutes) : minutes;
		minutes = minutes <= 0 ? '00' : minutes;
		if (day == 0) {
			if (hours == 0) {
				if (minutes == 0) {
					return 0 + '分钟';
				}
				return minutes + '分钟';
			}
			return hours + '小时' + minutes + '分钟';
		}
		return day + '天' + hours + '小时' + minutes + '分钟';
	} else if (type == "计时") {
		if(day>0){
			hours = day*24+hours;
		}
		minutes = minutes < 10 && minutes >= 1 ? ('0' + minutes) : minutes;
		minutes = minutes <= 0 ? '00' : minutes;
		if (hours == 0) {
			return minutes + ":" + seconds;
		}
		else{
			hours = hours < 10 && hours >= 1 ? ('0' + hours) : hours;
			hours = hours <= 0 ? '00' : hours;
			return hours + ":" + minutes + ":" + seconds;
		}
	}
}

//判断时间 -列表 
function commentTimeHandle(dateStr,formatTypeStr) {
	const formatType = formatTypeStr||"YYYY-MM-DD"
	var date = dateStr;
	var publishTime = Date.parse(moment(dateStr).format('YYYY/MM/DD')); //获取dataStr的秒数  打印结果--1536230820000 
	var nowTime = new Date(); //获取此时此刻日期的秒数
	nowTime = Date.parse(moment(nowTime).format('YYYY/MM/DD'));
	var day1 = parseInt(publishTime / (1000 * 60 * 60 * 24));
	var day2 = parseInt(nowTime / (1000 * 60 * 60 * 24));
	var diff_days = day2 - day1; // 一天86400秒 获取相差的天数 取整
	if (diff_days == 1) { //相差天数 0 < diff_days < 3 时, 直接返出
		return "昨天";
	} else if (diff_days == 0) {
		return "今天";
	} else {
		return moment(date).format(formatType);
	}
}

function debounce(func, wait, immediate) {
	console.log("点击节流");
	let timeout, args, context, timestamp, result;
	const later = function() {
		// 据上一次触发时间间隔
		const last = +new Date() - timestamp
		// 上次被包装函数被调用时间间隔last小于设定时间间隔wait
		if (last < wait && last > 0) {
			timeout = setTimeout(later, wait - last)
		} else {
			timeout = null
			// 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
			if (!immediate) {
				result = func.apply(context, args);
				if (!timeout) {
					context = args = null;
				}
			}
		}
	}
	return function(...args) {
		context = this
		timestamp = +new Date()
		const callNow = immediate && !timeout
		// 如果延时不存在，重新设定延时
		if (!timeout){
			timeout = setTimeout(later, wait);
		}
		if (callNow) {
			result = func.apply(context, args);
			context = args = null;
		}
		return result
	}
}

//将秒转换为时分秒 以毫秒为单位
function secondFormate(value) {
	let result = parseInt(value)
	let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
	let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
	let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
				 
	let res = '';
	if(h !== '00') res += `${h}小时`;
	if(m !== '00') res += `${m}分钟`;
	if(s != "00"){
		res += `${s}秒`;
	}
	return res;		   
}

module.exports = {
	formatTime,
	request,
	get,
	post,
	commentTimeHandle,
	getOverTime,
	fortime,
	calculationTime,
	debounce,
	secondFormate
};
