const express = require('express');
const router = express.Router();
const request = require('request');
const API_KEY = process.env.API_KEY;

router.get("/:difficulty", function(req, res){
    const difficulty = req.params.difficulty;
    let minLetters = 0;
    let maxLetters = 0;
    switch(difficulty){
        case "easy":
            minLetters = 4;
            maxLetters = 5;
            break;
        case "normal":
            minLetters = 5;
            maxLetters = 8;
            break;
        case "hard":
            minLetters = 2;
            maxLetters = 3;
            break;
    }
    const queryURL = `https://wordsapiv1.p.rapidapi.com/words/?hasDetails=typeOf,synonyms&letterPattern=^[a-z]*$&lettersMin=${minLetters}&lettersMax=${maxLetters}&random=true`;
    const options = {
        method: "GET",
        url: queryURL,
        headers: {
            "X-RapidAPI-Key": API_KEY,
            "Accept": "application/json"
        }
    }
    request(options, function(error, response, body){
        if(error) {
            console.log(error);
        }
        else if(!error && response.statusCode === 200){
            body = JSON.parse(body)
            res.json(body);
        }
    })
});

module.exports = router;