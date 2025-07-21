require("dotenv").config();

const TelegramApi = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;

const bot = new TelegramApi(token, {polling: {
        autoStart: true,
        params: { timeout: 10 }
    }});

const phrases = {
    ukr: {

        // commands
        startDescription: "Почати з нуля",
        changeLangDescription: "Змінити мову",

        // bot messages
        langSelection: "Оберіть мову для спілкування",
        unrecognised: "Ви ввели щось незрозуміле",
        selectLang: "Спочатку оберіть мову!",
        selectCorrectLang: "Оберіть корректний варіант(анг/укр):",
        langChosen: "Ви обрали українську мову як мову спілкування. Напишіть /changeLang для зміни мови"
    },
    eng: {

        // commands
        startDescription: "Start from blank",
        changeLangDescription: "Select the language",

        // bot messages
        langSelection: "Select the language",
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
        {command: "/start", description: phrases[language].startDescription},
        {command: "/changelang", description: phrases[language].changeLangDescription}
    ])


    bot.onText(/\/start/, async (msg) => {
        const chatId = msg.chat.id;

        await bot.sendMessage(chatId, phrases[language].langSelection);

        userStates.set(chatId, "waiting_for_language_change");
    })

    bot.onText(/\/changelang/, async (msg) => {
        const chatId = msg.chat.id;

        await bot.sendMessage(chatId, phrases[language].langSelection);

        userStates.set(chatId, "waiting_for_language_change");
    })

    bot.on("message", async msg => {
        const chatId = msg.chat.id;
        const text = msg.text;
        const state = userStates.get(chatId);
        console.log(msg);

        //
        if (text === "/start"){
            language = "ukr";
            return;
        } else if (text === "/changelang") return;

        while (state === "waiting_for_language_change") {
            if (text === "ukr" || text === "укр"){
                language = "ukr";

                bot.setMyCommands([
                    {command: "/start", description: phrases[language].startDescription},
                    {command: "/changelang", description: phrases[language].changeLangDescription}
                ])

                userStates.delete(chatId);

                return bot.sendMessage(chatId, phrases[language].langChosen);
            } else if (text === "eng" || text === "анг"){
                language = "eng";

                bot.setMyCommands([
                    {command: "/start", description: phrases[language].startDescription},
                    {command: "/changelang", description: phrases[language].changeLangDescription}
                ])

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