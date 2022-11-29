const { EmbedBuilder, ApplicationCommandType } = require('discord.js');
const request = require("request");
const moment = require("moment");
require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet');
const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_KEY);

module.exports = {
    name: 'edit',
    description: "dev test",
    cooldown: 100,
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: 'ManageRoles', // permission required

    options: [
        {
            name: 'user',
            description: "User, you want to edit.",
            type: 3,
            required: true
        },
        {
            name: 'raid',
            description: "Number of raid",
            type: 4,
            required: true
        },
        {
            name: 'pmc',
            description: "pmc kills",
            type: 4,
            required: true
        },
        {
            name: 'dogtag',
            description: "dogtags",
            type: 4,
            required: true
        },
        {
            name: 'scav',
            description: "scav kills",
            type: 4,
            required: true
        },
        {
            name: 'bodyguard',
            description: "bguzards kills",
            type: 4,
            required: true
        },
        {
            name: 'boss',
            description: "boss kills",
            type: 4,
            required: true
        },
        {
            name: 'extrapoints',
            description: "extra points",
            type: 4,
            required: true
        },
        {
            name: 'survived',
            description: "survived ?",
            type: 5,
            required: true,
            choices: [
                {
                    name: "TRUE",
                    value: "true"
                },
                {
                    name: "FALSE",
                    value: "false"
                }
            ]
        }
    ],

    run: async (client, interaction) => {
        if (interaction.channel.type === "dm") return;
        interaction.deferReply({ephemeral: true});

        let user = interaction.options.getString('user');
        let raid = interaction.options.getInteger('raid');
        let pmc = interaction.options.getInteger('pmc');
        let dogtag = interaction.options.getInteger('dogtag');
        let scav = interaction.options.getInteger('scav');
        let bodyguard = interaction.options.getInteger('bodyguard');
        let boss = interaction.options.getInteger('boss');
        let extrapoints = interaction.options.getInteger('extrapoints');
        let survived = interaction.options.getBoolean('survived');

        await doc.useServiceAccountAuth({
            client_email: "botedit@oct-30-22-shoreline.iam.gserviceaccount.com",
            private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCnYqe91/me/EUI\n0eswBotCzNp3pymWgpoWYpPZyYg3NExuLntwOgKeyN9VJgC8VH/YfOuwFc0jfs5u\n8KG5bG4M+9pUS0cCfY2qEHlkYECvptcHcTG7eIvL1KNFpaaYkCEUAceSGMdsJhfN\nFTtNXoVm23L4ZTHiHe6EBbfQYP6u/LOUUHUI7dm+bqlIjYlidl40IRtOznRmFajE\nwaI0Y97cWXCx1QlPhQ9cvGSg/ZQrNATlJjDu8JNcNoYRlfmNiQk4uIc98UI/u3sj\nojkuvdcTeCNUza/3UQgd7gQ4zdoNDo5s87w9CZJDT+Iz7T6VxY5UCGsQoQot+AuU\nJ0p7ii4BAgMBAAECggEABNhVNKiQwCpbMTMqVJyL4WYemMIM8R9cqHM4BmDQAZEQ\n+Ut9JTV4p/H2jPdppAnqHXEYPWOUKYfdH9b1R3G9CcEsg64eIxNRS2/oo6Apnyv8\nI2oCX4PQwBiqlTSDSv05B+Q5S6BN/XJo0/XeXpHy2JRXkpsTQ5FMOyQTOwPju1rn\nL+9EFdZYLpB68qkUxL2yxpo2Qcy7BIS84KHLxvtyZ15BFfz8/qHsUIflC9ajwxV/\nfKs8OuYqBqIyfNW4sQSnH64aDpxTlRpJ7iGxhJRv6zr2toCJ6MB6swx49pQrRbP3\nTejkm5dWKdM4SJ0TSSXUXvJkB4l51EhoWwuBeBF0MQKBgQDegyTBjepCIC7S19uC\nkWI7y8RWPFzaz/iP3YPNCZXI5SQhz87rVVLICAGNPeyxNtf3uhaVjuBezkdkub0j\ni1n5lRa6A4vVrJZETa2r+aP6cTQX7e9c3p80VGkTOEhrxyW3dwhdoUvrErzT6mJI\n7jjXWW+sPeiOt6aVT9EUv1GevQKBgQDAk5sqwyd8gWppps5xc37PX3UUa8hDL1CY\nPwDHs7+6oSgFkodEOCZGdcOrkHOWvr/WWyP/fW3e43ZVbfNZnq3lFcTsk0bDscvf\nd2f7J5yyK2QJC3kxDMRBKQpnwERnrYTXP043z/lVhfIuSvqTppbmpXm1yo4xisxz\nPKnPOxWSlQKBgAHCO5okCwP2ySf1eNCxYXtjguvDkmBQYICSmaYXO03ZMc3qnJIT\nnJHkLk71fFdyPYbBu8f21yMosjvDlBEh2tY0LXfO614G/TERBBxl3rvuBSFjSg8L\n22pIeIQkX74qVsv6buB+k+EJxuBN6/TznRNmq5FK8/mczf5EITzuvjBpAoGBAInq\nbCrg3quNJ3+IpbqcY0nybC/2zNJI1WhjXpSmx33KIpZzDQqvR8IYXszEw/NGoq7K\nUOqNkp0Yu8uM1cXuHU2+HGztQLWv5Hki08YL5W24I4lSvTWClh6wXLJXAOZbX5Kj\n1Mml2UQFjJ7YtcH+gX2nLpYh/Vm/tJIm9Nnjz5xNAoGALHMON+GswcTRLFJWmqxC\ni/o6M3kVVwkTrHMTCRNYnuBIFeQzNGvfvALOeEmDZTp3azS0c6uxKXxYHU8JTAm+\nZZLVrwowrf3mRdeygOnjOE/TyMlAyGxdZyhyXbTXHlfTKek1pxoiltHoCpQzDzdI\n9vxdw/n7NY5qND30niMnY+w=\n-----END PRIVATE KEY-----\n",
        });

        await doc.loadInfo();
        const sheet = doc.sheetsByTitle[user]; //<--- this will take name entered in discord bot command
        
        if(sheet == null) {
            const test = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle("**Error!**")
                .setDescription("User with this name doesnt exist")
                interaction.editReply({ embeds: [test], ephemeral: true }).catch(error => { console.log("error") })
                return;
        }
        await sheet.loadCells('A1:IE3'); //<--- just load to cache

        if(raid < 1 || raid > 30)
        {
            const test = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle("**Error!**")
                .setDescription("Enter raid number min: 1 max: 30\nYou entered: "+raid)
                interaction.editReply({ embeds: [test], ephemeral: true }).catch(error => { console.log("error") })
                return;
        }
        if(raid == 1)
        {
            const pmc1 = sheet.getCellByA1('A3');
            const dogtag1 = sheet.getCellByA1('B3');
            const scav1 = sheet.getCellByA1('C3');
            const guard1 = sheet.getCellByA1('D3');
            const boss1 = sheet.getCellByA1('E3');
            const extra1 = sheet.getCellByA1('F3');
            const survived1 = sheet.getCellByA1('G3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 2)
        {
            const pmc1 = sheet.getCellByA1('I3');
            const dogtag1 = sheet.getCellByA1('J3');
            const scav1 = sheet.getCellByA1('K3');
            const guard1 = sheet.getCellByA1('L3');
            const boss1 = sheet.getCellByA1('M3');
            const extra1 = sheet.getCellByA1('N3');
            const survived1 = sheet.getCellByA1('O3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 3)
        {
            const pmc1 = sheet.getCellByA1('Q3');
            const dogtag1 = sheet.getCellByA1('R3');
            const scav1 = sheet.getCellByA1('S3');
            const guard1 = sheet.getCellByA1('T3');
            const boss1 = sheet.getCellByA1('U3');
            const extra1 = sheet.getCellByA1('V3');
            const survived1 = sheet.getCellByA1('W3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 4)
        {
            const pmc1 = sheet.getCellByA1('Y3');
            const dogtag1 = sheet.getCellByA1('Z3');
            const scav1 = sheet.getCellByA1('AA3');
            const guard1 = sheet.getCellByA1('AB3');
            const boss1 = sheet.getCellByA1('AC3');
            const extra1 = sheet.getCellByA1('AD3');
            const survived1 = sheet.getCellByA1('AE3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 5)
        {
            const pmc1 = sheet.getCellByA1('AG3');
            const dogtag1 = sheet.getCellByA1('AH3');
            const scav1 = sheet.getCellByA1('AI3');
            const guard1 = sheet.getCellByA1('AJ3');
            const boss1 = sheet.getCellByA1('AK3');
            const extra1 = sheet.getCellByA1('AL3');
            const survived1 = sheet.getCellByA1('AM3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 6)
        {
            const pmc1 = sheet.getCellByA1('AO3');
            const dogtag1 = sheet.getCellByA1('AP3');
            const scav1 = sheet.getCellByA1('AQ3');
            const guard1 = sheet.getCellByA1('AR3');
            const boss1 = sheet.getCellByA1('AS3');
            const extra1 = sheet.getCellByA1('AT3');
            const survived1 = sheet.getCellByA1('AU3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 7)
        {
            const pmc1 = sheet.getCellByA1('AW3');
            const dogtag1 = sheet.getCellByA1('AX3');
            const scav1 = sheet.getCellByA1('AY3');
            const guard1 = sheet.getCellByA1('AZ3');
            const boss1 = sheet.getCellByA1('BA3');
            const extra1 = sheet.getCellByA1('BB3');
            const survived1 = sheet.getCellByA1('BC3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 8)
        {
            const pmc1 = sheet.getCellByA1('BE3');
            const dogtag1 = sheet.getCellByA1('BF3');
            const scav1 = sheet.getCellByA1('BG3');
            const guard1 = sheet.getCellByA1('BH3');
            const boss1 = sheet.getCellByA1('BI3');
            const extra1 = sheet.getCellByA1('BJ3');
            const survived1 = sheet.getCellByA1('BK3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 9)
        {
            const pmc1 = sheet.getCellByA1('BM3');
            const dogtag1 = sheet.getCellByA1('BN3');
            const scav1 = sheet.getCellByA1('BO3');
            const guard1 = sheet.getCellByA1('BP3');
            const boss1 = sheet.getCellByA1('BQ3');
            const extra1 = sheet.getCellByA1('BR3');
            const survived1 = sheet.getCellByA1('BS3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 10)
        {
            const pmc1 = sheet.getCellByA1('BU3');
            const dogtag1 = sheet.getCellByA1('BV3');
            const scav1 = sheet.getCellByA1('BW3');
            const guard1 = sheet.getCellByA1('BX3');
            const boss1 = sheet.getCellByA1('BY3');
            const extra1 = sheet.getCellByA1('BZ3');
            const survived1 = sheet.getCellByA1('CA3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 11)
        {
            const pmc1 = sheet.getCellByA1('CC3');
            const dogtag1 = sheet.getCellByA1('CD3');
            const scav1 = sheet.getCellByA1('CE3');
            const guard1 = sheet.getCellByA1('CF3');
            const boss1 = sheet.getCellByA1('CG3');
            const extra1 = sheet.getCellByA1('CH3');
            const survived1 = sheet.getCellByA1('CI3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 12)
        {
            const pmc1 = sheet.getCellByA1('CK3');
            const dogtag1 = sheet.getCellByA1('CL3');
            const scav1 = sheet.getCellByA1('CM3');
            const guard1 = sheet.getCellByA1('CN3');
            const boss1 = sheet.getCellByA1('CO3');
            const extra1 = sheet.getCellByA1('CP3');
            const survived1 = sheet.getCellByA1('CQ3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 13)
        {
            const pmc1 = sheet.getCellByA1('CS3');
            const dogtag1 = sheet.getCellByA1('CT3');
            const scav1 = sheet.getCellByA1('CU3');
            const guard1 = sheet.getCellByA1('CV3');
            const boss1 = sheet.getCellByA1('CW3');
            const extra1 = sheet.getCellByA1('CX3');
            const survived1 = sheet.getCellByA1('CY3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 14)
        {
            const pmc1 = sheet.getCellByA1('DA3');
            const dogtag1 = sheet.getCellByA1('DB3');
            const scav1 = sheet.getCellByA1('DC3');
            const guard1 = sheet.getCellByA1('DD3');
            const boss1 = sheet.getCellByA1('DE3');
            const extra1 = sheet.getCellByA1('DF3');
            const survived1 = sheet.getCellByA1('DG3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 15)
        {
            const pmc1 = sheet.getCellByA1('DI3');
            const dogtag1 = sheet.getCellByA1('DJ3');
            const scav1 = sheet.getCellByA1('DK3');
            const guard1 = sheet.getCellByA1('DL3');
            const boss1 = sheet.getCellByA1('DM3');
            const extra1 = sheet.getCellByA1('DN3');
            const survived1 = sheet.getCellByA1('DO3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 16)
        {
            const pmc1 = sheet.getCellByA1('DQ3');
            const dogtag1 = sheet.getCellByA1('DR3');
            const scav1 = sheet.getCellByA1('DS3');
            const guard1 = sheet.getCellByA1('DT3');
            const boss1 = sheet.getCellByA1('DU3');
            const extra1 = sheet.getCellByA1('DV3');
            const survived1 = sheet.getCellByA1('DW3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 17)
        {
            const pmc1 = sheet.getCellByA1('DY3');
            const dogtag1 = sheet.getCellByA1('DZ3');
            const scav1 = sheet.getCellByA1('EA3');
            const guard1 = sheet.getCellByA1('EB3');
            const boss1 = sheet.getCellByA1('EC3');
            const extra1 = sheet.getCellByA1('ED3');
            const survived1 = sheet.getCellByA1('EE3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 18)
        {
            const pmc1 = sheet.getCellByA1('EG3');
            const dogtag1 = sheet.getCellByA1('EH3');
            const scav1 = sheet.getCellByA1('EI3');
            const guard1 = sheet.getCellByA1('EJ3');
            const boss1 = sheet.getCellByA1('EK3');
            const extra1 = sheet.getCellByA1('EL3');
            const survived1 = sheet.getCellByA1('EM3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 19)
        {
            const pmc1 = sheet.getCellByA1('EO3');
            const dogtag1 = sheet.getCellByA1('EP3');
            const scav1 = sheet.getCellByA1('EQ3');
            const guard1 = sheet.getCellByA1('ER3');
            const boss1 = sheet.getCellByA1('ES3');
            const extra1 = sheet.getCellByA1('ET3');
            const survived1 = sheet.getCellByA1('EU3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 20)
        {
            const pmc1 = sheet.getCellByA1('EW3');
            const dogtag1 = sheet.getCellByA1('EX3');
            const scav1 = sheet.getCellByA1('EY3');
            const guard1 = sheet.getCellByA1('EZ3');
            const boss1 = sheet.getCellByA1('FA3');
            const extra1 = sheet.getCellByA1('FB3');
            const survived1 = sheet.getCellByA1('FC3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 21)
        {
            const pmc1 = sheet.getCellByA1('FE3');
            const dogtag1 = sheet.getCellByA1('FF3');
            const scav1 = sheet.getCellByA1('FG3');
            const guard1 = sheet.getCellByA1('FH3');
            const boss1 = sheet.getCellByA1('FI3');
            const extra1 = sheet.getCellByA1('FJ3');
            const survived1 = sheet.getCellByA1('FK3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 22)
        {
            const pmc1 = sheet.getCellByA1('FM3');
            const dogtag1 = sheet.getCellByA1('FN3');
            const scav1 = sheet.getCellByA1('FO3');
            const guard1 = sheet.getCellByA1('FP3');
            const boss1 = sheet.getCellByA1('FQ3');
            const extra1 = sheet.getCellByA1('FR3');
            const survived1 = sheet.getCellByA1('FS3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 23)
        {
            const pmc1 = sheet.getCellByA1('FU3');
            const dogtag1 = sheet.getCellByA1('FV3');
            const scav1 = sheet.getCellByA1('FW3');
            const guard1 = sheet.getCellByA1('FX3');
            const boss1 = sheet.getCellByA1('FY3');
            const extra1 = sheet.getCellByA1('FZ3');
            const survived1 = sheet.getCellByA1('GA3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 24)
        {
            const pmc1 = sheet.getCellByA1('GC3');
            const dogtag1 = sheet.getCellByA1('GD3');
            const scav1 = sheet.getCellByA1('GE3');
            const guard1 = sheet.getCellByA1('GF3');
            const boss1 = sheet.getCellByA1('GG3');
            const extra1 = sheet.getCellByA1('GH3');
            const survived1 = sheet.getCellByA1('GI3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 25)
        {
            const pmc1 = sheet.getCellByA1('GK3');
            const dogtag1 = sheet.getCellByA1('GL3');
            const scav1 = sheet.getCellByA1('GM3');
            const guard1 = sheet.getCellByA1('GN3');
            const boss1 = sheet.getCellByA1('GO3');
            const extra1 = sheet.getCellByA1('GP3');
            const survived1 = sheet.getCellByA1('GQ3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 26)
        {
            const pmc1 = sheet.getCellByA1('GS3');
            const dogtag1 = sheet.getCellByA1('GT3');
            const scav1 = sheet.getCellByA1('GU3');
            const guard1 = sheet.getCellByA1('GV3');
            const boss1 = sheet.getCellByA1('GW3');
            const extra1 = sheet.getCellByA1('GX3');
            const survived1 = sheet.getCellByA1('GY3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 27)
        {
            const pmc1 = sheet.getCellByA1('HA3');
            const dogtag1 = sheet.getCellByA1('HB3');
            const scav1 = sheet.getCellByA1('HC3');
            const guard1 = sheet.getCellByA1('HD3');
            const boss1 = sheet.getCellByA1('HE3');
            const extra1 = sheet.getCellByA1('HF3');
            const survived1 = sheet.getCellByA1('HG3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 28)
        {
            const pmc1 = sheet.getCellByA1('HI3');
            const dogtag1 = sheet.getCellByA1('HJ3');
            const scav1 = sheet.getCellByA1('HK3');
            const guard1 = sheet.getCellByA1('HL3');
            const boss1 = sheet.getCellByA1('HM3');
            const extra1 = sheet.getCellByA1('HN3');
            const survived1 = sheet.getCellByA1('HO3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 29)
        {
            const pmc1 = sheet.getCellByA1('HQ3');
            const dogtag1 = sheet.getCellByA1('HR3');
            const scav1 = sheet.getCellByA1('HS3');
            const guard1 = sheet.getCellByA1('HT3');
            const boss1 = sheet.getCellByA1('HU3');
            const extra1 = sheet.getCellByA1('HV3');
            const survived1 = sheet.getCellByA1('HW3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }
        if(raid == 30)
        {
            const pmc1 = sheet.getCellByA1('HY3');
            const dogtag1 = sheet.getCellByA1('HZ3');
            const scav1 = sheet.getCellByA1('IA3');
            const guard1 = sheet.getCellByA1('IB3');
            const boss1 = sheet.getCellByA1('IC3');
            const extra1 = sheet.getCellByA1('ID3');
            const survived1 = sheet.getCellByA1('IE3');


            pmc1.value = pmc;
            dogtag1.value = dogtag;
            scav1.value = scav;
            guard1.value = bodyguard;
            boss1.value = boss;
            extra1.value = extrapoints;
            survived1.value = survived;
            await sheet.saveUpdatedCells();
        }


            const test = new EmbedBuilder()
                .setColor('#3fff00')
                .setTitle(`**【Edited】    User: ${user.toString()}    《Raid #${raid.toString()}》**`)
                .setDescription(`**Command entered by the user:** ${interaction.user.tag}\n**Command entered in the channel:** ${interaction.channel}`)
                .addFields([
                    { name: "===================================================", value: "\u200b", inline: false },
                    { name: "PMC", value: pmc.toString(), inline: true },
                    { name: "Dog Tag", value: dogtag.toString(), inline: true },
                    { name: "Scav", value: scav.toString(), inline: true },
                    { name: "Body Guard", value: bodyguard.toString(), inline: true },
                    { name: "Boss", value: boss.toString(), inline: true },
                    { name: "Extra Points", value: extrapoints.toString(), inline: true },
                    { name: "Survived", value: survived.toString(), inline: true },
                ])
                await interaction.editReply({ embeds: [test], ephemeral: true }).catch(error => { console.log(error) });
                await interaction.guild.channels.cache.get(process.env.LOG_CHANNEL_ID).send({ embeds: [test] }).catch(error => { console.log(error) })
    }
};