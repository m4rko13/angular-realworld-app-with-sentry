import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";

import { init } from "@sentry/angular-ivy";
import * as Sentry from "@sentry/angular-ivy";
import { Integrations } from "@sentry/tracing";
import { environment } from './environments/environment';

Sentry.init({
  dsn: environment.glitchTipDsn,
  autoSessionTracking: false,
  integrations: [
    // Registers and configures the Tracing integration,
    // which automatically instruments your application to monitor its
    // performance, including custom Angular routing instrumentation
    Sentry.browserTracingIntegration(),
    // Registers the Replay integration,
    // which automatically captures Session Replays
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
