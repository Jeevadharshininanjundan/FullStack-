FROM node:22-alpine
WORKDIR /app
RUN apk update && apk add --no-cache \ 
    g++ \ 
    openjdk17 \ 
    python3 \ 
    py3-pip
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk17
ENV PATH="$JAVA_HOME/bin:$PATH"
COPY . .
RUN npm install
EXPOSE 8000
CMD ["node","index.js"]