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
      const user_details = await env.UserDetails.get(siteName)
      var user_array = JSON.parse(user_details);

      if (idValue) {
        const scriptCode = '<script id=' + idValue + ' type="text/javascript" email=' + user_array[0] + ' password=' + user_array[1]+ ' src="http://127.0.0.1:5500/index.js"></script>';
        const response = new Response(scriptCode, {
          
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
  