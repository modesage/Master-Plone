# syntax=docker/dockerfile:1
FROM varnish:7.6

LABEL maintainer="tester <tester@testing.com>" \
      org.label-schema.name="training-varnish" \
      org.label-schema.description="Training Varnish image." \
      org.label-schema.vendor="tester"

COPY etc/varnish.vcl /etc/varnish/default.vcl
