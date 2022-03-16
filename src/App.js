import { useEffect, useLayoutEffect, useState } from 'react'
import './App.css'
import { fetchNearest } from './api/api'
import NearestStation from './components/NearestStation'
import StationList from './components/StationList'
import Loading from './components/Loading'
import { AnimatePresence } from 'framer-motion'

function App() {
	const [location, setLocation] = useState({ lat: null, lng: null })
	const [nearestStation, setNearestStation] = useState(null)
	const [stations, setStations] = useState([])
	const [radius, setRadius] = useState(5)

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((pos) => {
				setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
			})
		}
	}, [])

	useEffect(() => {
		if (!location.lat || !location.lng) return

		fetchNearest(`${location.lat},${location.lng}`, radius)
			.then((res) => {
				setStations(res.result || [])
				setNearestStation(res.nearest)
				console.log(res.nearest)
			})
			.catch((err) => {})
	}, [location, radius])

	return (
		<main>
			<AnimatePresence exitBeforeEnter>
				{location.lat ? (
					nearestStation ? (
						<>
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
