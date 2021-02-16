# linkedin-unfollow-bot
Bot for unfollowing people who liked your post

## Setting Cookies

#### Cookies can be used to save up on execution time by saving your login details in a JSON format, and reading it on your next logins within expiration date. We will first perform the login with our credentials, then read the cookies and save it locally.

- Create <code>credentails.js</code> in the same directory to store our username and password for first-time login.
```
module.exports = {
    username: "SECRET_EMAIL_ID",    // put your Linkedin username here
    pass: "SECRET_PASSWORD"         // put your Linkedin password here
};
```

- <a id="login"></a>Login using Puppeteer into Linkedin as follows (only for first-time login).
```
await page.goto("https://www.linkedin.com/uas/login?fromSignIn=true&trk=cold_join_sign_in/"); 

const email = await page.waitForSelector('input[type="text"]');          // email
await email.click();
await page.keyboard.type(username, { delay: 30 });

const password = await page.waitForSelector('input[type="password"]');   // password
await password.click();
await page.keyboard.type(pass, { delay: 20 });

await page.keyboard.press("Enter", { delay: 20 });                       // press Enter to complete sign-in
await page.waitForNavigation();
```  

- Import credentials.js as a module, and fs to save our cookie details to a file.
```
const fs = require("fs");
const { username, pass } = require("./credentials");
```

- Save the cookies into cookie.json.
```                                         
  const cookies = await page.cookies();             // waits for page to load to set cookie
  const cookieJson = JSON.stringify(cookies);       // converting cookie information to JSON
  fs.writeFileSync('cookies.json', cookieJson);     // writing JSON into cookie.json (new)
```

## Reading cookies

- Now that your login details are stored into <code>cookie.json</code>, remove <code>credentials.js</code> alongwith the code for login <a href="#login">(refer here)</a>.

- Read the cookies 
```
const cookies = fs.readFileSync('cookies.json', 'utf8');  // reading the cookies using fs
const deserializedCookies = JSON.parse(cookies);          // parses the JSON format
await page.setCookie(...deserializedCookies);             // uses cookie details to login
```

## How it works




