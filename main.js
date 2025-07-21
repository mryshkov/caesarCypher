require("dotenv").config();

const TelegramApi = require("node-telegram-bot-api")

const token = process.env.BOT_TOKEN;

const bot = new TelegramApi(token, {polling: {
        autoStart: true,
        params: { timeout: 10 }
    }});

let language = "ukr";

const phrases = {
    ukr: {

        // commands
        start_description: "Почати з нуля",
        change_lang_description: "Змінити мову",

        // bot messages
        lang_selection: "Оберіть мову для спілкування",
        unrecognised: "Ви ввели щось незрозуміле",
        select_lang: "Спочатку оберіть мову!",
        select_correct_lang: "Оберіть корректний варіант(анг/укр):",
        lang_chosen: "Ви обрали українську мову як мову спілкування. Напишіть /changeLang для зміни мови",
        change_mode: "Ви хочете шифрувати, чи розшифрувати повідомлення?",
        change_mode_description: "Змінити режим шифрування/розшифрування",
        change_offset: "Оберіть зсув",
        change_offset_description: "Обрати зсув",

        // user messages
        mode_code: ["шифрування", "шифрувати", "зашифрувати"],
        mode_decode: ["розшифрування", "розшифрувати"],
    },
    eng: {

        // commands
        start_description: "Start from blank",
        change_lang_description: "Select the language",

        // bot messages
        lang_selection: "Select the language",
        unrecognised: "You have entered something incorrect",
        select_lang: "Choose the language first!",
        select_correct_lang: "Choose the correct possible language(eng/ukr):",
        lang_chosen: "You have chosen English as your primary language. Type /changeLang to change language",
        change_mode: "Do you want to code or to decode your message?",
        change_mode_description: "Change code/decode mode",
        change_offset: "Select the offset",
        change_offset_description: "Change the offset",

        // user messages
        mode_code: ["code", "coding"],
        mode_decode: ["decode", "decoding"],
    }
}

const commands = [
    {command: "/start", description: phrases[language].start_description},
    {command: "/language", description: phrases[language].change_lang_description},
    {command: "/mode", description: phrases[language].change_mode_description},
    {command: "/offset", description: phrases[language].change_offset_description},
]

const userStates = new Map();

async function start(){
    await bot.setMyCommands(commands)


    bot.onText(/^\/start$|^\/language$|^language$/, async (msg) => {
        const chatId = msg.chat.id;

        await bot.sendMessage(chatId, phrases[language].lang_selection);

        userStates.set(chatId, "waiting_for_language_selection");
    })

    bot.onText(/^\/mode$|^mode$/, async (msg) => {
        const chatId = msg.chat.id;

        await bot.sendMessage(chatId, phrases[language].change_mode);

        userStates.set(chatId, "waiting_for_mode");
    })

    bot.onText(/^\/offset$|^offset$/, async (msg) => {
        const chatId = msg.chat.id;

        await bot.sendMessage(chatId, phrases[language].change_offset);

        userStates.set(chatId, "waiting_for_offset");
    })

    bot.on("message", async msg => {
        const chatId = msg.chat.id;
        const text   = msg.text;
        const state  = userStates.get(chatId);
        let   lastState;
        let   mode;
        console.log(msg);


        if (text === "/start") {
            lastState = null;
            return;
        } else if (text === "/language" || "/mode") return;

        while (state === "waiting_for_language_selection") {
            if (text === "ukr" || text === "укр"){
                language = "ukr";

                await bot.setMyCommands(commands);

                userStates.set(chatId, lastState || "waiting_for_mode");

                return bot.sendMessage(chatId, phrases[language].lang_chosen);
            } else if (text === "eng" || text === "анг"){
                language = "eng";

                await bot.setMyCommands(commands);

                userStates.set(chatId, lastState || "waiting_for_mode");

                return bot.sendMessage(chatId, phrases[language].lang_chosen);
            } else {
                return bot.sendMessage(chatId, phrases[language].select_correct_lang);
            }
        }

        while(state === "waiting_for_mode") {
            await bot.sendMessage(chatId, phrases[language].change_mode);

            if (phrases[language].mode_code.includes(text.toLowerCase())) {
                mode = "code";

                userStates.set(chatId, lastState || "waiting_for_offset");
            } else if(phrases[language].mode_decode.includes(text.toLowerCase())) {
                mode = "decode";

                userStates.set(chatId, lastState || "waiting_for_offset");
            } else return;
        }

       /* while(state === "waiting_for_offset") {
            await bot.sendMessage(chatId, phrases[language].change_offset);

        }*/

        return bot.sendMessage(chatId, phrases[language].unrecognised);

    })
}

start();