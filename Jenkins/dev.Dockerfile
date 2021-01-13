FROM docker.pkg.github.com/canitrust/frontend-client/frontend-client:devel as builder
FROM nginx:1.16-alpine
COPY --from=builder /usr/src/app/build/ /usr/share/nginx/html/build/
COPY ./nginx/canitrust.in.template /etc/nginx/conf.d/default.conf
