pipeline {
    agent any
    environment {
        IMAGE_NAME = 'websocket-chat'
        DOCKER_PORT = '3000'
    }
    stages {
        // Stage 1: Build
        stage('Build') {
            steps {
                echo 'Building the Docker image...'
                script {
                    sh "docker build -t ${IMAGE_NAME} ."
                }
            }
        }

        // Stage 2: Test
        stage('Test') {
            steps {
                echo 'Running tests...'
                script {
                    sh 'node app.spec.js'  
                    sh 'node app.spec.js' 
                }
            }
        }

        // Stage 3: Deploy
        stage('Deploy') {
            steps {
                echo 'Deploying the application (locally)...'
                script {
                    sh "docker run -d -p ${DOCKER_PORT}:3000 ${IMAGE_NAME}"
                    sleep(5)
                    echo 'Verifying the application is running...'
                    sh 'curl -f http://localhost:${DOCKER_PORT} || exit 1'  
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment was successful!'
        }
        failure {
            echo 'Deployment failed! Rolling back...'
            script {
                sh 'docker stop websocket-chat || true'
                sh 'docker rm websocket-chat || true'
            }
        }
    }
}
