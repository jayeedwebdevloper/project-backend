const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = 3000

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.ljxdfal.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const database = client.db("APPTEC");
        const userCollection = database.collection("Users");
        const newsCollection = database.collection("News");
        const noticeCollection = database.collection("Notice");
        const sliderCollection = database.collection("Slider");
        const jobNewsCollection = database.collection("Job News");
        const socialCollection = database.collection("Social LInk");
        const eventCollection = database.collection("Events");

        // App Getting

        app.get('/users', async (req, res) => {
            const query = {};
            const users = await userCollection.find(query).toArray();
            res.send(users);
        });
        app.get('/news', async (req, res) => {
            const query = {};
            const news = await newsCollection.find(query).toArray();
            res.send(news);
        });
        app.get('/slider', async (req, res) => {
            const query = {};
            const slider = await sliderCollection.find(query).toArray();
            res.send(slider);
        });
        app.get('/notice', async (req, res) => {
            const query = {};
            const notice = await noticeCollection.find(query).toArray();
            res.send(notice);
        });
        app.get('/jobs', async (req, res) => {
            const query = {};
            const jobs = await jobNewsCollection.find(query).toArray();
            res.send(jobs);
        });
        app.get('/social', async (req, res) => {
            const query = {};
            const social = await socialCollection.find(query).toArray();
            res.send(social);
        });
        app.get('/events', async (req, res) => {
            const query = {};
            const events = await eventCollection.find(query).toArray();
            res.send(events);
        });
        app.get('/users/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await userCollection.findOne(query);
            res.send(result);
        });
        app.get('/users/admin/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email };
            const admin = await userCollection.findOne(query);
            res.send({ isAdmin: admin?.status == 'admin' });
        });


        // App Posting

        app.post('/set-user', async (req, res) => {
            const user = req.body;
            const query = {
                email: user.email
            }
            const alreadyUser = await userCollection.find(query).toArray();
            if (alreadyUser.length) {
                return res.send({ acknowledged: true });
            }
            const result = await userCollection.insertOne(user);
            res.send(result);
        });
        app.post('/add-news', async (req, res) => {
            const news = req.body;
            const result = await newsCollection.insertOne(news);
            res.send(result);
        });
        app.post('/add-notice', async (req, res) => {
            const notice = req.body;
            const result = await noticeCollection.insertOne(notice);
            res.send(result);
        });
        app.post('/add-slide', async (req, res) => {
            const slide = req.body;
            const result = await sliderCollection.insertOne(slide);
            res.send(result);
        });
        app.post('/add-job-news', async (req, res) => {
            const news = req.body;
            const result = await jobNewsCollection.insertOne(news);
            res.send(result);
        });
        app.post('/add-social', async (req, res) => {
            const social = req.body;
            const result = await socialCollection.insertOne(social);
            res.send(result);
        });
        app.post('/add-events', async (req, res) => {
            const event = req.body;
            const result = await eventCollection.insertOne(event);
            res.send(result);
        });

        // App Updating

        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const body = req.body;
            const query = { _id: new ObjectId(id) };
            const option = { upsert: true };
            const update = {
                $set: {
                    userID: body.userID
                }
            }
            const result = await userCollection.updateOne(query, update, option);
            res.send(result);
        });
        app.put('/users/p/:id', async (req, res) => {
            const id = req.params.id;
            const body = req.body;
            const query = { _id: new ObjectId(id) };
            const option = { upsert: true };
            const update = {
                $set: {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    fatherName: body.fatherName,
                    motherName: body.motherName,
                    dob: body.dob,
                    sex: body.sex,
                    religion: body.religion,
                    marriage: body.marriage,
                    nation: body.nation,
                    nid: body.nid,
                    passportNumber: body.passportNumber,
                    passportIssueDate: body.passportIssueDate,
                    phoneNumber: body.phoneNumber,
                    secondNumber: body.secondNumber,
                    emergencyContact: body.emergencyContact,
                    email: body.email,
                    altEmail: body.altEmail,
                    blood: body.blood,
                    height: body.height,
                    weight: body.weight
                }
            }
            const result = await userCollection.updateOne(query, update, option);
            res.send(result);
        });

        // Deleting

        app.delete('/delete-notice/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await noticeCollection.deleteOne(query);
            res.send(result);
        });
        app.delete('/delete-news/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await newsCollection.deleteOne(query);
            res.send(result);
        });
        app.delete('/delete-slide/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await sliderCollection.deleteOne(query);
            res.send(result);
        });
        app.delete('/jobs/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await jobNewsCollection.deleteOne(query);
            res.send(result);
        });
        app.delete('/delete-social/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await socialCollection.deleteOne(query);
            res.send(result);
        });

    } finally {

    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})