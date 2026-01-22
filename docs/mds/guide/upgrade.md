# STDF v1 升级到 v2 指南

本文档帮助你从 STDF v1.x 升级到 v2.0.0。v2 版本包含多项破坏性变更，请仔细阅读并按照指南进行迁移。

## 主题系统升级（破坏性变更）

### 主题切换方式

v1 版本使用 JS 对象配置主题，v2 版本升级为 Tailwind CSS 插件 + `data-theme` 属性。

#### v1 写法（已废弃）

```javascript
// v1: 引入主题配置对象，使用 switchTheme 传入配置对象
import { switchTheme } from 'stdf/theme';
import { nintendo } from 'stdf/theme';

// 切换主题，传入主题配置对象
switchTheme(nintendo);
```

#### v2 写法

```css
/* 在 app.css 中配置主题插件 */
@plugin "stdf/theme" {
  name: "Nintendo";
}

/* 或使用多个主题 */
@plugin "stdf/theme" {
  name: "Nintendo, Ocean, Forest";
}

/* 或加载所有 42 套内置主题 */
@plugin "stdf/theme" {
  all: true;
}
```

```html
<!-- 在 HTML 中使用 data-theme 属性 -->
<html data-theme="Nintendo">
```

```javascript
// 使用 switchTheme 切换主题
import { switchTheme, getTheme } from 'stdf/theme';

switchTheme('Nintendo');
const currentTheme = getTheme();
```

### 亮暗模式切换

v1 版本使用 `.dark` 类名 + `darkMode` 函数，v2 版本升级为 `data-mode` 属性 + `switchMode` 函数。

#### v1 写法（已废弃）

```css
/* v1: 在 app.css 中配置暗色模式，使用 .dark 类名 */
@custom-variant dark (&:where(.dark, .dark *));
```

```javascript
// v1: 使用 darkMode
import { darkMode } from 'stdf/theme';

darkMode();      // 切换到暗色模式
darkMode(false); // 切换到亮色模式
```

#### v2 写法

```css
/* v2: 在 app.css 中配置暗色模式，使用 data-mode 属性 */
@custom-variant dark (&:where([data-mode=dark], [data-mode=dark] *):not(:where([data-mode=light], [data-mode=light] *):not([data-mode=dark], [data-mode=dark] *)));
```

> v2 支持嵌套模式切换，可以在暗色区域内嵌入亮色区域，反之亦然。

```javascript
// v2: 使用 switchMode 和 getMode
import { switchMode, getMode } from 'stdf/theme';

switchMode('dark');    // 切换到暗色模式
switchMode('primary'); // 切换到亮色模式

const currentMode = getMode(); // 获取当前模式
```

### 移除的导出

以下导出已从 `stdf/theme` 中移除：

- `darkMode` - 改用 `switchMode`
- `STDFTheme` - 改用 `@plugin "stdf/theme"` + `data-theme`
- 所有 JS 主题对象（如 `nintendo`、`ocean` 等）- 改用插件内置主题

### 新增的导出

```javascript
import {
  switchTheme,      // 切换主题
  switchMode,       // 切换亮暗模式
  getTheme,         // 获取当前主题
  getMode,          // 获取当前模式
  generateColorScale, // 生成颜色梯度
  themes,           // 内置主题列表
  stdfThemePlugin   // Tailwind CSS 插件
} from 'stdf/theme';
```

---

## 组件 API 变更

### Button 按钮

| 变更类型 | v1 | v2 | 说明 |
|---------|----|----|------|
| 属性重命名 | `line` | `border` | 边框风格属性重命名 |
| 选项调整 | `fill: 'lineTheme'` | `fill: 'lineState'` | 线框主题色改为状态色 |
| 选项调整 | `fill: 'textTheme'` | `fill: 'textState'` | 文字主题色改为状态色 |
| 属性移除 | `group` | - | 按钮组改用 `ButtonGroup` 组件 |
| 选项扩展 | `radius` | `radius` | 补充更多等级并支持空值 |

```javascript
// v1
<Button line fill="lineTheme" group />

// v2
<Button border fill="lineState" />
// 按钮组使用 ButtonGroup 组件
<ButtonGroup>
  <Button>按钮1</Button>
  <Button>按钮2</Button>
</ButtonGroup>
```

### Avatar 头像

| 变更类型 | v1 | v2 | 说明 |
|---------|----|----|------|
| 组件移除 | `Avatars` | `AvatarGroup` | 头像组改为独立组件 |
| 选项调整 | `radius: '3xl'` | - | 移除 `3xl`，新增 `xs`、`md`、`lg` |
| 默认值 | - | 主题圆角 | 默认圆角调整为主题圆角 |

```javascript
// v1
import { Avatar, Avatars } from 'stdf';
<Avatars list={avatarList} />

// v2
import { Avatar, AvatarGroup } from 'stdf';
<AvatarGroup list={avatarList} />
```

### Popup 弹出层

| 变更类型 | v1 | v2 | 说明 |
|---------|----|----|------|
| 属性移除 | `allowBodyScroll` | - | 滚动由内部逻辑接管 |
| 选项新增 | - | `radiusPosition: 'auto' \| 'none'` | 自动根据弹出方向处理圆角 |
| 选项扩展 | `radius` | `radius` | 扩展并调整默认值 |

### ActionSheet 操作面板

| 变更类型 | v1 | v2 | 说明 |
|---------|----|----|------|
| 选项移除 | `style: 'danger'` | `style: 'error'` | `danger` 改为 `error` |
| 选项移除 | `style: 'disabled'` | `disabled: true` | 禁用改为独立属性 |
| 属性新增 | - | `disabled` | Action Props 新增禁用属性 |
| 属性新增 | - | `icon` | Action Props 新增图标属性 |
| 选项新增 | - | `style: 'success' \| 'warning' \| 'info'` | 新增状态样式 |

