FROM cit-frontend-client:latest as builder
FROM aws-cli-docker:latest
COPY --from=builder /usr/src/app/build/ /s3/