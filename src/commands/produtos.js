const { Discord, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ComponentType } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const client = require('../index.js');
const config = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('produtos')
        .setDescription('Envia uma mensagem com a lista de produtos.'),
    async execute(interaction) {
        const EMBED = new EmbedBuilder()
            .setTitle(`🛒 LISTA DE PRODUTOS`)
            .setColor(config.colorOther) 
            .setDescription(`Seja bem-vindo à área de produtos do servidor, você sabia que \
            ao comprar um de nossos pacotes, você ajuda o servidor a se manter online e \
            estável? Obrigado!\n\n**CUPOM:** \`NEW\``)

        const ROW = new ActionRowBuilder()
          .addComponents(
            new SelectMenuBuilder()
            .setCustomId('produtos')
            .setPlaceholder('Selecione uma categoria')
            .addOptions([{
                label: 'VIP',
                value: 'Vips',
                description: 'Reveja o preço dos pacotes VIPs.',
                emoji: '🌟',
              },
              {
                label: 'Cash',
                value: 'Cash',
                description: 'Reveja o preço dos pacotes de cash.',
                emoji: '💸'
              },
              {
                label: 'Outros',
                value: 'Outros',
                description: 'Reveja o preço de produtos diversificados.',
                emoji: '🛠️',
              },
            ]),
          );

        msg = await interaction.reply({
          embeds: [EMBED],
          components: [ROW],
          ephemeral: true
        });

        const collector = msg.createMessageComponentCollector({
          componentType: ComponentType.SelectMenu,
          time: 20000,
        });

        collector.on('collect', i => {
            if (i.values[0] == 'Vips') {
                const EMBED = new EmbedBuilder()
                    .setTitle(`🌟 VIP`)
                    .setColor(config.colorOther)
                    .setDescription(`Abaixo estão listados os preços de cada \nVIP disponível no servidor.`)
                    .setThumbnail(config.serverIcon)
                    .addFields(
                    {
                        name: `VIP+`,
                        value: `\`R$8,00\``,
                        inline: true
                    },
                    {
                        name: `MVP`,
                        value: `\`R$13,00\``,
                        inline: true
                    },
                    {
                        name: `MVP+`,
                        value: `\`R$18,00\``,
                        inline: true
                    })

                interaction.editReply({ embeds: [EMBED], components: [], ephemeral: true });
            };
            if (i.values[0] == 'Cash') {
                const EMBED = new EmbedBuilder()
                    .setTitle(`💸 Cash`)
                    .setColor(config.colorOther)
                    .setDescription(`Abaixo estão listados os preços de cada \npacote de cash disponível à compra.`)
                    .setThumbnail(config.serverIcon)
                    .addFields(
                    {
                        name: `1.000 de cash`,
                        value: `\`R$2,00\``,
                        inline: true
                    },
                    {
                        name: `ㅤ`,
                        value: `ㅤ`,
                        inline: true
                    },
                    {
                        name: `5.000 de cash`,
                        value: `\`R$10,00\``,
                        inline: true
                    },
                    {
                        name: `10.000 de cash`,
                        value: `\`R$20,00\``,
                        inline: true
                    },
                    {
                        name: `ㅤ`,
                        value: `ㅤ`,
                        inline: true
                    },
                    {
                        name: `20.000 de cash`,
                        value: `\`R$40,00\``,
                        inline: true
                    },
                    {
                        name: `50.000 de cash`,
                        value: `\`R$100,00\``,
                        inline: true
                    })

                interaction.editReply({ embeds: [EMBED], components: [], ephemeral: true });
            };
            if (i.values[0] == 'Outros') {
                const EMBED = new EmbedBuilder()
                    .setTitle(`🛠️ Outros`)
                    .setColor(config.colorOther)
                    .setDescription(`Confira o valor dos diferentes e variados\nprodutos disponíveis à venda.`)
                    .setThumbnail(config.serverIcon)
                    .addFields(
                    {
                        name: `Unmute`,
                        value: `\`R$10,00\``,
                        inline: true
                    },
                    {
                        name: `Unban`,
                        value: `\`R$25,00\``,
                        inline: true
                    })

                interaction.editReply({ embeds: [EMBED], components: [], ephemeral: true });
            };
        });
    }
}