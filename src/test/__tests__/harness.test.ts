import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

describe('Basic test harness', () => {
  it('vitest works', () => {
    expect(1 + 1).toBe(2)
  })

  it('can mount a simple component', () => {
    const wrapper = mount({
      template: '<div class="hello">Hello</div>',
    })
    expect(wrapper.text()).toBe('Hello')
    expect(wrapper.classes()).toContain('hello')
  })
})
