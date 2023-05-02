const config = require('../../config.json');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    INCORRECT_CHANNEL_COMMAND: new EmbedBuilder()
        .setTitle(`<:ativado:1013624557082521620> CANAL INVÁLIDO`)
        .setColor(config.colorError) 
        .setDescription(`Este comando só é válido no canal adequado, tente novamente em <#${config.cmdChannel}>.`)
};
  