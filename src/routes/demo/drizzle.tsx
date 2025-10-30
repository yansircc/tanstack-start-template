import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { todos } from "@/db/schema";

const getTodos = createServerFn({
  method: "GET",
}).handler(
  async () =>
    await db.query.todos.findMany({
      orderBy: [desc(todos.createdAt)],
    })
);

const createTodo = createServerFn({
  method: "POST",
})
  .inputValidator((data: { title: string }) => data)
  .handler(async ({ data }) => {
    await db.insert(todos).values({ title: data.title });
    return { success: true };
  });

export const Route = createFileRoute("/demo/drizzle")({
  component: DemoDrizzle,
  loader: async () => await getTodos(),
});

function DemoDrizzle() {
  const router = useRouter();
  const todosList = Route.useLoaderData();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;

    if (!title) {
      return;
    }

    try {
      await createTodo({ data: { title } });
      router.invalidate();
      (e.target as HTMLFormElement).reset();
    } catch (_error) {
      // Failed to create todo
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center p-4 text-white"
      style={{
        background:
          "linear-gradient(135deg, #0c1a2b 0%, #1a2332 50%, #16202e 100%)",
      }}
    >
      <div
        className="w-full max-w-2xl rounded-xl border border-white/10 p-8 shadow-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(22, 32, 46, 0.95) 0%, rgba(12, 26, 43, 0.95) 100%)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div
          className="mb-8 flex items-center justify-center gap-4 rounded-lg p-4"
          style={{
            background:
              "linear-gradient(90deg, rgba(93, 103, 227, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
            border: "1px solid rgba(93, 103, 227, 0.2)",
          }}
        >
          <div className="group relative">
            <div className="-inset-2 absolute rounded-lg bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-60 blur-lg transition duration-500 group-hover:opacity-100" />
            <div className="relative rounded-lg bg-linear-to-br from-indigo-600 to-purple-600 p-3">
              <img
                alt="Drizzle Logo"
                className="h-8 w-8 transform transition-transform duration-300 group-hover:scale-110"
                height={32}
                src="/drizzle.svg"
                width={32}
              />
            </div>
          </div>
          <h1 className="bg-linear-to-r from-indigo-300 via-purple-300 to-indigo-300 bg-clip-text font-bold text-3xl text-transparent">
            Drizzle Database Demo
          </h1>
        </div>

        <h2 className="mb-4 font-bold text-2xl text-indigo-200">Todos</h2>

        <ul className="mb-6 space-y-3">
          {Array.isArray(todosList) &&
            todosList.map((todo: { id: number; title: string }) => (
              <li
                className="group cursor-pointer rounded-lg border p-4 shadow-md transition-all hover:scale-[1.02]"
                key={todo.id}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(93, 103, 227, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)",
                  borderColor: "rgba(93, 103, 227, 0.3)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg text-white transition-colors group-hover:text-indigo-200">
                    {todo.title}
                  </span>
                  <span className="text-indigo-300/70 text-xs">#{todo.id}</span>
                </div>
              </li>
            ))}
          {(!Array.isArray(todosList) || todosList.length === 0) && (
            <li className="py-8 text-center text-indigo-300/70">
              No todos yet. Create one below!
            </li>
          )}
        </ul>

        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input
            className="flex-1 rounded-lg border px-4 py-3 text-white placeholder-indigo-300/50 transition-all focus:outline-none focus:ring-2"
            name="title"
            placeholder="Add a new todo..."
            style={{
              background: "rgba(93, 103, 227, 0.1)",
              borderColor: "rgba(93, 103, 227, 0.3)",
            }}
            type="text"
          />
          <button
            className="whitespace-nowrap rounded-lg px-6 py-3 font-semibold shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
            style={{
              background: "linear-gradient(135deg, #5d67e3 0%, #8b5cf6 100%)",
              color: "white",
            }}
            type="submit"
          >
            Add Todo
          </button>
        </form>

        <div
          className="mt-8 rounded-lg border p-6"
          style={{
            background: "rgba(93, 103, 227, 0.05)",
            borderColor: "rgba(93, 103, 227, 0.2)",
          }}
        >
          <h3 className="mb-2 font-semibold text-indigo-200 text-lg">
            Powered by Drizzle ORM
          </h3>
          <p className="mb-4 text-indigo-300/80 text-sm">
            Next-generation ORM for Node.js & TypeScript with PostgreSQL
          </p>
          <div className="space-y-2 text-sm">
            <p className="font-medium text-indigo-200">Setup Instructions:</p>
            <ol className="list-inside list-decimal space-y-2 text-indigo-300/80">
              <li>
                Configure your{" "}
                <code className="rounded bg-black/30 px-2 py-1 text-purple-300">
                  DATABASE_URL
                </code>{" "}
                in .env.local
              </li>
              <li>
                Run:{" "}
                <code className="rounded bg-black/30 px-2 py-1 text-purple-300">
                  npx drizzle-kit generate
                </code>
              </li>
              <li>
                Run:{" "}
                <code className="rounded bg-black/30 px-2 py-1 text-purple-300">
                  npx drizzle-kit migrate
                </code>
              </li>
              <li>
                Optional:{" "}
                <code className="rounded bg-black/30 px-2 py-1 text-purple-300">
                  npx drizzle-kit studio
                </code>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
