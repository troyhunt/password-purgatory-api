addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const { searchParams } = new URL(request.url)
  let password = searchParams.get('password')
  let badPasswordMessage = 'Password looks fine, but you\'ll never see this message when we\'re done here 🙂';

  if(password === null) {
    badPasswordMessage = 'No password was provided';
  }
  else if(password.length < 8) {
    badPasswordMessage = 'Password must be at least 8 characters long';
  }
  else if(password.match(/\d+/g) === null) {
    badPasswordMessage = 'Password must contain at least 1 number';
  }
  else if(password.match('[A-Z]') === null) {
    badPasswordMessage = 'Password must contain at least 1 uppercase character';
  }
  else if(password.match('/Homer|Marge|Bart|Lisa|Maggie/g') === null) {
    badPasswordMessage = 'Password must contain at least 1 primary Simpsons family character';
  }
  else if([].concat(password.match(/[0-9]/g)).map(Number).reduce( (a, b) => a + b) % 3 !== 0) {
    badPasswordMessage = 'Password when stripped of non-numeric characters must be a number divisible by 3';
  }

  // To Do:
  // Password must contain at least 3 digits from the first 10 decimal places of pi
  // Password must contain at least 1 letter from the Greek alphabet
  // Password must contain... use your imagaination, PRs welcome!

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json;charset=UTF-8',
  };

  const data = { message: badPasswordMessage };

  const json = JSON.stringify(data, null, 2);

  return new Response(json, { headers });
}
