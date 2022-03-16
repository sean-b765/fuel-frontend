export async function fetchNearest(coords, radius) {
	return await (
		await fetch(
			`http://139.180.182.159/nearestAndCheapest/${coords}?radius=${radius}`
		)
	).json()
}
