import puppeteer, { executablePath } from "puppeteer";

export async function scrapeData(id: string): Promise<string> {
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
    return html;
  } catch (error) {
    throw new Error("User not found." + error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
