let newsList = []

const apiKey = "6c380f89bed94699b3f75b8d9e88f14e"

let category = "music"
let pageSize = 20

let url = `https://newsapi.org/v2/everything?q=${category}&language=en&pagesize=${pageSize}&apiKey=${apiKey}`

const loadNews = async() => {
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
                <div id="publishedAt">${item.publishedAt}</div>
            </div>
            <div id="imgArea">
                <img src="${item.urlToImage}" height="200" />
            </div>
        </div>
    `).join('')

    document.getElementById("newsArea").innerHTML = newsHtml
}

loadNews()

const showTop = async() => {
    category = "music"
    url = `https://newsapi.org/v2/everything?q=${category}&language=en&pagesize=${pageSize}&apiKey=${apiKey}`
    loadNews()
}

const showDJ = async() => {
    category = "dj"
    url = `https://newsapi.org/v2/everything?q=${category}&language=en&pagesize=${pageSize}&apiKey=${apiKey}`
    loadNews()
}

const showMore = async() => {
    pageSize = pageSize + 20
    url = `https://newsapi.org/v2/everything?q=${category}&language=en&pagesize=${pageSize}&apiKey=${apiKey}`
    loadNews()
}
