import { Station } from "./station"

export type FetchNearestResponse = {
    Date: string
    Stations: Station[]
}