FROM openjdk:latest
EXPOSE 8089
ARG JAR_FILE=target/snippet-tree-backend-0.0.1-SNAPSHOT-jar-with-dependencies.jar
ADD ${JAR_FILE} app.jar
ENTRYPOINT ["java","-cp","app.jar", "com.miguelbarrios.snippettree.SnippetTreeBackendApplication"]