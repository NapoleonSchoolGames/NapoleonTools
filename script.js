async function generateNews(json, element1, element2, amount) {
    const response = await fetch(json);
    const newsData = await response.json();
    const newsContainer1 = document.getElementById(element1);
    const newsContainer2 = document.getElementById(element2);
    let currentContainer = newsContainer1;
    let displayedCount = 0;
    newsData.forEach(news => {
        if (displayedCount >= amount) {
            return;
        }
        const newsElement = createNewsElement(news.title, news.content, news.image);
        currentContainer.appendChild(newsElement);
        displayedCount++;
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

function storeUserName() {
    const userName = prompt("Please enter your name:");
    localStorage.removeItem("NSTName")
    localStorage.setItem("NSTName", userName);
}

if (!localStorage.getItem("NSTName")) {
    storeUserName();
}
const name = localStorage.getItem("NSTName") || "Guest";
const welcomeElement = document.getElementById("welcomeTag");
welcomeElement.innerText = `Welcome back, ${name}`;
generateNews('./json/news.json', 'websiteNews', 'websiteNews', 99)