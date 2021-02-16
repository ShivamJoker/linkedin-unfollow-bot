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

- Login using Puppeteer into Linkedin (only for first-time login).

- Import credentials.js as a module, and fs to save our cookie details to a file.

- Save the cookies into cookie.json using <code>fs.writeFileSync('cookies.json', cookieJson)</code>.

## Reading cookies

- Now that your login details are stored into <code>cookie.json</code>, remove <code>credentials.js</code> alongwith the code for login.

- Read the cookies using <code>fs.readFileSync('cookies.json', 'utf8')</code>.

## How it works
- The Linkedin post is opened.
- The button for "See More Reactions" is clicked.
- Instead of all reactions, only likes are displayed by clicking on likes tab.
- The first profile is opened in a new tab.
- More button is clicked to display the dropdown containing Follow/Unfollow button.
- If Unfollow button is found, it gets clicked.
- The second tab is closed, and this cycle continues until all the profiles have been unfollowed.



