const siteName = window.location.pathname.substr(1);

export async function onRequest(context) {
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or to fetch assets
        data, // arbitrary space for passing data between middlewares
      } = context;
    const idValue = await context.env.KV.get(siteName);
    try {
        if (idValue) {
          const scriptCode = '<' + 'script id="' + idValue + '"><' + '/script>';
          return new Response(scriptCode);
        } else {
          console.log('ID value not found');
        }
      } catch (error) {
        console.error(error);
      }
  }
