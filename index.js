
const siteName = window.location.pathname.substr(1);

export async function onRequest(context) {
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

