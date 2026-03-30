# 项目卡片动画 - 快速参考

## 🎬 四种动画效果

### 1️⃣ 浮起 (Floating Up)
```
▲ 8px 向上
⏱️ 300ms
📈 easeOut (先快后慢)
```

### 2️⃣ 边框流动 (Border Animation)
```
▓▓░░▓▓░░... (循环流动)
⏱️ 0.6s 起始 (快速) → 逐渐减速
📈 cubic-bezier(0.34, 1.56, 0.64, 1)
♾️ 无限循环
```

### 3️⃣ 其他褪色 (Dimming)
```
当前卡片: 100% 不透明度
其他卡片: 40% 不透明度 (褪色)
⏱️ 300ms
```

### 4️⃣ 标题变色 (Color Transition)
```
悬停前: 灰色文本
悬停后: 主色文本
⏱️ 300ms
```

## 🔧 配置修改

### 改变浮起高度
**文件**: `src/components/ProjectCard.tsx` (第17行)
```typescript
// 改这个值
y: isHovered ? -8 : 0
         // ↑ 改为 -12, -16 等
```

### 改变褪色程度
**文件**: `src/components/ProjectCard.tsx` (第82行)
```typescript
// 改这个值
opacity: isOtherHovered ? 0.4 : 1
                          // ↑ 改为 0.2, 0.3, 0.5 等
```

### 改变流动速度
**文件**: `src/components/ProjectCard.tsx` (第42行)
```typescript
duration: 0.6  // ← 改这个
// 小于 0.6 = 更快
// 大于 0.6 = 更慢
```

### 改变动画时长
**文件**: `src/components/ProjectCard.tsx`
```typescript
// 浮起时长 (第82行)
transition={{ duration: 0.3 }}  // ← 改为 0.2, 0.5 等

// 褪色时长 (第85行)
transition={{ duration: 0.3 }}  // ← 改为 0.2, 0.5 等

// 标题变色时长 (第97行)
transition={{ duration: 0.3 }}  // ← 改为 0.2, 0.5 等
```

## 📊 效果对比

| 场景 | 浮起 | 边框 | 褪色 | 变色 |
|------|------|------|------|------|
| 悬停卡片时 | ✅ | ✅ | ✅ (其他) | ✅ |
| 离开卡片时 | ↩️ | ↩️ | ↩️ | ↩️ |
| 多个卡片 | 单个 | 单个 | 全部 | 单个 |

## 🎯 文件位置

```
src/
├── components/
│   ├── ProjectCard.tsx          ← 卡片动画
│   └── ProjectsSection.tsx      ← 悬停状态管理
├── data/
│   └── projects.ts              ← 项目数据 (不变)
└── documents/
    ├── 05-PROJECTS_STRUCTURE_REFACTOR.md      (原始结构文档)
    ├── 06-PROJECTS_ANIMATION_ENHANCEMENT.md   (详细动画文档)
    ├── 06-PROJECTS_ANIMATION_VISUAL_GUIDE.md  (可视化指南)
    └── 06-PROJECTS_ANIMATION_CHANGELOG.md     (变更日志)
```

## 🚀 快速测试

```bash
# 进入项目目录
cd /Users/lihaofang/Documents/HoWeb/src

# 启动开发服务器
npm run dev

# 在浏览器中打开 http://localhost:5173
# 滚动到 "Projects" 部分
# 悬停在任何项目卡片上，观察四种动画效果
```

## 📱 设备兼容性

| 设备 | Hover 效果 | 说明 |
|------|-----------|------|
| 桌面电脑 | ✅ | 完全支持所有动画 |
| 平板 | ❌ | 需要点击 (可选实现) |
| 手机 | ❌ | 需要点击 (可选实现) |

## 🔄 状态流转

```
初始状态
  ↓ (鼠标进入)
悬停状态 (所有动画启动)
  ↓ (鼠标离开)
初始状态 (所有动画反向)
```

## 💡 设计亮点

✨ **快速启动** - 边框流动一开始很快  
✨ **逐渐减速** - 使用特殊缓动曲线逐渐放缓  
✨ **视觉焦点** - 其他卡片褪色强调当前卡片  
✨ **多层反馈** - 4 种动画同时进行，信息丰富

## 🐛 常见问题

**Q: 边框不显示？**  
A: 检查是否使用的是最新版本，并清空浏览器缓存

**Q: 动画卡顿？**  
A: 关闭浏览器扩展程序，检查 CPU 占用

**Q: 移动设备没有效果？**  
A: 正常现象，移动设备没有 hover 事件

**Q: 想要修改边框颜色？**  
A: 编辑第 27-35 行的 `repeating-linear-gradient` 中的颜色值

## 📞 支持

参考详细文档:
- `06-PROJECTS_ANIMATION_ENHANCEMENT.md` - 技术细节
- `06-PROJECTS_ANIMATION_VISUAL_GUIDE.md` - 可视化说明
- `06-PROJECTS_ANIMATION_CHANGELOG.md` - 完整变更日志

---

**最后更新**: 2026-03-30  
**版本**: 2.0  
**状态**: ✅ 生产就绪
