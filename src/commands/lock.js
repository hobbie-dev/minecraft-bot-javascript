const { Discord, EmbedBuilder, IntentsBitField } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('Tranca um bate-papo.'),
    async execute(interaction) {
        if(!interaction.member.permissions.has('ManageChannels')) {
        const EMBED = new EmbedBuilder()
            .setTitle("<:ativado:1013624557082521620> SEM PERMISSÃO")
            .setDescription(`${interaction.user}, você não tem permissão para executar este comando.`)
            .setColor(config.colorError)
        return interaction.reply({ embeds: [ EMBED ], ephemeral: true});

        } else if (!interaction.channel.permissionsFor(interaction.channel.guild.roles.everyone).has('SendMessages')) {
        const EMBED = new EmbedBuilder()
            .setTitle("<:ativado:1013624557082521620> ERRO")
            .setDescription(`${interaction.user}, este canal já está bloqueado.`)
            .setColor(config.colorError)
        interaction.reply({embeds: [EMBED], ephemeral: true});

        } else {
        const EMBED = new EmbedBuilder()
            .setTitle("<:ativado:1013624566314176562> BLOQUEADO")
            .setDescription(`O canal foi bloqueado com sucesso. Os usuários\nestão bloqueados \
            de digitarem neste bate-papo.`)
            .setColor(config.colorSuccess)
            .setFooter({
                text: `Comando executado por ${interaction.user.tag}`, 
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            });
        interaction.reply({ embeds: [ EMBED ]})
        interaction.channel.permissionOverwrites.edit(interaction.channel.guild.roles.everyone, { SendMessages: false }).catch(e => {
            console.log(e)
            const EMBED = new EmbedBuilder()
                .setTitle("<:ativado:1013624557082521620> ERRO")
                .setDescription(`${interaction.user}, um erro inesperado ocorreu ao tentar bloquear este canal.`)
                .setColor(config.colorError)
            interaction.reply({embeds: [EMBED], ephemeral: true});
            })
        }
    }
}
