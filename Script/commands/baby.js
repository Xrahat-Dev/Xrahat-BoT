const axios = require("axios");
let simsim = "";
let count_req = 0; 
// Note : THIS CODE MADE BY RX @RX_ABDULLAH007
const triggerLocks = new Set();
async function sendTypingIndicatorV2(sendTyping, threadID) {
 try {
 var wsContent = {
 app_id: 2220391788200892,
 payload: JSON.stringify({
 label: 3, //original author - rX Abdullah
 payload: JSON.stringify({
 thread_key: threadID.toString(),
 is_group_thread: +(threadID.toString().length >= 16),
 is_typing: +sendTyping,
 attribution: 0
 }),
 version: 5849951561777440
 }),
 request_id: ++count_req,
 type: 4
 };
 await new Promise((resolve, reject) =>
 mqttClient.publish('/ls_req', JSON.stringify(wsContent), {}, (err, _packet) =>
 err ? reject(err) : resolve()
 )
 );
 } catch (err) {
 console.log("⚠️ Typing indicator error:", err.message);
 }
}

(async () => {
 try {
 const res = await axios.get("https://raw.githubusercontent.com/abdullahrx07/X-api/main/MaRiA/baseApiUrl.json");
 if (res.data && res.data.mari) simsim = res.data.mari;
 } catch {}
})();
let botUID = null;
function getBotUID(api) {
 if (botUID) return botUID;
 try {
 if (typeof api.getCurrentUserID === "function") {
 botUID = api.getCurrentUserID();
 }
 } catch {}
 return botUID;
}

module.exports.config = {
 name: "baby",
 aliases: ["maria", "bot"],
 premium: false, 
 version: "1.3.1",
 hasPermssion: 0,
 credits: "rX",
 description: "AI auto teach with Teach & List support + Typing effect",
 commandCategory: "chat",
 usages: "[query]\nlist\nteach [Question] - [Reply]\nreact [Question] - [Emoji]\nedit [Question] - [OldReply] - [NewReply]\nremove/rm [Question] - [Reply]\ndel (reply to bot's wrong answer)\nmsg [trigger]\nmsg [trigger] -20 (custom show limit)\nautoteach on/off (per-thread)\nautoteach on/off global (all threads default)",
 cooldowns: 0,
 prefix: false
};

