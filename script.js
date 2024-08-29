async function generateNews(json, element1, element2) {
    const response = await fetch(json);
    const newsData = await response.json();
    const newsContainer1 = document.getElementById(element1);
    const newsContainer2 = document.getElementById(element2);
    let currentContainer = newsContainer1;
    newsData.forEach(news => {
        const newsElement = createNewsElement(news.title, news.content, news.image);
        currentContainer.appendChild(newsElement); 
        currentContainer = (currentContainer === newsContainer1) ? newsContainer2 : newsContainer1; 
    });
}

function createNewsElement(title, content, image) {
    const element = document.createElement('div');
    element.classList.add('news');

    const imageElement = document.createElement('img')
    imageElement.src = "./images/" + image;
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

generateNews('./json/school.json', 'news1', 'news2')
generateNews('./json/news.json', 'websiteNews', 'websiteNews')