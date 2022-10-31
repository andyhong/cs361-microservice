import express from "express";
import wtf from "wtf_wikipedia";

const app = express();

app.use(express.json());

app.get("/artist", async (req, res) => {
  try {
    const { name } = req.query;

    const doc = await wtf.fetch(name);
    const intro = await doc.json().sections[0].paragraphs;

    const sentences = [];
    for (const paragraph of intro) {
      for (const sentence of paragraph.sentences) {
        sentences.push(sentence.text);
      }
    }

    const paragraph = sentences.join(" ");
    res.status(200).send({ text: paragraph });
  } catch (e) {
    res.status(400).send({ error: "an error has occured" });
  }
});

app.listen(3000, async () => {
  console.log("server listening on port 3000");
});
