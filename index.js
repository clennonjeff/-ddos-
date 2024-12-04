const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const vip = require('./vip');  // 引入 vip.js 模块
const L4 = require('./L4');    // 引入 L4.js
const L7 = require('./L7');    // 引入 L7.js
const fs = require('fs');      // 引入文件系统模块

// 使用你的 bot Token 替换下面的字符串
const token = '7205135632:AAEOW5lgbhR17AR8FIeEsTejO6DiRWUlUlU';

// 创建 Telegram bot 实例
const bot = new TelegramBot(token, { polling: true });

// 设置管理员的 Telegram ID
const adminId = '7166588266';  // 将这个值替换为你自己的 Telegram 用户 ID

// 定义文件路径
const userDataFile = './userData.txt';  // 用于保存用户数据的文件路径
const vipDataFile = './vipData.txt';    // 用于保存 VIP 数据的文件路径

// 读取保存的用户数据（从文件中加载）
function loadUserData() {
  if (fs.existsSync(userDataFile)) {
    const data = fs.readFileSync(userDataFile, 'utf-8');
    return JSON.parse(data);  // 返回已解析的 JSON 数据
  }
  return {};  // 如果文件不存在，则返回空对象
}

// 读取保存的 VIP 数据（从文件中加载）
function loadVipData() {
  if (fs.existsSync(vipDataFile)) {
    const data = fs.readFileSync(vipDataFile, 'utf-8');
    return JSON.parse(data);  // 返回已解析的 JSON 数据
  }
  return {};  // 如果文件不存在，则返回空对象
}

// 保存用户数据到文件
function saveUserData() {
  const data = JSON.stringify(userData, null, 2);
  fs.writeFileSync(userDataFile, data, 'utf-8');
}

// 保存 VIP 数据到文件
function saveVipData() {
  const data = JSON.stringify(vipData, null, 2);
  fs.writeFileSync(vipDataFile, data, 'utf-8');
}

// 初始化用户数据
let userData = loadUserData();
// 初始化 VIP 数据
let vipData = loadVipData();

// 当收到 /start 命令时发送欢迎消息和按键菜单按钮
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // 创建按钮菜单
  const options = {
    reply_markup: {
      keyboard: [
        ['L4攻击', 'L7攻击'],   // 第一行
        ['使用说明', '联系购买'],  // 第二行
        ['每日签到', '分享积分'],  // 第三行
        ['个人中心', 'VIP定制']   // 第四行
      ],
      resize_keyboard: true,  // 自动调整按钮大小
      one_time_keyboard: false // 按钮一直显示
    }
  };

  // 发送消息并附带按钮菜单
  bot.sendMessage(chatId, '欢迎使用我的 Telegram 机器人！选择一个按钮:', options);
});

