export type Permission = string | null | undefined
export type Permissions = string[] | string | null | undefined

export function singleCheck(request: Permission, provide: Permission): boolean {
  const partsRequest = (request || '').trim().split('.')
  const partsProvide = (provide || '').trim().split('.')

  for (let level = 0; level < partsRequest.length; level++) {
    if (partsProvide[level] === '*')
      return true
    if (partsRequest[level] !== partsProvide[level])
      return false
  }

  if (partsProvide.length > partsRequest.length)
    return false
  return true
}

export function check(requests: Permissions, provides: Permissions): boolean {
  requests = requests || []
  provides = provides || []
  if (!Array.isArray(requests))
    requests = [requests]
  if (!Array.isArray(provides))
    provides = [provides]

  for (const require of requests) {
    let passed = false
    for (const have of provides)
      if (singleCheck(require, have)) {
        passed = true
        break
      }
    if (!passed) return false
  }
  return true
}

export function request(requests: Permissions):
  { provide: (provides: Permissions) => boolean } {
  return {
    provide(provides: Permissions) {
      return check(requests, provides)
    }
  }
}

export function provide(provides: Permissions):
  { request: (requests: Permissions) => boolean } {
  return {
    request(requests: Permissions) {
      return check(requests, provides)
    }
  }
}

export default {
  request,
  provide,
  check,
}
