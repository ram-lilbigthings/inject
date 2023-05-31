
export async function onRequest(context) {
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or to fetch assets
        data, // arbitrary space for passing data between middlewares
      } = context;
    const { pathname } = new URL(request.url);
    const siteName = pathname.split('/').pop();
    console.log(siteName)
    const idValue = await env.KV.get(siteName);
    try {
        if (idValue) {
            const scriptCode = '<script id="' + idValue + '"></script>';
            const response = new Response(scriptCode, {
              headers: { 'Content-Type': 'text/html' },
            });
            return response;
        } else {
            console.log('ID value not found');
            return new Response('ID value not found');
        }
      } catch (error) {
        console.error(error);
      return new Response('Error occurred');
      }
  }
