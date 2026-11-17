# 好运水果合成器 Bug Starter

这是一个故意带 Bug 的前端小游戏 starter，用于体验 Coding Agent 的代码修复能力。

## 打开方式

直接双击 `index.html` 即可打开，不需要安装依赖，不需要本地服务。

## 玩法设定

点击两个相同的祝福水果，合成更高级的好运果，最终目标是合成「显化大西瓜」。

## 已知问题

这个版本故意保留了多个 Bug，适合让 Agent 修复：

1. 控制台会出现 `ReferenceError: startSparkleRain is not defined`。
2. 下一颗水果预览不会刷新。
3. 首次打开最高分显示 `null 分`。
4. 两个相同水果无法正常合成。
5. 分数计算会出现字符串拼接。
6. 重新开始不会重置棋盘。
7. 手机端布局会横向溢出。

## 建议 Agent 交付

- `01-broken/`：原始坏版本，不修改；
- `02-fixed/`：修复版本；
- `compare.html`：修复前后对比入口；
- `repair-notes.md`：问题诊断和修复总结；
- `README.md`：体验说明。
