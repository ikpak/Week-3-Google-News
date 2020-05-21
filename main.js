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
    showSourceList()
}

// 1. Search by keyword
// 2. assign that value into keyword variable
const searchByKeyword = () => {
    category = document.getElementById("keywordArea").value
    loadNews()
}

const showSourceList = () => {
    // get all the source names from articles
    let sourceArray = newsList.map(item => item.source.name)
    let sourceObject = {}
    for(let i = 0; i < sourceArray.length; i++) {
        let sourceName = sourceArray[i] // bring each source name from the array
        if(sourceObject[sourceName] == null) {
            sourceObject[sourceName] = 1
        } else {
            sourceObject[sourceName]++
        }
    }
    let sourceList = Object.keys(sourceObject)
    let html = sourceList.map(item => `<div class="column"><input id="sourceItem" type="checkbox" value="${item}" onchange="searchBySource(event)" />${item}: ${sourceObject[item]}</div>`).join(' ')
    document.getElementById("sourceArea").innerHTML = html
}

let searchBySource = (event) => {
    if(event.target.checked == true) {
        sourceName = event.target.value
        let filteredList = newsList.filter(item => item.source.name === sourceName)
        render(filteredList)
    } else {
        render(newsList)
    }
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

