# Angular Gulp Seed

This project is setup with gulp

## Start gulp and launch app in browser

Run `gulp serve` to start gulp server and it will auto launch the application in your default browser.

## Build and environment variables

To generate build of your source code run `gulp` command. It will generate the build with development environment variables by default.

There are four environment variables is setup in dir. `env` root directory in json format.

- Development environment `dev.json`
- Quality assurance environment `qa.json`
- Preproduction environment `preprod.json`
- Production environment `prod.json`

* **serve:dist**
    This task will host dist directory generatered after build.


### To Generate build run following for respective environment

- for dev env |  **gulp build:dev**

- for qa env  | **gulp build:qa**

- for preprod env **gulp build:preprod**

- for prod env **gulp build:prod**


## Gulp Tasks
1. **styles**
    This task will compile all the scss files to css.

2. **lint:script**
    This task will lint all javascrpts files.

3. **bower**
    This task wiredep all the bower dependencies to index.html

4. **bower:test**
    This task wiredep all the bower dependencies to karma.conf.js

5. **watch**
    This task will look for any changes made in any of `.js, .scss, .html` files inside app and run associate task.

6. **serve**
    This task will host app directory and preview live.

7. **ngdocs**
    This is generate documentation of source code based on Application


## Testing

To test run `gulp test` will run the unit tests with karma once and exit.

To test run `gulp test:dev` watch for file changes and re-run tests on each change.
