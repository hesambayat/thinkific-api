# thinkific - The API

### Instalation
```
git clone git@github.com:hesambayat/thinkific-api.git .
```
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