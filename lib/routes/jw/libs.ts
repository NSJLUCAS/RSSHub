const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const url = 'https://www.jw.org/cmn-hans/%E6%96%B0%E9%97%BB/';
    const response = await got(url);
    const $ = cheerio.load(response.data);

    const list = [];
    $('.syn-body h3 a').each((_, item) => {
        const title = $(item).text();
        const link = new URL($(item).attr('href'), url).href;
        list.push({
            title,
            link,
        });
    });

    ctx.state.data = {
        title: '耶和华见证人新闻',
        link: url,
        item: list,
    };
};
