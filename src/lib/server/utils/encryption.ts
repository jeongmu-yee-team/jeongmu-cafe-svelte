import * as bcrypt from 'bcrypt';
import { sha256 } from 'js-sha256';

const PRE_SALT = '93a=:kBf,Xhd]*';

export async function getEncryptPassword(plainText: string) {
  const secureHash = sha256(`${PRE_SALT}${plainText}${process.env.PASSWORD_SALT}`);
  const bcryptSalt = bcrypt.genSaltSync(14, 'b');
  const encrypted = bcrypt.hashSync(secureHash, bcryptSalt);
  return encrypted;
}

export async function comparePassword(plainText: string, encryptedText: string) {
  const secureHash = sha256(`${PRE_SALT}${plainText}${process.env.PASSWORD_SALT}`);
  const compare = bcrypt.compareSync(secureHash, encryptedText);
  return compare;
}
