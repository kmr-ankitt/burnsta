import puppeteerCore from 'puppeteer-core';
import Chromium from "@sparticuz/chromium-min";

export async function scrapeData(id: string): Promise<{html: string, userpfp: string}> {
  let browser;
  const executablePath = await Chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar')

  try {
    browser = await puppeteerCore.launch({
      headless: Chromium.headless,
      executablePath: executablePath,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-blink-features=AutomationControlled",
      ],
    });
    const page = await browser.newPage();
    const url = `https://www.instagram.com/${id}/`;
    await page.goto(url);
    console.log(url);

    await page.waitForFunction(
      "window.performance.timing.loadEventEnd - window.performance.timing.navigationStart >= 500"
    );

    const html = await page.$eval(
      "head > meta[name='description']",
      (element) => element.content
    );

    console.log(html)
    const userpfp = await page.$eval(
      "head > meta[property='og:image']",
      (element) => element.content
    ) || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106";
    return {html, userpfp};
  } catch (error) {
    throw new Error("User not found." + error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
