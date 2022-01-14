const express = require('express');


const Album = require('../models/albumModel');
const router = express.Router()

//CRUD

//Create
router.post('', async (req, res) => {
    const album = await Album.create(req.body);

    return res.status(201).send(album)
});

//GET 
router.get('', async (req, res) => {
    try {
        const page = +req.query.page || 1;
        const size = +req.query.limit || 5;
        const offSet = (page - 1) * size;

        const albums = await Album.find().populate({
            path: "songs",
            select: ["name", "duration"],
        }).limit(size).skip(offSet).lean().exec();
        const totalAlbums = await Album.find().countDocuments();
        const totalPages = Math.ceil(totalAlbums / size);
        return res.status(200).send({ albums, totalPages })

    } catch (e) {
        console.log('e:', e)

    }




})

module.exports = router