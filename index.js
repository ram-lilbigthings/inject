export async function onRequest(request) {
  const siteName = request.url.split('/').pop();

  const idValue = await context.env.KV.get(siteName);

  if (idValue) {
    const scriptCode = `<script id="${idValue}"></script>`;
    const scriptContainer = document.createElement('div');
    scriptContainer.textContent = scriptCode;
    return new Response(scriptContainer.outerHTML, { headers: { 'Content-Type': 'text/html' } });
  } else {
    return new Response('ID value not found', { status: 404 });
  }
}
