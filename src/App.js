import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { fetchNearest } from './api/api'
import NearestStation from './components/NearestStation'
import StationList from './components/StationList'
import Loading from './components/Loading'
import { AnimatePresence } from 'framer-motion'
import { DebounceInput } from 'react-debounce-input'
import Emitter from './services/eventemitter'
import LoadingSVG from './components/LoadingSVG'

function App() {
	const [location, setLocation] = useState({ lat: null, lng: null })
	const [nearestStation, setNearestStation] = useState(null)
	const [stations, setStations] = useState([])
	const [radius, setRadius] = useState(5)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((pos) => {
				setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
			})
		}

		Emitter.on('AXIOS_START', () => {
			setLoading((state) => true)
		})
		Emitter.on('AXIOS_STOP', () => {
			setLoading((state) => false)
		})

		// cleanup
		return () => {}
	}, [])

	useEffect(() => {
		if (!location.lat || !location.lng) return

		fetchNearest(`${location.lat},${location.lng}`, radius)
			.then((res) => {
				setStations(res.result || [])
				setNearestStation(res.nearest)
			})
			.catch((err) => {})
	}, [location, radius])

	const updateRadius = useCallback((r) => {
		if (r === 0) return
		setRadius(r)
	}, [])

	return (
		<main>
			<AnimatePresence exitBeforeEnter>
				{location.lat ? (
					nearestStation ? (
						<>
							<div
								className={
									!loading
										? 'loading-indicator'
										: 'loading-indicator loading-indicator-showing'
								}
							>
								<LoadingSVG />
							</div>
							<div className="controls">
								<label htmlFor="radius">Radius (km)</label>
								<DebounceInput
									debounceTimeout={500}
									name="radius"
									type={'number'}
									placeholder="5"
									min="1"
									max="70"
									value={radius}
									onChange={(e) => updateRadius(Number(e.target.value))}
								/>
							</div>
							<NearestStation nearestStation={nearestStation} />
							<StationList stations={stations} />
						</>
					) : (
						<Loading />
					)
				) : (
					<div className="no-location">Please Allow Location Services</div>
				)}
			</AnimatePresence>
		</main>
	)
}

export default App
