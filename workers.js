export async function handleRequest(request) {
    const siteName = request.url.split('/').pop();
    const idValue = await KV.get(siteName);
  
    if (idValue) {
      const scriptCode = `<script id="${idValue}"></script>`;
      return new Response(scriptCode, { headers: { 'Content-Type': 'text/html' } });
    } else {
      console.log('ID value not found');
      return new Response('ID value not found', { status: 404 });
    }
  }
  