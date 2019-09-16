# {{ name }}

> {{ description }}

## Build Setup

```bash
# 安装依赖
npm install # 或者使用 yarn

# 启动服务 localhost:8080
npm run serve

# 编译运行于各种环境
npm run build
```

## make file

#### 使用 makefile 的基本条件

```bash
# 1.在script文件夹下放置goctl可执行文件

# 2.正确配置.gitmodules
git submodule init
git submodule add git@47.97.170.255:xiao/api.git
# 初始化
make init

# 生成api
make api

# 本地开发
make dev

# 编译运行于各种环境
make build
```
