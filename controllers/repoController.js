import asnycHandler from "express-async-handler";
import { Octokit } from "@octokit/rest";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const getRepos = asnycHandler(async (req, res) => {
  const { access_token } = req.body;

  if (access_token === undefined || access_token === "") {
    res.status(401).json("Token is not provided. Not authorized. ");
    return;
  }

  const octokit = new Octokit({
    auth: access_token,
  });
  const { data } = await octokit.repos.listForAuthenticatedUser({
    visibility: "all",
    per_page: "100",
    affiliation: "owner",
  });
  let repos = [];
  for (let i = 0; i < data.length; i++) {
    const { data: commitsPerWeek } = await axios.post(
      "http://localhost:5000/api/commits/weekly",
      { repoName: data[i].full_name, access_token }
    );

    console.log(commitsPerWeek);

    repos.push({
      id: data[i].id,
      full_name: data[i].full_name,
      language: data[i].language === null ? "none" : data[i].language,
      commitsPerWeek,
    });
  }

  res.status(200).json(repos);
});

const listLanguages = asnycHandler(async (req, res) => {
  const { access_token, repoName } = req.body;
  const [owner, repo] = repoName.split("/");

  if (access_token === undefined || access_token === "") {
    res.status(401).json("Token is not provided. Not authorized. ");
    return;
  }

  const octokit = new Octokit({
    auth: access_token,
  });

  const { data } = await octokit.repos.listLanguages({
    owner,
    repo,
  });

  let languagesArr = [];

  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      languagesArr.push({
        language: key,
        value: data[key],
      });
    }
  }
  res.status(200).json(languagesArr);
});

export { getRepos, listLanguages };
