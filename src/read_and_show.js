document.getElementById('readFileBtn').addEventListener('click', function () {
  // Fetch the content of the text file
  fetch('test.txt')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.text();
      })
      .then(data => {
          // Display the content in the h1 element
          document.getElementById('fileContent').innerText = data;
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
          document.getElementById('fileContent').innerText = 'Error reading the file.';
      });
});