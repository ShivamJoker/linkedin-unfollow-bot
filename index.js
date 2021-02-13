const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--window-size=1920,1080"],
  });

  const page = await browser.newPage();
  await page._client.send("Emulation.clearDeviceMetricsOverride");
  await page.goto(
    "https://www.linkedin.com/uas/login?fromSignIn=true&trk=cold_join_sign_in/"
  );

  // Email for Log-in
  const email = await page.waitForSelector('input[type="text"]');
  await email.click();
  await page.keyboard.type("non", { delay: 30 });

  // Password for Log-in
  const password = await page.waitForSelector('input[type="password"]');
  await password.click();
  await page.keyboard.type("meow", { delay: 20 });

  // Signing in
  await page.keyboard.press("Enter", { delay: 20 });
  await page.waitForNavigation();

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

  const profile = await page.waitForXPath(
    "/html/body/div[4]/div/div/div[2]/div/div/ul/li[2]/a/div"
  );
  await profile.click();

  const getNewPageWhenLoaded = async () => {
    return new Promise((x) =>
      browser.once("targetcreated", async (target) => {
        if (target.type() === "page") {
          const newPage = await target.page();
          const newPagePromise = new Promise((y) =>
            newPage.once("domcontentloaded", () => y(newPage))
          );
          const isPageLoaded = await newPage.evaluate(
            () => document.readyState
          );
          await newPage._client.send("Emulation.clearDeviceMetricsOverride");
          return isPageLoaded.match("complete|interactive")
            ? x(newPage)
            : x(newPagePromise);
        }
      })
    );
  };

  const newPagePromise = getNewPageWhenLoaded();
  const newPage = await newPagePromise;

  const moreBtn = await newPage.waitForXPath(
    "/html/body/div[7]/div[3]/div/div/div/div/div[2]/div/main/div/div[1]/section/div[2]/div[1]/div[2]/div/div/div[2]/div/button"
  );

  await moreBtn.click();
  const unfollow = await newPage.waitForXPath(
    "/html/body/div[7]/div[3]/div/div/div/div/div[2]/div/main/div/div[1]/section/div[2]/div[1]/div[2]/div/div/div[2]/div/div/div/ul/li[6]/div/div"
  );

  await unfollow.click();
  await newPage.close();
})();