module.exports.run = async function ({ api, event, args, Users }) {
 const uid = event.senderID;
 const senderName = await Users.getNameUser(uid);
 const query = args.join(" ").toLowerCase();

 try {
 if (!simsim) return api.sendMessage("❌ API not loaded yet.", event.threadID, event.messageID);

if (args[0] === "autoteach") {
 const mode = args[1];
 const scope = (args[2] || "").toLowerCase();
 if (!["on", "off"].includes(mode))
 return api.sendMessage("✅ Use: baby autoteach on/off\nOr: baby autoteach on/off global", event.threadID, event.messageID);

 const status = mode === "on";
 if (scope === "global") {
 await axios.post(`${simsim}/setting`, { autoTeach: status });
 return api.sendMessage(`✅ Auto teach is now ${status ? "ON 🟢" : "OFF 🔴"} 𝐆𝐋𝐎𝐁𝐀𝐋𝐋𝐘 (all threads without override)`, event.threadID, event.messageID);
 }
 const res = await axios.post(`${simsim}/setting`, { autoTeach: status, threadID: event.threadID });
 return api.sendMessage(`✅ ${res.data.message} (𝐭𝐡𝐢𝐬 𝐭𝐡𝐫𝐞𝐚𝐝 𝐨𝐧𝐥𝐲)`, event.threadID, event.messageID);
 }
 if (args[0] === "list") {
 const res = await axios.get(`${simsim}/list`);
 return api.sendMessage(
 `╭─╼🌟 𝐁𝐚𝐛𝐲 𝐀𝐈 𝐒𝐭𝐚𝐭𝐮𝐬\n├ 📝 𝐓𝐞𝐚𝐜𝐡𝐞𝐝 𝐐𝐮𝐞𝐬𝐭𝐢𝐨𝐧𝐬: ${res.data.totalQuestions}\n├ 📦 𝐒𝐭𝐨𝐫𝐞𝐝 𝐑𝐞𝐩𝐥𝐢𝐞𝐬: ${res.data.totalReplies}\n╰─╼👤 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫: 𝐫𝐗 𝐀𝐛𝐝𝐮𝐥𝐥𝐚𝐡`,
 event.threadID,
 event.messageID
 );
 }
 if (args[0] === "msg") {
 let trigger = args.slice(1).join(" ").trim();
 if (!trigger) return api.sendMessage("❌ | Use: !baby msg [trigger]\nOr: !baby msg [trigger] -20 (custom limit)", event.threadID, event.messageID);
let customLimit = null;
 const limitMatch = trigger.match(/\s*-(\d+)\s*$/);
 if (limitMatch) {
 customLimit = parseInt(limitMatch[1], 10);
 trigger = trigger.replace(/\s*-(\d+)\s*$/, "").trim();
 if (!trigger) return api.sendMessage("❌ | Use: !baby msg [trigger] -20", event.threadID, event.messageID);
 }
 const res = await axios.get(`${simsim}/simsimi-list?ask=${encodeURIComponent(trigger)}`);
 if (!res.data.replies || res.data.replies.length === 0)
 return api.sendMessage("❌ No replies found.", event.threadID, event.messageID);
 const REPLY_LIMIT = (customLimit && customLimit > 0) ? customLimit : 150;
 const allReplies = res.data.replies;
 const shownReplies = allReplies.slice(0, REPLY_LIMIT);
 const remaining = allReplies.length - shownReplies.length;

 const formatted = shownReplies.map((rep, i) => `➤ ${i + 1}. ${rep}`).join("\n");
 const limitNote = remaining > 0
 ? `\n⚠️ ${REPLY_LIMIT} 𝐭𝐚 𝐫𝐞𝐩𝐥𝐲 𝐝𝐞𝐤𝐡𝐚𝐧𝐨 𝐡𝐨𝐲𝐞𝐜𝐡𝐞, 𝐚𝐫𝐨 ${remaining} 𝐭𝐚 𝐛𝐚𝐤𝐢 𝐚𝐜𝐡𝐞 (𝐝𝐞𝐤𝐡𝐚𝐧𝐨 𝐣𝐚𝐜𝐜𝐡𝐞 𝐧𝐚, 𝐭𝐚𝐛𝐞 𝐤𝐢𝐩 𝐬𝐡𝐮𝐛𝐡 𝐫𝐞𝐩𝐥𝐢𝐫 𝐮𝐩𝐨𝐫 𝐤𝐚𝐣 𝐤𝐨𝐫𝐛𝐞)।\n`
 : "";
 const msg = `📌 𝗧𝗿𝗶𝗴𝗴𝗲𝗿: ${trigger.toUpperCase()}\n📋 𝗧𝗼𝘁𝗮𝗹: ${res.data.total}\n━━━━━━━━━━━━━━\n${formatted}\n━━━━━━━━━━━━━━${limitNote}✏️ Reply with the numbers you want to KEEP (e.g. "2, 7") — everything else will be removed.`;

 return api.sendMessage(msg, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "msgSelect",
 trigger
 });
 }
 }, event.messageID);
 }

 if (args[0] === "teach") {
 const parts = query.replace("teach ", "").split(" - ");
 if (parts.length < 2)
 return api.sendMessage("❌ | Use: teach [Question] - [Reply]", event.threadID, event.messageID);

 const [ask, ans] = parts;
 const res = await axios.get(`${simsim}/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}&senderID=${uid}&senderName=${encodeURIComponent(senderName)}`);
 return api.sendMessage(`✅ ${res.data.message}`, event.threadID, event.messageID);
 }
