# Jimmmmy Resume

This is my resume, host on Google App Engine, written in [Pug](https://pugjs.org/api/getting-started.html), you can print it to paper or PDF file directly because it is optimized for printing, click [here](https://jimmmmy.com) to take a look!

## Development

```
$ npm run dev
```

## Develop flow

When you submit a pull request, it will auto deploy to Heroku's Pipeline of Review Apps, you can see the build result of whole website with an URL, then after the review of pull request, the Review Apps will be delete, and the `develop` branch will be deploy to Heroku's Pipeline of Staging with an URL.

If you merge anything to `master` branch, it will trigger two auto task:

1. It will deploy to Heroku's Pipeline of Production with an URL.
2. It will trigger Google Cloud Build, then build a docker image to Google Container Registry, after the build success, it will auto deploy to Google App Engine.
