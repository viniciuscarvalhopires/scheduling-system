FROM maven:latest as build
COPY /src /app/src
COPY pom.xml /app
RUN mvn -f /app/pom.xml clean package -Dmaven.test.skip

ARG PROFILE
ARG ADDITIONAL_OPTS

ENV PROFILE=${PROFILE}
ENV ADDITIONAL_OPTS=${ADDITIONAL_OPTS}

WORKDIR /app

FROM openjdk:latest
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
EXPOSE 5005

ENTRYPOINT ["java","-jar", "app.jar", "--spring.profiles.active=${PROFILE}"]
