import puppeteer, { executablePath } from "puppeteer";

export async function scrapeData(id: string): Promise<{html: string, userpfp: string}> {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      executablePath: executablePath(),
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
