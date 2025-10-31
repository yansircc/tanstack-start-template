# TanStack Start Template - Cloudflare D1 Edition

一个现代化的全栈 Web 应用模板，基于 TanStack Start 构建，集成了 Drizzle ORM 和 Cloudflare D1 数据库，专为 Cloudflare Workers 部署优化。

## ✨ 特性

- 🚀 **TanStack Start** - 基于 React 的全栈框架，支持 SSR、流式渲染和路由
- 🗄️ **Drizzle ORM** - 类型安全的 SQL 工具包，支持 migrations 和查询构建
- ☁️ **Cloudflare D1** - 全球分布的 SQLite 兼容数据库
- 🔐 **Google OAuth 认证** - 集成 Better Auth 的完整身份验证系统
- 🎨 **Tailwind CSS** - 实用优先的 CSS 框架，支持深色模式
- 📦 **TypeScript** - 完整的类型安全支持
- 🔧 **开发工具** - 集成 Biome 代码格式化和 Vite 开发服务器

## 🛠 技术栈

- **框架**: [TanStack Start](https://tanstack.com/start)
- **路由**: [TanStack Router](https://tanstack.com/router)
- **数据库**: [Cloudflare D1](https://developers.cloudflare.com/d1/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **认证**: [Better Auth](https://better-auth.com/)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **部署**: [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- **包管理**: [Bun](https://bun.sh/)

## 🚀 快速开始

### 前置要求

- [Bun](https://bun.sh/) 运行时
- [Cloudflare 账户](https://cloudflare.com/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

### 安装步骤

1. **克隆模板**
   ```bash
   git clone <your-repo-url>
   cd tanstack-start-d1-template
   ```

2. **安装依赖**
   ```bash
   bun install
   ```

3. **配置环境变量**
   ```bash
   # 复制环境变量模板
   cp .env.example .dev.vars

   # 配置 Google OAuth（可选）
   echo "GOOGLE_CLIENT_ID=your_google_client_id" >> .dev.vars
   echo "GOOGLE_CLIENT_SECRET=your_google_client_secret" >> .dev.vars
   ```

4. **初始化数据库**
   ```bash
   # 生成 migration 文件（首次使用）
   bun run db:generate

   # 创建本地 D1 数据库
   bun run db:push:local

   # 或者运行 migrations
   bun run db:migrate
   ```

5. **启动开发服务器**
   ```bash
   bun run dev
   ```

   访问 [http://localhost:3000](http://localhost:3000) 查看应用。

> **💡 提示**: 如果修改了 `wrangler.jsonc` 配置文件，请运行 `bun run gen:types` 重新生成 TypeScript 类型。

## 📁 项目结构

```
src/
├── components/          # React 组件
│   ├── auth/           # 认证相关组件
│   └── header.tsx      # 页面头部
├── lib/                # 工具库
│   ├── auth.ts         # Better Auth 配置
│   ├── auth-client.ts  # 客户端认证工具
│   └── db/             # 数据库配置
├── routes/             # 页面路由
│   ├── __root.tsx      # 根布局
│   ├── index.tsx       # 首页
│   ├── login-demo.tsx  # 登录演示
│   └── demo/           # 演示页面
└── styles.css          # 全局样式
```

## 🗄 数据库操作

### Migrations
```bash
# 生成 migration 文件
bun run db:generate

# 应用 migration 到本地数据库
bun run db:push:local

# 应用 migration 到远程数据库
bun run db:push:remote

# 打开数据库管理界面
bun run db:studio
```

### Schema 定义

数据库 schema 在 `src/db/schema.ts` 中定义：

```typescript
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  // ...更多字段
});
```

## 🔐 身份验证

项目集成了完整的 Google OAuth 认证系统：

### 配置步骤

1. 在 [Google Cloud Console](https://console.cloud.google.com/) 创建 OAuth 应用
2. 添加环境变量：
   ```bash
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   ```
3. 配置重定向 URI：`http://localhost:3000/api/auth/callback/google`

### 使用示例

```tsx
import { AuthButton } from "@/components/auth/auth-button";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { useAuth } from "@/lib/auth-client";

function App() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div>
      <AuthButton />

      <ProtectedRoute>
        <div>只有登录用户能看到的内容</div>
      </ProtectedRoute>
    </div>
  );
}
```

## ⚙️ 配置管理

### Wrangler 配置

项目使用 `wrangler.jsonc` 配置文件。如果修改了此文件，需要重新生成 TypeScript 类型：

```bash
# 重新生成 wrangler 类型
bun run gen:types
```

### D1 数据库配置

在 `wrangler.jsonc` 中配置数据库绑定：

```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "your-database-name",
      "database_id": "your-database-id",
      "migrations_dir": "drizzle"
    }
  ]
}
```

## 🚀 部署

### 部署到 Cloudflare Workers

1. **登录 Cloudflare**
   ```bash
   npx wrangler login
   ```

2. **创建 D1 数据库**
   ```bash
   npx wrangler d1 create DB
   ```

3. **配置 Wrangler**

   更新 `wrangler.jsonc` 中的数据库绑定：
   ```jsonc
   {
     "d1_databases": [
       {
         "binding": "DB",
         "database_name": "your-database-name",
         "database_id": "your-database-id"
       }
     ]
   }
   ```

4. **部署数据库 schema**
   ```bash
   bun run db:push:remote
   ```

5. **设置环境变量**
   ```bash
   npx wrangler secret put GOOGLE_CLIENT_ID
   npx wrangler secret put GOOGLE_CLIENT_SECRET
   ```

6. **部署应用**
   ```bash
   bun run deploy
   ```

## 🎯 功能演示

### 已实现的功能

- ✅ **SSR 演示** - 服务端渲染页面
- ✅ **API 请求** - 客户端数据获取
- ✅ **Server Functions** - 服务端函数调用
- ✅ **Drizzle 集成** - 数据库操作演示
- ✅ **Google OAuth** - 完整的认证流程
- ✅ **受保护路由** - 基于认证状态的路由保护

### 访问演示页面

- 首页: `/`
- 认证演示: `/login-demo`
- API 演示: `/demo/start/api-request`
- Server Functions: `/demo/start/server-funcs`
- SSR 演示: `/demo/start/ssr`
- Drizzle 演示: `/demo/drizzle`

## 🛠 开发工具

### 可用脚本

```bash
# 开发
bun run dev              # 启动开发服务器
bun run build            # 构建生产版本
bun run serve            # 预览构建结果

# 配置和类型
bun run gen:types        # 生成 wrangler TypeScript 类型

# 数据库
bun run db:generate      # 生成 migrations
bun run db:migrate       # 运行 migrations
bun run db:push:local    # 推送到本地数据库
bun run db:push:remote   # 推送到远程数据库
bun run db:studio        # 打开数据库管理界面

# 代码质量
bun run lint             # 代码检查
bun run lint:fix         # 自动修复问题
bun run format           # 代码格式化
bun run typecheck        # TypeScript 类型检查

# 测试
bun run test             # 运行测试

# 部署
bun run deploy           # 部署到 Cloudflare Workers
```

## 📚 学习资源

- [TanStack Start 文档](https://tanstack.com/start/latest)
- [Drizzle ORM 文档](https://orm.drizzle.team/)
- [Cloudflare D1 文档](https://developers.cloudflare.com/d1/)
- [Better Auth 文档](https://better-auth.com/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

⭐ 如果这个模板对你有帮助，请给个 Star！