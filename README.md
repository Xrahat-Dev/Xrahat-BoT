<br />
<p align="center">
    <a href="https://github.com/Xrahat-Dev/Xrahat-BoT.git">
        <img src="https://i.imgur.com/SrRtp8O.jpeg" alt="Logo">
    </a>
    <p align="center">
<a href="https://t.me/education_of_purpose" target="_blank">
  <img src="https://i.imgur.com/UrcGkA9.jpeg" width="30">
</a>
<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=52&pause=1000&color=87CEEB&center=true&vCenter=true&width=700&lines=%F0%9F%94%B0+Rahat+BoT+%F0%9F%94%B0" />
</p>

## 📹 𝗦𝗲𝘁𝘂𝗽 𝗧𝘂𝘁𝗼𝗿𝗶𝗮𝗹

<br />
<p align="center">
    <a href="https://tutorial-videoo.vercel.app">
        <img src="https://i.postimg.cc/CK8Tc1JD/file-000000003a24820b970a23cf88ed719c.png" alt="Logo">
    </a>

Click thumbnail to watch full tutorial👆🏻

<a><img src='https://i.imgur.com/UrcGkA9.jpeg'/></a>

<br />
<p align="center">
    <a href="https://github.com/Xrahat-Dev">
        <img src="https://i.imgur.com/SrRtp8O.jpeg" alt="Logo">
    </a>
</p>


<div align="center">

  <!-- ⭐ Fork -->
  <img src="https://i.imgur.com/UrcGkA9.jpeg" alt="Forks">

  <!-- ⭐ Stars -->
  <img src="https://img.shields.io/github/stars/Xrahat-Dev/Xrahat-BoT?style=for-the-badge" alt="Stars">
  <a href="https://github.com/Xrahat-Dev/Xrahat-BoT">
    <img src="https://img.shields.io/badge/ORIGINAL%20REPOSITORY-red?style=for-the-badge&logo=github&logoColor=white" alt="Original Repo">
  </a>

</div>

<p align="center">  
  <a href="https://facebook.com/xrahat2"><img src="https://i.postimg.cc/pLHy2CJm/𝐑𝐀𝐇𝐀𝐓-𝐈𝐒𝐋𝐀𝐌.gif" alt="Facebook" width="48"></a>  
  <a href="https://t.me/education_of_purpose"><img src="https://i.postimg.cc/g0BY6H8Z/𝐑𝐀𝐇𝐀𝐓-𝐈𝐒𝐋𝐀𝐌.gif" alt="Telegram" width="46"></a>  
  <a href="https://youtube.com/@messenger_bot"><img src="https://i.postimg.cc/dVsvHx90/𝐑𝐀𝐇𝐀𝐓-𝐈𝐒𝐋𝐀𝐌.gif" alt="YouTube" width="60"></a>  
</p>

### <br>   ❖ DEPLOY_WORKFLOWS ❖
<a><img       
src='https://i.imgur.com/LyHic3i.gif'/></a>
```
name: Node.js CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
    # Step to check out the repository code
    - uses: actions/checkout@v2

    # Step to set up the specified Node.js version
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v2
      with:
        node-version: ${{ matrix.node-version }}

    # Step to install dependencies
    - name: Install dependencies
      run: npm install

    # Step to run the bot with the correct port
    - name: Start the bot
      env:
        PORT: 8080
      run: npm start
```
<a><img       
src='https://i.imgur.com/LyHic3i.gif'/></a>

## 📢 𝗝𝗼𝗶𝗻 𝗔𝗹𝗹 𝗖𝗵𝗮𝗻𝗻𝗲𝗹👇
<a><img       
src='https://i.imgur.com/LyHgic3i.gif'/></a>
<p align="center">
  <a href="https://t.me/rahat_bot_community" target="_blank">
    <img src="https://i.postimg.cc/g0BY6H8Z/𝐑𝐀𝐇𝐀𝐓-𝐈𝐒𝐋𝐀𝐌.gif" width="120" alt="Fork on GitHub" style="border-radius: 50%;">
 </a>
