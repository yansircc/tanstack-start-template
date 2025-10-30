import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { env } from 'cloudflare:workers'

export const Route = createFileRoute('/load-vars')({
  component: RouteComponent,
  loader: () => getData()
})

const getData = createServerFn().handler(() => {
  return env.FOO
});

function RouteComponent() {
  const data = Route.useLoaderData()
  return <div>Load {data} from backend.</div>
}
