document.addEventListener('DOMContentLoaded', () => {
    const useFakeDate = false; // 👉 set to true when you want to test
    const fakeDate = new Date('2025-03-10');
    const today = useFakeDate ? fakeDate : new Date();

    fetch('https://raw.githubusercontent.com/spicyChick3ns/acnh-villagers-api/master/villagers.json')
        .then(response => response.json())
        .then(data => {
            const currentMonth = today.getMonth() + 1;
            const currentDay = today.getDate();

            const villagersToday = data.filter(v => {
                const [month, day] = v.birthday.split('/').map(num => parseInt(num));
                return month === currentMonth && day === currentDay;
            });

            const messageContainer = document.getElementById('birthday-message');

            if (villagersToday.length > 0) {
                const namesList = villagersToday.map(v => {
                    const name = v.name;
                    const personality = v.personality;
                    const species = v.species;
                    return `
                        <div class="villager">
                            <span class="villager-name">${name}</span>
                            the <span class="villager-details">${personality} ${species}</span>
                        </div>
                    `;
                }).join('');

                messageContainer.innerHTML = `
                    <h3>🎉 Happy Birthday!</h3>
                    <p>Today we're celebrating:</p>
                    <div class="villager-list">${namesList}</div>
                    <p>Be sure to wish them a fantastic day on the island! 🎂</p>
                `;
            } else {
                messageContainer.innerHTML = `🎂 No villager birthdays today! But hey, it's always a good day to give a gift. 🎁`;
            }
        })
        .catch(err => {
            console.error('Error loading villager data:', err);
            document.getElementById('birthday-message').textContent = 'Oops! Could not load birthday data.';
        });
});