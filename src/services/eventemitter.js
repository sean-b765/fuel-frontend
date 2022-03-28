/*
  https://gist.github.com/sean-b765/c2b1910b0ad3b2ebb6409faedf1d879c
*/
import Events from 'events'

const eventEmitter = new Events()

const Emitter = {
	on: (e, fn) => eventEmitter.on(e, fn),
	once: (e, fn) => eventEmitter.once(e, fn),
	off: (e, fn) => eventEmitter.off(e, fn),
	emit: (e, fn) => eventEmitter.emit(e, fn),
}

// prevent new properties being added
Object.freeze(Emitter)

export default Emitter
