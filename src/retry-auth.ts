import { mergeDeepRight } from 'ramda'
import wretch from 'wretch'
import QueryStringAddon from 'wretch/addons/queryString'
import { retry } from 'wretch/middlewares/retry'

const api = wretch(`https://cat-fact.herokuapp.com`)
  .addon(QueryStringAddon)
  .middlewares([
    retry({
      until: (response) => Boolean(response && response.status !== 401),
      onRetry: ({ options }) => {
        return {
          options: mergeDeepRight(options, {
            headers: {
              Authorization: `Bearer <token>`,
            },
          }),
        }
      },
    }),
  ])

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
