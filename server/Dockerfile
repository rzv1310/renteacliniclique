FROM node:24-alpine AS build

WORKDIR /app
COPY package.json tsconfig.json /app/
COPY src /app/src
COPY assets /app/assets
RUN npm install && npm run build

FROM node:24-alpine

WORKDIR /app
COPY package.json /app/
RUN npm install --omit=dev
COPY --from=build /app/dist /app/dist
COPY --from=build /app/assets /app/assets

ENV NODE_ENV=production
ENV PORT=8787
ENV HOST=0.0.0.0

EXPOSE 8787

CMD ["node", "dist/index.js"]
