const { Discord, EmbedBuilder } = require("discord.js")
const { SlashCommandBuilder } = require('@discordjs/builders');
const client = require('../index.js');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .addNumberOption(option =>
            option.setName('quantidade')
                .setDescription('A quantidade de mensagens que será excluída.')
                .setRequired(true))
        .setDescription('Deleta um número específico de mensagens de um canal.'),
    async execute(interaction) {
        let numero = interaction.options.getNumber('quantidade')

        if (!interaction.member.permissions.has('ManageMessages')) {
        const EMBED = new EmbedBuilder()
            .setTitle("<:ativado:1013624557082521620> SEM PERMISSÃO")
            .setDescription(`${interaction.user}, você não tem permissão para executar este comando.`)
            .setColor(config.colorError)
        return interaction.reply({ embeds: [ EMBED ], ephemeral: true});
        } else if (parseInt(numero) > 99 || parseInt(numero) <= 0) {
            const EMBED = new EmbedBuilder()
                .setTitle("<:ativado:1013624557082521620> ERRO")
                .setDescription(`${interaction.user}, o número de mensagens precisa ser de 1 a 99.`)
                .setColor(config.colorError)
            interaction.reply({embeds: [EMBED], ephemeral: true});
        } else {
            interaction.channel.bulkDelete(parseInt(numero))
            const EMBED = new EmbedBuilder()
                .setTitle("<:ativado:1014727683629908018> LIMPEZA CONCLUÍDA")
                .setDescription(`Um número de \`${numero} mensagens\` foram excluídas desse canal.`)
                .setColor(config.colorSuccess)
                .setFooter({
                    text: `Comando executado por ${interaction.user.tag}`, 
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                });
            interaction.reply({ embeds: [ EMBED ]})
        }
    }
}