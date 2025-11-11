import * as argon2 from "argon2";

/**
 * Encrypts plain string
 * @param str {string}
 * @returns Promise<string> Returns encrypted
 */
async function encrypt(str: string): Promise<string> {
  return await argon2.hash(str);
}

/**
 * Compares encrypted and provided string
 * @param plain {string}
 * @param encrypted {string}
 * @returns Promise<boolean> Returns Boolean if provided string and encrypted string are equal
 */
async function compare(plain: string, encrypted: string): Promise<boolean> {
  return await argon2.verify(encrypted, plain);
}

export { compare, encrypt };
