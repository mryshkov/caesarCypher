const TelegramApi = require("node-telegram-bot-api")

const token = "8049662976:AAFjJCTiKX7AFRP1U9JKeLRXeTU2_DAQ_08"

const bot = new TelegramApi(token, {polling: true});

const phrases = {
    ukr: {
        unrecognised: "Ви ввели щось незрозуміле",
        selectLang: "Спочатку оберіть мову!",
        selectCorrectLang: "Оберіть корректний варіант(анг/укр):",
    },
    eng: {
        unrecognised: "You have entered something incorrect",
        selectLang: "Choose the language first!",
        selectCorrectLang: "Choose the correct possible language(eng/ukr):",
    }
}

let language = "ukr";

const userStates = new Map();

async function start(){
    await bot.setMyCommands([
        {command: "/start", description: "Почати з нуля"}
    ])

    bot.onText(/\/start/, async (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;
        await bot.sendMessage(chatId, "select lang");
       // bot.onText(/^.{3}$/, async msg => {

       // })
        userStates.set(chatId, "waiting_for_message");
    })

    bot.on("message", async msg => {
        const chatId = msg.chat.id;
        const text = msg.text;

        console.log(msg);

        if (text === "/start") return;

        const state = userStates.get(chatId);

        if (state === "waiting_for_message") {
            if (text === "ukr" || text === "укр"){
                language = "ukr";
                return bot.sendMessage(chatId, phrases[language].langChoosen);
            } else if (text === "eng" || text === "анг"){
                language = "eng";
                return bot.sendMessage(chatId, phrases[language].langChoosen);
            } else {
                return bot.sendMessage(chatId, phrases[language].selectCorrectLang);
            }

            userStates.delete(chatId);
        } else {
            return bot.sendMessage(chatId, phrases[language].selectLang);
        }

        return bot.sendMessage(chatId, phrases[language].unrecognised);


    })
}

start();