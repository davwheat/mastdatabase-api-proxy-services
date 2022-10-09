// Read the .env file.
import dotenv from 'dotenv';

dotenv.config();

// Require the framework
import Fastify from 'fastify';

// Require library to exit fastify process, gracefully (if possible)
import closeWithGrace from 'close-with-grace';

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
import appService from './app.js';

app.register(appService);

// delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace(
  { delay: parseInt(process.env.FASTIFY_CLOSE_GRACE_DELAY || '1000') || 500 },
  // @ts-ignore-next-line
  async function ({ signal, err, manual }) {
    if (err) {
      app.log.error(err);
    }
    await app.close();
  }
);

app.addHook('onClose', (instance, done) => {
  closeListeners.uninstall();
  done();
});

// Start listening.
app.listen({ port: parseInt(process.env.PORT || '3000') }, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
