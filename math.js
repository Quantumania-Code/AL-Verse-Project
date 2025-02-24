const thumbnails = document.querySelectorAll('.video-thumbnail');
const videos = document.querySelectorAll('.youtube-video');

// Function to swap the thumbnail with the YouTube iframe when clicked
thumbnails.forEach((thumbnail, index) => {
	thumbnail.addEventListener('click', () => {
		thumbnail.style.display = 'none';
		videos[index].style.display = 'block';
	});
});
