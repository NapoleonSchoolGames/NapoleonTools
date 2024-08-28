async function generateNews() {
    const response = await fetch('./json/news.json');
    const newsData = await response.json();
    const newsContainer1 = document.getElementById('news1');
    const newsContainer2 = document.getElementById('news2');
    const nextColumn = newsContainer1
    newsData.forEach(news => {
        const newsElement = createNewsElement(news.title, news.content, news.image);
        if (nextColumn == newsContainer1) {
            const nextColumn = newsContainer2
            newsContainer1.appendChild(newsElement);
        } else if (nextColumn == newsContainer2) {
            const nextColumn = newsContainer2
            newsContainer1.appendChild(newsElement);
        }
    });
}

function createNewsElement(title, content, image) {
    const element = document.createElement('div');
    element.classList.add('news');

    const imageElement = document.createElement('img')
    imageElement.src = "/images/" + image;
    imageElement.classList.add('news-image');


    const titleElement = document.createElement('h2');
    titleElement.textContent = title;
    titleElement.classList.add('news-title');

    const contentElement = document.createElement('span');
    contentElement.innerHTML = content;
    contentElement.classList.add('news-content');

    element.appendChild(imageElement);
    element.appendChild(titleElement);
    element.appendChild(contentElement);
    return element;
}

generateNews()