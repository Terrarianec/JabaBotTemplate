// https://learn.javascript.ru/first-steps
// https://learn.javascript.ru/comments
// https://learn.javascript.ru/variables
// https://nodejs.org/ru/knowledge/getting-started/what-is-require/

const commandFolder = "./commands",
    eventFolder = "./events",
    // https://learn.javascript.ru/destructuring-assignment#destrukturizatsiya-obekta
    {
        Client, // https://discord.js.org/#/docs/discord.js/stable/class/Client
        Collection, // https://discord.js.org/#/docs/collection/main/class/Collection
        Intents // https://discord.js.org/#/docs/discord.js/stable/class/Intents
    } = require("discord.js"), // https://discord.js.org/#/docs/discord.js/stable/general/welcome
    { readdir } = require("node:fs"), // https://nodejs.org/api/fs.html
    {
        intents, // [ "GUILDS", "GUILD_BANS", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INTEGRATIONS", "GUILD_WEBHOOKS", "GUILD_INVITES", "GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGE_TYPING", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGE_TYPING", "GUILD_MEMBERS" ]
        token // "OTc5Mzc4MTkyNTQyNDk0NzI0.GsSeIz.Rm_Gki87aVjCL28eGKMcHdqYvP7zz0yX_5JjIo"
    } = require("./config.json"),
    client = new Client({ intents: new Intents(intents) });
client.commands = new Collection();

// https://learn.javascript.ru/function-basics
function loadJSfilesFromDirectory(directory) {
    return readdir(directory, (err, files) => { // https://learn.javascript.ru/arrow-functions-basics
        if (err) console.error(err);
        else return files ? files.filter((file) => file.endsWith(".js")) : []; // https://learn.javascript.ru/string#includes-startswith-endswith
    });
}


const commandFileNames = loadJSfilesFromDirectory(commandFolder),
    eventFileNames = loadJSfilesFromDirectory(eventFolder);


for (let i = 0; i < commandFileNames; i++) { // https://learn.javascript.ru/array#perebor-elementov
    const commandFileName = commandFileNames[i],
        commandFile = require(`${commandFolder}/${commandFileName}`), // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Template_literals#%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BF%D0%BE%D0%BB%D1%8F%D1%86%D0%B8%D1%8F_%D0%B2%D1%8B%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B9
        commandData = commandFile.data.toJSON  // https://learn.javascript.ru/ifelse#uslovnyy-operator
            ? commandFile.data.toJSON() // Для SlashCommandBuilder
            : commandFile.data; // Для сырых данных
    client.commands.set(commandData.name, commandFileName);
}

for (let i = 0; i < eventFileNames.length; i++) {
    const eventFileName = eventFileNames[i],
        /* Название файла состоит из названия события у клиента и ".js" на конце
        Если в начале названия файла написано нижнее подчёркиваное, то событие вызовется однократно
        */
        eventHandler = require(`${eventFolder}/${eventFileName}`),
        [
            once, // Одноразовый ли слушатель
            eventName // Имя события клиента 
        ] = eventFileName.match(/(_)?(\w+).js/i); // https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Regular_Expressions // Часто пользовать регулярными выражениями не рекомендуется
    if (once) client.once(eventName, (...args) => eventHandler(client, ...args)); // https://learn.javascript.ru/rest-parameters-spread-operator
    else client.on(eventName, (...args) => eventHandler(client, ...args));
}


client.login(token);