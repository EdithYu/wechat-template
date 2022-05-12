// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
import {request}  from '../utils/util.js'
Vue.use(Vuex)
const store = new Vuex.Store({
			// #endif

			// #ifdef VUE3
			import {
				createStore
			} from 'vuex'
			const store = createStore({
				// #endif
				state: {
					hasLogin: false, //判断是否登陆的信息 ,默认是false
					locationInformation: '未授权', //定位信息，默认芜湖市
					currentLatitude: '31.359028', // 当前经度，默认芜湖市政府
					currentLongitude: '117.184506', // 当前维度，默认芜湖市政府
					whitelistInfo: [], //白名单信息

				},
				mutations: {
					login(state, provider) {
						state.hasLogin = true;
						state.loginProvider = provider;
					},
					logout(state) {
						state.hasLogin = false
						state.openid = null
					},
					setOpenid(state, openid) {
						state.openid = openid
					},
					setTestTrue(state) {
						state.testvuex = true
					},
					setTestFalse(state) {
						state.testvuex = false
					},
					setColorIndex(state, index) {
						state.colorIndex = index
					},
					setMatchLeftWindow(state, matchLeftWindow) {
						state.noMatchLeftWindow = !matchLeftWindow
					},
					setActive(state, tabPage) {
						state.active = tabPage
					},
					setLeftWinActive(state, leftWinActive) {
						state.leftWinActive = leftWinActive
					},
					setActiveOpen(state, activeOpen) {
						state.activeOpen = activeOpen
					},
					setMenu(state, menu) {
						state.menu = menu
					},
					setUniverifyLogin(state, payload) {
						typeof payload !== 'boolean' ? payload = !!payload : '';
						state.isUniverifyLogin = payload;
					},
					setUniverifyErrorMsg(state, payload = '') {
						state.univerifyErrorMsg = payload
					},
					setWhitelistInfo(state, data) {
						state.whitelistInfo = data
					},
					getLocation(state, data) {
						console.log('获取到了返回的地理位置信息' + data)
						if (data['address_component']) {
							state.locationInformation = data['address_component'][
								'city'] //接受actions分发的信息并修改state中的数值
							state.currentLatitude = data['location']['lat']
							state.currentLongitude = data['location']['lng']
						} else {
							state.locationInformation = '芜湖市'
						}
					},
				},
				getters: {
					currentColor(state) {
						return state.colorList[state.colorIndex]
					}
				},

				actions: {
					// lazy loading openid
					getUserOpenId: async function({
						commit,
						state
					}) {
						return await new Promise((resolve, reject) => {
							if (state.openid) {
								resolve(state.openid)
							} else {
								uni.login({
									success: (data) => {
										commit('login')
										setTimeout(function() { //模拟异步请求服务器获取 openid
											const openid = '123456789'
											console.log(
												'uni.request mock openid[' +
												openid + ']');
											commit('setOpenid', openid)
											resolve(openid)
										}, 1000)
									},
									fail: (err) => {
										console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务',
											err)
										reject(err)
									}
								})
							}
						})
					},
					getPhoneNumber: function({
						commit
					}, univerifyInfo) {
						return new Promise((resolve, reject) => {
							uni.request({
								url: 'https://97fca9f2-41f6-449f-a35e-3f135d4c3875.bspapp.com/http/univerify-login',
								method: 'POST',
								data: univerifyInfo,
								success: (res) => {
									const data = res.data
									if (data.success) {
										resolve(data.phoneNumber)
									} else {
										reject(res)
									}

								},
								fail: (err) => {
									reject(res)
								}
							})
						})
					},
					getWhitelistInfo: async function(context, data) {
						//获取白名单
						return await  request(getWhitelist,
							data, 'POST').then(res => {
								context.commit("setWhitelistInfo", res.data.data)		
						})				
					},
					// 获取定位信息
					getLocation(context, data) {
						return new Promise((resolve, reject) => {
							let _this = data;
							uni.getLocation({
								type: 'gcj02', //返回可以用于uni.openLocation的经纬度
								success: function(res) {
									console.log('获取到了经纬度' + res)
									const latitude = res.latitude;
									const longitude = res.longitude;
									let options = { //获取当前用户授权的经纬度
										latitude: res.latitude,
										longitude: res.longitude,
									}
									uni.setStorageSync('currentLatitude', latitude)
									uni.setStorageSync('currentLongitude', longitude)
									_this.$map.reverseGeocoder({
										//   芜湖市的经纬度，用户没有授权的话默认经纬度是芜湖市
										//   location:{
										//       latitude:'31.359028',
										//       longitude:':117.184506',
										//   }
										// */
										location: options || {
											latitude: '31.359028',
											longitude: '117.184506',
										}, //获取表单传入的位置坐标,不填默认当前位置,示例为string格式 
										success: function(res) { //成功后的回调
											console.log('获取到了地理位置' + res)
											context.commit("getLocation", res
												.result)

											resolve(res)
										},
										fail: function(error) {
											console.error(error);
										},
										complete: function(res) {

										}
									})


								},
								fail(error) {
									console.log(error)
									let getLocationAuth = function() {
										uni.getSetting({
											success(res) {
												if (res.authSetting[
														'scope.userLocation']) {
													return;
												} else {
													uni.showModal({
														content: '检测到您没打开获取位置功能权限，是否去设置打开？',
														confirmText: "确认",
														cancelText: '取消',
														success: (res) => {
															if (res
																.confirm
																) {
																uni.openSetting({
																	success: (
																		res
																		) => {
																		if (res
																			.authSetting[
																				'scope.userLocation'
																				]
																			) {
																			uni.showToast({
																				title: '授权成功',
																				icon: 'none',
																				success: function() {
																					uni.getLocation({
																						type: 'gcj02', //返回可以用于uni.openLocation的经纬度
																						isHighAccuracy: true,
																						success: function(
																							res
																							) {
																							const
																								latitude =
																								res
																								.latitude;
																							const
																								longitude =
																								res
																								.longitude;
																							let options = { //获取当前用户授权的经纬度
																								latitude: res
																									.latitude,
																								longitude: res
																									.longitude,
																							}
																							_this
																								.$map
																								.reverseGeocoder({
																									//   芜湖市的经纬度，用户没有授权的话默认经纬度是芜湖市
																									//   location:{
																									//       latitude:'31.359028',
																									//       longitude:':117.184506',
																									//   }
																									// */
																									location: options ||
																									{
																										latitude: '31.359028',
																										longitude: '117.184506',
																									}, //获取表单传入的位置坐标,不填默认当前位置,示例为string格式 
																									success: function(
																										res
																										) { //成功后的回调
																										context
																											.commit(
																												"getLocation",
																												res
																												.result
																												)

																										resolve
																											(
																												res)
																									},
																									fail: function(
																										error
																										) {
																										console
																											.error(
																												error
																												);
																									},
																									complete: function(
																										res
																										) {

																									}
																								})


																						},
																					})
																				}
																			})
																		} else {
																			getLocationAuth
																				()
																		}
																	},
																	fail: (
																		err) => {
																		console
																			.log(
																				err
																				)
																	}
																})
															} else {
																getLocationAuth
																	()
															}
														}
													})
												}
											},
											fail(res) {
												console.error(error);
											}
										})
									}

									getLocationAuth()
								}
							});
						})
					},

					//  下拉刷新
					enablePullDownRefresh(context, payload) {
						payload.this.$utils.request(payload.this.url, payload.data, 'GET').then((res) => {
							payload.this.list = res.data.data


						}).catch((error) => {
							console.log(error)
						})
					},

					//  上拉加载数据
					pullLoading(context, payload) {
						payload.this.$utils.request(payload.this.url, payload.data, 'GET').then((res) => {
							res.data.data.map(item => {
								payload.this.list.push(item)
							})
						}).catch((error) => {
							console.log(error)
						})
					},
					// 获取订阅授权设置
					getSubscribe() {
						uni.getSetting({
							withSubscriptions: true,
							success(res) {
								uni.setStorageSync('isSubscribe', true);
								if (!res.subscriptionsSetting.itemSettings) {
									uni.setStorageSync('isSubscribe', false);
								}
								for (let i in res.subscriptionsSetting.itemSettings) {
									if (res.subscriptionsSetting.itemSettings[
											i] === 'reject') {
										uni.setStorageSync('isSubscribe', false);
									}
								}

							}
						})
					}
				}
			})

			export default store