if (args[0] === "react") {
const rawQuery = args.slice(1).join(" ");
 const parts = rawQuery.split(" - ");
 if (parts.length < 2)
 return api.sendMessage("❌ | Use: react [Question] - [Emoji]", event.threadID, event.messageID);

 const [ask, emoji] = parts;
 if (!ask.trim() || !emoji.trim())
 return api.sendMessage("❌ | Use: react [Question] - [Emoji]", event.threadID, event.messageID);

 const res = await axios.get(`${simsim}/teachReact?ask=${encodeURIComponent(ask)}&emoji=${encodeURIComponent(emoji)}&senderName=${encodeURIComponent(senderName)}`);
 return api.sendMessage(`✅ ${res.data.message}`, event.threadID, event.messageID);
 }

 if (args[0] === "edit") {
 const parts = query.replace("edit ", "").split(" - ");
 if (parts.length < 3)
 return api.sendMessage("❌ | Use: edit [Question] - [OldReply] - [NewReply]", event.threadID, event.messageID);

 const [ask, oldR, newR] = parts;
 const res = await axios.get(`${simsim}/edit?ask=${encodeURIComponent(ask)}&old=${encodeURIComponent(oldR)}&new=${encodeURIComponent(newR)}`);
 return api.sendMessage(res.data.message, event.threadID, event.messageID);
 }

 if (["remove", "rm"].includes(args[0])) {
 const parts = query.replace(/^(remove|rm)\s*/, "").split(" - ");
 if (parts.length < 2)
 return api.sendMessage("❌ | Use: remove [Question] - [Reply]", event.threadID, event.messageID);

 const [ask, ans] = parts;
 const res = await axios.get(`${simsim}/delete?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`);
 return api.sendMessage(res.data.message, event.threadID, event.messageID);
 }

 if (args[0] === "del") {
 return api.sendMessage(
 "❌ | Reply to the bot's wrong answer message with \"!baby del\" to delete it.",
 event.threadID,
 event.messageID
 );
 }

 if (!query) {
 const texts = ["Hey baby 💖", "Yes, I'm here 😘"];
 const reply = texts[Math.floor(Math.random() * texts.length)];
 return api.sendMessage(reply, event.threadID);
 }

 return await deliverSimsimiResponse({ api, event, query, senderName });

 } catch (e) {
 return api.sendMessage(`❌ Error: ${e.message}`, event.threadID, event.messageID);
 }
};

module.exports.handleReply = async function ({ api, event, Users, handleReply }) {
 const senderName = await Users.getNameUser(event.senderID);
 const text = event.body?.trim();
 const lowered = text?.toLowerCase();
if (event.attachments && event.attachments.length > 0) {
 const type = event.attachments[0].type;
 let reaction = null;

 if (type === "photo") reaction = "🫩";
 else if (type === "animated_image") reaction = "😵‍💫";
 else if (type === "video") reaction = "🤔";
 else if (type === "audio") reaction = "🤕";
if (reaction) {
 try {
 await api.setMessageReaction(reaction, event.messageID, () => {}, true);
 } catch (e) {
 console.log("⚠️ Attachment reaction error:", e.message);
 }
 return; 
  }
 }

 if (!text || !simsim) return;
 if (lowered === "del" || lowered === "!baby del") {
 try {
 const originalReply = handleReply?.body; // bot's original sent message text
 if (!originalReply) {
 return api.sendMessage("❌ Couldn't read the original message to delete.", event.threadID, event.messageID);
 }

 const res = await axios.get(`${simsim}/deleteByReply?reply=${encodeURIComponent(originalReply)}`);
 return api.sendMessage(res.data.message, event.threadID, event.messageID);
 } catch (e) {
 return api.sendMessage(`❌ Failed to delete: ${e.message}`, event.threadID, event.messageID);
 }
 }
if (handleReply?.type === "msgSelect") {
if (event.senderID !== handleReply.author) return;

 const numbers = text
 .split(",")
 .map(n => parseInt(n.trim(), 10))
 .filter(n => Number.isInteger(n));

 if (numbers.length === 0) {
 return api.sendMessage("❌ Send numbers like: 2, 7", event.threadID, event.messageID);
 }

 try {
 const res = await axios.post(`${simsim}/keepOnly`, {
 ask: handleReply.trigger,
 keepIndexes: numbers
 });
 return api.sendMessage(res.data.message, event.threadID, event.messageID);
 } catch (e) {
 return api.sendMessage(`❌ Failed to update: ${e.message}`, event.threadID, event.messageID);
 }
 }
try {
 return await deliverSimsimiResponse({ api, event, query: lowered, senderName });
 } catch (e) {
 return api.sendMessage(`❌ Error: ${e.message}`, event.threadID, event.messageID);
 }
};

