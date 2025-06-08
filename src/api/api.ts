import axios from "axios"
import Emitter from "../services/eventemitter"
import { FetchNearestResponse } from "../types/dto"
import { Journey } from "../types/util"

const API = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
})

API.interceptors.request.use((req: any) => {
  Emitter.emit("AXIOS_START", true)
  return req
})
API.interceptors.response.use(
  (res: any) => {
    Emitter.emit("AXIOS_STOP", true)
    return res
  },
  (err: Error) => {
    Emitter.emit("AXIOS_STOP", false)
    throw err
  }
)

export async function fetchNearest(
  coords: string,
  radius: number | string
): Promise<FetchNearestResponse | Error> {
  try {
    return (await API.get(`/cheapest/${coords}?radius=${radius}`)).data
  } catch (err) {
    return err as Error
  }
}

export async function fetchJourney(
  origin: string,
  destination: string
): Promise<Journey | Error> {
  try {
    return (
      await API.get(`/journey?origin=${origin}&destination=${destination}`)
    ).data
  } catch (err) {
    return err as Error
  }
}
