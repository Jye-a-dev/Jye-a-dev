const fs = require("fs");
const axios = require("axios");

/** ✅ USERNAME */
const USERNAME = "Jye-a-dev";
const TOKEN = process.env.GITHUB_TOKEN;

async function main() {
  const headers = {
    Authorization: `Bearer ${TOKEN}`,
    Accept: "application/vnd.github+json",
  };

  const user = await axios.get(
    `https://api.github.com/users/${USERNAME}`,
    { headers }
  );

  const repos = await axios.get(
    `https://api.github.com/users/${USERNAME}/repos?per_page=100`,
    { headers }
  );

  const totalStars = repos.data.reduce(
    (sum, r) => sum + r.stargazers_count,
    0
  );

  const svg = `
<svg width="480" height="180" viewBox="0 0 480 180"
  xmlns="http://www.w3.org/2000/svg">
  <style>
    .bg { fill: #0d1117 }
    .t { fill: #c9d1d9; font-family: monospace; font-size: 14px }
    .h { font-size: 18px; font-weight: bold }
  </style>

  <rect width="100%" height="100%" rx="14" class="bg"/>

  <text x="20" y="32" class="t h">GitHub Stats</text>
  <text x="20" y="65" class="t">👤 User: ${USERNAME}</text>
  <text x="20" y="90" class="t">📦 Public Repos: ${user.data.public_repos}</text>
  <text x="20" y="115" class="t">⭐ Total Stars: ${totalStars}</text>
  <text x="20" y="140" class="t">👥 Followers: ${user.data.followers}</text>
</svg>
`;

  fs.mkdirSync("stats", { recursive: true });
  fs.writeFileSync("stats/github-stats.svg", svg.trim());
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
