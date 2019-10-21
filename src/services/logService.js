// import * as Sentry from '@sentry/browser';

function init() {
  // Sentry.init({dsn: "https://0fa953c719b8440ebe08f4f6b5c566eb@sentry.io/1784271"});
};

function log(error) {
  // Sentry.captureException(error);
  console.log(error);
};

export default {
  init,
  log
}