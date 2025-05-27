// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs"

if (process.env.SENTRY_DISABLED === "true") {
  console.log("Sentry is disabled in development mode")
} else {
  Sentry.init({
    dsn: "https://f3737ca8970891b6323c2b1410f64597@o4508913811718144.ingest.us.sentry.io/4509394785468416",

    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  })
}
