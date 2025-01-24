// teardown.js
import {
  existsSync,
  unlinkSync,
} from 'fs';
import path from 'path';

export default async config => {
  console.log('\n*&*&*&*&*& -- global teardown starting -- &*&*&*&*&*')
  const { projects: { 0: { use: { storageState = 'storage.json' } } } } = config

  console.log('-- deleting localStorage file')
  const storageFile = path.resolve('.', storageState)
  if (existsSync(storageFile)) {
    unlinkSync(storageFile)
  }
  console.log('*&*&*&*&*& -- global teardown finished -- &*&*&*&*&*\n')
}
