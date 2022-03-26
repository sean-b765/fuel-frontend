const Marker = ({ text }) => {
	const block = 10
	return (
		<div
			style={{
				width: `${block}px`,
				height: `${block}px`,
				borderRadius: '50%',
				background: '#ff0000',
				position: 'relative',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				color: '#FFFFFF',
				fontSize: '1rem',
			}}
			className="mono"
		></div>
	)
}

export default Marker
