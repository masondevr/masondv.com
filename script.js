const apiKey = 'AIzaSyBBaesZiljQnifo0LD-OND2TwbsNDEO2n4'; // Replace with your API key
const folderIds = {
    Cat: '1RKMOjPVY9tgwh4X7mmFw4yv0ikY42k21',
    Dallas: '1gEB8x-AzRPi8wIc4IZi8LdnqsTfIUqli',
    Fallan: '1D-4wXbcGBlyTXuessbHvlSYnVSbGma2X',
    Griffen: '19mVUBoJIIx973K9_ZCrSDZPMOlhi9l89',
    Ian: '1QTjWjT4KkuCWO7QpdoVHlBaFbexYbhym',
    Jack: '1mjSKBTwLSXmsbS1FVFGh0fFxYB0toUOB',
    Jonah: '1f9fFkvNrh653VttQfGXJzGby0Bs2Xc_i',
    Kenna: '1kUtrCaAblL0aLilzYb62JuBRtggoV8dQ',
    Kian: '1DG5p1bCO-fcaZA_tTT9cz7doVomBiza4',
    Mason: '1qDTd7JGfLgTUPlXcJiFmP7xrnv8kuyO6',
    Tuxin: '1F3xSfY9p6lz7Uh1Yk-xfHMImOZT3dDAj'
};

const imgWidth = 500;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

async function fetchImages(friend) {
    const galleryId = folderIds[friend];
    console.log(`Fetching images from folder: ${galleryId}`);
    
    const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${galleryId}'+in+parents&key=${apiKey}&fields=files(id,name)`);
    
    if (!response.ok) {
        console.error('Error fetching images:', response.statusText);
        return;
    }
    
    const data = await response.json();
    console.log('Data received:', data);

    const gallery = document.getElementById('gallery');

    // Clear existing content in the gallery
    gallery.innerHTML = '';

    // Create modal elements
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.style.display = 'none'; // Initially hidden
    modal.innerHTML = `
        <div class="modal-content">
            <span id="closeModal" class="close">&times;</span>
            <img id="modalImage" src="" alt="Full-size image">
        </div>
    `;
    document.body.appendChild(modal);

    // Event listener to close the modal
    document.getElementById('closeModal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Create two columns
    const column1 = document.createElement('div');
    const column2 = document.createElement('div');
    column1.className = 'column';
    column2.className = 'column';

    gallery.appendChild(column1);
    gallery.appendChild(column2);

    if (data.files.length === 0) {
        gallery.innerHTML = '<p>No images found.</p>';
        console.log('No images found in the folder.');
        return;
    }

    // Shuffle images
    shuffleArray(data.files);

    // Distribute images alternately between the two columns
    data.files.forEach((file, index) => {
        // Create the image element
        const imgElement = document.createElement('img');
        imgElement.src = `https://drive.google.com/thumbnail?id=${file.id}&sz=h${imgWidth}`;
        imgElement.alt = file.name;
        imgElement.className = 'gallery-image';

        // Add click event to show the modal with the full-size image
        imgElement.addEventListener('click', () => {
            const modalImage = document.getElementById('modalImage');
            modalImage.src = `https://drive.google.com/uc?id=${file.id}`;
            modal.style.display = 'block';
        });

        // Append the image to the appropriate column
        if (index % 2 === 0) {
            column1.appendChild(imgElement);
        } else {
            column2.appendChild(imgElement);
        }

        console.log(`Image added to column ${index % 2 === 0 ? 1 : 2}: ${file.name}`);
    });
}
