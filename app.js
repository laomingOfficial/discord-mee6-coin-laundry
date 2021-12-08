const puppeteer = require("puppeteer");

const username = "【帳號】";
const password = "【密碼】";

const loginURL = "https://discord.com/login";
const banbanxueCoinLaunderingURL = "https://discord.com/channels/838422912507052062/917765708648157274";
const loginSelector = '#app-mount > div.app-1q1i1E > div > div > div > div > form > div > div > div.mainLoginContainer-1ddwnR > div.block-egJnc0.marginTop20-3TxNs6 > div.marginBottom20-32qID7 > div > div.inputWrapper-31_8H8.inputWrapper-3aw2Sf > input';
const passwordSelector = '#app-mount > div.app-1q1i1E > div > div > div > div > form > div > div > div.mainLoginContainer-1ddwnR > div.block-egJnc0.marginTop20-3TxNs6 > div:nth-child(2) > div > input'
const loginBtnSelector = '#app-mount > div.app-1q1i1E > div > div > div > div > form > div > div > div.mainLoginContainer-1ddwnR > div.block-egJnc0.marginTop20-3TxNs6 > button.marginBottom8-AtZOdT.button-3k0cO7.button-38aScr.lookFilled-1Gx00P.colorBrand-3pXr91.sizeLarge-1vSeWK.fullWidth-1orjjo.grow-q77ONN';
const chatboxSelector = '#app-mount > div.app-1q1i1E > div > div.layers-3iHuyZ.layers-3q14ss > div > div > div > div.content-98HsJk > div.chat-3bRxxu > div.content-yTz4x3 > main > form > div:nth-child(1) > div > div > div.scrollableContainer-2NUZem.webkit-HjD9Er > div > div.textArea-12jD-V.textAreaSlate-1ZzRVj.slateContainer-3Qkn2x > div.markup-2BOw-j.slateTextArea-1Mkdgw.fontSize16Padding-3Wk7zP';

(async () => {
    function delay(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time)
        });
    }

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        userDataDir: './data',
    });
    const page = await browser.newPage();

    await page.goto(loginURL);

    await delay(2000);

    if (page.url() == loginURL) {
        await page.waitForSelector(loginSelector, { timeout: 0 })
        txtbox = await page.$(loginSelector)
        await txtbox.click()
        await txtbox.type(username)

        txtbox = await page.$(passwordSelector)
        await txtbox.click()
        await txtbox.type(password)

        var loginBtn = await page.$(loginBtnSelector)
        await loginBtn.click();

        await page.waitForFunction("window.location.pathname == '/channels/@me'")
    }

    await page.goto(banbanxueCoinLaunderingURL);
    await delay(10 * 1000);

    async function command_work() {
        await page.waitForSelector(chatboxSelector, { timeout: 0 })
        var txtbox = await page.$(chatboxSelector)
        await txtbox.click()
        await txtbox.type("/work")
        await delay(1500);
        await page.keyboard.press("Enter")
        await delay(1500);
        await page.keyboard.press("Enter")
    }

    async function command_daily() {
        await page.waitForSelector(chatboxSelector, { timeout: 0 })
        var txtbox = await page.$(chatboxSelector)
        await txtbox.click()
        await txtbox.type("/daily")
        await delay(1500);
        await page.keyboard.press("Enter")
        await delay(1500);
        await page.keyboard.press("Enter")
    }

    await command_work();
    await command_daily();

    await delay(2000);

    setInterval(async () => {
        await command_work();
    }, 3600 * 1000 + 1000);

    setInterval(async () => {
        await command_daily();
    }, 24 * 3600 * 1000 + 1000);
})();


// browser.close();