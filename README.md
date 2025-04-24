# KingOfBots <br/> Bot多语言支持：JAVA、JavaScript、Python、C++


后端仓库访问：<https://github.com/Coooolfan/KingOfBots-Server>

> [!TIP]
> 此代码仅用于概念设计与程序实现！不具备生产环境的安全性与稳定性！<br/>相关微服务的调用**无鉴权！**

# Tips

## 前端

- 支持更多语言的Bot

## 后端

- 微服务无鉴权

- 提供开箱即用的Docker镜像（仅BotRunner微服务）
- 提供Bot多语言支持（JAVA、JavaScript、Python、C++）
  - 抽象出BotRunner和BotCompiler接口
  - Java: 使用Gradle编译Jar包
  - C++: 使用g++编译可执行文件
  - JavaScript: 使用Node.js直接运行
  - Python: 使用Python解释器直接运行
- 对于需要编译的语言，提供了定时任务编译所有未编译的Bot代码
    - 无重复编译，系统会自动保留编译产物，运行时直接使用
    - 编辑Bot后会自动重新编译

# 运行指南

1. 准备相关软件与代码
   - Docker
   - KingofBots（前端工程）
      ```shell
      git clone git@github.com:Coooolfan/KingOfBots.git
      ``` 
   - KingOfBots-Server（后端工程）
      ```shell
      git clone git@github.com:Coooolfan/KingOfBots-Server.git
      ``` 

2. 准备数据库
   1. 使用Docker启动MySQL
       ```shell
       cd KingOfBots-Server/KingOfBots-Sql
       sudo docker-compose up -d
       ```
   2. 创建表结构（数据库已在docker-compose.yml中创建）

      运行本文件最后的SQL语句创建表结构

3. 启动主服务和匹配微服务
   - 直接在IDEA中启动即可，主服务和匹配微服务无需配置环境

4. 启动Bot微服务
   1. 创建用于持久化数据的文件夹
      ```shell
      mkdir KingOfBots-BotRunner && cd KingOfBots-BotRunner
      ```
   2. 拉取BotRunner镜像
      ```shell
      docker pull coolfan1024/kob-botrunner:latest
      ```
   3. 创建并编辑默认`application.properties`
      ```properties
      server.port=8082
      spring.application.name=BotRunner

      kob.backend.host=http://localhost:8080

      kob.gradle.build.path=/app/compiler/java
      kob.bot.result.java=/app/compiled/jav
      kob.bot.result.cpp=/app/compiled/cpp
      kob.gradle.bin.path=gradle
      kob.cpp.bin.path=g++
      kob.cpp.build.path=/app/compiler/cpp
      ```
   4. 编辑`application.properties`

      - Windows和MacOS的Docker服务对HOST模式的网络模式支持不完善，故我们将使用默认网桥的方式配置Docker容器。
      - 如果你使用Linux启动，那么可以跳过此步，使用默认配置文件启动即可。但是记得在docker run命令中添加`--network host`参数。

      **配置第4行`kob.backend.host`的值为主机的IP**
   5. 运行BotRunner
      - 对于Windows和MacOS用户
         ```shell
         docker run -d -p 8082:8082 \
         -v ./application.properties:/app/application.properties \
         -v ./compiled:/app/compiled \
         -v ./compiler:/app/compiler \
         --name botrunner \
         kob-botrunner
         ```
      - 对于Linux用户
         ```shell
         docker run -d \
         --network host \
         -v ./application.properties:/app/application.properties \
         -v ./compiled:/app/compiled \
         -v ./compiler:/app/compiler \
         --name botrunner \
         kob-botrunner
        ```
5. 启动前端 
   - 进入`KingOfBots`目录
   - 安装依赖
      ```shell
      npm install
      ```
   - 启动前端
      ```shell
      npm run serve
      ```
6. 访问前端
   - 打开浏览器，输入`http://localhost:5173`即可访问前端

> 已使用vite配置反向代理，所有浏览器请求均发送至`http://localhost:5173`，并由vite转发至`http://localhost:8080`

> [!TIP]
> 再次提示<br/>此项目仅用于概念验证及程序实现，不具备生产环境的安全性与稳定性！<br/>相关微服务的调用**无鉴权！**<br/>不要直接部署于公网环境！

# 数据库DDL

```sql
CREATE TABLE bot
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    user_id     INT NULL,
    title       VARCHAR(100) CHARACTER SET utf8mb4 NULL,
    description VARCHAR(300) CHARACTER SET utf8mb4 NULL,
    content     VARCHAR(10000) CHARACTER SET utf8mb4 NULL,
    language    VARCHAR(100) CHARACTER SET utf8mb4 NULL,
    status      VARCHAR(100) NULL,
    target_file varchar(200) NULL,
    createtime  DATETIME NULL,
    modifytime  DATETIME NULL,
    CONSTRAINT id UNIQUE (id)
) CHARACTER SET utf8mb4;

CREATE TABLE record
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    a_id       INT NULL,
    a_sx       INT NULL,
    a_sy       INT NULL,
    b_id       INT NULL,
    b_sx       INT NULL,
    b_sy       INT NULL,
    a_steps    VARCHAR(1000) CHARACTER SET utf8mb4 NULL,
    b_steps    VARCHAR(1000) CHARACTER SET utf8mb4 NULL,
    map        VARCHAR(1000) CHARACTER SET utf8mb4 NULL,
    loser      VARCHAR(10) CHARACTER SET utf8mb4 NULL,
    createtime DATETIME NULL,
    CONSTRAINT id UNIQUE (id)
) CHARACTER SET utf8mb4;

CREATE TABLE user
(
    id       INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) CHARACTER SET utf8mb4 NULL,
    password VARCHAR(100) CHARACTER SET utf8mb4 NULL,
    photo    VARCHAR(1000) CHARACTER SET utf8mb4 NULL,
    rating   INT DEFAULT 1500 NOT NULL,
    CONSTRAINT id UNIQUE (id)
) CHARACTER SET utf8mb4;
```
