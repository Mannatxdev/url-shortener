const shortid = require('shortid');
const URL = require('../MODELS/url');


async function HandleGenrateNewShorterURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error:'url is required'});
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        vistedHistory:[],
    });

    return res.json({id:shortID});
}

module.exports={
    HandleGenrateNewShorterURL,
}