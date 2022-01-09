export interface Tick {
  id: number,
  value: number
}

export default (id: number, value: number) => ({id, value})