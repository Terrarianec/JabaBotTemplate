// https://discord.js.org/#/docs/discord.js/stable/class/Client?scrollTo=e-ready
const guildId = "123456789012345678" // Вставить нужное

module.exports = (client) => { // Альтернатива client.login(token).then(() => {...})
    console.log(`${client.user.tag} successfully logged in`);
    const commands = [];
    client.commands.each(command => commands.push(command));

    client.application.commands.set(commands, guildId); // Привязка к конкретной гильдии, если команда глобальная - стереть параметр идентификатора гильдии
}