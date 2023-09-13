const { Discord, EmbedBuilder } = require("discord.js");
const { Modal, TextInputComponent, SelectMenuComponent, showModal, getTextInputValue, ModalSubmit } = require('discord-modals');
const { SlashCommandBuilder } = require('@discordjs/builders');
const client = require('../index.js');
const config = require('../config.json');
const embeds = require('./utils/embeds.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Envia uma mensagem em nome do bot.'),
    async execute(interaction) {
        const modal = new Modal()
            .setCustomId('modal-tres')
            .setTitle('Mensagem personalizada')
            .addComponents(new TextInputComponent()
                .setCustomId('titulo')
                .setLabel('Título')
                .setStyle('SHORT')
                .setPlaceholder('Indique o título do comunicado.')
                .setRequired(true),

            new TextInputComponent()
                .setCustomId('mensagem')
                .setLabel('Mensagem')
                .setStyle('LONG')
                .setPlaceholder('Descreva a mensagem.')
                .setRequired(true),

            new TextInputComponent()
                .setCustomId('cor')
                .setMaxLength(7)
                .setLabel('Cor')
                .setStyle('SHORT')
                .setPlaceholder('Digite a cor em hexadecimal (Ex.: #FF6100).')
                .setRequired(true),

            new TextInputComponent()
                .setCustomId('imagem')
                .setLabel('Imagem')
                .setStyle('SHORT')
                .setPlaceholder('Cole o link da imagem (digite \"Não\" para ignorar).')
                .setRequired(true))

        return interaction.showModal(modal);
    }
}
