# linkedin-unfollow-bot
Bot for unfollowing people who liked your post

## Watch video
[![](http://i3.ytimg.com/vi/vTTMQ3unnBc/maxresdefault.jpg)](https://youtu.be/vTTMQ3unnBc)


## Note: Please do this on your own risk your account may get banned if LinkedIn detects suspicious activity

## Instructions
1. git clone ```https://github.com/ShivamJoker/linkedin-unfollow-bot/```
2. ```cd linkedin-unfollow-bot```
3. ```yarn or npm install```

## Setting Cookies

#### Cookies can be used to save up on execution time by saving your login details in a JSON format, and reading it on your next logins within expiration date.

- Use <a href="https://chrome.google.com/webstore/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg?hl=en">Edit This Cookie</a> extension to copy cookies from your LinkedIn page
- Paste the cookie into <code>cookie.json</code> (create the file)

## Running
```node index.js```


## How it works
- The Linkedin post is opened.
- The button for "See More Reactions" is clicked.
- Instead of all reactions, only likes are displayed by clicking on likes tab.
- The first profile is opened in a new tab.
- More button is clicked to display the dropdown containing Follow/Unfollow button.
- If Unfollow button is found, it gets clicked.
- The second tab is closed, and this cycle continues until all the profiles have been unfollowed.



