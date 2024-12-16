# my-twitter

Pet project, clone of Twitter, to practice JS/TS + Svelte on both frontend and backend

If you would like to play with the app a little bit, the easiest way to run it 
locally is to run the app inside docker containers. Thus, as you may expect, 
docker must be installed on your machine. If this condition is met, you can 
proceed to commands below (or even the latter one, if, for some reason, you are
not interested in seeding DB).

If you are running the app for the first time and would like to populate DB with
some data, you may use such command:
```bash
docker compose --profile seed up --exit-code-from prisma-db-seed
```
Next, run containers. It runs DB and app containers, among the others.
```bash
docker compose --profile dev up
```