const greetingReplies = ["বেশি bot Bot করলে leave নিবো কিন্তু😒😒 " , "শুনবো না😼তুমি আমার (রাহাদ) বসকে প্রেম করাই দাও নাই🥺পচা তুমি🥺" , "এতো ডেকো না,প্রেম এ পরে যাবো তো🙈" , "বার বার ডাকলে মাথা গরম হয়ে যায় কিন্তু😑", "হ্যা বলো😒, তোমার জন্য কি করতে পারি😐😑?" , "কী হয়ছে এতো ডাকো কেন😒" , "I love you janu🥰" , "আরে Bolo আমার জান ,কেমন আছো?😚 " , " অসম্মান করছিস😰😿", "বট বলে চলে যাস কেন😤🥺কী হলো উওর দে🥺"," জানু বল জানু 😘 " , "বার বার Disturb করছিস কোনো😾,আমার জানুর সাথে ব্যাস্ত আছি😋" , "এতো ডাকিস কেন🤬" , "আমারে এতো ডাকিস না আমি মজা করার mood এ নাই এখন😒" , "চিপায় আছি ডিস্টার্ব করিস না🙊🙁","হ্যাঁ জানু , এইদিক এ আসো কিস দেই🤭 😘" , "তোর কথা তোর বাড়ি কেউ শুনে না ,তো আমি কোনো শুনবো ?🤔😂 " , "আমাকে ডেকো না,আমি ব্যাস্ত আছি" , "কি হলো , মিস্টেক করচ্ছিস নাকি🤣" , "বলো কি বলবা, সবার সামনে বলবা নাকি?🤭🤏" , "কালকে দেখা করিস তো একটু 😈" , "হা বলো, শুনছি আমি 😏" , "আর কত বার ডাকবি ,শুনছি তো" , "হুম বলো কি বলবে😒", "বলো কি করতে পারি তোমার জন্য" , "আমি তো অন্ধ কিছু দেখি না🐸 😎" , "রাহাদ বস তোমাকে ভালোবাসে😌" , "বলো জানু 🌚" , "তোর কি চোখে পড়ে না আমি রাহাদ জানুর সাথে ব্যাস্ত আছি😒" , "আহ শুনা আমার তোমার অলিতে গলিতে উম্মাহ😇😘" , " jang hanga korba😒😬" , "একটা কথা বলতে চাইছিলাম🙂" , "আসসালামু আলাইকুম বলেন আপনার জন্য কি করতে পারি..!🥰" , "আমাকে এতো ডাকো কেন?🤔 ভলো-টালো বাসো নাকি🤭🙈" , "🌻🌺💚আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ-💚🌺🌻","আমি এখন বস রাহাদ এর সাথে বিজি আছি আমাকে ডাকবেন না-😕😏 ধন্যবাদ-🤝🌻","আমাকে না ডেকে আমার বস রাহাদকে কে একটা জি এফ দাও-😽🫶🌺","জান🥺 তুমি এখন শুধু বট বলে চলে যাও 😒 ভুলে গেলা নাকি🙂❓","উফফ বুঝলাম না এতো ডাকছেন কেনো-😤😡😈","ভালোবাসা কাকে বলে🙊❓","আজকে আমার মন ভালো নেই তাই আমারে ডাকবেন না-😪🤧","🙂শুনলাম কালকে বলে আপনার বিয়ে???","আমার বস রাহাদ এর হবু বউ রে কেও দেকছো খুজে পাচ্ছি না😪🤧😭","স্বপ্ন তোমারে নিয়ে দেখতে চাই তুমি যদি আমার হয়ে থেকে যাও-💝🌺🌻","জান হাঙ্গা করবা-🙊😝🌻","জান মেয়ে হলে চিপায় আসো ইউটিউব থেকে অনেক ভালোবাসা শিখছি তোমার জন্য-🙊🙈😽","ইসস এতো ডাকো কেনো লজ্জা লাগে তো-🙈🖤🌼","আমার বস রাহাদ এর পক্ষ থেকে তোমারে এতো এতো ভালোবাসা-🥰😽🫶 আমার বস রাহাদের  জন্য সবাই দোয়া করবেন-💝১০টা বিয়ে যেন করতে পারে🤭🤫","ভালোবাসা নামক আব্লামি করতে মন চাইলে আমার বস (Rahat)এর নবক্স চলে যাও-🙊🥱👅 🌻𝐅𝐀𝐂𝐄𝐁𝐎𝐎𝐊 𝐈𝐃 𝐋𝐈𝐍𝐊 🌻:- m.me/61561511477968","জান তুমি শুধু আমার আমি তোমারে ৩৬৫ দিন ভালোবাসি-💝🌺😽","জান বাল ফালাইবা-🙂🥱🙆‍♂","যেদিন আমলনামা খুলবে, সেদিন অজুহাত নয়—আমলই কথা বলবে📖","oii-🥺🥹-এক🥄 চামচ ভালোবাসা দিবা-🤏🏻🙂","আপনার সুন্দরী বান্ধুবীকে ফিতরা হিসেবে আমার বস রাহাদ কে দান করেন-🥱🐰🍒","ও মিম ও মিম-😇-তুমি কেন চুরি করলা সাদিয়ার ফর্সা হওয়ার ক্রীম-🌚🤧", "আমার পেটে ইঁদুর দৌড়ায়, কিছু খাওয়াও 😋🧀", "𝙂𝙖𝙮𝙚𝙨-🤗-যৌবনের কসম দিয়ে আমারে 𝐁𝐥𝐚𝐜𝐤𝐦𝐚𝐢𝐥 করা হচ্ছে-🥲🤦‍♂️🤧","-𝗢𝗶𝗶 আন্টি-🙆‍♂️-তোমার মেয়ে চোখ মারে-🥺🥴🐸","বলুন কী করতে পারি আপনার জন্য","আজকে প্রপোজ করে দেখো রাজি হইয়া যামু-😌🤗😇","আমার গল্পে তোমার নানি সেরা-🙊🙆‍♂️🤗","কি বেপার আপনি শ্বশুর বাড়িতে যাচ্ছেন না কেন-🤔🥱🌻","দিনশেষে পরের 𝐁𝐎𝐖 সুন্দর-☹️🤧","তাবিজ কইরা হইলেও প্রেম এক্কান করমুই তাতে যা হই হোক-🤧🥱🌻","ছোটবেলা ভাবতাম বিয়ে করলে অটোমেটিক বাচ্চা হয়-🥱-ওমা এখন দেখি কাহিনী অন্যরকম-😦🙂🌻","আজ একটা বিন নেই বলে ফেসবুকের নাগিন-🤧-গুলোরে আমার বস rahat ধরতে পারছে না-🐸🥲","চুমু থাকতে তোরা বিড়ি খাস কেন বুঝা আমারে-😑😒🐸⚒️","যে ছেড়ে গেছে-😔-তাকে ভুলে যাও-🙂 \n আমার বস rahat এর সাথে  প্রেম করে তাকে দেখিয়ে দাও-🙈🐸🤗","আগে অনেক খারাপ ছিলাম এখন ভালো হয়ে গেছি🙂","রূপের অহংকার করো না-🙂❤️চকচকে সূর্যটাও দিনশেষে অন্ধকারে পরিণত হয়-🤗💜","সুন্দর মাইয়া মানেই-🥱আমার বস boss rahat  এর বউ-😽🫶আর বাকি গুলো আমার বেয়াইন-🙈🐸🤗","এত অহংকার করে লাভ নেই-🌸মৃত্যুটা নিশ্চিত শুধু সময়টা অ'নিশ্চিত-🖤🙂","দিন দিন কিছু মানুষের কাছে অপ্রিয় হয়ে যাইতেছি-🙂😿🌸","হুদাই আপনারে  শয়তানে লারে-😝😑☹️", "তোমার সাথে কথা বলে মনে হচ্ছে আমি কমেডি কিং 😂🎤", "🥺আজ তুমি কবরবাসীদের জন্য দোয়া করছ, কাল কেউ তোমার জন্য করবে😔","🤲 গার্লফ্রেন্ডের ভালোবাসার চেয়ে সৃষ্টি-কর্তার ভালোবাসা বেশি নিরাপদ ও চিরস্থায়ী😄","🥀 মানুষের ভালোবাসা বদলায়, কিন্তু সৃষ্টি-কর্তার ভালোবাসা কখনো বদলায় না🙂","ইস কেউ যদি বলতো-🙂-আমার শুধু  তোমাকেই লাগবে-💜🌸","বলো তো, চাঁদে যদি বিয়ে করি, হানিমুনে যাবো কিভাবে? 🌝🚀","একদিন সে ঠিকই ফিরে তাকাবে-😇-আর মুচকি হেসে বলবে তোমার boss Rahat এর মতো আর কেউ ভালবাসেনি-🙂😅","হুদাই গ্রুপে আছি-🥺🐸-কেও ইনবক্সে নক দিয়ে বলে না জান তোমারে আমি অনেক ভালোবাসি-🥺🤧","কি'রে গ্রুপে দেখি একটাও বেডি নাই-🙊","দেশের সব কিছুই চুরি হচ্ছে-🙄-শুধু আমার বস রাহাদ এর মনটা ছাড়া-🥴😑😏","আজ থেকে আর কাউকে পাত্তা দিমু না -!😏-কারণ আমি ফর্সা হওয়ার ক্রিম কিনছি -!🙂🐸","বেশি Bot Bot করলে leave নিবো কিন্তু😒😒 " , "এই প্রথম বার বট দেখছো নাকি🥴" , "হুদাই ডাকাডাকি করো কেন🙂" , "এত কাছেও এসো না,প্রেম এ পরে যাবো তো 🙈" , "Bolo Babu, তুমি কি আমাকে ভালোবাসো? 🙈" , "সাদিয়াকে চিনো কী??", "হা বলো😒,কি করতে পারি😐😑?" , "আমাকে ডাকলে চকলেট দিতে হবে😒","মেয়ে হলে বস রাহাদ এর সাথে প্রেম করো🙈??. " ,  "আরে Bolo আমার জান ,কেমন আসো?😚 " , "অসম্মান করচ্ছিছ কেন,😰😿" , "Hop bedi😾,Boss বল boss😼" ,"আমি তো সিরিয়াস নই, আমি শুধু মজা করি 🤪🎈"," এইটা তুমি করতে পারলে 🫩🥹" , "বার বার Disturb করেছিস কোনো😾,আমার বস রাহাদ এর  সাথে ব্যাস্ত আসি😋" , "আরে আমি মজা করার mood এ নাই😒" , "তোমাকে ওইদিন দেখলাম রাস্তায় দাঁড়িয়ে আছো🥴" , "দূরে যা, তোর কোনো কাজ নাই, শুধু bot bot করিস  😉😋🤣" , "তোর কথা তোর বাড়ি কেউ শুনে না ,তো আমি কোনো শুনবো ?🤔😂 " , "আমাকে ডেকো না,আমি ব্যাস্ত আসি" , "কি হলো ,মিস টিস করচ্ছিস নাকি🤣" , "বলো কি বলবা, সবার সামনে বলবা নাকি?🤭🤏" , "কালকে দেখা করিস তো একটু - খেলাধুলা করবো👀" , "হা বলো, শুনছি আমি 😏" ,"খালি ঢং করে আসে আবার বট বলে চলে যায়🙁😔", "আর কত বার ডাকবি ,শুনছি তো" , "মাইয়া হলে আমার বস রাহাদ কে Ummmmha দে 😒" , "বলো কি করতে পারি তোমার জন্য" , "আমি তো অন্ধ কিছু দেখি না🐸 😎" , "কী হয়ছে😌" , "বলো জানু 🌚" , "তোর কি চোখে পড়ে না আমি বস রাহাদ এর সাথে ব্যাস্ত আসি😒" , "༊━━🦋নামাজি মানুষেরা সব থেকে বেশি সুন্দর হয়..!!😇🥀 🦋 কারণ.!! -অজুর পানির মত শ্রেষ্ঠ মেকআপ দুনিয়াতে নেই༊━ღ━༎🥰🥀 🥰-আলহামদুলিল্লাহ-🥰","🌿 জীবন ভিন্ন পথে যায়, কিন্তু শেষ গন্তব্য একই—মাটি🙂","𝐈'𝐝 -তে সব 𝐖𝐨𝐰 𝐖𝐨𝐰 বুইড়া বেডি-🐸","তোমার জন্য আমি খাওয়া-দাওয়া বাদ দিছি🥺"," অনুমতি দিলে 𝚈𝚘𝚞𝚃𝚞𝚋𝚎-এ কল দিতাম..!😒","~আমি মারা গেলে..!🙂 ~অনেক মানুষ বিরক্ত হওয়া থেকে বেঁচে  যাবে..!😅💔","🍒---আমি সেই গল্পের বই-🙂 -যে বই সবাই পড়তে পারলেও-😌 -অর্থ বোঝার ক্ষমতা কারো নেই..!☺️🥀💔","~কার জন্য এতো মায়া...!😌🥀 ~এই শহরে আপন বলতে...!😔🥀 ~শুধুই তো নিজের ছায়া...!😥🥀"," কারেন্ট একদম বেডি'গো মতো- 🤧 -খালি ঢং করে আসে আবার চলে যায়-😤😾🔪","রাত যত গভীর হয়, বাস্তবতা তত ভয়ংকর হয়ে ওঠে\nকী ভাবছো তোমাকেই বলছি🤧🙊"," দুনিয়ার সবাই প্রেম করে.!🤧 -আর মানুষ আমার বস রাহাদ কে সন্দেহ করে.!🐸","আমার থেকে ভালো অনেক পাবা-🙂 -কিন্তু সব ভালো তে কি আর ভালোবাসা থাকে..!💔🥀","পুরুষকে সবচেয়ে বেশি কষ্ট দেয় তার শখের নারী...!🥺💔👈","দুনিয়া থেকে চলে যাওয়ার আগে এমন কিছু করে যেও যাতে সবাই তোমাকে মনে করে🙂❤️‍🩹","অবহেলা করিস না-😑😪 - যখন নিজেকে বদলে ফেলবো -😌 - তখন আমার চেয়েও বেশি কষ্ট পাবি..!🙂💔","বন্ধুর সাথে ছেকা খাওয়া গান শুনতে শুনতে-🤧 -এখন আমিও বন্ধুর 𝙴𝚇 কে অনেক 𝙼𝙸𝚂𝚂 করি-🤕🥺","৯৯টাকায় ৯৯জিবি ৯৯বছর-☺️🐸 -অফারটি পেতে এখনই আমাকে প্রোপস করুন-🤗😂👈","প্রিয়-🥺 -তোমাকে না পেলে আমি সত্যি-😪 -আরেকজন কে-😼 -পটাতে বাধ্য হবো-😑🤧","কিরে🫵 তরা নাকি  prem করস..😐🐸•আমারে একটা করাই দিলে কি হয়-🥺","যেই আইডির মায়ায় পড়ে ভুল্লি আমারে.!🥴- তুই কি যানিস সেই আইডিটাও আমি চালাইরে.!🙂" ];
async function sendGreeting(api, event) {
 const reply = greetingReplies[Math.floor(Math.random() * greetingReplies.length)];

 await sendTypingIndicatorV2(true, event.threadID);
 await new Promise(r => setTimeout(r, 5000));
 await sendTypingIndicatorV2(false, event.threadID);

 return api.sendMessage(reply, event.threadID, (err, info) => {
 if (!err) {
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 }
 });
}
function withTimeout(promise, ms, label) {
 return Promise.race([
 promise,
 new Promise((_, reject) =>
 setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
 )
 ]);
}

