const config = require("../config.json");
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, SelectMenuBuilder, ChannelType, ComponentType } = require('discord.js');
let hastebin = require('hastebin');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (interaction.isSelectMenu()) {
      if (interaction.customId == "category") {
        if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id)) {
          const EMBED = new EmbedBuilder()
            .setTitle("<:ativado:1013624557082521620> ERRO")
            .setDescription(`${interaction.user}, você já possui um ticket criado.`)
            .setColor(config.colorError)
          return interaction.reply({ embeds: [EMBED], ephemeral: true });
        };

        interaction.guild.channels.create({
          name: `abrindo-${interaction.user.username}`,
          parent: config.parentBasic,
          topic: interaction.user.id,
          permissionOverwrites: [{
            id: interaction.user.id,
            allow: ['SendMessages', 'ViewChannel'],
          },
          {
            id: config.roleTicket,
            allow: ['SendMessages', 'ViewChannel'],
          },
          {
            id: config.roleBot,
            allow: ['SendMessages', 'ViewChannel'],
          },
          {
            id: interaction.guild.roles.everyone,
            deny: ['ViewChannel'],
          },
          ],
          type: ChannelType.GuildText,
        }).then(async c => {
          if (interaction.user.id === interaction.user.id) {
            if (interaction.values[0] == 'Dúvidas gerais') {
              c.edit({
                name: `dúvidas-${interaction.user.username}`,
                parent: config.parentBasic,
              });
            };
            if (interaction.values[0] == 'Denúncias') {
              c.edit({
                name: `denúncia-${interaction.user.username}`,
                parent: config.parentAdvanced,
              });
            };
            if (interaction.values[0] == 'Revisões de punições') {
              c.edit({
                name: `revisão-${interaction.user.username}`,
                parent: config.parentAdvanced,
              });
            };
            if (interaction.values[0] == 'Relatório de bugs') {
              c.edit({
                name: `bugs-${interaction.user.username}`,
                parent: config.parentBasic,
              });
            };
            if (interaction.values[0] == 'Financeiro') {
              c.edit({
                name: `financeiro-${interaction.user.username}`,
                parent: config.parentAdvanced,
              });
            };
            if (interaction.values[0] == 'Solicitação de cargo') {
              c.edit({
                name: `key-${interaction.user.username}`,
                parent: config.parentBasic,
              });
            };
            if (interaction.values[0] == 'Outros assuntos') {
              c.edit({
                name: `outros-${interaction.user.username}`,
                parent: config.parentBasic,
              });
            };
          };

          const EMBED = new EmbedBuilder()
            .setTitle("<:ativado:1013624572395933746> TUDO CERTO!")
            .setDescription(`${interaction.user}, o seu ticket foi criado em <#${c.id}>. Confira o canal para prosseguirmos com o atendimento.`)
            .setColor(config.colorSuccess)
          interaction.reply({ embeds: [EMBED], ephemeral: true });

          let a = "`";
          const embed = new EmbedBuilder()
            .setColor(config.colorOther)
            .setAuthor({
              name: `Olá, ${interaction.user.username}`,
              iconURL: config.serverIcon
            })
            .setDescription(`Seja bem-vindo(a) à nossa central de atendimento, pedimos para que você siga todas as nossas diretrizes:\n \
              \`1º Não mencione membros da equipe de suporte desnecessariamente;\`\n \
              \`2º Esteja ciente da ocorrência em que o suporte foi solicitado;\`\n \
              \`3º Explique a situação que envolve o suporte com o maior número de detalhes;\`\n \
              \`4º Ao terminar o seu atendimento, encerre o ticket.\`\n \
              
              <:ativado:1013644137469329469> **INFORMAÇÕES DO TICKET**
              <:ativado:1013644134160019516> ${a}Usuário:${a} <@!${interaction.user.id}>
              <:ativado:1013644134160019516> ${a}ID:${a} ${interaction.user.id}
              <:ativado:1013644135485419541> ${a}Área:${a} ${interaction.values}`)
            .setThumbnail(config.serverIcon)
            .setFooter({
              text: config.footerText,
              iconURL: config.serverIcon
            })
            .setTimestamp();

          const row2 = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
                .setCustomId('close-ticket')
                .setLabel('Fechar')
                .setEmoji('🔒')
                .setStyle('Danger'),
            );

          msg = await c.send({
            content: `<@${interaction.user.id}> <@&${config.roleTicket}>`,
            embeds: [embed],
            components: [row2]
          });
        });
      }
    }
      
      
      if (interaction.isButton()) {
      if (interaction.customId == "close-ticket") {
        const guild = client.guilds.cache.get(interaction.guildId);
        const chan = guild.channels.cache.get(interaction.channelId);

        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('confirm-close')
              .setLabel('Fechar ticket')
              .setStyle('Danger'),
            new ButtonBuilder()
              .setCustomId('no')
              .setLabel('Cancelar')
              .setStyle('Secondary'),
          );

        const verif = await interaction.reply({
          content: 'Tem certeza de que deseja fechar o ticket?',
          components: [row]
        });

        const collector = interaction.channel.createMessageComponentCollector({
          componentType: ComponentType.Button,
          time: 10000
        });

        collector.on('collect', i => {
          if (i.customId == 'confirm-close') {
            interaction.editReply({
              content: `Ticket fechado por <@!${interaction.user.id}>`,
              components: []
            });

            chan.edit({
              name: `fechado-${chan.name}`,
              permissionOverwrites: [
                {
                  id: client.users.cache.get(chan.topic),
                  deny: ['SendMessages', 'ViewChannel'],
                },
                {
                  id: config.roleTicket,
                  allow: ['SendMessages', 'ViewChannel'],
                },
                {
                  id: config.roleBot,
                  allow: ['SendMessages', 'ViewChannel'],
                },
                {
                  id: interaction.guild.roles.everyone,
                  deny: ['ViewChannel'],
                },
              ],
            })
              .then(async () => {
                const embed = new EmbedBuilder()
                  .setColor(config.colorError)
                  .setAuthor({
                    name: 'EXCLUIR O CONTEÚDO DO CANAL',
                    iconURL: config.serverIcon
                  })
                  .setDescription('Ao clicar no botão abaixo, o ticket será excluído e um registro de todo o suporte será enviado ao privado do usuário e \
                    ao canal de registros do servidor.')
                  .setFooter({
                    text: config.footerText,
                    iconURL: config.serverIcon
                  })
                  .setTimestamp();

                const row = new ActionRowBuilder()
                  .addComponents(
                    new ButtonBuilder()
                      .setCustomId('delete-ticket')
                      .setLabel('Excluir ticket')
                      .setEmoji('🗑️')
                      .setStyle('Danger'),
                  );

                chan.send({
                  embeds: [embed],
                  components: [row]
                });
              });

            collector.stop();
          };
          if (i.customId == 'no') {
            interaction.editReply({
              content: 'O encerramento do ticket foi cancelado.',
              components: []
            });
            collector.stop();
          };
        });

        collector.on('end', (i) => {
          if (i.size < 1) {
            interaction.editReply({
              content: 'O encerramento do ticket foi cancelado.',
              components: []
            });
          };
        });
      };

      if (interaction.customId == "delete-ticket") {
        const guild = client.guilds.cache.get(interaction.guildId);
        const chan = guild.channels.cache.get(interaction.channelId);

        interaction.reply({
          content: 'Salvando mensagens...'
        });

        chan.messages.fetch().then(async (messages) => {
          let a = messages.filter(m => m.author.bot !== true).map(m =>
            `${new Date(m.createdTimestamp).toLocaleString('pt-BR')} - ${m.author.username}#${m.author.discriminator}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`
          ).reverse().join('\n');
          if (a.length < 1) a = "Nothing"
          hastebin.createPaste(a, {
            contentType: 'text/plain',
            server: 'https://hastebin.skyra.pw'
          }, {})
            .then(function (urlToPaste) {
              const embed = new EmbedBuilder()
                .setDescription(`<:ativado:1013644137469329469> **INFORMAÇÕES DO TICKET**\n \
                <:ativado:1013644134160019516> \`Criado por:\` <@!${chan.topic}>\n \
                <:ativado:1013644134160019516> \`Deletado por:\` <@!${interaction.user.id}>\n \
                <:ativado:1013644134160019516> \`ID:\` ${chan.id}\n \
                <:ativado:1013644135485419541> \`Registro:\` [Clique aqui](${urlToPaste})\n`)
                .setColor(config.colorOther)
                .setFooter({
                  text: config.footerText,
                  iconURL: config.serverIcon
                })
                .setTimestamp();

              const embed2 = new EmbedBuilder()
                .setAuthor({
                  name: 'REGISTROS DO TICKET',
                  iconURL: config.serverIcon
                })
                .setDescription(`Ficamos felizes em poder atendê-lo, esperamos que você tenha sido bem atendido.\n\n \
                <:ativado:1013644137469329469> **INFORMAÇÕES DO TICKET**\n \
                <:ativado:1013644134160019516> \`Criado por:\` <@!${chan.topic}>\n \
                <:ativado:1013644134160019516> \`Deletado por:\` <@!${interaction.user.id}>\n \
                <:ativado:1013644134160019516> \`ID:\` ${chan.id}\n \
                <:ativado:1013644135485419541> \`Registro:\` [Clique aqui](${urlToPaste})`)
                .setColor(config.colorOther)
                .setFooter({
                  text: config.footerText,
                  iconURL: config.serverIcon
                })
                .setTimestamp();

              client.channels.cache.get(config.logsTicket).send({
                embeds: [embed]
              });
              client.users.cache.get(chan.topic).send({
                embeds: [embed2]
              }).catch(() => { console.log('O BOT não conseguiu enviar uma mensagem privada ao usuário.') });
              chan.send('Excluindo o canal...');

              setTimeout(() => {
                chan.delete();
              }, 5000);
            });
        });
      };
    }
  },
};