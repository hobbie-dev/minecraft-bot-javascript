// Não remova este arquivo de crédito, o bot é livre para o uso, mas não é seu, preserve o meu direito como criador

const { Discord, EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const client = require('../index.js');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('creditos')
        .setDescription('Verifica os créditos do bot.'),
    async execute(interaction, client) {
        if (!interaction.isCommand()) return;
    	if (interaction.channel.id != config.cmdChannel) {
        	return interaction.reply({ embeds: [embeds.INCORRECT_CHANNEL_COMMAND], ephemeral: true});
        } else {
            const EMBED = new EmbedBuilder()
            .setTitle(`<:ativado:1013624574144958475> INFORMAÇÕES DO BOT`)
                .setColor(config.colorOther)
                .addFields(
                    {
                        name: `Desenvolvedor`,
                        value: `\`Hobbie#4343\``,
                        inline: true
                    },
                    {
                        name: `ㅤ`,
                        value: `ㅤ`,
                        inline: true
                    },
                    {
                        name: `Contribuidores`,
                        value: `\`Dean.\``,
                        inline: true
                    },
                    {
                        name: `Versão`,
                        value: `\`1.7\``,
                        inline: true
                    },
                    {
                        name: `Comunidade`,
                        value: `\`https://discord.gg/ZjUcXkuxMy\``,
                        inline: true
                    }).setThumbnail(config.serverIcon)
                .setDescription(`Confira as principais informações do BOT.`)
            return interaction.reply({ embeds: [EMBED]})
        }
    }
}