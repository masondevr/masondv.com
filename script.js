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
        // Create the anchor element
        const anchor = document.createElement('a');
        anchor.href = `https://drive.google.com/file/d/${file.id}/view`; // Link to the full-size image
        anchor.target = '_blank'; // Open in a new tab

        // Create the image element
        const imgElement = document.createElement('img');
        imgElement.src = `https://drive.google.com/thumbnail?id=${file.id}&sz=h${imgWidth}`;
        imgElement.alt = file.name;

        // Append the image to the anchor
        anchor.appendChild(imgElement);

        // Append the anchor to the appropriate column
        if (index % 2 === 0) {
            column1.appendChild(anchor);
        } else {
            column2.appendChild(anchor);
        }

        console.log(`Clickable image added to column ${index % 2 === 0 ? 1 : 2}: ${file.name}`);
    });
}
