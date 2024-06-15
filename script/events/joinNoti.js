module.exports.config = {
    name: "joinNoti",
    eventType: ["log:subscribe"],
    version: "1.0.1",
    credits: "CatalizCS",
    description: "Notification of bots or people entering groups with random gif/photo/video",
    dependencies: {
        "fs-extra": "",
        "path": "",
        "pidusage": ""
    }
};
 
module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
 
    const path = join(__dirname, "cache", "joinGif");
    if (existsSync(path)) mkdirSync(path, { recursive: true }); 
 
    const path2 = join(__dirname, "cache", "joinGif", "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });
 
    return;
}
 
 
module.exports.run = async function({ api, event }) {
    const { join } = global.nodemodule["path"];
    const { threadID } = event;
    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
        api.changeNickname(`[ ${global.config.PREFIX} ] • ${(!global.config.BOTNAME) ? " " : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
        const fs = require("fs");
        return api.sendMessage("", event.threadID, () => api.sendMessage({body: `${global.config.BOTNAME} - بوت متصل ✅\n─────────────────\n╭────────────╮\n🌻إجمالي المستخدمين: ${global.data.allUserID.length}🌻\n╰────────────╯\n ─────────────────\ \n─────────────────\nاسمي ${global.config.BOTNAME} \n─────────────────\nالبادئة الخاصة بي هي [ ${global.config.PREFIX} ]\n─────────────────\nيكتب ${global.config.PREFIX}تساعد في رؤية قائمة اوامر الخاصة بي\n─────────────────\nMy المالك هو 乃 乃.\n─────────────────\nيستخدم ${global.config.PREFIX}دعا لأيمشاكل:\n─────────────────\n╭────────╮\n🌷::𝐄𝐱𝐚𝐦𝐩𝐥𝐞::🌷\n╰────────╯\n─────────────────\n /زخرفه /مارك /اوبامه\n/vid /صوت /صور \n/زيرو /لعب /زوجني /اوامر\n ─────────────────`, attachment: fs.createReadStream(__dirname + "/cache/joinGif/welc.png")} ,threadID));
    }
    else {
        try {
            const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
            let { threadName, participantIDs } = await api.getThreadInfo(threadID);
 
            const threadData = global.data.threadData.get(parseInt(threadID)) || {};
            const path = join(__dirname, "cache", "joinGif");
            const pathGif = join(path, `${threadID}.gif`);
 
            var mentions = [], nameArray = [], memLength = [], i = 0;
            
            for (id in event.logMessageData.addedParticipants) {
                const userName = event.logMessageData.addedParticipants[id].fullName;
                nameArray.push(userName);
                mentions.push({ tag: userName, id });
                memLength.push(participantIDs.length - i++);
            }
            memLength.sort((a, b) => a - b);
            
            (typeof threadData.customJoin == "undefined") ? msg = "░▒▓█►─═ {name} هلا يا ═─◄█▓▒░ ,\n─────────────────\n ✴  🎀 {soThanhVien} انت عضو 🎀  ✴  ─────────────────\  ★  🎀 {threadName} في مجموعه  🎀  ★\n─────────────────\n✴  🎀  من فضلك استمتع بإقامتك  🎀  ✴\n─────────────────\n🐹  🎀  وتكوين الكثير من الأصدقاء  🎀  🐹 =)\n─────────────────🥳😍" : msg = threadData.customJoin;
            msg = msg
            .replace(/\{name}/g, nameArray.join(', '))
            .replace(/\{type}/g, (memLength.length > 1) ?  'Friends' : 'Friend')
            .replace(/\{soThanhVien}/g, memLength.join(', '))
            .replace(/\{threadName}/g, threadName);
 
            if (existsSync(path)) mkdirSync(path, { recursive: true });
 
            const randomPath = readdirSync(join(__dirname, "cache", "joinGif", "randomgif"));
 
            if (existsSync(pathGif)) formPush = { body: msg, attachment: createReadStream(pathGif), mentions }
            else if (randomPath.length != 0) {
                const pathRandom = join(__dirname, "cache", "joinGif", "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
                formPush = { body: msg, attachment: createReadStream(pathRandom), mentions }
            }
            else formPush = { body: msg, mentions }
 
            return api.sendMessage(formPush, threadID);
        } catch (e) { return console.log(e) };
    }
      }