# 项目结构重构文档

**日期**: 2026年3月30日  
**作者**: Howl Fang  
**版本**: 1.0

## 📋 概述

本文档记录了个人网站"项目"（Projects）部分的重构过程。将原来的静态占位符UI改造成一个灵活、可维护、易于扩展的项目管理系统。

## 🎯 重构目标

| 目标 | 描述 |
|------|------|
| **分离关注点** | 将数据层、组件层、UI层分离 |
| **易于维护** | 修改项目信息时只需编辑数据文件 |
| **支持多语言** | 项目级别的完整英文/中文支持 |
| **现代化UI** | 卡片设计、悬停效果、响应式布局 |
| **易于扩展** | 添加新项目无需修改组件代码 |

## 📁 文件结构变化

### 新增文件

#### 1. `src/data/projects.ts`
项目数据的中心配置文件。

**关键定义**：
```typescript
export interface Project {
  id: string;                    // 唯一标识符
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  tags: string[];               // 项目标签（技术栈等）
  image?: string;               // 项目图片URL（可选）
  link?: string;                // 项目链接（可选）
  github?: string;              // GitHub仓库链接（可选）
  demo?: string;                // 演示链接（可选）
}
```

**包含的示例项目**：
1. HoWeb - 个人网站本身
2. Project Template - 项目模板
3. Coming Soon - 占位符

#### 2. `src/components/ProjectCard.tsx`
单个项目卡片组件。

**核心功能**：
- 接收 `Project` 对象、当前语言和索引
- 渲染项目标题、描述、标签
- 显示GitHub和Demo按钮（如果存在）
- Framer Motion 动画效果
- Hover 交互（边框、阴影、颜色变化）
- 完全响应式设计

**关键特性**：
```tsx
interface ProjectCardProps {
  project: Project;
  locale: "en" | "zh";
  index: number;
}
```

**样式特性**：
- 卡片容器: `group border border-border rounded-lg p-6`
- Hover效果: `hover:border-primary/50 hover:shadow-lg`
- 标签: Badge 组件显示
- 按钮: GitHub和Demo按钮（带图标）
- 动画: 每个卡片按索引延迟进入

### 修改的文件

#### 3. `src/components/ProjectsSection.tsx`

**修改前**：
```tsx
// 仅显示静态的"Coming soon"提示
<motion.div className="border border-border border-dashed rounded-md p-10 md:p-16 text-center">
  <p>{t.projects.comingSoon}</p>
  <p>{t.projects.description}</p>
</motion.div>
```

**修改后**：
```tsx
// 动态渲染项目卡片网格
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {projects.map((project, index) => (
    <ProjectCard
      key={project.id}
      project={project}
      locale={locale}
      index={index}
    />
  ))}
</div>

// 当列表为空时显示备用UI
{projects.length > 0 ? (
  /* 项目网格 */
) : (
  /* Coming soon 提示 */
)}
```

**新增Props**：
```tsx
interface ProjectsSectionProps {
  t: Translations;
  locale: Locale;  // ← 新增，用于动态语言切换
}
```

#### 4. `src/pages/Index.tsx`

**修改**：
```tsx
// 之前
<ProjectsSection t={t} />

// 之后
<ProjectsSection t={t} locale={locale} />
```

传递 `locale` 参数以支持实时语言切换。

#### 5. `src/i18n/translations.ts`

**状态**：保持不变  
**理由**：翻译文件已经足够简洁，按钮文本在 `ProjectCard.tsx` 中直接处理

## 🏗️ 架构设计

### 数据流向

```
src/data/projects.ts (数据层)
        ↓
ProjectCard.tsx (卡片组件)
        ↓
ProjectsSection.tsx (列表组件)
        ↓
Index.tsx (页面组件)
```

### 多语言处理

```
locale (en/zh) 从 useLocale hook 获得
        ↓
传递到 ProjectsSection
        ↓
传递到 ProjectCard
        ↓
ProjectCard 使用 project.title[locale] 和 project.description[locale]
```

## 📚 使用指南

### 添加新项目

在 `src/data/projects.ts` 的 `projects` 数组中添加新对象：

```typescript
export const projects: Project[] = [
  // ... 现有项目 ...
  {
    id: "unique-id",
    title: {
      en: "Project Name",
      zh: "项目名称",
    },
    description: {
      en: "A brief description of the project...",
      zh: "项目的简要描述...",
    },
    tags: ["React", "TypeScript", "Tailwind CSS"],
    image: "/images/project.png",  // 可选
    github: "https://github.com/username/repo",
    demo: "https://example.com",
  },
];
```

