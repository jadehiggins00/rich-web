
fetch('http://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
        const titlesWithMoreThanSixWords = posts
            .filter(post => post.title.split(' ').length > 6)
            .map(post => post.title);

        console.log("Titles with more than six words:", titlesWithMoreThanSixWords);

   
        const titlesList = document.getElementById('titlesList');
        titlesWithMoreThanSixWords.forEach(title => {
            const li = document.createElement('li');
            li.textContent = title;
            titlesList.appendChild(li);
        });
    });


fetch('http://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(posts => {
        const wordFrequency = posts
            .map(post => post.body)
            .reduce((acc, body) => acc + ' ' + body, "")
            .toLowerCase() 
            .split(/\s+/)
            .reduce((acc, word) => {
                acc[word] = (acc[word] || 0) + 1;
                return acc;
            }, {});

        console.log("Word frequency:", wordFrequency);


        const wordFrequencyDiv = document.getElementById('wordFrequency');
        Object.entries(wordFrequency).forEach(([word, freq]) => {
            const div = document.createElement('div');
            div.textContent = `${word}: ${freq}`;
            wordFrequencyDiv.appendChild(div);
        });
    });
