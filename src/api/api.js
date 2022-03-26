export async function fetchNearest(coords, radius) {
	return await (
		await fetch(
			`https://fuel-perth.herokuapp.com/nearestAndCheapest/${coords}?radius=${radius}`
		)
	).json()
}
