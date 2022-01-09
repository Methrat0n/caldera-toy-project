import { Pool } from 'pg'

type ColumnName = string
export interface DatabaseClient {
  execute: (name: string, query: string, values?: ReadonlyArray<unknown>) => Promise<ReadonlyArray<Record<ColumnName, unknown>>>
}

export default (
  user: string,
  host: string,
  database: string,
  password: string,
  port: number
): DatabaseClient => {
  const pool = new Pool({user,host,database,password,port})

  return {
    execute: (name: string, query: string, values?: ReadonlyArray<unknown>): Promise<ReadonlyArray<Record<ColumnName, unknown>>> =>
      pool.connect().then(client =>
        client
          .query({name, text: query, values: values as any[]})
          .then(result => result.rows)
          .finally(() => client.release())
      )
  }
}