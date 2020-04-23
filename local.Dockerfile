FROM cit-frontend-client:latest as builder
ARG REACT_APP_API_URL
ARG REACT_APP_API_PREFIX
ARG REACT_APP_ENV_NODE
ARG GENERATE_SOURCEMAP
RUN npm run build
FROM nginx:1.16-alpine
COPY --from=builder /usr/src/app/build/ /usr/share/nginx/html/build/
COPY ./nginx/canitrust.in.template /etc/nginx/conf.d/default.conf
