const express = require("express");
const boxURL = require("../models/shorten");
const app = express();

// generate random link
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

        let data = await boxURL.create({ urlText, generatedLink: `${req.headers.host}/${generateRandom(7)}` }, )

        return res.status(201).json({ message: "Success", data })
    } catch (error) {
        console.log(error)
    }
})


// generate custom URL
app.post("/shorten/customURL", async (req, res) => {
    try {
        let { urlText, generatedLink } = req.body;

        let totalData = await boxURL.find({})

        let str = [];
        
        for (let i = 0; i < totalData.length; i++) {
            str.push(totalData[i])
            if (totalData[i].generatedLink === req.body.generatedLink) return res.status(500).json({ message: "this link has already been taken!" })
        }
        
        let data = await boxURL.create({ urlText, generatedLink })

        return res.status(201).json({ message: "Success", data })
    } catch (error) {
        console.log(error)
    }
})

// getting the data
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