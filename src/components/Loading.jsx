import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import presence from '../variants/presence'
import LoadingSVG from './LoadingSVG'

const Loading = () => {
	return (
		<motion.div
			variants={presence}
			initial="initial"
			exit="exit"
			animate="animate"
			className="loading"
		>
			Loading
			<LoadingSVG />
		</motion.div>
	)
}

export default Loading
