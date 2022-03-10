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
  else if(password.match('[a-z]') === null) {
    badPasswordMessage = 'Password must contain at least 1 lowercase character';
  }
  else if(password.match('/Homer|Marge|Bart|Lisa|Maggie/g') === null) {
    badPasswordMessage = 'Password must contain at least 1 primary Simpsons family character';
  }
  else if(password.match(/[ÅåÄäÖöÆæØø]/g) === null) {
    badPasswordMessage = 'Password must contain at least 1 Nordic character';
  }
  else if(password.match(/[\u0370-\u03ff\u1f00-\u1fff]/g) === null) {
    badPasswordMessage = 'Password must contain at least 1 Greek character';
  }
  else if(password.match('/Peter|Lois|Chris|Meg|Brian|Stewie/g') !== null) {
    badPasswordMessage = 'Password must not contain any primary Griffin family character';
  }
  else if(password.match('/:‑\)|:\)|:\-\]|:\]|:>|:\-\}|:\}|:o\)\)|:\^\)|=\]|=\)|:\]|:\->|:>|8\-\)|:\-\}|:\}|:o\)|:\^\)|=\]|=\)|:‑D|:D|B\^D|:‑\(|:\(|:‑<|:<|:‑\[|:\[|:\-\|\||>:\[|:\{|:\(|;\(|:\'‑\(|:\'\(|:=\(|:\'‑\)|:\'\)|:"D|:‑O|:O|:‑o|:o|:\-0|>:O|>:3|;‑\)|;\)|;‑\]|;\^\)|:‑P|:\-\/|:\/|:‑\.|>:|>:\/|:|:‑\||:\||>:‑\)|>:\)|\}:‑\)|>;‑\)|>;\)|>:3|\|;‑\)|:‑J|<:‑\||~:>/g') === null) {
    badPasswordMessage = 'Password must contain at least one emoticon';
  }
  else if([].concat(password.match(/[0-9]/g)).map(Number).reduce( (a, b) => a + b) % 3 !== 0) {
    badPasswordMessage = 'Password when stripped of non-numeric characters must be a number divisible by 3';
  }
  else if(password.match('\d{5}(-\d{4})?') === null) {
    badPasswordMessage = 'Password must contain a United States zip code';
  }
  else if(password.match(/[ÄÜÖẞ]/g) === null) {
    badPasswordMessage = 'Password must contain at leat one upper case German Umlaut';
  }
  else if(password.match('dog$') === null) {
    badPasswordMessage = 'Password must end with dog';
  }
  else if(password.match('^cat') === null) {
    badPasswordMessage = 'Password must start with cat';
  }
  else if (password.match('/Luna|Deimos|Phobos|Amalthea|Callisto|Europa|Ganymede|Io|Dione|Enceladus|Hyperion|Iapetus|Mimas|Phoebe|Rhea|Tethys|Titan|Ariel|Miranda|Oberon|Titania|Umbriel|Nereid|Triton|Charon|Himalia|Carme|Ananke|Adrastea|Elara|Adrastea|Elara|Epimetheus|Callirrhoe|Kalyke|Thebe|Methone|Kiviuq|Ijiraq|Paaliaq|Albiorix|Erriapus|Pallene|Polydeuces|Bestla|Daphnis|Despina|Puck|Carpo|Pasiphae|Themisto|Cyllene|Isonoe|Harpalyke|Hermippe|Iocaste|Chaldene|Euporie/g') === null) {
    badPasswordMessage = 'Password must contain at least one named solarian planetary satellite';

  }

  // To Do:
  // Password must contain at least 3 digits from the first 10 decimal places of pi
  // Password must contain at least 1 letter from the Greek alphabet
  // Password must contain a dictionary word, spelled backwards
  // Password must contain... use your imagaination, PRs welcome!

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json;charset=UTF-8',
  };

  const data = { message: badPasswordMessage };

  const json = JSON.stringify(data, null, 2);

  return new Response(json, { headers });
}
