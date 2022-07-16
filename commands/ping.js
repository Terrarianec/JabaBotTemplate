const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: // Данные, отправляемые в дискорд, чтобы описать то, как выглядит команда
        new SlashCommandBuilder() // https://discord.js.org/#/docs/builders/main/class/SlashCommandBuilder / https://discordjs.guide/interactions/slash-commands.html#options
            .setName("ping")
            .setDescription("Отвечает \"Pong\""),
    handler: // Вызывается при отправке команды пользователем
        (client, interaction) => { // Вызовается в events/interactionCreate.js
            interaction.reply({ content: "🏓 Pong!" });
        }
}