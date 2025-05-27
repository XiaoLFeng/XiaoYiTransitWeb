# 认证模块

本目录包含了小易出行系统的认证相关页面组件。

## 页面组件

### AuthLogin (`auth_login.tsx`)
- **功能**: 用户登录页面
- **特性**: 
  - 用户名/密码登录
  - 密码显示/隐藏切换
  - 表单验证
  - 错误提示
  - 加载状态
- **路由**: `/auth/login`

### Auth404 (`auth_404.tsx`)
- **功能**: 认证模块内的 404 错误页面
- **特性**:
  - 美观的错误提示
  - 多种导航选项
  - 与系统主题一致的设计
  - 响应式布局
- **路由**: `/auth/404`

## 使用方式

### 在路由中使用
```tsx
import { Routes, Route } from 'react-router';
import { AuthLogin } from './auth/auth_login';
import { Auth404 } from './auth/auth_404';

<Routes>
    <Route path="/login" element={<AuthLogin />} />
    <Route path="/404" element={<Auth404 />} />
    <Route path="/*" element={<AuthLogin />} />
</Routes>
```

### 导航到 404 页面
```tsx
import { useNavigate } from 'react-router';

const navigate = useNavigate();
navigate('/auth/404');
```

## 设计特点

- 使用 DaisyUI 组件库
- 响应式设计，支持移动端
- 与系统主题色彩一致
- 包含公交车主题元素 🚌
- 优雅的错误处理和用户引导

## 技术栈

- React 19
- TypeScript
- Tailwind CSS
- DaisyUI
- React Router 