/**
 * Tracks an event using Google Analytics' global site tag (gtag).
 *
 * Note: In dev mode, logs the event instead of sending it.
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (import.meta.env.DEV) {
    console.log('[Analytics Event]', name, params ?? {});
    return;
  }

  window.gtag?.('event', name, params);
}
