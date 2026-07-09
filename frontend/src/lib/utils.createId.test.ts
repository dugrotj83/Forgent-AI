import { describe, expect, it, vi, afterEach } from 'vitest';
import { createId } from './utils'

describe('createId', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('uses crypto.randomUUID when available', () => {
    vi.stubGlobal('crypto', {
      randomUUID: () => '11111111-2222-4333-8444-555555555555',
      getRandomValues: (arr: Uint8Array) => arr,
    })
    expect(createId()).toBe('11111111-2222-4333-8444-555555555555')
  })

  it('falls back when randomUUID is missing (insecure HTTP context)', () => {
    vi.stubGlobal('crypto', {
      getRandomValues: (arr: Uint8Array) => {
        for (let i = 0; i < arr.length; i++) arr[i] = i
        return arr
      },
    })
    const id = createId()
    expect(id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    )
  })

  it('falls back further when crypto is unavailable', () => {
    vi.stubGlobal('crypto', undefined)
    const id = createId()
    expect(id.startsWith('fg-')).toBe(true)
    expect(id.length).toBeGreaterThan(8)
  })
})
