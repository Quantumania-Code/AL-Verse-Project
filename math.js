// Function to swap the thumbnail with the YouTube iframe when clicked
function playVideo() {
	// Hide the thumbnail
	document.querySelector('.video-thumbnail').style.display = 'none';

	// Show the YouTube iframe
	document.getElementById('youtube-video').style.display = 'block';
}
