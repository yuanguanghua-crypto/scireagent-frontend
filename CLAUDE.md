# SciReagent — 前端编码规范

Vue 3 + TypeScript + Vite + Tailwind CSS v4。

## TypeScript

- 禁止 `any`，类型定义在 `src/types/index.ts`
- 新功能先定义类型，再写逻辑
- Props 用 `defineProps<{...}>()` 语法

## Vue 组件

- 单文件组件 ≤300 行，超过就拆分
- `<script setup lang="ts">` 统一使用
- 组件名 PascalCase（`ProductCard.vue`），页面加 `Page` 后缀
- 可复用逻辑抽到 `src/composables/`，API 调用统一在 `src/api/index.ts`
- 复用现有 composables（`useSeo`）和 Pinia stores（`useCartStore` in `src/stores/`）

## CSS

- 颜色必须用 `tokens.css` 的 CSS 变量，禁止硬编码色值
- 禁止内联 `style="color: #xxx"`，允许 `style="color: var(--...)`
- 间距用 `--space-*` 变量或 Tailwind 类
- 禁止 `!important`（除非绝对必要）

## 命名规范

- 文件/目录：kebab-case（`product-card.vue`）
- Vue 组件导入：PascalCase
- CSS 类名：kebab-case

## 禁止事项

- `alert()` — 用 Toast 组件
- `any` 类型
- 内联硬编码色值
- 复制粘贴代码
- 提交 `.env` / 密钥
- `!important`
- 删除或覆盖别人代码而不理解用途

## 提交规范

一个提交只做一件事，中文信息：`feat:` / `fix:` / `refactor:` / `style:` / `docs:`
