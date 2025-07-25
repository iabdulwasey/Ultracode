FROM gitpod/openvscode-server:latest

USER root

# Install Node.js 18 and essential tools
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    python3 \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g pnpm yarn \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install VS Code extensions for React development
USER openvscode-server
ENV OPENVSCODE_SERVER_ROOT="/home/.openvscode-server"
ENV OPENVSCODE="${OPENVSCODE_SERVER_ROOT}/bin/openvscode-server"

# Install essential extensions
RUN ${OPENVSCODE} --install-extension dbaeumer.vscode-eslint \
    && ${OPENVSCODE} --install-extension esbenp.prettier-vscode \
    && ${OPENVSCODE} --install-extension dsznajder.es7-react-js-snippets \
    && ${OPENVSCODE} --install-extension bradlc.vscode-tailwindcss \
    && ${OPENVSCODE} --install-extension formulahendry.auto-rename-tag \
    && ${OPENVSCODE} --install-extension formulahendry.auto-close-tag \
    && ${OPENVSCODE} --install-extension christian-kohler.path-intellisense \
    && ${OPENVSCODE} --install-extension PKief.material-icon-theme \
    && ${OPENVSCODE} --install-extension zhuangtongfa.material-theme

# Set up workspace
WORKDIR /home/workspace

# Expose the port
EXPOSE 3000

# Start OpenVSCode Server
ENTRYPOINT [ "/home/.openvscode-server/bin/openvscode-server", "--host", "0.0.0.0", "--port", "3000" ]