document.addEventListener('DOMContentLoaded', function () {
	const buttons = document.querySelectorAll('.start-btn');

	buttons.forEach((button) => {
		button.addEventListener('click', function (event) {
			event.preventDefault(); // Prevent navigation
			const pdfFile = this.getAttribute('data-pdf');

			// Fetch extracted text from Flask
			fetch('http://127.0.0.1:5000/extract-text?pdf=' + pdfFile)
				.then((response) => response.json())
				.then((data) => {
					// Create modal dynamically
					const modal = document.createElement('div');
					modal.id = 'courseModal';
					modal.style.position = 'fixed';
					modal.style.top = '0';
					modal.style.left = '0';
					modal.style.width = '100%';
					modal.style.height = '100%';
					modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
					modal.style.display = 'flex';
					modal.style.justifyContent = 'center';
					modal.style.alignItems = 'center';
					modal.style.zIndex = '1000';

					// Create modal content
					const modalContent = document.createElement('div');
					modalContent.style.backgroundColor = '#000';
					modalContent.style.padding = '20px';
					modalContent.style.width = '60%';
					modalContent.style.borderRadius = '8px';
					modalContent.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
					modalContent.style.maxHeight = '80%';
					modalContent.style.overflowY = 'auto';

					// Close button
					const closeBtn = document.createElement('p');
					closeBtn.classList.add('close-btn');
					closeBtn.innerHTML = '&times;';
					closeBtn.style.position = 'absolute';
					closeBtn.style.top = '10px';
					closeBtn.style.right = '15px';
					closeBtn.style.cursor = 'pointer';
					closeBtn.style.fontSize = '24px';
					closeBtn.style.fontWeight = 'bold';
					closeBtn.style.zIndex = '9999';
					closeBtn.style.pointerEvents = 'auto';

					// Close modal when button is clicked
					// closeBtn.onclick = function () {
					// 	console.log('Close button clicked!');
					// };
					document.addEventListener('click', function (event) {
						if (event.target.classList.contains('close-btn')) {
							console.log('Close button clicked!'); // Check if this logs
							modal.remove();
						}
					});

					// Append everything
					modalContent.appendChild(closeBtn);
					modalContent.innerHTML += `<p>${data.text}</p>`;
					modal.appendChild(modalContent);
					document.body.appendChild(modal);

					// Close modal when clicking outside the content
					modal.onclick = function (event) {
						if (event.target === modal) {
							document.body.removeChild(modal);
						}
					};

					closeBtn.addEventListener('click', () => {
						alert();
					});
				})
				.catch((error) => console.error('Error:', error));
		});
	});
});
