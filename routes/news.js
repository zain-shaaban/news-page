const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const api = await axios.get(
      `https://newsapi.org/v2/everything?q=tesla&from=2024-05-25&sortBy=publishedAt&apiKey=7d4a77fbcd314502860a226755b6e0b4`
    );
    const data = api.data;
    let id=1;
    data.articles.forEach(element => {
        element.id=id++;
    });
    res.status(200).render("news", { articles:data.articles });
  } catch (err) {
    console.log(err.message)
    res.status(200).render("news", { articles:null});
  }
});

router.get("/article/:id", async (req, res) => {
    try {
      const api = await axios.get(
        `https://newsapi.org/v2/everything?q=tesla&from=2024-05-25&sortBy=publishedAt&apiKey=7d4a77fbcd314502860a226755b6e0b4`
      );
      const data = api.data;

      res.status(200).render("newSingle", { article:data.articles[req.params.id] });
    } catch (err) {
      console.log(err.message)
      res.status(200).render("newSingle", { article:null});
    }
  });

  router.post("/", async (req, res) => {
    try {
      const search=new RegExp(`${req.body.search}`,"ig")
      const api = await axios.get(
        `https://newsapi.org/v2/everything?q=tesla&from=2024-05-25&sortBy=publishedAt&apiKey=7d4a77fbcd314502860a226755b6e0b4`
      );
      let data = api.data;
      let id=1;
      data.articles.forEach(element => {
          element.id=id++;
      });
      data.articles=data.articles.filter(element => {
        return search.test(element.title)||search.test(element.description)
    });
      res.status(200).render("news", { articles:data.articles });
    } catch (err) {
      console.log(err.message)
      res.status(200).render("news", { articles:null});
    }
  });

module.exports = router;
