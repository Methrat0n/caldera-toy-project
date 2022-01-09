import type { DatabaseClient } from '../clients/DatabaseClient'
import type { Tick } from '../domains/tick'

export interface TickCommand {
  writeTick: (tick: Tick) => Promise<void>
}

export default (database: DatabaseClient): TickCommand => ({
  writeTick: (tick: Tick) =>
    database.execute('writeTick', "INSERT INTO ticks(id, numberOf) VALUES($1, $2) ON CONFLICT (id) DO UPDATE SET numberOf = $3", [tick.id, tick.value, tick.value])
      .then(() => {})
})