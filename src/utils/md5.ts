import { Md5 } from 'ts-md5';

const salt = 'TestSort';

function crypto(password: string): string {
  return new Md5().appendStr(salt).appendStr(password).end().toString();
}

export default crypto;
