import "dotenv/config";
import { Octokit } from "octokit";
import axios from "axios";
import { chunk } from "lodash";

const raindropAxios = axios.create({
  baseURL: "https://api.raindrop.io/rest/v1",
  headers: {
    Authorization: `Bearer ${process.env.RAINDROP_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const main = async () => {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  console.log(new Date(), "Fetching all your starred repos...");
  const stars = await octokit.paginate(
    octokit.rest.activity.listReposStarredByAuthenticatedUser,
    {
      per_page: 100,
    }
  );
  console.log(new Date(), `Found ${stars.length} starred repos!`);

  const newRaindrops = stars.map((star) => {
    return {
      collectionId: process.env.RAINDROP_COLLECTION_ID,
      title: star.full_name,
      link: star.html_url,
      tags: ["github", star.language],
      created: star.created_at,
      excerpt: star.description,
    };
  });
  const chunks = chunk(newRaindrops, 100);

  console.log(new Date(), `Looping through chunks of 100 repos...`);
  for (const chunk of chunks) {
    const existingUrlsRes = await raindropAxios.post("/import/url/exists", {
      urls: chunk.map((s) => s.link),
    });
    const existingUrls = existingUrlsRes.data;
    const toImport = chunk.filter((r) => {
      return existingUrls.duplicates.every((d: any) => d.link !== r.link);
    });
    if (toImport.length > 0) {
      await raindropAxios.post("/raindrops", {
        items: toImport,
      });
      console.log(new Date(), `Added ${toImport.length} stars to Raindrop`);
    } else {
      console.log(new Date(), `Skipped chunk (${chunk.length} repos)`);
    }
  }
};
