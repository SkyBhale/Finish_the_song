        // Array of paragraphs corresponding to each tile ID
        const paragraphs = [
            "I'm on the top of the world looking down on creation And the only explanation I can find Is the love that I've found ever since you've been around Your love's put me at the top of the world",
            "This is the paragraph for tile 2.",
            "This is the paragraph for tile 3.",
            "This is the paragraph for tile 4.",
            "This is the paragraph for tile 5.",
            "This is the paragraph for tile 6.",

            "This is the paragraph for tile 7.",
            "This is the paragraph for tile 8.",
            "This is the paragraph for tile 9.",
            "This is the paragraph for tile 10.",
            "This is the paragraph for tile 11.",
            "This is the paragraph for tile 12.",

            "This is the paragraph for tile 13.",
            "This is the paragraph for tile 14.",
            "This is the paragraph for tile 15.",
            "This is the paragraph for tile 16.",
            "This is the paragraph for tile 17.",
            "This is the paragraph for tile 18.",

            "This is the paragraph for tile 19.",
            "This is the paragraph for tile 20.",
            "This is the paragraph for tile 21.",
            "This is the paragraph for tile 22.",
            "This is the paragraph for tile 23.",
            "This is the paragraph for tile 24.",

            "This is the paragraph for tile 25.",
            "This is the paragraph for tile 26.",
            "This is the paragraph for tile 27.",
            "This is the paragraph for tile 28.",
            "This is the paragraph for tile 29.",
            "This is the paragraph for tile 30."
        ];
    
        // Array of music file paths corresponding to each tile ID
        const musicTracks = [
            "music/1.mp3",
            "music2.mp3",
            "music3.mp3",
            "music4.mp3",
            "music5.mp3",
            "music6.mp3",

            "music7.mp3",
            "music8.mp3",
            "music9.mp3",
            "music10.mp3",
            "music11.mp3",
            "music12.mp3",

            "music13.mp3",
            "music14.mp3",
            "music15.mp3",
            "music16.mp3",
            "music17.mp3",
            "music18.mp3",

            "music19.mp3",
            "music20.mp3",
            "music21.mp3",
            "music22.mp3",
            "music23.mp3",
            "music24.mp3",
            
            "music25.mp3",
            "music26.mp3",
            "music27.mp3",
            "music28.mp3",
            "music29.mp3",
            "music30.mp3"
        ];
    
        // Variable to store the value of the clicked tile
        let currentTileValue = 0;
    
        // Get the modal
        var modal = document.getElementById("modal");
    
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
    
        // Get the modal text element
        var modalText = document.getElementById("modal-text");
    
        // Get the audio player
        var audioPlayer = document.getElementById("audio-player");

        // Variable to track if highlighting is active
        let isHighlighting = false;
        let highlightInterval; // To store the setInterval for highlighting

        // Add an event listener for the space key
        document.addEventListener('keydown', function(event) {
            if (event.code === 'Space') { // Check if the pressed key is Space
                event.preventDefault(); // Prevent the default action (like scrolling)
                if (modal.style.display === "block") { // Check if the modal is open
                    if (!isHighlighting) {
                        audioPlayer.play(); // Play the music
                        highlightWords(); // Start highlighting words
                        isHighlighting = true; // Set highlighting as active
                    } else {
                        audioPlayer.pause(); // Pause the music
                        audioPlayer.currentTime = 0; // Reset the music to the start
                        isHighlighting = false; // Set highlighting as inactive
                        
                        // Clear the highlights
                        const spans = modalText.getElementsByTagName('span');
                        for (let span of spans) {
                            span.classList.remove('highlight'); // Remove all highlights
                        }

                        // Clear the highlighting interval
                        clearInterval(highlightInterval);
                    }
                }
            }
        });

        // Modify the openModal function to remove the automatic audio play and highlight call
        function openModal(text, track, tileValue) {
            modalText.innerHTML = ''; // Clear previous content
            const words = text.split(' '); // Split text into words
            words.forEach(word => {
                const span = document.createElement('span');
                span.textContent = word + ' '; // Add space after each word
                modalText.appendChild(span);
            });
            
            audioPlayer.src = track; // Set the audio source
            modal.style.display = "block"; // Show the modal

            // Store the tile value for score updates
            currentTileValue = tileValue;

            // Store the highlightWords function in a way it can be accessed globally
            window.highlightWords = () => {
                let currentWordIndex = 0;
                highlightInterval = setInterval(() => {
                    const spans = modalText.getElementsByTagName('span');
                    if (currentWordIndex < words.length) {
                        spans[currentWordIndex].classList.add('highlight'); // Highlight current word
                        if (currentWordIndex > 0) {
                            spans[currentWordIndex - 1].classList.remove('highlight'); // Remove highlight from previous word
                        }
                        currentWordIndex++;
                    } else {
                        clearInterval(highlightInterval); // Clear the interval when done
                    }
                }, 900); // Adjust timing for word highlight duration
            };
        }


    
        // Function to change the score
        function changeScore(teamId, change) {
            const scoreInput = document.getElementById(teamId);
            let currentScore = parseInt(scoreInput.value);
            currentScore += (change * currentTileValue); // Change by the value of the tile
            scoreInput.value = currentScore < 0 ? 0 : currentScore; // Prevent negative scores
        }
    
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
            audioPlayer.pause(); // Pause the music when closing the modal
            audioPlayer.currentTime = 0; // Reset the music to the start
    
            // Disable the tile that was clicked
            const activeTile = document.querySelector('.active-tile');
            if (activeTile) {
                activeTile.classList.add('disabled'); // Add the disabled class
                activeTile.classList.remove('active-tile'); // Remove the active tile class
            }
        }
    
        // Add event listeners to each tile
        const tiles = document.querySelectorAll('.glass-card');
        tiles.forEach(tile => {
            tile.addEventListener('click', function() {
                if (this.classList.contains('disabled')) return; // Prevent action if tile is disabled
    
                const id = this.id; // Get the ID of the clicked tile
                const paragraph = paragraphs[id - 1]; // Get the corresponding paragraph
                const track = musicTracks[id - 1]; // Get the corresponding music track
                const tileValue = parseInt(this.getAttribute('value')); // Get the value of the clicked tile
                openModal(paragraph, track, tileValue); // Open the modal with the paragraph and play music
    
                // Mark this tile as the active tile
                tiles.forEach(t => t.classList.remove('active-tile')); // Remove active tile class from all
                this.classList.add('active-tile'); // Add active tile class to the clicked tile
            });
        });