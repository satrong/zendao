import sqlite3 from 'sqlite3'
import path from 'node:path'

export const db = new sqlite3.Database(path.resolve('zentao.sqlite'));

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS user (
      uid TEXT,
      account TEXT,
      name TEXT
    )
  `)

  db.run(`CREATE UNIQUE INDEX IF NOT EXISTS user_uid ON user (uid)`)

  db.run(`
    CREATE TABLE IF NOT EXISTS task (
      uid TEXT,
      labelId TEXT,
      title TEXT,
      usedTime NUMERIC,
      finishTime NUMERIC
    )
  `)

  db.run(`CREATE UNIQUE INDEX IF NOT EXISTS task_labelId ON task (labelId)`)
});