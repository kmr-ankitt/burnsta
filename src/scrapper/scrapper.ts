import puppeteer from 'puppeteer-core';
import chromium from "@sparticuz/chromium";

export async function scrapeData(id: string): Promise<{html: string, userpfp: string}> {
  let browser;
  const remoteExecutablePath = 'https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar';

  try {
    browser = await puppeteer.launch({
      args: chromium.args.concat(['--no-sandbox', '--disable-setuid-sandbox']),
      defaultViewport: chromium.defaultViewport,
      headless: chromium.headless,
      executablePath: await chromium.executablePath(remoteExecutablePath),
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

    console.log(html);
    const userpfp = await page.$eval(
      "head > meta[property='og:image']",
      (element) => element.content
    ) || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106";
    await page.close();
    return {html, userpfp};
  } catch (error) {
    throw new Error("User not found." + error);
  }
}
