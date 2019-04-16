let articlesList = document.querySelector('.articlesList');
let newArticleButton = document.querySelector('.newArticleButton');
let newArticleTitle = document.querySelector('.newArticleTitle');
let newArticleText = document.querySelector('.newArticleText');
let deleteArticleTitle = document.querySelector('.deleteArticleTitle');
let deleteArticleButton = document.querySelector('.deleteArticleButton');
let updateArticleButton = document.querySelector('.updateArticleButton');
let updateArticleTitle = document.querySelector('.updateArticleTitle');
let updateArticleText = document.querySelector('.updateArticleText');

newArticleButton.addEventListener('click', () => {
    let articleTitle = newArticleTitle.value;
    let articleText = newArticleText.value;
    let xhr;
    let body;

    if (articleTitle) {
        xhr = new XMLHttpRequest();
        body = {
            title: articleTitle,
            text: articleText
        };

        xhr.open('PUT', '/articlesList/' + articleTitle);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    window.location.href = '/articlesList';
                } else {
                    alert(xhr.response);
                    window.location.href = '/articlesList';
                }
            }
        };
        xhr.send(JSON.stringify(body));
    }
});

deleteArticleButton.addEventListener('click', () => {
    let articleTitle = deleteArticleTitle.value;
    let xhr = new XMLHttpRequest();

    xhr.open('DELETE', '/articlesList/' + articleTitle);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            window.location.href = '/articlesList';
        }
    };
    xhr.send();
});

updateArticleButton.addEventListener('click', () => {
    let articleTitle = updateArticleTitle.value;
    let articleText = updateArticleText.value;
    let xhr;
    let body;

    if (articleTitle) {
        xhr = new XMLHttpRequest();
        body = {
            'title': articleTitle,
            'text': articleText
        };

        xhr.open('POST', '/articlesList/' + articleTitle, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                window.location.href = '/articlesList';
            }
        };
        xhr.send(JSON.stringify(body));
    }
});

