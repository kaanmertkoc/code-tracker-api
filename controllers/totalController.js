import asnycHandler from "express-async-handler";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const getTotalLines = asnycHandler(async (req, res) => {
  const { access_token, repos } = req.body;

  console.log(repos);

  if (access_token === undefined || access_token === "") {
    res.status(401).json("Token is not provided. Not authorized. ");
    return;
  }
  let totalLine = 0;

  for (let i = 0; i < repos.length; i++) {
    console.log(repos[i]);
    const { data } = await axios.post(
      "http://localhost:5000/api/commits/stats",
      { repoName: repos[i], access_token }
    );

    console.log(data);

    if (data[0] !== undefined) {
      for (let j = 0; j < data[0].length; j++) {
        totalLine += data[0][1];
        totalLine += Math.abs(data[0][2]);
      }
    }
  }

  res.status(200).json(totalLine);
});

export { getTotalLines };
