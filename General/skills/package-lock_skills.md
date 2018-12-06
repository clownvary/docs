# NPM package-lock

## issues

> From npm v5.x if you run `npm install` will generate a package-lock.json file

- case1: have lock file

  > package.json

  > package-lock.json

  run `npm install`  [see this](https://stackoverflow.com/a/53594050/8294750)

- case2: no lock file

   > package.json

  > ~~package-lock.json~~

  run `npm install`, package-lock will be generated then same with case1.

- case3: update

  we update a lib in package.json manually, then run `npm install`, it may rewrite lock file except update lib correspondingly.

## solution

1. if we do not need package-lock feature, we need add file `.npmrc` and add line `package-lock = false`

2. case3 soluton

    - a. run `npm install libA@x.x.x` manually will only update libA in lock file.
    - b. do not use prefix in package.json ,like `^1.2.1` or `~1.2.1`, then you can run `npm install`.

3. if you need install dependency by lock file , you need to run `npm ci` not `npm install`.
