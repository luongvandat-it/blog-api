pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('blog-api-hub')
    }
    stages {
        stage('Clone stage') {
            steps {
                git branch: 'master', credentialsId: 'github', url: 'https://github.com/luongvandat-it/blog-api.git'
                }
            }
        stage('Build stage') {
            steps {
                withDockerRegistry(credentialsId: 'blog-api-hub', url: 'https://index.docker.io/v1/') {
                    sh label: '', script: 'docker build -t luongvandat/blog-api:v3 .'
                    sh label: '', script: 'docker push luongvandat/blog-api:v3'
                }
            }
        }
    }
}