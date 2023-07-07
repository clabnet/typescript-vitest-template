/**
 * The following lines intialize dotenv,
 * so that env vars from the .env file are present in process.env
 */
import * as dotenv from 'dotenv';
dotenv.config();

export const sumMultiply = (a: number, b: number): number => {
  return (a + b) * 2;
};
