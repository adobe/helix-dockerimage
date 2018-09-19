FROM gitpod/workspace-full

USER root
RUN apt-get update --fix-missing \
    && apt-get install -y \
      libssl-dev libcurl4-openssl-dev \
    && apt-get clean && rm -rf /var/cache/apt/* && rm -rf /var/lib/apt/lists/* && rm -rf /tmp/*

USER gitpod
RUN echo $PATH
RUN /bin/bash -l -c "\
       source /home/gitpod/.nvm/nvm.sh \
    && nvm use default \
    && npm install -g @adobe/helix-cli"