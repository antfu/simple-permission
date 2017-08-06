import test from 'ava';
import p from '../dist'

test('check empty', t => {
  t.true(p.check())
  t.true(p.check('', ''))
  t.true(p.check([]))
  t.true(p.check([], []))
  t.true(p.check([], ''))
})

test('api', t => {
  t.true(p.request(['a.b.c', 'a.c.d']).provide(['a.c.d', 'a.b.c']))
  t.true(p.provide(['a.b.c', 'a.c.d']).request(['a.c.d', 'a.b.c']))

  t.true(p.request('a.b.c').provide(['a.c.d', 'a.b.c']))
  t.true(p.provide(['a.b.c', 'a.c.d']).request('a.b.c'))

  t.false(p.request(['a.b.c', 'a.c.d']).provide('a.b.c'))
  t.false(p.provide('a.b.c').request(['a.c.d', 'a.b.c']))
})
