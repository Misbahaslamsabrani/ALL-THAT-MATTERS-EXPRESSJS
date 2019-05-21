const request = require("request");

const getData = (check, city) => {
    let data = {};
    const options = {
        url: ` https://api.apixu.com/v1/current.json?key=f3202b9d9ea34f868f3120440180206&q=${city}`,
        json: true,
    }
    request(options, (err, response) => {
        if (response) {
            if (response.body.error) {
                check.send({error: response.body.error.message}) 
            }
            data.country = response.body.location.country;
            data.region = response.body.location.region;
            data.temp = response.body.current.temp_c;
            if (response.body.location.country) {
                const newAPIKey = "89b7784face7425d8fd5a69979a3bbfa"
                const newsLink = `https://newsapi.org/v2/top-headlines?q=${response.body.location.country}&
            sources=bbc-news&apiKey=${newAPIKey}`
                const optionsForNews = {
                    url: newsLink,
                    method: "GET",
                    json: true,
                }
                request(optionsForNews, (err, res) => {
                    if (res && res.body.status === "ok") {
                        if (res.body.totalResults !== 0) {
                            const temarr = res.body.articles.map(v => {
                                return {title: v.title, source: v.source.name, des: v.description}
                            })
                            data.news = temarr;
                            check.send(data)
                        }
                        else {
                            check.send(data)
                            check.send({error:  "Sorry, No Top News"})
                        }
                    }
                    else {
                        check.send({error: "Sorry, something went wrong"})
                    }
                })
            }
            else {
                check.send({error: "Sorry, something went wrong"})
            }
        }
        else {
            check.send({error: "Sorry, something went wrong"})
        }
    })
}

module.exports = getData;