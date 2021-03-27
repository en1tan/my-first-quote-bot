const TelegramBot = require("node-telegram-bot-api");
const request = require("request");

const token = "1779003441:AAHb_EYnrP3VbPIGZ8fHIPrgjwdd2xkFIX0";

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/good (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const greeting = match[1];
  if (greeting === "morning") {
    bot.sendMessage(chatId, "Good morning to you too");
  }
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  if (msg.text.includes("die")) {
    bot.sendMessage(
      chatId,
      "Strike 1. Next time, I will not be so lenient",
      {
        reply_to_message_id: msg.message_id,
      }
    );
  }
});

bot.onText(/\/quote (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  if (match[1] !== "random")
    bot.sendMessage(
      chatId,
      "Wrong command, please use /quote random",
      { reply_to_message_id: msg.message_id }
    );
  const result = await fetchQuotes();
  const quote = JSON.parse(result);
  bot.sendMessage(chatId, quote.content, {
    reply_to_message_id: msg.message_id,
  });
});

// Fetch Quotes
function fetchQuotes() {
  const apiUrl = "https://api.quotable.io/random";
  const options = {
    method: "GET",
    url: apiUrl,
  };
  return new Promise((resolve, reject) => {
    request(options, (error, response) => {
      if (error) reject(error);
      resolve(response.body);
    });
  });
}
