const params = new URLSearchParams(window.location.search);
    const crystalId = params.get('id');
    const mainContent = document.getElementById('main-content');

    fetch('crystals.json')
        .then(response => response.json())
        .then(data => {
            if (crystalId && data[crystalId]) {
                // VIEW 1: SINGLE CRYSTAL DISPLAY
                const crystal = data[crystalId];
                mainContent.innerHTML = `
                    <div class="crystal-detail">
                        <h1>${crystal.name}</h1>
                        <img src="${crystal.image}" alt="${crystal.name}" class="crystal-detail-img">
                        <p>${crystal.description}</p>
                        <p><strong>Color:</strong> ${crystal.color}</p>
                        <p><strong>Origin:</strong> ${crystal.origin}</p>
                        <a href="index.html" class="back-btn">Back to Gallery</a>
                    </div>
                `;
                document.title = crystal.name + " | Serendipity Rocks";
            } else {
                // VIEW 2: FULL GALLERY DISPLAY
                mainContent.innerHTML = `<h1>Serendipity Rocks and Gems</h1><div id="gallery-container"></div>`;
                const gallery = document.getElementById('gallery-container');
                
                // Loop through all crystals in the JSON
                for (const id in data) {
                    const crystal = data[id];
                    gallery.innerHTML += `
                        <a href="index.html?id=${id}" class="crystal-card">
                            <img src="${crystal.image}" alt="${crystal.name}">
                            <h3>${crystal.name}</h3>
                        </a>
                    `;
                }
                document.title = "Serendipity Rocks & Gems | Collection";
            }
        })
        .catch(error => {
            mainContent.innerHTML = `<p>Sorry, the crystal collection couldn't be loaded. Please try again.</p>`;
            console.error('Failed to load crystals.json:', error);
        });