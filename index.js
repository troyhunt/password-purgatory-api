addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json;charset=UTF-8',
  };

  const data = {
    message: 'Hello worker!',
  };

  const json = JSON.stringify(data, null, 2);

  return new Response(json, { headers });
}
