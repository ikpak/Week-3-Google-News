let newsList = []

const apiKey = "6c380f89bed94699b3f75b8d9e88f14e"

let category = "music"
let pageSize = 20

const loadNews = async() => {
    let url = `https://newsapi.org/v2/everything?q=${category}&language=en&pagesize=${pageSize}&apiKey=${apiKey}`
    let data = await fetch(url)
    let result = await data.json();
    newsList = result.articles
    render(newsList)
}

const render = (list) => {
    let newsHtml = list.map(item => `
        <div id="news">
            <div id="contentsArea">
                <div id="title">${item.title}</div>
                <div id="description">${item.description}</div>
                <div id="source"><a href="${item.url}">${item.source.name}</a></div>
                <div id="publishedAt">${moment(item.publishedAt).fromNow()}</div>
            </div>
            <div id="imgArea">
                <img src="${item.urlToImage}" height="200" width="300" />
            </div>
        </div>
    `).join('')

    document.getElementById("newsArea").innerHTML = newsHtml
    document.getElementById("numberArticle").innerHTML = `No. of articles shown: 1-${newsList.length}`
}

loadNews()

const showTop = async() => {
    category = "music"
    loadNews()
}

const showArtists = async() => {
    category = "dj"
    loadNews()
}

const showEvents = async() => {
    category = "music+events"
    loadNews()
}

const showClubs = async() => {
    category = "nightclub"
    loadNews()
}

const showFashion = async() => {
    category = "fashion"
    loadNews()
}

const showLifestyle = async() => {
    category = "lifestyle"
    loadNews()
}

const showMore = async() => {
    pageSize = pageSize + 20
    loadNews()
}
