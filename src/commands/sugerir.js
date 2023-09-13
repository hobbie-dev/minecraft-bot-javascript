const { Discord, EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, TextInputComponent, SelectMenuComponent, showModal, getTextInputValue, ModalSubmit } = require('discord-modals');
const config = require('../config.json');
const embeds = require('./utils/embeds.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sugerir')
        .setDescription('Redireciona uma sugestão ao canal de sugestões.'),
    async execute(interaction) {
        if (!interaction.isCommand()) return;
        if (interaction.channel.id != config.cmdChannel) {
            return interaction.reply({ embeds: [embeds.INCORRECT_CHANNEL_COMMAND], ephemeral: true});
        } else {
          const modal = new Modal()
            .setCustomId('modal-dois')
            .setTitle('Sugerir')
            .addComponents(new TextInputComponent()
                .setCustomId('servidor')
                .setLabel('Servidor')
                .setStyle('SHORT')
                .setPlaceholder('Indique o servidor o qual a sugestão será adicionada.')
                .setRequired(true),

              new TextInputComponent()
                .setMaxLength(600)
                .setCustomId('sugestão')
                .setLabel('Sugestão')
                .setStyle('LONG')
                .setPlaceholder('Descreva, detalhadamente, a sua sugestão.')
                .setRequired(true))

            return interaction.showModal(modal);
        }
    }
}
