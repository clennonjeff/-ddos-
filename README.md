# 闲来无事Node编写的一个Telegram bot Ddos 脚本

案例机器人：DDOSDM_BOT

![4b0c7b8ff0d0d389b20546aa5cdbea6](https://github.com/user-attachments/assets/04476c1d-34cf-4f6e-b071-633f5d4ac2e6)
![f111698adb0218e74bee7fc00284e16](https://github.com/user-attachments/assets/5554751c-6ec2-45b7-93fb-824fd11e7e77)

功能介绍：

1.会员功能：可以增加会员账户，用户通过个人中心获取id和会员情况，可一键复制id。“管理员可通过命令：“/vip id 时间”为vip用户添加服务周期
2.积分功能：脚本内置 “签到积分” “转发积分” 并且设置了监管机制，用户转发后，会检测是否成功转发至群组，每日可以签到1次，获得2积分，每日可转发两次，每次获得1积分，每次发动攻击，体验用户每次发动攻击消耗1积分。管理员为用户增加积分可通过管理员账户：“/jia id 积分数量”命令添加。扣除积分：“/jian id 积分数量”
3.攻击类型：LAyer 4 and LAyer 7  LAyer 4攻击方法：“/dns IP 时间” LAyer 7攻击方法：“/h2 域名 时间” 源代码限制最长时间60秒，可自行修改。

部署方法：
1. 创建Telegram机器人
首先，你需要在Telegram上创建一个机器人并获取API Token：

打开Telegram，搜索BotFather。
启动对话并输入/newbot命令，按照提示创建一个新的机器人。
创建完成后，BotFather会给你一个API Token，记下它，稍后会用到。

2. 初始化Node.js项目
在你的项目目录下创建一个新的Node.js项目：

bash
复制代码
mkdir my-telegram-bot
cd my-telegram-bot
npm init -y

3. 安装依赖
使用node-telegram-bot-api库来简化与Telegram的交互。可以通过npm安装：

bash
复制代码
npm install node-telegram-bot-api

4. 编写代码
拷贝代码上传至服务器
5. 运行机器人
在命令行中运行你的代码：

bash
复制代码
node index.js


有偿技术支持电报：@clennon

