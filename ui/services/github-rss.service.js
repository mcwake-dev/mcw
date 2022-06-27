import * as Parser from "rss-parser";

const RSS_URL = "https://github.com/mcwake-dev/mcw/commits.atom";
const parser = new Parser();

export async function getGithubFeed() {
  const feed = await parser.parseURL(RSS_URL);

  return feed.items.slice(0, 15);
}
