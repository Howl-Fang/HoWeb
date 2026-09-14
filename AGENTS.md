# AGENTS.md

## Commit 规范

- 所有修改都必须 commit，不要留下未提交的改动。
- 同一次会话中如果有不同类型的修改（如 fix、feat、refactor、style、docs、chore），必须按类型分别 commit，禁止混在同一个 commit 中。
- Commit message 使用 `<type>(<scope>): <description>` 格式，例如 `fix(hero): ...`、`docs: ...`。

## 项目

- `src/`：网站工作目录（Vite + React + TypeScript），构建、lint、测试都在该目录下执行：
  - `npm run build`
  - `npm run lint`
  - `npm run test`
- `documents/`：历史文档。
