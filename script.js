document.addEventListener('DOMContentLoaded', () => {
    const collageContainer = document.getElementById('photo-collage-container');
    const photoFolderPath = 'photos/';
    const photoListJsonURL = 'photo_list.json';
    let photoFilenames = [];
    let currentPhotoIndex = 0;

    // --- FASTER APPEARANCE: Drastically reduce this value ---
    const PHOTO_APPEAR_INTERVAL = 500; // milliseconds (was 1500, now 0.5 seconds)
                                       // Try values like 250, 500, 750

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function getRandomPositionAndSize() {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        const minSizeRatio = 0.20; // Min photo size relative to smaller viewport dim
        const maxSizeRatio = 0.50; // Max photo size (was 0.55, slightly smaller to allow more on screen)

        const minDim = Math.min(vw, vh);
        const baseSize = Math.random() * (minDim * (maxSizeRatio - minSizeRatio)) + (minDim * minSizeRatio);

        let width = baseSize;
        let height = baseSize * (Math.random() * 0.4 + 0.8); // Aspect ratio variation

        if (Math.random() > 0.5) { // Randomly swap width/height bias
            width = baseSize * (Math.random() * 0.4 + 0.8);
            height = baseSize;
        }

        width = Math.max(80, width);   // Min practical width (was 100)
        height = Math.max(80, height); // Min practical height (was 100)

        // Control bleed: Allow up to 20% of the image to go off-screen
        const maxBleedRatio = 0.20;

        const minTop = -height * maxBleedRatio;
        const maxTop = vh - (height * (1 - maxBleedRatio));
        const top = Math.random() * (maxTop - minTop) + minTop;

        const minLeft = -width * maxBleedRatio;
        const maxLeft = vw - (width * (1 - maxBleedRatio));
        const left = Math.random() * (maxLeft - minLeft) + minLeft;

        const rotation = Math.random() * 30 - 15; // Rotation between -15 and +15 degrees (was 40/-20)

        return {
            top: `${top}px`,
            left: `${left}px`,
            width: `${width}px`,
            height: `${height}px`,
            rotation: rotation
        };
    }

    function addNextPhoto() {
        if (photoFilenames.length === 0) {
            console.log("No photos to display.");
            return;
        }
        if (currentPhotoIndex >= photoFilenames.length) {
            // To loop:
            // currentPhotoIndex = 0;
            // photoFilenames = shuffleArray(photoFilenames); // Re-shuffle for variety
            // console.log("Restarting collage loop.");
            // setTimeout(addNextPhoto, PHOTO_APPEAR_INTERVAL);
            // return;

            console.log("All photos shown."); // Current: Stops after one pass
            return;
        }

        const filename = photoFilenames[currentPhotoIndex];
        const imgElement = document.createElement('img');
        imgElement.src = photoFolderPath + filename;
        imgElement.alt = "A beautiful photo"; // Shorter alt text
        imgElement.classList.add('photo-item');
        imgElement.loading = "lazy"; // Helps with initial load if many images, browser decides priority

        const { top, left, width, height, rotation } = getRandomPositionAndSize();
        imgElement.style.top = top;
        imgElement.style.left = left;
        imgElement.style.width = width;
        imgElement.style.height = height;
        imgElement.style.setProperty('--rotation-deg', `${rotation}deg`);

        collageContainer.appendChild(imgElement);
        
        // Force reflow for transition - minimal impact but good practice
        void imgElement.offsetHeight; 
        
        imgElement.classList.add('visible');

        currentPhotoIndex++;
        setTimeout(addNextPhoto, PHOTO_APPEAR_INTERVAL);
    }

    async function fetchAndInitializeCollage() {
        try {
            // Added cache-control headers to try and ensure fresh JSON, though ?t= is usually enough
            const response = await fetch(`${photoListJsonURL}?t=${new Date().getTime()}`, {
                cache: 'no-cache'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} when fetching ${photoListJsonURL}`);
            }
            const fetchedFilenames = await response.json();
            if (!fetchedFilenames || fetchedFilenames.length === 0) {
                collageContainer.innerHTML = '<p style="color: white; text-align: center; font-size: 20px; padding-top: 40vh;">No photos found. Add to "photos" folder & run Python script.</p>';
                return;
            }
            photoFilenames = shuffleArray(fetchedFilenames);
            addNextPhoto(); // Start adding photos
        } catch (error) {
            console.error("Could not load photo list:", error);
            collageContainer.innerHTML = `<p style="color: white; text-align: center; font-size: 20px; padding-top: 40vh;">Error loading photos: ${error.message}. Ensure 'photo_list.json' exists & server is running.</p>`;
        }
    }

    fetchAndInitializeCollage();
});