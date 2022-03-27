export * from './bcrypt';
export * from './errorHandler';
export * from './logger';
import {DateTime} from 'luxon';
import {customAlphabet} from 'nanoid';
import {v4} from 'uuid';
export function generateUuid() {
  // Generate UUID
  return v4();
}

export function getTimestamp() {
  // Generate current time stamp in unix time stamp format
  return Math.floor(DateTime.local().toSeconds());
}
export function Shortid() {
  const nanoid = customAlphabet(
    '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    7,
  );

  return nanoid();
}
