import wretch from 'wretch'

const api = wretch(`https://cat-fact.herokuapp.com`)

async function main() {
  // GET /facts/random
  console.log(await api.url(`/facts/random`).get().json())
}

main()
