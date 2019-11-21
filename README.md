# thinkific - The API

Link to the app repo [https://github.com/hesambayat/thinkific-app](https://github.com/hesambayat/thinkific-app)

### Installation
```
git clone git@github.com:hesambayat/thinkific-api.git .
```
Ensure you have docker and prisma cli installed on your machine, and you se /config/*.env files,
```
PRISMA_ENDPOINT=http://localhost:4466
PRISMA_SECRET=XXXXXXXXXXXXXX
JWT_SECRET=XXXXXXXXXXXXXX
```
Then run:
```
npm install
cd prisma
npx env-cmd -f ../config/dev.env docker-compose up -d
prisma deploy -e ../config/dev.env
```
### Development
```
npm run dev
```

### Test
```
npm run test
```