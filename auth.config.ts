import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login', 
    },
    //identify is user can access a certain route, using auth(user session) and request
    callbacks: {
        authorized({auth, request : {nextUrl}}){
            const isLoggedIn = !!auth?.user;
            const isOnDash = nextUrl.pathname.startsWith('/dashboard');
            if(isOnDash) {
                if(isLoggedIn) return true;
                return false;
            }else if (isLoggedIn){
                return Response.redirect(new URL('/dashboard', nextUrl))
            }
            return true
        }
    },
    providers: [],//login providers
} satisfies NextAuthConfig;