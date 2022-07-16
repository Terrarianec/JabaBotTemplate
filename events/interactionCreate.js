// https://discord.js.org/#/docs/discord.js/stable/class/Client?scrollTo=e-interactionCreate
function defaultHandler(interaction) {
    return interaction.reply({
        content: "Что делать в ответ на эту команду, мы ещё не придумали :<",
        allowedMentions: {
            repliedUser: false // Отключает упоминание при ответе
        }
    });
}

module.exports = (client, interaction) => {
    if (interaction.isCommand()) {
        command = client.commands.get(interaction.commandName);

        if (command && command.handler) command.handler(client, interaction)
        else defaultHandler(interaction);
    }
}