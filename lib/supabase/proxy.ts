import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
          Object.entries(headers).forEach(([key, value]) =>
            supabaseResponse.headers.set(key, value),
          );
        },
      },
    },
  );

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  const pathname = request.nextUrl.pathname;
  // const isAuthRoute = pathname.startsWith("/auth");

  // const isStaticAsset =
  //   pathname.startsWith("/_next") ||
  //   pathname.includes(".") || // ignora arquivos como .svg, .png, favicon.ico
  //   pathname.startsWith("/api");

  const AUTH_ROUTES = ["/login", "/register"];
  const isRaiz = pathname === "/";

  // const isProtected = PROTECTED_ROUTES.some((path) =>
  //   pathname.startsWith(path),
  // );

  // const isProtected = !isAuthRoute && !isStaticAsset;
  const isAuthRoutes = AUTH_ROUTES.some((path) => pathname.startsWith(path));

  if (isAuthRoutes && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!user && !isRaiz && !isAuthRoutes) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
