import axios from 'axios'
import Emitter from '../services/eventemitter'

const API = axios.create({ baseURL: `https://fuel-perth.herokuapp.com` })

API.interceptors.request.use((req) => {
	Emitter.emit('AXIOS_START', true)
	return req
})
API.interceptors.response.use(
	(res) => {
		Emitter.emit('AXIOS_STOP', true)
		return res
	},
	(err) => {
		Emitter.emit('AXIOS_STOP', false)
		throw err
	}
)

export async function fetchNearest(coords, radius) {
	try {
		return (await API.get(`/nearestAndCheapest/${coords}?radius=${radius}`))
			.data
	} catch (err) {
		return err
	}
}
