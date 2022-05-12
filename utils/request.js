export default class Request {
	static headers = {}
	static config(params) {
		Request.headers = params.headers
	}

	static get(url, data, option) {
		return Request.request('GET', url, data, option)
	}

	static post(url, data, option) {
		return Request.request('POST', url, data, option)
	}

	static delete(url, data, option) {
		return Request.request('DELETE', url, data, option)
	}

	static put(url, data, option) {
		return Request.request('PUT', url, data, option)
	}

	static request(method, url, data, option = {}) {
		let task
		const p = new Promise((resolve, reject) => {
			const opt = { ...option
			}
			opt.header = Object.assign({}, Request.headers, option.headers || {})
			task = uni.request({
				url,
				data,
				method,
				...opt,
				
				success(res) {
					const {
						statusCode
					} = res
					const {
						code,
						message,
						data,
						response
					} = res.data

					if (code === 0 || code === 200) {
						return resolve(data || response)
					}

					const err = new Error(message)

					if (!opt.silent) {
						processErr(err, code || statusCode)
					}

					return reject(err)
				},
				fail(err) {
					console.log('请求出错:', err)
					reject(err)
				}
			})
		})

		p.task = task

		return p
	}
}
