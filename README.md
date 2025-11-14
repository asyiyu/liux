# 留学网站

这是一个基于React + TypeScript + Vite + Ant Design的留学信息网站。

## 🚀 功能特性

- 🏠 首页展示热门院校、成功案例、留学资讯
- 🔍 大学搜索功能（支持国家、专业、排名筛选）
- 📖 详细的大学信息展示
- 📝 在线申请表单
- 📊 QS世界大学排名
- 👤 用户注册登录
- 💬 客服咨询

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI组件库**: Ant Design
- **路由**: React Router DOM
- **HTTP客户端**: Axios
- **图标**: Ant Design Icons
- **部署**: GitHub Pages

## 📦 本地开发

### 环境要求
- Node.js >= 16
- npm >= 8

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```
访问 http://localhost:3000

### 构建生产版本
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 🚀 部署到GitHub Pages

### 自动部署（推荐）
项目已配置GitHub Actions自动部署，当代码推送到main分支时会自动构建并部署到GitHub Pages。

### 手动部署
```bash
# 安装gh-pages（如果尚未安装）
npm install --save-dev gh-pages

# 部署到GitHub Pages
npm run deploy
```

## 📁 项目结构

```
src/
├── components/          # 公共组件
│   ├── Navbar.tsx     # 导航栏
│   └── Footer.tsx     # 页脚
├── pages/             # 页面组件
│   ├── HomePage.tsx           # 首页
│   ├── UniversitySearchPage.tsx # 大学搜索
│   ├── UniversityDetailPage.tsx # 大学详情
│   ├── ApplicationPage.tsx      # 申请页面
│   ├── QSRankingPage.tsx        # QS排名
│   ├── LoginPage.tsx           # 登录页面
│   ├── RegisterPage.tsx        # 注册页面
│   ├── CustomerServicePage.tsx  # 客服页面
│   └── NotFoundPage.tsx        # 404页面
├── images/            # 静态图片
├── App.tsx           # 主应用组件
└── main.tsx          # 入口文件
```

## 🔧 配置说明

### Vite配置
- `base: '/liux/'` - GitHub Pages路径配置
- 代码分割优化，将vendor、antd、router分离
- 支持sourcemap

### GitHub Actions
- 自动触发：推送到main分支时
- 构建环境：Ubuntu Latest + Node.js 18
- 自动部署到GitHub Pages

## 🌐 在线访问

网站部署地址：https://asyiyu.github.io/liux/

## 📝 开发说明

### 代码规范
- 使用TypeScript严格模式
- 遵循React Hooks规范
- ESLint代码检查

### 样式管理
- 使用CSS模块化
- Ant Design主题定制
- 响应式设计

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情