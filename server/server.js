import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration,OpenAIApi } from 'openai';


dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const app = express();
app.use(cors());

app.use(express.json())

app.get('/',async (req,res) => {
    res.send({message:'hello from server'}).status(200)
})

app.post('/', async(req,res)=>{
    try {
        const prompt = req.body.prompt;

        const respose = await  openai.createCompletion({
            model: "text-davinci-003",
            prompt: `
            Answer like you are asked about information for MITWPU.
            Dean : Shubhlaxmi joshi,
            School of Computer Science,
            Who created this : Deepak,
            TYBCA is a class of 120 students divided in to two division A,B 61 in A and 59 In B division,
            who are Faculty memebers in SOCS: 
            1)Kanchan Shende, 
            2)Punam Nikam , 
            3)Madhuri Joshi, 
            4)Kavita Ahire,
            5)Sachin Bhoite
            ${prompt}`,
            temperature: 1,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        })

        res.send({
            bot: respose.data.choices[0].text
        }).status(200)
    } catch (error) {
        console.log({error})
        res.status(500).send({error})
    }
})

app.listen(5000, ()=>console.log('server running on http://localhost:5000'))
