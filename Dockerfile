FROM ubuntu:18.04

# ENV TERM xterm
# EXPOSE 5000
# EXPOSE 3000

RUN mkdir -p /var/log/supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN mkdir -p /home/ctc_web
COPY ctc_web/public /home/ctc_web/public/
COPY ctc_web/src /home/ctc_web/src/
COPY ctc_web/*.json /home/ctc_web/

RUN mkdir -p /home/ctc_server
COPY ctc_server /home/ctc_server/

COPY *.sh /home/
WORKDIR "/home/"

RUN chmod +x ctc_server/check_fresh_install.sh
RUN ./setup_server.sh

RUN npm install --prefix ctc_web

CMD [ "/usr/bin/supervisord" ]


