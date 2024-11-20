FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npx next build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/package.json /app/package-lock.json /app/
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/pages /app/pages
COPY --from=builder /app/node_modules /app/node_modules
EXPOSE 3000
CMD ["npx", "next", "start"]
