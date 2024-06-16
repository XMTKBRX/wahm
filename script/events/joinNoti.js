const axios = require('axios');

module.exports.config = {
    name: "joinNoti",
    eventType: ["log:subscribe"],
    version: "1.0.4",
    credits: "Mirai Team",
    description: "Thông báo bot hoặc người vào nhóm",
    dependencies: {
        "fs-extra": " "
    }
};

module.exports.run = async function({ api, event, Users, Threads }) {
    const moment = require("moment-timezone");
    var fullYear = global.client.getTime("fullYear");
    var getHours = await global.client.getTime("hours");
    var session = `${getHours < 3 ? "ن" : getHours < 8 ? "ح" : getHours < 11 ? "ه" : getHours < 16 ? "ق" : getHours < 23 ? "ث" : "ه"}`;
    const { join } = require("path");
    const { threadID } = event;
    const { PREFIX } = global.config;

    console.log(2);

    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        console.log(1);
        return api.sendMessage("‌▂▃▅▆تحميل...𝟏𝟎𝟎%▆▅▃▂\n\n[⚜]●▬▬▬▬๑⇧⇧๑▬▬▬▬●[⚜]\n⚜️== 「اتصال ناجح ✅」==⚜️\n ●▬▬▬▬๑⇧⇧๑▬▬▬▬●[⚜]", threadID, async () => {
            let check = true;
            setTimeout(() => check = false, 30 * 1000);

            while (check) {
                const threadData = (await Threads.getInfo(threadID)) || {};
                if (threadData.hasOwnProperty("adminIDs")) {
                    check = false;
                    api.sendMessage("", threadID, (err, info) => {
                        global.client.handleReply.push({
                            name: "langChoose_0x01042022",
                            messageID: info.messageID,
                            adminIDs: threadData.adminIDs
                        });
                    });
                }
            }

            api.changeNickname(` ${(!global.config.BOTNAME) ? "و" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
            api.sendMessage(``, threadID);
        });
    } else {
        try {
            const { createReadStream, existsSync, mkdirSync } = require("fs-extra");
            let { threadName, participantIDs } = await api.getThreadInfo(threadID);

            const threadData = global.data.threadData.get(parseInt(threadID)) || {};
            const path = join("");
            const pathGif = join(path, `hdfi2.jpg`);

            var mentions = [], nameArray = [], memLength = [], i = 0;

            for (const participant of event.logMessageData.addedParticipants) {
                const userName = participant.fullName;
                const userId = participant.userFbId;
                nameArray.push(userName);
                mentions.push({ tag: userName, id: userId });
                memLength.push(participantIDs.length - i++);

                if (!global.data.allUserID.includes(userId)) {
                    await Users.createData(userId, { name: userName, data: {} });
                    global.data.userName.set(userId, userName);
                    global.data.allUserID.push(userId);
                }
            }

            const gifes = await axios.get(`https://i.imgur.com/aBbZnVa.gif`, { responseType: "stream" });
            const atth = gifes.data;
            memLength.sort((a, b) => a - b);

            let msg = (typeof threadData.customJoin == "undefined") ? 
                ` ⚜️=×= 「 اشعار 」=×=⚜️\n\n\n[⚜]●▬▬▬๑⇧⇧๑▬▬▬●[⚜]\nاسـم الـعـضـو الـجـديـد \n「{name}」\n [⚜]●▬▬▬๑⇧⇧๑▬▬▬●[⚜]\nاسـم الـمـجـمـوعـة\n『{threadName}』\n[⚜]●▬▬▬๑⇧⇧๑▬▬▬●[⚜]\nعـدد الاعـضـاء في الـمـجـمـوعـة\n{soThanhVien}\n[⚜]●▬▬▬๑⇧⇧๑▬▬▬●[⚜]\n{type}` : threadData.customJoin;

            msg = msg
                .replace(/\{name}/g, nameArray.join(', '))
                .replace(/\{type}/g, (memLength.length > 1) ? 'عضو مبند 🌚💔' : 'انا بوت ملاك في خدمتك 💀🎻')
                .replace(/\{soThanhVien}/g, memLength.join(', '))
                .replace(/\{threadName}/g, threadName);

            if (!existsSync(path)) mkdirSync(path, { recursive: true });

            let formPush = { body: msg, attachment: atth, mentions };

            return api.sendMessage(formPush, threadID);
        } catch (e) { 
            console.log(e);
        }
    }
};
