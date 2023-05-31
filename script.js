const siteName = window.location.pathname.substr(1);

fetch('/getScriptCode')
  .then(response => response.text())
  .then(scriptCode => {
    const scriptContainer = document.createElement('div');
    scriptContainer.innerHTML = scriptCode;
    document.body.appendChild(scriptContainer);
  })
  .catch(error => console.error(error));
