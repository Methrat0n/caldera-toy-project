import type { DatabaseClient } from '../clients/DatabaseClient'
import type { Tick } from '../domains/tick'

import TickConstructor from '../domains/tick'

export interface TickQuery {
  readTick: () => Promise<Tick>
}

export default (database: DatabaseClient): TickQuery => ({
  readTick: () =>
    database.execute('readTick', "SELECT id, numberOf FROM ticks where id = $1", [0])
      .then(rows => TickConstructor((rows[0]?.['id'] ?? 0) as number, (rows[0]?.['numberof'] ?? 0) as number))
})