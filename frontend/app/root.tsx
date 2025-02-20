import {
  isRouteErrorResponse,
  Links,
  Meta,
  Navigate,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useNavigate,
  useRouteError,
  useRouteLoaderData,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./styles/tailwind.css";
import api from "./network/api";
import AuthenticatedLayout from "./components/Layouts/AuthenticatedLayout";
import requestGetUser from "./network/users";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export type RootLoader = typeof loader;


export async function loader() {
  const user = await requestGetUser();

  return {
    user,
  };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData<typeof loader>('root');

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My Spaces</title>
        <Meta />
        <Links />
      </head>
      <body>
        {data?.user ?
          <AuthenticatedLayout user={data.user}>
            {children}
          </AuthenticatedLayout>
          : children
        }
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const data = useRouteLoaderData<typeof loader>('root');

  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  if (errorStatus == 404) {
    return <Navigate to={'/404'} replace />
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Oops</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">{errorStatus}</h2>
        {errorMessage && (
          <fieldset className="border border-gray-200 rounded-md p-4">
            <pre className="text-sm text-gray-600 whitespace-pre-wrap">{errorMessage}</pre>
          </fieldset>
        )}
      </div>
    </div>
  )
}