### 修改现有项目

直接编辑 `src/data/projects.ts` 中的对应项目对象即可，无需修改组件代码。

### 隐藏某个项目

从 `projects` 数组中删除该项目对象即可。

### 自定义样式

编辑 `src/components/ProjectCard.tsx` 中的 Tailwind 类名：
- `className="group border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg ..."`

## 🎨 设计细节

### 布局
- **移动设备**: 1列布局 (`grid-cols-1`)
- **桌面设备**: 2列布局 (`grid-cols-2 md:`)
- **间距**: 6个单位 (`gap-6`)

### 卡片样式
- **背景**: 半透明卡片背景 (`bg-card/50 backdrop-blur-sm`)
- **边框**: 浅色边框 (`border-border`)
- **Hover**: 边框变亮 (`hover:border-primary/50`)、阴影增强 (`hover:shadow-lg`)、背景变深

### 动画
- **进入动画**: 从下方淡入 (`initial={{ opacity: 0, y: 20 }}`)
- **延迟**: 基于索引的分级延迟 (`delay: index * 0.1`)
- **触发器**: 滚动进入视口时触发 (`whileInView`)

### 按钮
- GitHub按钮: Outline 样式，显示GitHub图标
- Demo按钮: Default 样式（主色），显示External Link 图标
- 响应式: 在小屏幕上隐藏按钮文本，仅显示图标

## 🔄 迁移说明

### 从旧系统迁移

如果之前有其他项目管理方式，需要：

1. **提取项目数据** - 收集所有项目的信息
2. **格式化为对象** - 按 `Project` 接口格式创建对象
3. **添加到 projects.ts** - 在 `projects` 数组中添加
4. **验证显示** - 在浏览器中查看效果

## ✨ 特性亮点

### 1. 完全响应式
- 移动、平板、桌面设备自适应
- 按钮在小屏幕上简化显示

### 2. 多语言支持
- 项目标题、描述完全多语言
- 按钮文本（GitHub/Demo）根据当前语言动态显示
- 实时语言切换无需页面刷新

### 3. 易于扩展
- 新增项目只需添加数据对象
- 新增字段只需修改 `Project` 接口和组件
- 零改动量的新项目添加

### 4. 现代化UI/UX
- 渐进式动画
- 微交互（Hover效果）
- 清晰的信息层级（标题 > 描述 > 标签 > 按钮）
- 空态优雅处理（projects为空时显示Coming Soon）

### 5. 性能优化
- 使用 React.memo 可选优化（future improvement）
- 虚拟滚动支持（future improvement）
- 图片懒加载支持（future improvement）

## 📋 检查清单

重构完成后的验证项：

- [x] 编译无错误
- [x] 示例项目正确显示
- [x] 中英文语言切换正常
- [x] 移动设备布局正确
- [x] 按钮链接可点击
- [x] 动画流畅
- [x] 无TypeScript错误
- [x] 代码风格一致

## 🚀 未来改进方向

### 短期
1. 添加实际的个人项目到列表
2. 为项目添加封面图片
3. 优化ProjectCard的渲染性能

### 中期
1. 添加项目过滤功能（按技术栈）
2. 添加项目搜索功能
3. 项目详情页面

### 长期
1. 从CMS或API获取项目数据
2. 项目统计和分析
3. 项目展示的主题定制化

## 📞 问题排查

### 问题：项目不显示
**解决**：检查 `projects` 数组是否为空或未导出

### 问题：按钮不工作
**解决**：确保 `github` 或 `demo` 字段包含有效的URL

### 问题：语言切换后文本未更新
**解决**：确保 `ProjectsSection` 正确接收 `locale` prop

### 问题：样式不正确
**解决**：
1. 清除浏览器缓存
2. 重新构建项目 (`npm run build`)
3. 检查Tailwind配置是否正确

## 📝 总结

这次重构将项目部分从一个静态的占位符转变为一个功能完整、易于维护的项目展示系统。通过分离数据和UI，我们实现了：

- ✅ 代码的模块化和可维护性
- ✅ 完整的多语言支持
- ✅ 现代化的用户体验
- ✅ 零代码改动的项目管理

任何后续添加或修改项目信息的工作都可以通过编辑数据文件完成，无需接触组件代码。

---

**相关文件**：
- `src/data/projects.ts` - 项目数据
- `src/components/ProjectCard.tsx` - 卡片组件
- `src/components/ProjectsSection.tsx` - 列表组件
- `src/pages/Index.tsx` - 页面集成
