import type { FC} from 'react'
import type { TickCommand } from '../commands/TickCommand'
import type { TickQuery} from '../queries/TickQuery'
import type { Tick } from '../domains/tick'

import React, { useEffect, useState } from 'react'
import { Head } from 'caldera'

const useTick = (tickCommand: TickCommand, tickQuery: TickQuery): [tick: Tick | undefined, setTick: (tick: Tick) => void, error: Error | undefined] => {
  const [tick, setTick] = useState<Tick>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    tickQuery
      .readTick()
      .then(setTick)
      .catch(setError)
  }, [tickQuery, setTick, setError])

  const upsertTick = (tick: Tick): void => {
    tickCommand.writeTick(tick)
      .then(() => setTick(tick))
      .catch(setError)
  }

  return [tick, upsertTick, error]
}

export default (tickCommand: TickCommand, tickQuery: TickQuery): FC => () => {
  const [tick, setTick, tickError] = useTick(tickCommand, tickQuery)

  if(tickError !== undefined)
    console.error(tickError)

  return (
    <>
      <Head>
        <link href="/build.css" rel="stylesheet" />
      </Head>
      {tick === undefined ? 
        <>"Loading"</> :
        <>
          <span className='font-bold underline'>{"value :"+ tick.value}</span>
          <button type="button" onClick={() => setTick({...tick, value: tick.value + 1})}>+</button>
          <button type="button" onClick={() => setTick({...tick, value: tick.value - 1})}>-</button>
        </>
      }
    </>
  )
}