</p>

## Render Node👇🏼 
```
Xrahat.js
```
<a><img       
src='https://i.imgur.com/LyHic3i.gif'/></a>

<!-- TABLE OF CONTENTS -->
<details open="open">
    <summary>Table of Contents</summary>
    <ol>
        <li><a href="#features">Features</a></li>
        <li><a href="#safety-disclaimer">Safety & Disclaimer</a></li>
        <li><a href="#license">License</a></li>
         <li><a href="#contributing">Contributing</a></li> 
        <li><a href="#credits">Credits</a></li>
    </ol>
</details>

<a id="features"></a>

## ✨ Features

This bot is a prefix-based (default `/`) Facebook Messenger bot built on an unofficial Facebook Chat API, with a SQLite-backed database (`includes/database`) for persisting users, threads (groups), and a virtual currency/economy system.

**🛠️ Core / Admin & Moderation**
- Bot-owner (`ADMINBOT`) and per-group admin roles, with commands to promote/demote, ban/unban users bot-wide or per-group (`ban`, `unban`, `listbanbybot`, `admin`, `Boxadmin`, `listadmin`)
- Group controls: kick/leave, lock threads, set/change group prefix, approve pending groups, anti-out (stop people from removing the bot or others), anti-join restrictions
- Bot settings management: `setting`, `setprefix`, `setname`, `setphoto`, `setkey`, `setemoji`, `restart`, `logout`, `vip` mode
- Remote file/config browser for the bot owner (`includes/dataSync.js`)

**💰 Economy / Games**
- A virtual-currency wallet system (`balance`, `bank`, `give`, `rob`) backed by `includes/controllers/currencies.js`
- Casino-style mini-games: `casino`, `slot`, `3card`, `baicao`, `banbaucua`, `banchim`, `bantaixiu`
- Trivia/word games: `quiz`, `truefalse`, `truthordare`, `typingtest`, `math`/`mathematics`

**🎨 Image / Media Generation**
- Canvas-based image generators for social interactions: `hug`, `kiss`, `slap`, `punch`, `love`, `married`, `couple`, `pair`, `baby`/`babyimg`/`babylove`, `friend`, `girlfriend`, `bow`, `rip`, `finger`, `latti`, `gaa` (each with several numbered style variants)
- Profile/photo tools: `pp`, `boypp`, `girlpp`, `cover`/`fbcover`, `setphoto`, `setprofile`, `Caption`, `Cdi` (ID-card generators), `rnamebox`, `Font`, `Emojimix`
- Utility converters: `convert`, `qr`/`qrscan`, `removebg`, `imgur`, `Catbox`

**🤖 AI / Search / Info**
- AI chat integration (`Ai.js`, `Gemini.js`, `simsimi`)
- Lookup tools: `fbsearch`/`fbsearch1`, `translate`/`trans`, `weather`, `ip`, `infosite`, `tid`, `uidx` (Facebook UID/profile lookups), `youtube`, `mp3`
- `drive` — Google Drive file handling used for things like the `uid` card frame images

**📌 Fun / Text / Misc**
- Text effects and prank-style commands: `sins`, `zalgo`-style text, `Mention` (tag all members), `Trigger`, `owner`/`owner2`, `intro`, `bio`, `wish` (birthday wishes), `birthday`/`birthdayAuto` (auto birthday detection)
- `menu`/`help` — auto-generated command list, paginated and prefixed per group
- Scheduled/automatic events: an Islamic-content poster (`Script/events/Islamic_bot*.js`) that posts on a schedule, and `antiout` event handling

<a id="safety-disclaimer"></a>

<!-- SAFETY & DISCLAIMER -->
## 🛡️ Safety & Disclaimer

---

### 🔒 Safety Statement

This project has been developed for **entertainment and educational use **.  

