import fs from "fs";
import path from "path";
import matter from "gray-matter";

const filterPostsByPageIndex = (posts, pageIndex) => {
  const postPerPage = 5;
  const totalPagePosts = +pageIndex * postPerPage;
  const prevPagePosts = totalPagePosts - postPerPage;

  return posts.filter(
    (post, index) => index < totalPagePosts && index >= prevPagePosts
  );
};

export const getPosts = (pageIndex) => {
  const dirFiles = fs.readdirSync(
    path.join(process.cwd(), "pages", "blog", "posts"),
    {
      withFileTypes: true,
    }
  );

  const posts = dirFiles
    .filter((file) => file.name.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(
        process.cwd(),
        "pages",
        "blog",
        "posts",
        file.name
      );
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const fileData = fs.statSync(filePath);
      const { data, content } = matter(fileContent);
      const slug = file.name.replace(/.mdx$/, "");

      return { data, content, slug, date: fileData.mtime.toString() };
    });

  return filterPostsByPageIndex(posts, pageIndex);
};
