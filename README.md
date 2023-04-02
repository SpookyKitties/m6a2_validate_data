# Instructions

To simplify matters, I have create two scripts that will handle everything needed to run this assignment. For windows there is a "run.cmd" file that run "npm install", do any necessary compilation, and start the express server with nodemon. If for some reason this does not work, run the following commands:

```

npm i

sass src/styles/styles.scss public/styles/styles.css

nodemon src/app.ts

```

For mac/linux/unix, there is a run.sh file that will handle the same task. As by default the terminal will not execute shell scripts, the following must be done:

1. cd to project source
2. Run `chmod u+x run.sh`
3. run `./run.sh`

The commands mentioned before this will likely be an easier option.

Now, to view the project, open up localhost:3000/bankAccount [Home Page](localhost:3000/bankAcccount). This links to a list of all current bank accounts. The rest of the guide will be the provided video.