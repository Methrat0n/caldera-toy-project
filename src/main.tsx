import React from 'react'
import DefaultDatabaseClient from './clients/DatabaseClient'
import DefaultTickCommand from './commands/TickCommand'
import DefaultTickQuery from './queries/TickQuery'
import { renderCalderaApp } from 'caldera'

import App from './pages'

//TODO conf
const databaseClient = DefaultDatabaseClient('test', 'localhost', 'test', 'unsafe', 5432)

const tickCommand = DefaultTickCommand(databaseClient)
const tickQuery = DefaultTickQuery(databaseClient)
const Pages = App(tickCommand, tickQuery)

renderCalderaApp(<Pages />, { port: 4000 });