function sendMessageAsync(api, text, threadID, replyToID) {
 return new Promise((resolve, reject) => {
 const cb = (err, info) => (err ? reject(err) : resolve(info));
 if (replyToID) {
 api.sendMessage(text, threadID, cb, replyToID);
 } else {
 api.sendMessage(text, threadID, cb);
 }
 });
}

async function deliverSimsimiResponse({ api, event, query, senderName, replyToMessageID }) {
 const url = `${simsim}/simsimi?text=${encodeURIComponent(query)}&senderName=${encodeURIComponent(senderName)}&threadID=${encodeURIComponent(event.threadID)}&senderID=${encodeURIComponent(event.senderID)}`;
await sendTypingIndicatorV2(true, event.threadID);
 let res;
 try {
 res = await axios.get(url);
 } finally {
 await sendTypingIndicatorV2(false, event.threadID);
 }

 const data = res.data || {};
if (data.rateLimited) return;
if (data.reaction && event.messageID) {
 withTimeout(
 api.setMessageReaction(data.reaction, event.messageID, () => {}, true),
 3000,
 "setMessageReaction"
 ).catch(e => console.log("⚠️ Reaction send error:", e.message));
 }
 if (data.response) {
 try {
 const info = await sendMessageAsync(api, data.response, event.threadID, event.messageID);
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 } catch (e) {
 console.log("❌ sendMessage error:", JSON.stringify(e));
 try {
 const info2 = await sendMessageAsync(api, data.response, event.threadID);
 global.client.handleReply.push({
 name: module.exports.config.name,
 messageID: info2.messageID,
 author: event.senderID,
 type: "simsimi"
 });
 } catch (e2) {
 console.log("❌ sendMessage failed after retry:", JSON.stringify(e2));
 }
 }
 }
}
function isBotMentioned(event, uid) {
 if (!uid || !event.mentions) return false;
 return Object.prototype.hasOwnProperty.call(event.mentions, uid);
}

