const express = require("express");
const boxURL = require("../models/shorten");
const app = express();

app.post("/shorten/generate", async (req, res) => {
    try {
        function generateRandom(length) {
            let result = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let charLen = characters.length;
            for ( let i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charLen));
            }
            return result;
        }

        let { urlText } = req.body;

        let data = await boxURL.create({ urlText, generatedLink: `shortenku.cc/${generateRandom(7)}` }, )

        return res.status(201).json({ message: "Success", data })
    } catch (error) {
        console.log(error)
    }
})

app.get("/shorten/access", async (req, res) => {
    try {
        let { generatedLink } = req.body;
        let data = await boxURL.find({ generatedLink });

        return res.status(201).json({ data: data[0].urlText });
    } catch (error) {
        console.log(error);
    }
})

module.exports = app;