// 监听按钮点击事件
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;

  // 检查用户数据
  if (!userData[chatId]) {
    userData[chatId] = {
      points: 0,       // 用户积分
      lastSignInDate: null, // 用户上次签到日期
      shareCount: 0,   // 用户今天分享的次数
      lastShareDate: null,  // 用户上次分享日期
      shared: false     // 标记用户是否分享过
    };
  }

  // 根据按钮点击回复相应消息
  if (message === 'L4攻击') {
    bot.sendMessage(chatId, '请输入攻击目标的 IP、端口和攻击持续时间（格式：/dns <IP> <PORT> <TIME>，最大时间限制为 60 秒）。');
  } else if (message === 'L7攻击') {
    L7.handleL7(bot, chatId);  // 调用 L7.js 文件中的函数
  } else if (message === '使用说明') {
    bot.sendMessage(chatId, '这是使用说明：\n1. L4攻击：……\n2. L7攻击：……\n');
  } else if (message === '联系购买') {
    bot.sendMessage(chatId, '你可以通过以下方式联系购买：\nEmail: example@example.com\n');
  } else if (message === '每日签到') {
    // 获取当前日期
    const currentDate = new Date().toISOString().split('T')[0]; // 格式：YYYY-MM-DD

    // 检查用户是否已经签到
    if (userData[chatId].lastSignInDate === currentDate) {
      bot.sendMessage(chatId, '今天你已经签到过了，不能重复签到哦！');
    } else {
      // 更新签到日期并增加积分
      userData[chatId].lastSignInDate = currentDate;
      userData[chatId].points += 2;  // 每次签到获得 2 个积分

      saveUserData();  // 保存数据到文件

      bot.sendMessage(chatId, `签到成功！你获得了 2 个积分，当前积分：${userData[chatId].points}`);
    }
  } else if (message === '分享积分') {
    // 用户点击了分享积分按钮，开始分享流程
    const currentDate = new Date().toISOString().split('T')[0]; // 获取当前日期

    // 如果今天用户已经分享了两次，无法继续分享
    if (userData[chatId].shareCount >= 2) {
      bot.sendMessage(chatId, '今天你已经分享过 2 次，无法再分享积分了。');
    } else {
      // 让用户分享机器人用户名
      bot.sendMessage(chatId, '转发这条消息：免费攻击机器人《东盟小组ddos》（@ddosDm_bot）到群组中，然后回复 "我已分享" 来领取积分。');
      if (userData[chatId].lastShareDate !== currentDate) {
        // 只有在第一次点击“分享积分”按钮时更新日期
        userData[chatId].lastShareDate = currentDate; // 更新最后分享日期
      }
      userData[chatId].shared = false; // 重置用户分享状态
    }
  } else if (message === '我已分享') {
    // 如果用户已经点击分享积分按钮并回复 "我已分享"
    const currentDate = new Date().toISOString().split('T')[0]; // 获取当前日期

    // 检查用户是否已经分享过
    if (userData[chatId].lastShareDate === currentDate && !userData[chatId].shared) {
      // 标记用户已经分享
      userData[chatId].shared = true;

      // 增加积分
      userData[chatId].points += 1;  // 每分享一次获得 1 积分
      userData[chatId].shareCount += 1;  // 增加分享次数

      saveUserData();  // 保存数据到文件

      bot.sendMessage(chatId, `分享成功！你获得了 1 个积分，当前积分：${userData[chatId].points}`);
    } else if (userData[chatId].shared) {
      bot.sendMessage(chatId, '你今天已经分享过了，不能再重复分享了。');
    } else {
      bot.sendMessage(chatId, '请先分享机器人的用户名到群组中，然后回复 "我已分享" 来领取积分。');
    }
  } else if (message === '个人中心') {
    // 获取用户的 VIP 信息
    const isVip = vipData[chatId] ? true : false;  // 检查是否是 VIP 用户
    const vipDaysRemaining = vipData[chatId] || 0;  // 获取 VIP 剩余天数，如果没有 VIP 则返回 0

    const vipStatus = isVip ? `是 VIP 用户，剩余天数: ${vipDaysRemaining} 天` : '不是 VIP 用户';
    
    // 显示用户的个人 ID 和当前积分，并提供复制功能
    const options = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '复制 ID',
              callback_data: 'copy_id'  // 复制ID按钮
            }
          ]
        ]
      }
    };

    bot.sendMessage(chatId, `个人中心:\n您的 Telegram ID: ${chatId}\n当前积分: ${userData[chatId].points}\nVIP 状态: ${vipStatus}`, options);
  } else if (message === 'VIP定制') {
    vip.handleVip(bot, chatId, userData, adminId, vipData);
  } else {
    // 处理其他消息
    L4.handleL4(bot, chatId, message);  // 如果是 L4 攻击命令，调用 L4.js 中的函数
  }
});

// 处理复制 ID 按钮的回调
bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const callbackData = callbackQuery.data;

  if (callbackData === 'copy_id') {
    bot.sendMessage(chatId, `您的 Telegram ID 已复制：${chatId}`);
  }
});
