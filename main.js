require("dotenv").config();

const TelegramApi = require("node-telegram-bot-api")

const token = process.env.BOT_TOKEN

const bot = new TelegramApi(token, {polling: true});

const phrases = {
    ukr: {
        unrecognised: "Ви ввели щось незрозуміле",
        selectLang: "Спочатку оберіть мову!",
        selectCorrectLang: "Оберіть корректний варіант(анг/укр):",
        langChosen: "Ви обрали українську мову як мову спілкування. Напишіть /changeLang для зміни мови"
    },
    eng: {
        unrecognised: "You have entered something incorrect",
        selectLang: "Choose the language first!",
        selectCorrectLang: "Choose the correct possible language(eng/ukr):",
        langChosen: "You have chosen English as your primary language. Type /changeLang to change language"
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
        const state = userStates.get(chatId);
        console.log(msg);

        //
        if (text === "/start") return;

        while (state === "waiting_for_message") {
            if (text === "ukr" || text === "укр"){
                language = "ukr";
                userStates.delete(chatId);
                return bot.sendMessage(chatId, phrases[language].langChosen);
            } else if (text === "eng" || text === "анг"){
                language = "eng";
                userStates.delete(chatId);
                return bot.sendMessage(chatId, phrases[language].langChosen);
            } else {
                return bot.sendMessage(chatId, phrases[language].selectCorrectLang);
            }
        }

        return bot.sendMessage(chatId, phrases[language].unrecognised);


    })
}

start();