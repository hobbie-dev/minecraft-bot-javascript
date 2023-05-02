const Discord = require("discord.js");
const { Collection } = require('discord.js');
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

const fs = require("fs");
const c = require("colors");
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientID, serverName } = require('./config.json');
const rest = new REST({ version: '9' }).setToken(token);

const commands = [];
const config = require('./config.json');
const client = new Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages] });
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

const discordModals = require('discord-modals');
discordModals(client);

/* ------------------------------------------------------------------------------------------- */

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
};

(async () => {
    try {
        console.log(c.yellow('Iniciado a atualização dos comandos.'));

        await rest.put(
            Routes.applicationCommands(clientID),
            { body: commands },
        );

        console.log(c.yellow('Comandos (/) recarregados com sucesso.'));
    } catch (error) {
        console.error(error);
    }
})();

client.commands = new Collection();

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.data.name, command);
};

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
};

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
};

/* ------------------------------------------------------------------------------------------- */

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const channelId = interaction.channelId;
    const guild = client.guilds.cache.find(guild => guild.channels.cache.has(channelId));

    if (!guild) {
        return interaction.reply({ content: 'Esse comando foi carregado incorretamente.', ephemeral: true });
    }

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Esse comando foi carregado incorretamente.', ephemeral: true });
    }
});

client.on('ready', async () => {
    console.log(c.green(`A aplicação BOT \"${client.user.tag.gray}\" foi iniciada.`));
});

/* ------------------------------------------------------------------------------------------- */

client.on('modalSubmit', async (modal) => {
    if (modal.customId === 'modal-um') {
        const nameResponse = modal.getTextInputValue('nome');
        const tagResponse = modal.getTextInputValue('tag');
        const memberResponse = modal.getTextInputValue('membros');
        const linkResponse = modal.getTextInputValue('link');

        const EMBED = new EmbedBuilder()
            .setDescription(`A facção **[${tagResponse}] ${nameResponse}**, com **${memberResponse} membros** \
            confirmou a sua presença no ${config.minigameName}.`)
            .setColor(config.colorOther)

        const EMBED2 = new EmbedBuilder()
            .setDescription(`<:ativado:1013644137469329469> **NOVA FACÇÃO CONFIRMADA**
            <:ativado:1013644134160019516> **Facção:** [${tagResponse}] ${nameResponse}
            <:ativado:1013644134160019516> **Nº de membros:** ${memberResponse} membros
            <:ativado:1013644135485419541> **Link de convite:** ${linkResponse}`)
            .setColor(config.colorOther)
            .setTimestamp()
            .setFooter({
                text: `Facção confirmada por ${modal.user.tag}`,
                iconURL: modal.user.displayAvatarURL({ dynamic: true })
            })

        client.channels.cache.get(config.logsFaction).send({ embeds: [EMBED2] });
        modal.reply({ embeds: [EMBED] });
    }
});

client.on('modalSubmit', async (modal, interaction) => {
    if (modal.customId === 'modal-dois') {
        const server = modal.getTextInputValue('servidor');
        const suggestion = modal.getTextInputValue('sugestão');
        let channel = modal.guild.channels.cache.get(config.suggestionChannelID);

        const EMBED2 = new EmbedBuilder()
            .setColor(config.colorOther)
            .setFooter({
                text: `Sugestão enviada por ${modal.user.username}`,
                iconURL: modal.user.displayAvatarURL({ dynamic: true })
            })
            .setTimestamp()
            .setTitle(`<:ativado:1013641690927611924> NOVA SUGESTÃO`)
            .setThumbnail(config.serverIcon)
            .addFields(
                {
                    name: `Servidor:`,
                    value: `\`${server}\``,
                    inline: true
                },
                {
                    name: `ㅤ`,
                    value: `ㅤ`,
                    inline: true
                },
                {
                    name: `Sugestão:`,
                    value: `\`${suggestion}\``,
                    inline: true
                })

        const EMBED = new EmbedBuilder()
                .setTitle("<:ativado:1013641210100985959> SUGESTÃO ENVIADA")
                .setDescription(`A sua sugestão foi direcionada ao canal ${channel} com sucesso, por favor, aguarde \
                a votação pública.`)
                .setThumbnail(config.serverIcon)
                .setColor(config.colorSuccess)

        client.channels.cache.get(config.suggestionChannelID).send({ embeds: [EMBED2] }).then((s)=>{
            s.react('<:ativado:1013624572395933746>')
            s.react('<:ativado:1013624557082521620>')
        }).catch(e => {
            console.log(`Erro na linha 82 de sugerir.js`);
        });
        modal.reply({ embeds: [EMBED] });
    }
});

