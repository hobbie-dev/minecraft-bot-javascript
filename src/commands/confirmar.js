const { Discord, EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('confirmar')
        .addStringOption(option =>
            option.setName('facção')
                .setDescription('Digite o nome da facção a ser confirmada.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('tag')
                .setDescription('Digite a TAG da facção a ser confirmada.')
                .setRequired(true))
         .addNumberOption(option =>
            option.setName('posição')
                .setDescription('Digite a posição de confirmação da facção.')
                .setRequired(true))
        .setDescription('Redireciona uma confirmação ao canal de facções.'),
    async execute(interaction) {
        let faction = interaction.options.getString("facção");
        let tag = interaction.options.getString("tag");
        let pos = interaction.options.getNumber("posição");
        let channel = interaction.guild.channels.cache.get(config.factionChannel);

        if (!interaction.isCommand()) return;
        if (interaction.channel.id != config.cmdChannel) {
            return interaction.reply({ embeds: [embeds.INCORRECT_CHANNEL_COMMAND], ephemeral: true});
        } else if ((!interaction.member.roles.cache.has(config.roleTicket)) || (!interaction.member.permissions.has('ManageMessages'))) {
            const EMBED = new EmbedBuilder()
                .setTitle("<:ativado:1013624557082521620> SEM PERMISSÃO")
                .setDescription(`${interaction.user}, você não tem permissão para executar este comando.`)
                .setColor(config.colorError)
            return interaction.reply({ embeds: [ EMBED ], ephemeral: true});
        }

        const EMBED = new EmbedBuilder()
            .setDescription(`A Facção **[${tag}] ${faction}** acaba de confirmar sua presença em nosso ${config.minigameName} #${pos}.`)
            .setColor(config.colorOther)

        const EMBED2 = new EmbedBuilder()
            .setTitle("<:ativado:1013641210100985959> SUCESSO!")
            .setDescription(`**YUPI!** A facção ${faction} foi confirmada com sucesso.`)
            .setColor(config.colorSuccess)
            .setFooter({
                text: config.footerText,
                iconURL: config.serverIcon
            })
            .setTimestamp()

        channel.send({ embeds: [EMBED] }).then((s)=>{
                s.react('⚔️');
            }).catch(e => {
                console.log('Erro na linha 57 de confirmar.js');
            })
        interaction.reply({ embeds: [EMBED2], ephemeral: true })
    }
}
