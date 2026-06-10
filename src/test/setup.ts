import '@testing-library/jest-dom'
import { config } from '@vue/test-utils'

// Element Plus mock
config.global.stubs = {
  'el-icon': true,
}
