console.log("client running. . . . ");

const search = () => {
    const txtbox = document.getElementById("txt")
    const city = txtbox.value;
    txtbox.value = "";
    const url = "/search?city=" + city;
 
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        if (!data.error) {
            document.getElementById("heading").innerHTML = "Search Result";
            document.getElementById("ch").innerHTML = "Country: "
            document.getElementById("c").innerHTML = data.country
            document.getElementById("rh").innerHTML = "Region: "
            document.getElementById("r").innerHTML = data.region
            document.getElementById("we").innerHTML = "Weather";
            document.getElementById("th").innerHTML = "Temperature In Celisus:"
            document.getElementById("t").innerHTML = data.temp
            document.getElementById("news").innerHTML = `Top News of ${data.country}`;
            var news = ""
            for (var i = 0; i < data.news.length; i++) {
                news += `
             <div>
             <span>${i + 1}:</span> 
                
                <span class="teal-text">Title: </span>
                <span>${data.news[i].title}</span>
                </div>
                <div>
                <span class="teal-text">
                Source: </span>
                <span>${data.news[i].source}</span>
                </div>
                <div>
                <span class="teal-text"> 
                Descriptions: </span>
                <span>${data.news[i].des}</span>
                </div> <br />`
            }
            document.getElementById("newsarray").innerHTML = news
        }
        else {
            document.getElementById("e").innerHTML = data.error;
        }
    }).catch(e => {
        document.getElementById("e").innerHTML = "Error: Can't fetch data"
    })
}