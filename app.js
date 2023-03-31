const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
app.use(bodyParser.json());
app.use(cors())
const Port = 3001 || process.env.PORT

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {

    res.send("all good");
})

app.post('/chat-bot', async(req, res) => {
    
     const question = req.body.question
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            max_tokens :512 ,
            temperature:0,
            prompt: question,
        });
        const answer = completion.data.choices[0].text
        res.status(200).json({
            status : "success",
            answer : answer
        })
    } catch (error) {
       res.status(500).json({
        status : "failed",
        message : error.message
       })
    }
})

app.listen(Port, () => { console.log(`server is runnig on ${Port}`) });
