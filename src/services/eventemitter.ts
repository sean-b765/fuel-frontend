/*
  https://gist.github.com/sean-b765/c2b1910b0ad3b2ebb6409faedf1d879c
*/
import Events from "events"
import { GlobalEmits } from "../types/util"

const eventEmitter = new Events()

const Emitter = {
  on: (e: GlobalEmits, fn: (...args: any[]) => void) => eventEmitter.on(e, fn),
  once: (e: GlobalEmits, fn: (...args: any[]) => void) => eventEmitter.once(e, fn),
  off: (e: GlobalEmits, fn: (...args: any[]) => void) => eventEmitter.off(e, fn),
  emit: (e: GlobalEmits, fn: any) => eventEmitter.emit(e, fn),
}

// prevent new properties being added
Object.freeze(Emitter)

export default Emitter
