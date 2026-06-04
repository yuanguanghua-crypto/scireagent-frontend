import '@testing-library/jest-dom'
import { configure } from '@vue/test-utils'
import { config } from '@vue/test-utils'

// Element Plus mock
config.global.stubs = {
  'el-icon': true,
}
