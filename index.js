const puppeteer = require("puppeteer");
const fs = require("fs");
const { username, pass } = require("./credentials");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--window-size=1920,1080"],
  });

  const page = await browser.newPage();
  await page._client.send("Emulation.clearDeviceMetricsOverride");


  // Reading Cookies
  const cookies = fs.readFileSync('cookies.json', 'utf8'); // we are reading from the cookies henceforth
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
  const likeCount = await page.evaluate( () => {
    return parseInt(document.getElementsByClassName("social-details-reactors-tab__icon-container")[1].innerText)
  })
            
    
  console.log(likeCount);

  var i;
  for(i = 1; i <= likeCount; i++)
  {

  const profile = await page.waitForXPath(
    "/html/body/div[4]/div/div/div[2]/div/div/ul/li[1]/a/div"
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
    "/html/body/div[8]/div[3]/div/div/div/div/div[2]/div/main/div/div[1]/section/div[2]/div[1]/div[2]/div/div/div[2]/div/button"
  );

  await moreBtn.click();
  const unfollow = await newPage.waitForXPath(
    "/html/body/div[8]/div[3]/div/div/div/div/div[2]/div/main/div/div[1]/section/div[2]/div[1]/div[2]/div/div/div[2]/div/div/div/ul/li[6]"
  );

  await unfollow.click();
  await newPage.close();

  }
  
})();
