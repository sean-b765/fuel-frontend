import React from 'react'
import GoogleMapReact from 'google-map-react'
import Marker from './Marker'
import presence from '../variants/presence'
import { motion } from 'framer-motion'

const NearestStation = ({ nearestStation }) => {
	return (
		<motion.div
			variants={presence}
			initial="initial"
			exit="exit"
			animate="animate"
			className="nearest"
		>
			<header>
				<h1>{nearestStation['trading-name']}</h1>
				<p className="mono price">{nearestStation.price}</p>
				{nearestStation.duration && nearestStation.distance && (
					<p>
						{nearestStation.distance}, ~{nearestStation.duration}
					</p>
				)}
				<a
					href={`https://www.google.com/maps/search/?api=1&query=${nearestStation.address}, ${nearestStation.location}`}
					target="_blank"
				>
					<svg
						strokeWidth="0"
						version="1.2"
						baseProfile="tiny"
						viewBox="0 0 24 24"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M10.368 19.102c.349 1.049 1.011 1.086 1.478.086l5.309-11.375c.467-1.002.034-1.434-.967-.967l-11.376 5.308c-1.001.467-.963 1.129.085 1.479l4.103 1.367 1.368 4.102z"></path>
					</svg>
					{nearestStation.address}, {nearestStation.location}
				</a>
			</header>
			<div style={{ height: '300px', width: '100%' }} className="map-preview">
				<GoogleMapReact
					zoom={17}
					defaultCenter={{
						lat: nearestStation.latitude,
						lng: nearestStation.longitude,
					}}
					center={{
						lat: nearestStation.latitude,
						lng: nearestStation.longitude,
					}}
					bootstrapURLKeys={{
						key: 'AIzaSyCrSxicHtmCKnLLuwix7ITt4QFC5E0bKp0',
					}}
				>
					<Marker
						lat={nearestStation.latitude}
						lng={nearestStation.longitude}
						text={`${nearestStation.price}`}
					></Marker>
				</GoogleMapReact>
			</div>
		</motion.div>
	)
}

export default NearestStation
