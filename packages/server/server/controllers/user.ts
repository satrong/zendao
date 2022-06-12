import { promisify } from 'node:util'
import { db } from '../../db';

export async function getUsers() {
 return promisify<string, any[]>(db.all.bind(db))('SELECT * FROM user')
}
