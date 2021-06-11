import express from 'express'
import mongoose from 'mongoose'

import Cards from './dbCards.js';

import Cors from 'cors'

const app = express();
const connection_url = 'mongodb+srv://admin:vGs706smWFRa1QAx@cluster0.0t2le.mongodb.net/tinderdb?retryWrites=true&w=majority'

const port = process.env.PORT || 8001

app.use(express.json());
app.use(Cors());

mongoose.connect(connection_url, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true
})

app.post('/tinder/cards', (req, resp) => {
    const dbCard = req.body;
    Cards.create(dbCard, (err, data) => {
        if (err) {
            resp.status(500).send(err);
        }
        else{
            resp.status(201).send(data);
        }

    })
})

app.get('/tinder/cards', (req, resp) => {   
        Cards.find((err, data) => {
            if (err) {
                resp.status(500).send(err);
            }else{
                resp.status(200).send(data);
            }
    
        })
    }
)


app.get('/', (req, resp) => resp.status(200).send('HEELO CLEVER PROGRAMMER!!!'));

app.listen(port, () => console.log(`Listening on localhost: $(port)`))