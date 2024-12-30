import { scrapeData } from "../scrapper/scrapper";

export async function getInstaDetails(id: string) {
    const html = await scrapeData(id);
    console.log(html);

    const followersMatch = html.match(/(\d+(\.\d+)?[MK]?) Followers/);
    const followingMatch = html.match(/(\d+(\.\d+)?[MK]?) Following/);
    const postsMatch = html.match(/(\d+(\.\d+)?[MK]?) Posts/);
    const usernameMatch = html.match(/@(\w+)/);
    const bioMatch = html.match(/on Instagram: "(.*?)"/);

    const parseCount = (count: any) => {
        if (!count) return 0;
        if (count.includes('M')) return parseFloat(count) * 1e6;
        if (count.includes('K')) return parseFloat(count) * 1e3;
        return parseInt(count);
    };

    const data = {
        followers: followersMatch ? parseCount(followersMatch[1]) : 0,
        following: followingMatch ? parseCount(followingMatch[1]) : 0,
        posts: postsMatch ? parseCount(postsMatch[1]) : 0,
        username: usernameMatch ? usernameMatch[1] : '',
        bio: bioMatch ? bioMatch[1] : ''
    };

    return data;
}
