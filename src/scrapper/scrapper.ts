import puppeteer, { executablePath } from "puppeteer";

export async function scrapeData(id: string): Promise<string> {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: executablePath(),
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-blink-features=AutomationControlled',
        ],
    });
    const page = await browser.newPage();

    await page.goto(`https://www.instagram.com/${id}/`);

    await page.waitForFunction(
        "window.performance.timing.loadEventEnd - window.performance.timing.navigationStart >= 500",
    );

    const html = await page.$eval("head > meta[name='description']", element => element.content);
    await browser.close();
    return html;
}
