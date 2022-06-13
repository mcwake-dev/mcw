import { getPosts } from "../../scripts/utils";

export default function handler(req, res) {
  const posts = getPosts(2);

  return res.status(200).json(posts);
}
