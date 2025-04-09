document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const form = this;
  const feedback = document.getElementById('formFeedback');
  const data = new FormData(form);

  fetch('/send-message', {
      method: 'POST',
      body: data
  })
  .then(response => response.json())
  .then(result => {
      feedback.style.display = 'block';
      feedback.textContent = result.message;
      feedback.style.color = result.success ? '#28a745' : '#dc3545';
      if (result.success) form.reset();
  })
  .catch(error => {
      feedback.style.display = 'block';
      feedback.style.color = '#dc3545';
      feedback.textContent = 'An error occurred. Please try again.';
      console.error('Error:', error);
  });
});