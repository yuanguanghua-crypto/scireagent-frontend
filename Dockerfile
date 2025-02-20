FROM nginx:1.16
RUN mkdir -pv /opt/jaws/web3.0 && mkdir -pv /opt/ops && mkdir /log/middle/nginx -pv
ADD dist/* /opt/jaws/web/
COPY dist/static /opt/jaws/web/static
COPY nginx.conf /etc/nginx/
COPY default.conf /etc/nginx/conf.d/
RUN ls -l /opt/jaws/web && ls -l /opt/jaws/web/static
VOLUME ["/opt/ops"]
ENTRYPOINT ["nginx", "-g", "daemon off;"]