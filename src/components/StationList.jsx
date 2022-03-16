import React from 'react'
import presence from '../variants/presence'
import { motion } from 'framer-motion'

const StationList = ({ stations }) => {
	return (
		<motion.div
			variants={presence}
			initial="initial"
			exit="exit"
			animate="animate"
			className="stations"
		>
			<h2>Next Cheapest in Your Area</h2>
			<section className="stations_container">
				{stations.map((station, key) => {
					return (
						<div key={key} className="station">
							<p className="mono price">{station.price}</p>
							<header>
								<h3>{station['trading-name']}</h3>

								{station.distance && station.duration && (
									<p>
										{station.distance}, ~{station.duration}
									</p>
								)}
								<a
									href={`https://www.google.com/maps/search/?api=1&query=${station.address}, ${station.location}`}
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
									{station.address}, {station.location}
								</a>
							</header>
						</div>
					)
				})}
			</section>
		</motion.div>
	)
}

export default StationList
