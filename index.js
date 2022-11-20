const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


// middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.BD_PASS}@cluster0.mmeqena.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {

    try {

        const collection = client.db("doctorsportal").collection("services");
        const BookingCollection = client.db("booking").collection("client");

        // get appointments 
        app.get('/appointmentdata', async (req, res) => {
            const query = {};
            const appointments = await collection.find(query).toArray();
            res.send(appointments);
        })

        // add appointment 
        app.post('/booking', async (req, res) => {
            const appointment = req.body
            console.log(appointment)
            const result = await BookingCollection.insertOne(appointment)
            res.send(result)

        })
    }
    finally { err => console.error(err); }
}
run().catch(console.dir);;


app.get('/', async (req, res) => {
    res.send('server is running')
});

app.listen(port, () => {
    console.log('doctors portal is running on ', port)
})