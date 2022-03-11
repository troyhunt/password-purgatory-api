addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const { searchParams } = new URL(request.url)
  let password = searchParams.get('password')
  let badPasswordMessage =
    "Password looks fine, but you'll never see this message when we're done here 🙂"

  // The code below makes extensive use of JavaScript regular expressions.
  // See the documentation here:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

  // TODO: Add a "infuriationLevel" property
  const checks = [
    {
      passwordIsInvalid: password =>
        password.match(/Homer|Marge|Bart|Lisa|Maggie/) === null,
      message:
        'Password must contain at least 1 primary Simpsons family character',
    },
    {
      passwordIsInvalid: password => password.match(/[ÅåÄäÖöÆæØø]/) === null,
      message: 'Password must contain at least 1 Nordic character',
    },
    {
      passwordIsInvalid: password =>
        password.match(/[\u0370-\u03ff\u1f00-\u1fff]/) === null,
      message: 'Password must contain at least 1 Greek character',
    },
    {
      passwordIsInvalid: password =>
        password.match(/Peter|Lois|Chris|Meg|Brian|Stewie/) === null,
      message: 'Password must contain at least 1 primary Griffin family character',
    },
    {
      passwordIsInvalid: password => password.match(
        /:‑\)|:\)|:\-\]|:\]|:>|:\-\}|:\}|:o\)\)|:\^\)|=\]|=\)|:\]|:\->|:>|8\-\)|:\-\}|:\}|:o\)|:\^\)|=\]|=\)|:‑D|:D|B\^D|:‑\(|:\(|:‑<|:<|:‑\[|:\[|:\-\|\||>:\[|:\{|:\(|;\(|:\'‑\(|:\'\(|:=\(|:\'‑\)|:\'\)|:"D|:‑O|:O|:‑o|:o|:\-0|>:O|>:3|;‑\)|;\)|;‑\]|;\^\)|:‑P|:\-\/|:\/|:‑\.|>:|>:\/|:|:‑\||:\||>:‑\)|>:\)|\}:‑\)|>;‑\)|>;\)|>:3|\|;‑\)|:‑J|<:‑\||~:>/,
      ) === null,
      message: 'Password must contain at least one emoticon'
    },
    {
      passwordIsInvalid: password =>
        []
          .concat(password.match(/[0-9]/g))
          .map(Number)
          .reduce((a, b) => a + b) %
          3 !==
        0,
      message:
        'Password when stripped of non-numeric characters must be a number divisible by 3',
    },
    {
      passwordIsInvalid: password => password.match(/\d{5}(-\d{4})?/) === null,
      message: 'Password must contain a United States zip code',
    },
    {
      passwordIsInvalid: password => password.match(/[ÄÜÖẞ]/) === null,
      message: 'Password must contain at least one upper case German Umlaut',
    },
    {
      passwordIsInvalid: password => password.match(/dog$/) === null,
      message: 'Password must end with dog',
    },
    {
      passwordIsInvalid: password => password.match(/^cat/) === null,
      message: 'Password must start with cat',
    },
    {
      passwordIsInvalid: password =>
        password.match(
          /Luna|Deimos|Phobos|Amalthea|Callisto|Europa|Ganymede|Io|Dione|Enceladus|Hyperion|Iapetus|Mimas|Phoebe|Rhea|Tethys|Titan|Ariel|Miranda|Oberon|Titania|Umbriel|Nereid|Triton|Charon|Himalia|Carme|Ananke|Adrastea|Elara|Adrastea|Elara|Epimetheus|Callirrhoe|Kalyke|Thebe|Methone|Kiviuq|Ijiraq|Paaliaq|Albiorix|Erriapus|Pallene|Polydeuces|Bestla|Daphnis|Despina|Puck|Carpo|Pasiphae|Themisto|Cyllene|Isonoe|Harpalyke|Hermippe|Iocaste|Chaldene|Euporie/,
        ) === null,
      message:
        'Password must contain at least one named solarian planetary satellite',
    },
  ]

  if (password === null) {
    badPasswordMessage = 'No password was provided'
  } 
  else if(password.length < 8) {
    badPasswordMessage = 'Password must be at least 8 characters long'
  }
  else if(password.match(/\d+/) === null) {
    badPasswordMessage = 'Password must contain at least 1 number'
  }
  else if(password.match(/[A-Z]/) === null) {
    badPasswordMessage = 'Password must contain at least 1 uppercase character'
  }
  else if(password.match(/[a-z]/) === null) {
    badPasswordMessage = 'Password must contain at least 1 lowercase character'
  } else {
    // Filter down to checks that are failing.
    const validChecks = checks.filter(check =>
      check.passwordIsInvalid(password),
    )
    // Randomly choose one.
    // TODO: Make this consider the "infuriationLevel" property
    badPasswordMessage =
      validChecks[Math.floor(Math.random() * validChecks.length)].message
  }

  // To Do:
  // Password must contain at least 3 digits from the first 10 decimal places of pi
  // Password must contain at least 1 letter from the Greek alphabet
  // Password must contain a dictionary word, spelled backwards
  // Password must contain... use your imagaination, PRs welcome!

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json;charset=UTF-8',
  }

  const data = { message: badPasswordMessage }

  const json = JSON.stringify(data, null, 2)

  return new Response(json, { headers })
}
