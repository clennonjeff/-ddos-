// vip.js

module.exports.handleVip = (bot, chatId, userData, adminId, vipData) => {
  if (chatId === adminId) {
    bot.sendMessage(chatId, '管理员可以为你定制VIP服务天数。请联系管理员来进行定制。');
  } else {
    bot.sendMessage(chatId, '请联系管理员来为你定制VIP服务。');
  }
};
