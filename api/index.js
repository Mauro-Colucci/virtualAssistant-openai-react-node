import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";

config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/", async (req, res) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.message }],
    });
    res.json({ message: response.data.choices[0].message.content });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