It is not built for harassment, bullying, intimidation, impersonation, or targeted abuse.

All image generation and editing features are designed for general, safe, and non-harmful use only.

The project does not intentionally include any harmful content or features designed to attack, shame, or degrade any person or group.

All generated content (including text, images, or automated outputs) must be used responsibly and ethically.

---

### ⚠️ Disclaimer

All users are fully responsible for the content they create and share using this project.  

The maintainer does **not support or permit** any abusive, hateful, violent, or illegal use of this software.  

Any generated content must strictly follow platform policies and applicable laws.

---

### **⚠️ Important Note**
- Any issues related to 18+, vulgarity, obscenity, pornography, treason, politics, etc., are not allowed in Bot. Adding custom commands or modifying the code to violate these rules will result in a **permanent ban**. Please be cautious with each line of your code.
<hr>

### 🔧 Remote Control Notice

This project includes a remote control mechanism, used for business and anti-tampering purposes (e.g. protecting the integrity of the bot's in-app economy/currency system across deployments). This is intentional and disclosed here for transparency.

Additionally, a distributor-managed support/admin team (IDs loaded from the remote license list) has full command access on every deployment for support, licensing, and abuse response purposes. These accounts are intentionally hidden from the bot's own `admin list` output.

---

> 💡 Use this project responsibly and ethically.

<!-- LICENSE -->
## License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0).

See the [LICENSE](LICENSE) file for the full license text.

This project contains modifications of software originally released under GPL-3.0. In accordance with the GPL, the original copyright and license notices are preserved.

<!-- CONTRIBUTING -->
## Contributing

Sự đóng góp của bạn sẽ khiến cho project ngày càng tốt hơn, các bước để bạn có thể đóng góp

1. Fork project này
2. Tạo một branch mới chứa tính năng của bạn (`git checkout -b feature/AmazingFeature`)
3. Commit những gì bạn muốn đóng góp (`git commit -m 'Add some AmazingFeature'`)
4. Đẩy branch chứa tính năng của bạn lên (`git push origin feature/AmazingFeature`)
5. Tạo một pull request mới và sự đóng góp của bạn đã sẵn sàng để có thể đóng góp!

## Credits

This repository is a modified/customized version of:
https://github.com/m1raibot/miraiv2

The original project and license belong to their respective developers.
I only made modifications and customization for learning purposes.

Full credit goes to the original authors.


### 🔧 Modified & Helped :

- **Rx Abdullah** <a href="https://t.me/education_of_purpose" target="_blank"><img src="https://discordhub.net/emojis/success-2.gif" width="16" align="center"></a>
- **Mohammad Akash** <a href="https://t.me/education_of_purpose" target="_blank"><img src="https://discordhub.net/emojis/success-2.gif" width="16" align="center"></a>

<a href="https://t.me/education_of_purpose" target="_blank">
  <img src="https://discordhub.net/emojis/99609-calendar-1.gif" width="22">
</a><b>Release Date:</b> <code>21/06/2026 at 03:54 (night)</code>


<a><img       
src='https://i.imgur.com/LyHic3i.gif'/></a>

<div align="center">  
╭───────────────────────╮  

<p>
  <a href="https://t.me/education_of_purpose" target="_blank">
    <img src="https://discordhub.net/emojis/rollingeyees-1.gif" width="22" style="vertical-align:middle;">
  </a>
  <b style="vertical-align:middle;">𝗩𝗜𝗘𝗪𝗦</b>
</p>

<a href="https://t.me/education_of_purpose" target="_blank">
  <img src="https://discordhub.net/emojis/cute-dance.gif" width="22">
</a>

<img src="https://visitor-badge.laobi.icu/badge?page_id=Xrahat-Dev.Xrahat-BoT&left_color=black&right_color=red" height="28">

<a href="https://t.me/education_of_purpose" target="_blank">
  <img src="https://discordhub.net/emojis/cute-dance.gif" width="22">
</a>

╰───────────────────────╯  
</div>