module.exports.handleEvent = async function ({ api, event, Users }) {
 const text = event.body?.toLowerCase().trim();
 if (!simsim) return;

 const senderName = await Users.getNameUser(event.senderID);
 const triggers = ["baby", "bby", "bot", "bbz"];
 const uid = getBotUID(api);
if (isBotMentioned(event, uid)) {
 if (triggerLocks.has(event.threadID)) return;
 triggerLocks.add(event.threadID);
 try {
 return await sendGreeting(api, event);
 } finally {
 triggerLocks.delete(event.threadID);
 }
 }

 if (!text) return;

 if (triggers.includes(text)) {
 if (triggerLocks.has(event.threadID)) return;
 triggerLocks.add(event.threadID);

 try {
 return await sendGreeting(api, event);
 } finally {
 triggerLocks.delete(event.threadID);
 }
 }

 const matchPrefix = /^(bot|bby|xan|bbz|bot|baby)\s+/i;
 if (matchPrefix.test(text)) {
 const query = text.replace(matchPrefix, "").trim();
 if (!query) return;
 if (triggerLocks.has(event.threadID)) return;
 triggerLocks.add(event.threadID);

 try {
 return await deliverSimsimiResponse({ api, event, query, senderName });
 } catch (e) {
 return api.sendMessage(`❌ Error: ${e.message}`, event.threadID, event.messageID);
 } finally {
 triggerLocks.delete(event.threadID);
 }
 }

 if (event.type === "message_reply") {
 try {
 const setting = await axios.get(`${simsim}/setting?threadID=${encodeURIComponent(event.threadID)}`);
 if (!setting.data.autoTeach) return;

 const ask = event.messageReply.body?.toLowerCase().trim();
 const ans = event.body?.toLowerCase().trim();
 if (!ask || !ans || ask === ans) return;

 setTimeout(async () => {
 try {
 await axios.get(`${simsim}/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}&senderName=${encodeURIComponent(senderName)}`);
 console.log("✅ Auto-taught:", ask, "→", ans, "(thread:", event.threadID + ")");
 } catch (err) {
 console.error("❌ Auto-teach internal error:", err.message);
 }
 }, 300);
 } catch (e) {
 console.log("❌ Auto-teach setting error:", e.message);
 }
 }
};