```javascript
// v1
const actions = [
  { label: '删除', style: 'danger' },
  { label: '禁用项', style: 'disabled' }
];

// v2
const actions = [
  { label: '删除', style: 'error' },
  { label: '禁用项', disabled: true }
];
```

### Slider 滑块

| 变更类型 | v1 | v2 | 说明 |
|---------|----|----|------|
| 属性新增 | - | `showSteps` | 支持档位显示 |
| 属性新增 | - | `stepsStyle` | 档位样式配置 |
| 属性新增 | - | `stepLabels` | 自定义档位标签 |
| 事件增强 | `onchange(value)` | `onchange(value, label, rangeLabel)` | 增加标签参数 |

### Picker 选择器

| 变更类型 | v1 | v2 | 说明 |
|---------|----|----|------|
| 属性新增 | - | `multiple` | 多选模式 |
| 属性新增 | - | `multipleSelected` | 多选已选值 |
| 事件新增 | - | `onmultiplechange` | 多选变化事件 |
| 属性新增 | - | `multipleIcon` | 多选图标 |
| 属性新增 | - | `multipleIconActive` | 多选激活图标 |

### Calendar 日历

| 变更类型 | v1 | v2 | 说明 |
|---------|----|----|------|
| 属性新增 | - | `card` | 支持通过 Card 配置月份卡片 |
| 属性新增 | - | `initSelectedDates` | 初始化已选日期 |
| 属性增强 | `popup` | `popup: null` | 支持传 `null` 直接展示 |

### Form 表单

| 变更类型 | v1 | v2 | 说明 |
|---------|----|----|------|
| 类型新增 | - | `fullKeyboard` | 全键盘输入类型 |
| 类型新增 | - | `colorPicker` | 颜色选择器类型 |
| 属性升级 | `card: boolean` | `card: CardProps` | 从布尔值升级为对象配置 |
| 属性移除 | `mx`、`px`、`radius`、`shadow` | - | 移除独立配置，改用 `card` 统一配置 |

```javascript
// v1
<Form card mx="4" px="4" radius="lg" shadow="md" />

// v2
<Form card={{ mx: '4', px: '4', radius: 'lg', shadow: 'md' }} />
```

---

## 通用变更

### radius 圆角选项

大部分组件的 `radius` 属性进行了以下调整：

1. **选项扩展**：补充更多等级（如 `xs`、`3xl`、`4xl`）
2. **支持空值**：可传入空字符串使用默认样式
3. **默认值调整**：多数组件默认使用主题圆角（`--radius-box` 或 `--radius-form`）

受影响的组件：
- Avatar、Badge、BottomSheet、Button、Calendar
- Cell、CellGroup、NumKeyboard、Picker、Placeholder
- Popup、Progress、Skeleton、Slider、Stepper
- Steps、Swiper、Switch、Tabs、TimePicker、Toast

### popup 属性增强

以下组件的 `popup` 属性支持传入 `null`，可直接在页面内展示而不使用弹出层：

- Calendar 日历
- Picker 选择器
- AsyncPicker 异步选择器
- TimePicker 时间选择器
- NumKeyboard 数字键盘

```javascript
// 直接在页面内展示，不使用弹出层
<Picker popup={null} />
<Calendar popup={null} />
```

---

## 新增组件

v2 版本新增了以下组件：

- **Accordion** - 手风琴
- **ActionPopover** - 操作气泡
- **Alert** - 弹窗提示
- **AvatarGroup** - 头像组（从 Avatars 独立）
- **ButtonGroup** - 按钮组（从 Button group 属性独立）
- **Card** - 卡片
- **CharRoll** - 字符滚动
- **CodeInput** - 码输入框
- **ColorPicker** - 颜色选择器
- **CountDown** - 倒计时
- **Feedback** - 函数式反馈
- **FullKeyboard** - 全键盘
- **ImageList** - 图片列表
- **ImagePreview** - 图片预览
- **List** - 列表
- **Signature** - 签名
- **Tag** - 标签
- **Tooltip** - 文字提示

---

## 新增能力

### Feedback 函数式 API

v2 新增了函数式调用反馈组件的能力，支持 `toast`、`showAlert`、`dialog`、`modal`、`loading` 等方法，可在任意位置通过函数调用使用反馈组件。详见 [函数式反馈](/guide/feedback)。

---

## 迁移检查清单

- [ ] 更新主题配置：从 JS 对象迁移到 `@plugin "stdf/theme"`
- [ ] 更新亮暗模式：从 `darkMode` 迁移到 `switchMode`
- [ ] 添加 CSS 配置：`@custom-variant dark`
- [ ] 检查 Button 组件：`line` → `border`，`group` → `ButtonGroup`
- [ ] 检查 Avatar 组件：`Avatars` → `AvatarGroup`
- [ ] 检查 ActionSheet 组件：`danger` → `error`，`disabled` 改为属性
- [ ] 检查 Form 组件：`card` 从布尔值改为对象
- [ ] 检查 Popup 组件：移除 `allowBodyScroll`
- [ ] 检查各组件 `radius` 默认值变化
- [ ] 测试主题切换功能
- [ ] 测试亮暗模式切换功能

---

## 获取帮助

如果在升级过程中遇到问题，可以：

1. 查阅 [主题指南](/guide/theme) 了解新的主题系统
2. 查阅各组件的 API 文档了解详细变更
3. 在 [GitHub Issues](https://github.com/any-tdf/stdf/issues) 提交问题
