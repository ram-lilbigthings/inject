export async function onRequest(context) {
    const {
      request,
      env,
      params,
      waitUntil,
      next,
      data,
    } = context;
  
    const { pathname } = new URL(request.url);
    const siteName = pathname.split('/').pop();
    console.log(siteName);
  
    try {
      const idValue = await env.KV.get(siteName);
  
      if (idValue) {
        const scriptCode = '<script id="' + idValue + '"></script>';
        const response = new Response(scriptCode, {
          ,
        });
        return response;
      } else {
        console.log('ID value not found');
        return new Response('ID value not found', { status: 404 });
      }
    } catch (error) {
      console.error(error);
      return new Response('Error occurred', { status: 500 });
    }
  }
  