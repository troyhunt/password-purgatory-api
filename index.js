addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const data = {
    message: 'Hello worker!',
  };

  const json = JSON.stringify(data, null, 2);

  return new Response(json, {
    headers: { 'content-type': 'application/json;charset=UTF-8' },
  })
}
