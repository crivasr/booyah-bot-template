# booyah-bot-template
<p>This is a very simple template chatbots for booyah.live in NodeJS </p>
<p>Check <a href='https://github.com/BooyahTV/BooyahDocs'>this</a> repo for a WIP booyah's API documentation </p>

### Installation
1. Get the user id and session id cookie of the bot
2. Clone the repo
  ```sh
  git clone https://github.com/CamiKaseM7/booyah-bot-template.git
  ```
3. Store the id's in `.env`
  ```env
  BOOYAH_SESSION_KEY = MTYyOTIyxxxxxxxx
  BOT_UID = 70724463
  ```
4. Replace the `CHANNEL_ID` constant in `index.js` with the channel where you want to add the bot
  ```js
  const CHANNEL_ID = 'ENTER THE CHANNEL ID';
  ```
5. Install NPM packages
```sh
npm install
```
6. Run the bot
```sh
node .
```
### How to get the session-id cookie
You simply need to go to https://booyah.live/ and open de DevTool with `f12` or `CTRL + SHIFT + i` 
<br>
Then go to `Application > Cookies > https://booyah.live/` and search for `session_key`. If you press it, it will show you the full token
<br>
<br>
<img src="https://imgur.com/lse72bd.png"> </img>
## Contact
If you need help add me on discord and ask me `CamiKase#9795`
