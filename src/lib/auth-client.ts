import { adminClient, magicLinkClient, phoneNumberClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // eslint-disable-next-line n/no-process-env
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL, // the base url of your auth server
    plugins: [
        adminClient(),
        phoneNumberClient(),
        magicLinkClient(),
    ]
});