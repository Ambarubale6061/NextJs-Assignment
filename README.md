# NextJs-Assignment

This is a small Next.js project demonstrating multiple rendering strategies:

- Home page: SSG (getStaticProps)
- Product detail: ISR (getStaticPaths + getStaticProps with `revalidate`)
- Dashboard: SSR (getServerSideProps)
- Admin: Client-side fetch to API routes

## Run locally

1. Install dependencies:
   npm install
2. Copy env example:
   cp .env.example .env.local
   and set `API_KEY`
3. Run dev server:
   npm run dev
4. Open http://localhost:3000
