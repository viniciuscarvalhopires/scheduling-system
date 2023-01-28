FROM maven:latest as build
COPY src /app/src
COPY pom.xml /app
RUN mvn -f /app/pom.xml clean package -Dmaven.test.skip

ARG PROFILE
ARG ADDITIONAL_OPTS

ENV PROFILE=${PROFILE}
ENV ADDITIONAL_OPTS=${ADDITIONAL_OPTS}

FROM openjdk:latest
COPY --from=build /app/target/*.jar app.jar

ENTRYPOINT ["java","-jar", "app.jar", "--spring.profiles.active=${PROFILE}"]

EXPOSE 5005
EXPOSE 8080