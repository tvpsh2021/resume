# Resume

This is my resume, host on Google App Engine, written in [Pug](https://pugjs.org/api/getting-started.html) and Node.js, you can print it out or save as PDF file directly, it's optimized for printing, click [here](https://jimmmmy.com) to take a look!

## CI flow

- Commit to repository origin with `master` branch, this will trigger Google Cloud Build and deploy to Google App Engine with default service

## Development

```bash
$ yarn install
$ yarn run dev
```

## Deploy

```bash
$ gcloud app deploy app.yaml
```
