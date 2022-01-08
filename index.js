const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const cors = require('cors')
const shortenlink = require('./routes/shorten')

const app = express();
app.use(cors({ origin: '*',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET, POST" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

mongoose.connect(
  "mongodb+srv://daniel:29061999@cluster0.q2nfs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

app.use(shortenlink)

server.listen(3000, () => {
  console.log("http://localhost:3000/");
});