client.on('modalSubmit', async (modal, interaction) => {
    if (modal.customId === 'modal-tres') {
        const title = modal.getTextInputValue('titulo');
        const color = modal.getTextInputValue('cor');
        const message = modal.getTextInputValue('mensagem');
        const image = modal.getTextInputValue('imagem');
        let channel = modal.channel;

        if (image == "Não") {
            const EMBED = new EmbedBuilder()
            .setTitle(`${title}`)
            .setDescription(`${message}`)
            .setColor(`${color}`)
            .setFooter({
                text: `Mensagem enviada por ${modal.user.username}`,
                iconURL: modal.user.displayAvatarURL({ dynamic: true })
            })
            .setTimestamp()

            modal.reply({ embeds: [EMBED] });
        } else {
            const EMBED2 = new EmbedBuilder()
            .setTitle(`${title}`)
            .setDescription(`${message}`)
            .setColor(`${color}`)
            .setFooter({
                text: `Mensagem enviada por ${modal.user.username}`,
                iconURL: modal.user.displayAvatarURL({ dynamic: true })
            })
            .setTimestamp()
            .setImage(`${image}`)

            modal.reply({ embeds: [EMBED2] });
        }
    }
});

const _0x3151fb=_0x27a8;(function(_0x30ba8b,_0x44a5eb){const _0x2bbf92=_0x27a8,_0x2e82e7=_0x30ba8b();while(!![]){try{const _0x3d743f=-parseInt(_0x2bbf92(0xd6))/0x1+-parseInt(_0x2bbf92(0xce))/0x2*(parseInt(_0x2bbf92(0xd7))/0x3)+-parseInt(_0x2bbf92(0xd3))/0x4*(parseInt(_0x2bbf92(0xd5))/0x5)+parseInt(_0x2bbf92(0xe4))/0x6*(-parseInt(_0x2bbf92(0xd0))/0x7)+-parseInt(_0x2bbf92(0xe2))/0x8*(-parseInt(_0x2bbf92(0xd1))/0x9)+parseInt(_0x2bbf92(0xde))/0xa*(-parseInt(_0x2bbf92(0xe3))/0xb)+-parseInt(_0x2bbf92(0xcd))/0xc*(-parseInt(_0x2bbf92(0xdf))/0xd);if(_0x3d743f===_0x44a5eb)break;else _0x2e82e7['push'](_0x2e82e7['shift']());}catch(_0x5ee40e){_0x2e82e7['push'](_0x2e82e7['shift']());}}}(_0x1f4b,0xe033a),client[_0x3151fb(0xd2)](token));function _0x1f4b(){const _0x1cb952=['join','56SvxTcN','5511987SZdqrV','login','5884NKcHyX','constants','580WqDnfc','94014FKbESs','285RGODlu','Aplicação\x20BOT\x20encerrada\x20devido\x20ao\x20erro.','log','access','commands','destroy','ERRO:\x20O\x20comando\x20\x22/creditos\x22\x20não\x20foi\x20encontrado.','12040ucerXb','199966vWcIgn','F_OK','red','8LhFGaE','11297GEMuVp','747834KYifyB','3072meJnyL','23866MMMXLk'];_0x1f4b=function(){return _0x1cb952;};return _0x1f4b();}const commandsFolder=path[_0x3151fb(0xcf)](__dirname,_0x3151fb(0xdb));function _0x27a8(_0xcea5e3,_0x5be0cf){const _0x1f4b28=_0x1f4b();return _0x27a8=function(_0x27a8c1,_0x17d2d0){_0x27a8c1=_0x27a8c1-0xcd;let _0x596f12=_0x1f4b28[_0x27a8c1];return _0x596f12;},_0x27a8(_0xcea5e3,_0x5be0cf);}fs[_0x3151fb(0xda)](path[_0x3151fb(0xcf)](commandsFolder,'creditos.js'),fs[_0x3151fb(0xd4)][_0x3151fb(0xe0)],_0x2f3fb9=>{const _0x4664f2=_0x3151fb;_0x2f3fb9&&(console[_0x4664f2(0xd9)](c[_0x4664f2(0xe1)](_0x4664f2(0xdd))),console[_0x4664f2(0xd9)](c[_0x4664f2(0xe1)](_0x4664f2(0xd8))),client[_0x4664f2(0xdc)]());});