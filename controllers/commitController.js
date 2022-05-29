import asnycHandler from "express-async-handler";
import { Octokit } from "@octokit/rest";
import dotenv from "dotenv";

dotenv.config();

const getCommits = asnycHandler(async (req, res) => {
  const { repoName, access_token } = req.body;
  const [owner, repo] = repoName.split('/');

  const octokit = new Octokit({
    auth: access_token,
  });

  const { data } = await octokit.repos.listCommitCommentsForRepo({
    owner,
    repo,
    per_page: 100,
  });
  res.status(201).json(data);
});

const getWeeklyCommits = asnycHandler(async (req, res) => {
  const { repoName, access_token } = req.body;
  const [owner, repo] = repoName.split('/');

  const octokit = new Octokit({
    auth: access_token,
  });

  const { data } = await octokit.rest.repos.getParticipationStats({
    owner,
    repo,
  });
  res.status(200).json(data.owner);
});

const getCommitDetail = asnycHandler(async (req, res) => {
  const { repoName, access_token } = req.body;
  const [owner, repo] = repoName.split('/');

  const octokit = new Octokit({
    auth: access_token,
  });

  console.log('owner ', owner, repo);

  let { data } = await octokit.rest.repos.getCodeFrequencyStats({
    owner,
    repo,
  });

  console.log('data ', data);

  if (data === undefined) {
    res.status(200).json([[]]);
  } else {
    while (data.status === 202) {
      console.log('data status ', data.status);
      await octokit.rest.repos.getCodeFrequencyStats({
        owner,
        repo,
      });
    }

    let filteredData = [[]];

    filteredData.pop();

    for (let i = 0; i < data.length; i++) {
      if (data[i][1] !== 0 && data[i][2] !== 0) {
        filteredData.push(data[i]);
      }
    }

    res.status(200).json(filteredData);
  }
});

const getYearlyCommitsByWeek = asnycHandler(async (req, res) => {
  const { repoName, access_token } = req.body;
  const [owner, repo] = repoName.split("/");

  const octokit = new Octokit({
    auth: access_token,
  });

  const { data } = await octokit.rest.repos.getCommitActivityStats({
    owner,
    repo,
  });
  console.log(data);
  if (data === undefined) {
    res.status(200).json([{ total: 0, week: 0, days: [0, 0, 0, 0, 0, 0, 0] }]);
  }
  res.status(200).json(data);
});

const getWeeklyCommitCount = asnycHandler(async (req, res) => {
  const { repoName, access_token } = req.body;
  const [owner, repo] = repoName.split("/");

  const octokit = new Octokit({
    auth: access_token,
  });

  const { data } = await octokit.rest.repos.getCommitActivityStats({
    owner,
    repo,
  });

  res.status(200).json(data);
});

export {
  getCommits,
  getCommitDetail,
  getYearlyCommitsByWeek,
  getWeeklyCommits,
  getWeeklyCommitCount,
};
