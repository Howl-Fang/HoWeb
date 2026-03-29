# 字体本地化说明

## 概述
项目已将所有字体文件本地化，不再依赖 Google Fonts CDN。所有字体文件存储在 `public/fonts/` 目录中。

## 字体文件清单

| 文件名 | 大小 | 说明 |
|--------|------|------|
| `instrument-serif-regular.woff2` | 15 KB | Instrument Serif 常规字体 |
| `instrument-serif-italic.woff2` | 8.2 KB | Instrument Serif 斜体 |
| `noto-sans-sc-300.woff2` | 1.6 KB | Noto Sans SC weight 300 |
| `noto-sans-sc-400.woff2` | 1.6 KB | Noto Sans SC weight 400 |
| `noto-sans-sc-500.woff2` | 1.6 KB | Noto Sans SC weight 500 |
| `noto-serif-sc-400.woff2` | 1.6 KB | Noto Serif SC weight 400 |
| `noto-serif-sc-600.woff2` | 1.6 KB | Noto Serif SC weight 600 |
| `source-sans-3-300.woff2` | 1.6 KB | Source Sans 3 weight 300 |
| `source-sans-3-400.woff2` | 1.6 KB | Source Sans 3 weight 400 |
| `source-sans-3-600.woff2` | 1.6 KB | Source Sans 3 weight 600 |
| `source-sans-3-italic-300.woff2` | 1.6 KB | Source Sans 3 italic weight 300 |
| `source-sans-3-italic-400.woff2` | 1.6 KB | Source Sans 3 italic weight 400 |

**总大小：68 KB**（构建后会进一步优化）

## 配置文件

### `src/lib/fonts.css`
定义了所有字体的 `@font-face` 规则，使用本地相对路径 `/fonts/` 指向 `public/fonts/` 目录。

### `src/index.css`
引入 `fonts.css`：
```css
@import url("lib/fonts.css");
```

### `tailwind.config.ts`
定义了字体家族的配置：
- `--font-display`: Instrument Serif → Noto Serif SC → Georgia
- `--font-body`: Source Sans 3 → Noto Sans SC → system-ui

## 优势

1. **离线支持**：无需网络连接也能加载字体
2. **更快的加载速度**：本地字体加载比 CDN 更快（无 DNS 查询、建立连接等开销）
3. **更可控**：字体版本由项目管理，不受 Google Fonts 更新影响
4. **隐私友好**：不向 Google 发送用户信息

## 添加新字体

如果需要添加新字体，请：

1. 下载 `.woff2` 格式的字体文件到 `public/fonts/`
2. 在 `src/lib/fonts.css` 中添加对应的 `@font-face` 规则
3. 在 `tailwind.config.ts` 中更新 `fontFamily` 配置

## 部署注意

确保 `public/fonts/` 目录在构建时被正确复制到输出目录（Vite 默认会自动处理）。

## 字体许可

- **Instrument Serif**: OFL (Open Font License)
- **Noto Sans SC**: OFL (Open Font License)
- **Noto Serif SC**: OFL (Open Font License)
- **Source Sans 3**: OFL (Open Font License)

所有字体均为开源字体，可自由使用。
