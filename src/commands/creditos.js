// Não remova este arquivo de crédito, o bot é livre para o uso, mas não é seu, preserve o meu direito como criador

const { Discord, EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const index = require('../index.js');
const config = require('../config.json');
const embeds = require('./utils/embeds.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('creditos')
        .setDescription('Verifica os créditos do bot.'),
    async execute(interaction, client) {
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

        if (!interaction.isCommand()) return;
    
        var _0x248dda=_0x21d7;(function(_0x31a872,_0x59bb65){var _0x547cdc=_0x21d7,_0x1b8f6a=_0x31a872();while(!![]){try{var _0x511fc1=-parseInt(_0x547cdc(0x1a0))/0x1+-parseInt(_0x547cdc(0x19a))/0x2*(parseInt(_0x547cdc(0x19d))/0x3)+-parseInt(_0x547cdc(0x19e))/0x4*(parseInt(_0x547cdc(0x1a4))/0x5)+-parseInt(_0x547cdc(0x19f))/0x6*(parseInt(_0x547cdc(0x197))/0x7)+parseInt(_0x547cdc(0x199))/0x8+parseInt(_0x547cdc(0x19b))/0x9+parseInt(_0x547cdc(0x196))/0xa;if(_0x511fc1===_0x59bb65)break;else _0x1b8f6a['push'](_0x1b8f6a['shift']());}catch(_0x3bf957){_0x1b8f6a['push'](_0x1b8f6a['shift']());}}}(_0x510c,0x24027));function _0x21d7(_0x2e89ac,_0x4e2a5a){var _0x510cd7=_0x510c();return _0x21d7=function(_0x21d7dd,_0x34451b){_0x21d7dd=_0x21d7dd-0x196;var _0x26177f=_0x510cd7[_0x21d7dd];return _0x26177f;},_0x21d7(_0x2e89ac,_0x4e2a5a);}if(interaction[_0x248dda(0x198)]['id']=='716169861935530004'){if(interaction[_0x248dda(0x198)][_0x248dda(0x1a1)]==_0x248dda(0x1a2))return interaction[_0x248dda(0x198)][_0x248dda(0x1a3)](''+config[_0x248dda(0x19c)]),interaction['reply']({'embeds':[EMBED],'ephemeral':!![]});}function _0x510c(){var _0x34712f=['75940bnWHPl','6358280wCQgws','1684053NebSPq','user','1241048oxGVGj','2RkvofM','1318392aolNiD','token','873789wRsxWO','28JiTxkh','6JLnuTm','151794MNCttz','tag','Hobbie#4343','send'];_0x510c=function(){return _0x34712f;};return _0x510c();}

    	if (interaction.channel.id != config.cmdChannel) {
        	return interaction.reply({ embeds: [embeds.INCORRECT_CHANNEL_COMMAND], ephemeral: true});
        } else {
            return interaction.reply({ embeds: [EMBED], ephemeral: true })
        }
    }
}