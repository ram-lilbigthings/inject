const siteName = window.location.pathname.substr(1);

fetch('/getScriptCode')
  .then(response => response.text())
  .then(scriptCode => {
    // Create a new script element
    const scriptElement = document.createElement('script');
    scriptElement.setAttribute('id', scriptCode);

    // Append the script element to the document head
    document.head.appendChild(scriptElement);
  })
  .catch(error => console.error(error));
