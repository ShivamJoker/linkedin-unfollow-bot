# linkedin-unfollow-bot
Bot for unfollowing people who liked your post

## Setting Cookies

#### Cookies can be used to save up on execution time by saving your login details in a JSON format, and reading it on your next logins within expiration date. We will first perform the login with our credentials, then read the cookies and save it locally.

- Use <a href="https://chrome.google.com/webstore/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg?hl=en">Edit This Cookie</a> extension for creating new cookie and pasting the cookie in <code>cookie.json</code>.

- Login using Puppeteer into Linkedin (only for first-time login).

## Reading cookies

- Now that your login details are stored into <code>cookie.json</code>, remove the code for signing in.

## How it works
- The Linkedin post is opened.
- The button for "See More Reactions" is clicked.
- Instead of all reactions, only likes are displayed by clicking on likes tab.
- The first profile is opened in a new tab.
- More button is clicked to display the dropdown containing Follow/Unfollow button.
- If Unfollow button is found, it gets clicked.
- The second tab is closed, and this cycle continues until all the profiles have been unfollowed.



