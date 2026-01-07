import {
  data,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Provider } from "~/components/ui/provider";
import LayoutBox from "./pages/layout";
import WalletContextProvider from "~/components/web3/WalletContextProvider";
import { Toaster } from "~/components/ui/toaster";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next/react";
import { supportedLngs } from "~/i18n";
import { LoadingOverlay } from "~/components/ui/loading-overlay";

import "./tailwind.css";
import { commitSession, getSession } from "./sessions";

import { configResponsive } from "ahooks";
import { screens } from "tailwind.config";
import { ReactNode } from "react";

export const screensNumbers = Object.entries(screens).reduce(
  (curr, [key, value]: any) => ((curr[key] = parseFloat(value)), curr),
  {}
);

configResponsive(screensNumbers);

let seoFiles = import.meta.glob("../public/config/seo/*.json", {
  eager: true,
}) as any;
seoFiles = Object.entries(seoFiles).reduce((acc, [key, value]: any) => {
  const keyWithoutPath = key
    .replace("../public/config/seo/", "")
    .replace(".json", "");
  acc[keyWithoutPath] = value.default;
  return acc;
}, {});

export const meta: MetaFunction = ({ params }) => {
  const seoFile = seoFiles[params.lang] || seoFiles["en"];
  return [
    { title: seoFile.title },
    { name: "description", content: seoFile.description },
    { name: "keywords", content: seoFile.keywords },
  ];
};

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preload",
    href: "/font/Figtree.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
    fetchPriority: "high",
    importance: "high",
    "cache-control": "public, max-age=31536000, immutable",
  },
  {
    rel: "preload",
    href: "/font/Figtree-Regular.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
    fetchPriority: "high",
    importance: "high",
    "cache-control": "public, max-age=31536000, immutable",
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
    media: "print",
    onLoad: "this.media='all'",
  },
];

export function Layout({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();

  return (
    <html lang={i18n.language} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
        <Meta />
        <Links />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M6DLT9P3');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M6DLT9P3"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export async function loader({ request, params }) {
  const session = await getSession(request.headers.get("Cookie"));
  const cookieLang = session.get("lang") || "en";
  const { lang } = params;

  const url = new URL(request.url);

  if (!lang || !supportedLngs.includes(lang)) {
    session.set("lang", "en");
    return redirect(`/${cookieLang}${url.pathname}`);
  } else {
    session.set("lang", lang);
  }

  return data(
    {
      i18n: {
        locale: lang,
      },
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}

export default function App() {
  const { i18n }: any = useLoaderData();

  useChangeLanguage(i18n.locale);

  return (
    <Provider>
      <WalletContextProvider>
        <LayoutBox>
          <LoadingOverlay />
          <Toaster />
          <Outlet />
        </LayoutBox>
      </WalletContextProvider>
    </Provider>
  );
}
