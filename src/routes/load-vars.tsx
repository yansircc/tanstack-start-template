import { env } from "cloudflare:workers";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/load-vars")({
  component: RouteComponent,
  loader: () => getData(),
});

const getData = createServerFn().handler(() => env.FOO);

function RouteComponent() {
  const data = Route.useLoaderData();
  return <div>Load {data} from backend.</div>;
}
