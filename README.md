# 小易出行 - React 前端项目

## 简介

本项目是 **小易出行 (XiaoYiTransit)** 的 React 前端实现。小易出行是一个智慧公交管理系统，涵盖了用户认证、司机管理、车辆管理、线路管理和维保管理等核心功能。此前端项目旨在提供一个用户友好的界面，与后端 GoFrame API 进行交互，实现完整的业务流程。

后端项目地址: [xiaolfeng/XiaoYiTransit](https://github.com/xiaolfeng/XiaoYiTransit) (假设)

## 特性

* **用户认证**:
    * 登录 (支持验证码)
    * 修改密码
    * 忘记密码 (待实现)
    * 登出
* **司机管理**:
    * 创建、查询、更新、删除司机信息
    * 司机排班管理
* **车辆管理**:
    * 创建、查询、更新、删除车辆信息
    * 车辆年检记录管理
    * 车辆保险记录管理
* **线路管理**:
    * 创建、查询、更新、删除公交线路
    * 线路站点管理 (添加、查询、更新、删除站点)
* **维保管理**:
    * 创建、查询、更新、删除维保记录

## 技术栈

* **React**: 用于构建用户界面的 JavaScript 库。
* **React Router**: 用于处理客户端路由。
* **Axios** (或 Fetch API): 用于进行 HTTP 请求。
* **Zustand / Redux Toolkit / Context API**: 用于状态管理 (根据项目复杂度选择)。
* **Tailwind CSS / Ant Design / Material-UI**: 用于 UI 组件和样式 (根据偏好选择)。
* **TypeScript** (推荐): 为 JavaScript 添加静态类型。

## 先决条件

* [Node.js](https://nodejs.org/) (建议使用 LTS 版本，例如 v18.x 或 v20.x)
* [npm](https://www.npmjs.com/) 或 [yarn](https://yarnpkg.com/) 包管理器
* 后端服务 **小易出行 (XiaoYiTransit)** 已成功运行 (默认地址: `http://localhost:8000`)

## 快速开始

### 1. 克隆前端仓库 (如果尚未创建)

```bash
# 如果你还没有前端项目仓库，可以先创建一个
# git clone <你的前端仓库地址>
# cd <你的前端项目目录>
```

### 2. 安装依赖

使用 npm:
```bash
npm install
```
或者使用 yarn:
```bash
yarn install
```

### 3. 配置环境变量

在项目根目录下创建一个 `.env` 文件，并配置后端 API 的基础 URL。

`.env` 文件示例:
```env
REACT_APP_API_BASE_URL=http://localhost:8000/api/v1
```

在你的 React 应用中，可以通过 `process.env.REACT_APP_API_BASE_URL` 来访问这个变量。

**注意**: 如果前端和后端在开发时运行在不同的源 (例如，前端 `http://localhost:3000`，后端 `http://localhost:8000`)，你需要在后端 GoFrame项目中配置 CORS (跨源资源共享) 策略，允许前端的请求。GoFrame 提供了中间件来处理 CORS。

### 4. 运行开发服务器

使用 npm:
```bash
npm start
```
或者使用 yarn:
```bash
yarn start
```
这通常会在 `http://localhost:3000` (或其他可用端口) 启动开发服务器，并在浏览器中打开应用。

## 项目结构 (建议)

一个典型的 React 项目结构可能如下所示：

```text
.
├── public/
│   ├── index.html
│   └── ... (其他静态资源)
├── src/
│   ├── api/                # API 请求封装
│   │   ├── auth.js
│   │   ├── driver.js
│   │   ├── vehicle.js
│   │   ├── route.js
│   │   └── maintenance.js
│   ├── assets/             # 图片、字体等静态资源
│   ├── components/         # 可复用的 UI 组件
│   │   ├── common/         # 通用组件 (按钮, 输入框等)
│   │   └── layout/         # 布局组件 (导航栏, 侧边栏等)
│   ├── config/             # 项目配置 (例如 API 地址)
│   ├── contexts/           # React Context (如果使用)
│   ├── hooks/              # 自定义 Hooks
│   ├── pages/              # 页面级组件
│   │   ├── LoginPage.js
│   │   ├── DashboardPage.js
│   │   ├── DriverManagementPage.js
│   │   └── ...
│   ├── services/           # 业务逻辑服务 (可选，用于更复杂的逻辑)
│   ├── store/              # 状态管理 (Zustand, Redux等)
│   ├── styles/             # 全局样式, 主题等
│   ├── utils/              # 工具函数
│   ├── App.js              # 应用根组件
│   ├── index.js            # 应用入口文件
│   └── reportWebVitals.js
├── .env                    # 环境变量
├── .gitignore
├── package.json
├── README.md
└── ... (其他配置文件，如 tsconfig.json, .eslintrc.js)
```

## API 对接指南

### 1. API 基础 URL

API 的基础 URL 从环境变量 `REACT_APP_API_BASE_URL` 中获取，默认为 `http://localhost:8000/api/v1`。

### 2. 认证

后端使用 JWT (JSON Web Token) 进行认证。

* **登录**: 调用 `POST /auth/login` 接口，成功后后端会返回一个 token。你需要将此 token 存储起来 (例如，在 `localStorage`、`sessionStorage` 或状态管理库中)。
    * 请求体 (`AuthLoginReq`): `{ "username": "string", "password": "string", "captcha": "string", "captchaId": "string" }`
    * 响应体 (`AuthLoginRes`): `{ "token": "string", "expire": "datetime" }`
* **验证码**: 调用 `GET /auth/captcha` 获取验证码图片和 `captchaId`。
* **请求头**: 对于需要认证的接口，你需要在 HTTP 请求的 `Authorization` Header 中携带 token，格式为 `Bearer <your_token>`。
    ```javascript
    // 使用 Axios 示例
    import axios from 'axios';

    const apiClient = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
    });

    apiClient.interceptors.request.use(config => {
      const token = localStorage.getItem('authToken'); // 从存储中获取 token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    export default apiClient;
    ```
* **登出**: 调用 `POST /auth/logout` (后端 gtoken 默认路径，具体以实际为准)。前端应清除本地存储的 token 并重定向到登录页。

### 3. 主要模块 API 端点

以下是各主要模块的关键 API 端点。具体的请求体 (Req) 和响应体 (Res) 结构请参考后端项目的 `api` 和 `internal/model/dto` 目录下的定义。

#### 3.1. 认证 (Auth) - `/auth`

* `POST /login`: 用户登录
* `GET /captcha`: 获取验证码
* `POST /change_password`: 修改密码 (需认证)
* `POST /forget_password`: 忘记密码 (需确认后端是否已实现)
* `POST /logout`: 用户登出 (需认证)

#### 3.2. 司机管理 (Driver) - `/driver`

* `POST /create`: 创建司机 (需认证)
* `GET /query`: 查询司机列表 (需认证)
    * 参数: `DriverQueryReq` (分页, 姓名, 电话等)
    * 响应: `DriverQueryRes` (列表, 总数)
* `PUT /update`: 更新司机信息 (需认证)
    * 路径参数: `/update/{id}` (假设, 或在请求体中)
* `DELETE /delete`: 删除司机 (需认证)
    * 路径参数: `/delete/{id}` (假设, 或在请求体中)
* `POST /schedule`: 司机排班 (需认证)

#### 3.3. 车辆管理 (Vehicle) - `/vehicle`

* `POST /create`: 创建车辆 (需认证)
* `GET /query`: 查询车辆列表 (需认证)
* `GET /detail`: 查询车辆详情 (需认证)
    * 路径参数: `/detail/{id}` (假设)
* `PUT /update`: 更新车辆信息 (需认证)
* `DELETE /delete`: 删除车辆 (需认证)

* **车辆年检 (Vehicle Inspection) - `/vehicle/inspection`**
    * `POST /create`: 创建年检记录 (需认证)
    * `GET /query`: 查询年检记录 (需认证)
    * `PUT /update`: 更新年检记录 (需认证)
    * `DELETE /delete`: 删除年检记录 (需认证)

* **车辆保险 (Vehicle Insurance) - `/vehicle/insurance`**
    * `POST /create`: 创建保险记录 (需认证)
    * `GET /query`: 查询保险记录 (需认证)
    * `PUT /update`: 更新保险记录 (需认证)
    * `DELETE /delete`: 删除保险记录 (需认证)

#### 3.4. 线路管理 (Route) - `/route`

* `POST /create`: 创建线路 (需认证)
* `GET /query`: 查询线路列表 (需认证)
* `GET /detail`: 查询线路详情 (需认证)
* `PUT /update`: 更新线路信息 (需认证)
* `DELETE /delete`: 删除线路 (需认证)

* **线路站点 (Route Station) - `/route/station`**
    * `POST /add`: 添加线路站点 (需认证)
    * `GET /query`: 查询线路站点 (需认证)
    * `PUT /update`: 更新线路站点 (需认证)
    * `DELETE /delete`: 删除线路站点 (需认证)

#### 3.5. 维保管理 (Maintenance) - `/maintenance`

* `POST /create`: 创建维保记录 (需认证)
* `GET /query`: 查询维保记录列表 (需认证)
* `GET /detail`: 查询维保记录详情 (需认证)
* `PUT /update`: 更新维保记录 (需认证)
* `DELETE /delete`: 删除维保记录 (需认证)

### 4. API 调用示例 (使用 Axios)

```javascript
// src/api/auth.js
import apiClient from './apiClient'; // 上面定义的 axios 实例

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    // 存储 token
    if (response.data && response.data.data && response.data.data.token) { // 增加了对 response.data.data 的检查
      localStorage.setItem('authToken', response.data.data.token);
      // 可以将用户信息和过期时间也存起来
      // localStorage.setItem('authExpire', response.data.data.expire); // 假设响应中有 expire
    }
    return response.data;
  } catch (error) {
    // 处理错误，例如显示错误信息
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchCaptcha = async () => {
  try {
    const response = await apiClient.get('/auth/captcha');
    if (response.data && response.data.data) { // 增加了对 response.data.data 的检查
        return response.data.data; // { captchaId: "...", captchaImage: "base64..." }
    }
    throw new Error('Captcha data is missing in the response'); // 如果数据缺失则抛出错误
  } catch (error) {
    console.error('Failed to fetch captcha:', error.response?.data || error.message);
    throw error;
  }
};

// src/pages/LoginPage.js
// import React, { useState, useEffect } from 'react'; // 示例导入
// import { loginUser, fetchCaptcha } from '../api/auth'; // 示例导入

// const LoginPage = () => {
//   const [captchaInfo, setCaptchaInfo] = useState({ captchaId: '', captchaImage: '' });
//   // ... 其他 state 和处理函数

//   useEffect(() => {
//     const loadCaptcha = async () => {
//       try {
//         const data = await fetchCaptcha();
//         setCaptchaInfo(data);
//       } catch (err) {
//         // 处理获取验证码失败
//       }
//     };
//     loadCaptcha();
//   }, []);

//   const handleSubmit = async (values) => {
//     try {
//       const loginData = {
//         username: values.username,
//         password: values.password,
//         captcha: values.captcha,
//         captchaId: captchaInfo.captchaId, // 从 state 获取
//       };
//       await loginUser(loginData);
//       // 跳转到仪表盘或其他页面
//       // history.push('/dashboard'); // 如果使用 React Router
//     } catch (err) {
//       // 显示登录失败信息
//       // 可以在这里更新 state 来显示错误提示
//       // 刷新验证码
//       const data = await fetchCaptcha();
//       setCaptchaInfo(data);
//     }
//   };
//   // ... JSX
// };
// export default LoginPage;
```

## 构建生产版本

```bash
npm run build
```
或者
```bash
yarn build
```
构建产物将输出到 `build` 目录。你可以将此目录下的内容部署到任何静态文件服务器。

## 贡献指南

如果你想为这个项目做出贡献，请遵循以下步骤：

1.  Fork 本仓库。
2.  创建一个新的分支 (`git checkout -b feature/your-feature-name`)。
3.  提交你的更改 (`git commit -m 'Add some feature'`)。
4.  将你的分支推送到远程仓库 (`git push origin feature/your-feature-name`)。
5.  创建一个新的 Pull Request。

请确保你的代码遵循项目的编码规范，并包含必要的测试。

## 许可证

(根据你的项目选择一个许可证，例如 MIT)

```text
MIT License

Copyright (c) [年份] [你的名字或组织名称]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

希望这份文档能帮助你开始 React 前端的开发！
