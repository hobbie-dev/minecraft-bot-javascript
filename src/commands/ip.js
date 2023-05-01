const { Discord, EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const client = require('../index.js');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ip')
        .setDescription('Verifica o endereço de conexão ao servidor.'),
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;
    	if (interaction.channel.id != config.cmdChannel) {
        	return interaction.reply({ embeds: [embeds.INCORRECT_CHANNEL_COMMAND], ephemeral: true});
        } else {
            const EMBED = new EmbedBuilder()
            .setTitle(`<:ativado:1013624574144958475> INFORMAÇÕES DE CONEXÃO`)
                .setColor(config.colorOther) 
                .addFields(
                    {
                        name: `Endereço IP`,
                        value: `\`${config.displayIP}\``,
                        inline: true
                    },
                    {
                        name: `ㅤ`,
                        value: `ㅤ`,
                        inline: true
                    },
                    {
                        name: `Versão`,
                        value: `\`${config.serverVersion}\``,
                        inline: true
                    }).setThumbnail(config.serverIcon)
                .setDescription(`Você pode acessar o servidor utilizando\n as informações abaixo.`)
            return interaction.reply({ embeds: [EMBED]})
        }
    }
}