import * as util from 'util';
import { exec } from 'child_process';
const pExec = util.promisify(exec);

export default async function resetDevDb(command: string = 'npx prisma migrate reset --force') {
  const { stdout } = await pExec(command);
  console.log( stdout );
}