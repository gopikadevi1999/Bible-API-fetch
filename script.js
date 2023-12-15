document.addEventListener('DOMContentLoaded', function () {
    const verseContainer = document.getElementById('verseContainer');

    // Fetch Bible verses using a Promise
    fetchVerses()
        .then(verses => displayVerses(verses))
        .catch(error => console.error('Error fetching Bible verses:', error));

    // Function to fetch Bible verses using the fetch API and return a Promise
    function fetchVerses() {
        return new Promise((resolve, reject) => {
            fetch('https://bible-api.com/romans%2012:1-2,5-7,9,13:1-9&10')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => resolve(data.verses))
                .catch(error => reject(error));
        });
    }

    // Function to display Bible verses on the webpage
    function displayVerses(verses) {
        verses.forEach(verse => {
            const verseCard = createVerseCard(verse);
            verseContainer.appendChild(verseCard);
        });
    }

    // Function to create a card element for each Bible verse
    function createVerseCard(verse) {
        const card = document.createElement('div');
        card.classList.add('col-md-6', 'mb-4');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card', 'shadow');

        const cardText = document.createElement('div');
        cardText.classList.add('card-body');

        const bookId = document.createElement("p");
        bookId.classList.add("bookId");
        bookId.textContent = verse.book_id;

        const bookName = document.createElement("p");
        bookName.classList.add("bookName");
        bookName.textContent = verse.book_name;

        const verseContent = document.createElement('p');
        verseContent.classList.add('card-text');
        verseContent.textContent = verse.text;

        cardText.appendChild(verseContent);
        cardBody.appendChild(bookName);
        cardBody.appendChild(bookId);
        cardBody.appendChild(cardText);
        card.appendChild(cardBody);

        return card;
    }
});
