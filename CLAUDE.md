# SciReagent — 编码规范

## 框架与语言
- 前端: Vue 3 + TypeScript + Vite + Tailwind CSS v4
- 后端: Django 5.1 + Django REST Framework
- 数据库: SQLite (开发) / PostgreSQL (生产)

## 必须遵守的规则

### TypeScript
- 禁止 `any` 类型 — 所有变量必须有明确类型
- 接口定义在 `src/types/index.ts`
- 新功能先定义类型，再写逻辑
- Props 必须用 `defineProps<{...}>()` 语法

### Vue 组件
- 单文件组件不超过 300 行 — 超过就拆分子组件
- `<script setup lang="ts">` 统一使用
- 组件文件名 PascalCase (`ProductCard.vue`)
- 页面文件名 PascalCase + Page 后缀 (`CategoryPage.vue`)
- 可复用逻辑抽到 `src/composables/`
- API 调用统一在 `src/api/index.ts`

### CSS / 样式
- 颜色必须使用 `tokens.css` 中的 CSS 变量，禁止硬编码色值
- 禁止 `style="background: #xxx"` 内联颜色
- 允许 `style="color:var(--color-text-primary)"` 使用令牌
- 间距用 `tokens.css` 的 `--space-*` 变量或 Tailwind 类
- 组件内 `<style scoped>` 仅在必要时使用

### Django 后端
- 新模型添加后必须运行 `makemigrations` + `migrate`
- API 返回格式统一: DRF Response
- 公开 API 无需认证，写操作 API 需认证
- 查询用 `select_related` / `prefetch_related` 避免 N+1
- 每个视图函数顶部加 docstring 说明用途

### 命名规范
- 文件/目录: kebab-case (`product-card.vue`, `use-seo.ts`)
- Vue 组件导入: PascalCase
- CSS 类名: kebab-case
- 后端 Python: snake_case
- 数据库字段: snake_case

### 修改代码前必须
1. 先理解现有逻辑，不要推倒重写
2. 小步修改，每次改完验证 `npm run build` 通过
3. 新功能先确认后端 API 是否已有接口
4. 复用现有 composables (`useSeo`, `useCart`)
5. 修改模型后立即更新 serializer 和 admin

### 禁止事项
- ❌ 使用 `alert()` — 用 Toast 组件
- ❌ 使用 `any` 类型
- ❌ 内联样式硬编码色值
- ❌ 复制粘贴代码 — 抽取为组件/composable
- ❌ 提交 `.env` / 密钥文件
- ❌ 在生产数据库上直接操作
- ❌ 使用 `!important` 除非绝对必要
- ❌ 删除或覆盖别人写的代码而不理解其用途

### 提交规范
- 一个提交只做一件事
- 提交信息用中文: `fix: 修复分类页 0 产品问题`
- 最常见的格式: `feat:` / `fix:` / `refactor:` / `style:` / `docs:`
