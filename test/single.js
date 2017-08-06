import test from 'ava';
import {
  singleCheck
} from '../dist'

test('single', t => {
  // singleCheck(requests, provides)
  t.true(singleCheck())
  t.true(singleCheck(''))
  t.true(singleCheck('', ''))
  t.true(singleCheck('a.b.c', 'a.b.c'))
  t.true(singleCheck('a.b.c', 'a.b.*'))
  t.true(singleCheck('a.b.c', 'a.*'))
  t.true(singleCheck('a.b.c', '*'))


  t.false(singleCheck('a.b.c', 'a.c.b'))
  t.false(singleCheck('a.b.c', 'a.b.c.d'))
  t.false(singleCheck('a.b.c.d', 'a.b.c'))
})
