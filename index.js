const puppeteer = require("puppeteer");
const fs = require("fs");
const { PendingXHR } = require("pending-xhr-puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 25,
    args: ["--window-size=1920,1080"],
    ignoreDefaultArgs: ["--enable-automation"]
  });

  const page = await browser.newPage();
  const pages = await browser.pages();
  if (pages.length > 1) {
      await pages[0].close();
  }
  await page._client.send("Emulation.clearDeviceMetricsOverride");

  // Reading Cookies
  const cookies = fs.readFileSync("cookies.json", "utf8"); // we are reading from the cookies henceforth
  const deserializedCookies = JSON.parse(cookies);
  await page.setCookie(...deserializedCookies);

  // Navigates to the post
  await page.goto(
    "https://www.linkedin.com/posts/shivamjoker_hey-folks-tap-twice-on-the-image-to-see-the-activity-6766257222373711872-tBiZ"
  );
  const reactions = await page.waitForSelector(
    '[aria-label="See more reactions"]'
  );
  await reactions.click();
  const likes = await page.waitForXPath(
    "/html/body/div[4]/div/div/div[1]/div/div/div/button[2]"
  );
  await likes.click();

  // Getting count of likes
  const likeCount = await page.evaluate(() => {
    return parseInt(
      document.getElementsByClassName(
        "social-details-reactors-tab__icon-container"
      )[1].innerText
    );
  });

  for (let i = 1; i <= likeCount; i++) {
    let profile = await page.waitForXPath(
      `/html/body/div[4]/div/div/div[2]/div/div/ul/li[` + `${i}` + `]/a/div`
    );
    console.log(i);
    await profile.click();

    const getNewPageWhenLoaded = async () => {
      return new Promise((x) =>
        browser.once("targetcreated", async (target) => {
          if (target.type() === "page") {
            const profilePage = await target.page();
            const profilePagePromise = new Promise((y) =>
              profilePage.once("domcontentloaded", () => y(profilePage))
            );
            const isPageLoaded = await profilePage.evaluate(
              () => document.readyState
            );
            await profilePage._client.send(
              "Emulation.clearDeviceMetricsOverride"
            );
            return isPageLoaded.match("complete|interactive")
              ? x(profilePage)
              : x(profilePagePromise);
          }
        })
      );
    };

    const profilePagePromise = getNewPageWhenLoaded();
    const profilePage = await profilePagePromise;
    const pendingXHR = new PendingXHR(profilePage);

    // if unfollow button is not found, close the tab
    try {
      const moreBtn = await profilePage.waitForXPath(
        "/html/body/div[7]/div[3]/div/div/div/div/div[2]/div/main/div/div[1]/section/div[2]/div[1]/div[2]/div/div/div[2]/div/button",
        { timeout: 3000 }
      );

      await moreBtn.click();

      const unfollowTxt = await profilePage.evaluate(() => {
        return document.getElementsByClassName("pv-s-profile-actions__label")[6]
          .innerHTML;
      });

      let unfollow = await profilePage.waitForXPath(
        "/html/body/div[7]/div[3]/div/div/div/div/div[2]/div/main/div/div[1]/section/div[2]/div[1]/div[2]/div/div/div[2]/div/div/div/ul/li[6]",
        { timeout: 3000 }
      );

      // console.log(unfollow);
      if (unfollowTxt === "Unfollow") {
        await unfollow.click();
        console.log("Unfollowing this person");
        await pendingXHR.waitForAllXhrFinished();
      } else {
        console.log("Unfollow button not found");
      }
      await profilePage.close();
    } catch (e) {
      await profilePage.close();
      console.log("Unfollow button not found", e);
    }

    //await profilePage.close();
  }
})();
