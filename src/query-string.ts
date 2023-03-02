import wretch from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'

const api = wretch(`https://cat-fact.herokuapp.com`).addon(QueryStringAddon)

async function main() {
  // GET /facts/random?animal_type=dog
  console.log(
    await api
      .url(`/facts/random`)
      .query({
        animal_type: `dog`,
      })
      .get()
      .json(),
  )
}

main()
