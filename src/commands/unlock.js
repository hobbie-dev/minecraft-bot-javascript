const { Discord, EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('Desbloqueia um bate-papo.'),
    async execute(interaction) {
        // Se o usuário não tiver permissão
        if(!interaction.member.permissions.has("ManageChannels")) {
        const EMBED = new EmbedBuilder()
            .setTitle("<:ativado:1013624557082521620> SEM PERMISSÃO")
            .setDescription(`${interaction.user}, você não tem permissão para executar este comando.`)
            .setColor(config.colorError)
        return interaction.reply({ embeds: [ EMBED ], ephemeral: true});

        // Se o canal já estiver desbloqueado
        } else if (interaction.channel.permissionsFor(interaction.channel.guild.roles.everyone).has('SendMessages')) {
        const EMBED = new EmbedBuilder()
            .setTitle("<:ativado:1013624557082521620> ERRO")
            .setDescription(`${interaction.user}, este canal já está desbloqueado.`)
            .setColor(config.colorError)
        interaction.reply({embeds: [EMBED], ephemeral: true});

        // Se o canal estiver desbloqueado e o usuário que executou o comando tiver permissão
        } else {
        const EMBED = new EmbedBuilder()
            .setTitle("<:ativado:1013624570508476538> DESBLOQUEADO")
            .setDescription(`O canal foi desbloqueado com sucesso. Os usuários\nestão novamente \
            autorizados a digitarem neste bate-papo.`)
            .setColor(config.colorSuccess)
            .setFooter({
                text: `Comando executado por ${interaction.user.tag}`, 
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            });
        interaction.reply({ embeds: [ EMBED ]})
        interaction.channel.permissionOverwrites.edit(interaction.channel.guild.roles.everyone, { SendMessages: true }).catch(e => {
            console.log(e)
            const EMBED = new EmbedBuilder()
                .setTitle("<:ativado:1013624557082521620> ERRO")
                .setDescription(`${interaction.user}, um erro inesperado ocorreu ao tentar desbloquear este canal.`)
                .setColor(color.colorError)
            interaction.reply({embeds: [EMBED], ephemeral: true});
            })
        }
    }
}
