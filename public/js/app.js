console.log("client running. . . . ");

const search = () => {
    const txtbox = document.getElementById("txt")
    const city = txtbox.value;
    txtbox.value = "";
    const url = "http://localhost:2000/search?city="+city;

    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        if(!data.error){
            document.getElementById("heading") = innerHTML = "Search Result";
            document.getElementById("ch") = innerHTML = "Country"
            document.getElementById("c") = innerHTML = data.country
            document.getElementById("rh") = innerHTML = "Region"
            document.getElementById("r") = innerHTML = data.region
            document.getElementById("we") = innerHTML = "Weather";
            document.getElementById("th") = innerHTML = "Temp"
            document.getElementById("t") = innerHTML = data.temp
            document.getElementById("news") = innerHTML = `${data.country} Top News: `;
            for(var i = 0; i < data.news.length; i++){
                document.getElementById("newsarray").innerHTML = `
                <div>
                <span>${i+1}:  </span>
                <span>Title</span>
                <span>${data.news[i].title}</span>
                </div>
                <div>
                <span>Source</span>
                <span>${data.news[i].source}</span>
                </div>
                <div>
                <span> Descriptions </span>
                <span>${data.news[i].des}</span>
                </div>`
            }
        }
        else{
            console.log("ye chalaraha")
            document.getElementById("e").innerHTML = data.error;
        }
        console.log(data.news);
       }).catch(e => document.getElementById("e").innerHTML = "Error, something went wrong")
}