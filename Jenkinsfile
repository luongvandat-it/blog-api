pipeline {
    agent any
    stages {
        stage('Clone stage') {
            steps {
                git branch: 'master', credentialsId: 'github', url: 'https://github.com/luongvandat-it/blog-api.git'
                }
            }
        stage('Build stage') {
            withDockerRegistry(credentialsId: 'blog-api-hub', url: 'https://index.docker.io/v1/') {
                sh 'docker build -t blog-api .'
                sh 'docker tag blog-api:latest luongvandat/blog-api:1.0.0'
                sh 'docker push luongvandat/blog-api:1.0.0'
            }
        }
    }
}