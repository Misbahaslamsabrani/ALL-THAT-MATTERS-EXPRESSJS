const express = require("express");
const app = express();
const path = require('path');
const getData = require("./getData")
var IPGeolocationAPI = require('ip-geolocation-api-javascript-sdk');

const publicFolderPath = path.join(__dirname, '../public')
app.use(express.static(publicFolderPath));

app.set("view engine", "hbs")

const viewFolderPath = path.join(__dirname, '../templates/views')
app.set("views", viewFolderPath)

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/search", (req, res) => {
    const { city } = req.query;
    if (city) {
        getData(res, city);
    }
    else {
        var ipgeolocationApi = new IPGeolocationAPI("85c4e3caca5c4d8abcd4bca8173284d7", false);
        ipgeolocationApi.getGeolocation((res1) => {
            if(res1) {
                console.log(res1.city)
                getData(res, res1.city)
            }
            else {
                return res.send({error: "Sorry, something went wrong!"})
            }
        })
    }
})
const port = process.env.PORT || 2000
app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})