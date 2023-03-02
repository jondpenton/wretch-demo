import { evolve } from 'ramda'
import wretch from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'
import { retry } from 'wretch/middlewares/retry'

const api = wretch(`https://cat-fact.herokuapp.com`)
  .addon(QueryStringAddon)
  .middlewares([
    retry({
      until: async (response, _error) => {
        if (!response?.ok) {
          return false
        }

        const data = await response.clone().json()
        const verified = Boolean(data?.status?.verified)

        return verified
      },
    }),
  ])
  .resolve((chain) =>
    chain.json<Record<string, unknown>>().then(
      evolve({
        createdAt: (str: string) => new Date(str).getTime(),
        updatedAt: (str: string) => new Date(str).getTime(),
      }),
    ),
  )

async function main() {
  // GET /facts/random?animal_type=dog
  console.log(
    await api
      .url(`/facts/random`)
      .query({
        animal_type: `dog`,
      })
      .get(),
  )
}

main()
