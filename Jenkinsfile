pipeline {
    agent any
    stages {
        // Stage 1: Build
        stage('Build') {
            steps {
                echo 'Building the application...'
                sh 'docker build -t websocket-chat .'
            }
        }

        // Stage 2: Test
        stage('Test') {
            steps {
                echo 'Testing the application...'
                sh 'node app.spec.js'  
                sh 'node app.spec.js'   
            }
        }

        // Stage 3: Deploy
        stage('Deploy') {
            steps {
                echo 'Deploying the application (locally)...'
                sh 'docker run -d -p 8080:80 websocket-chat'
                sleep(5)
                echo 'Verifying the application is running...'
                sh 'curl -f http://localhost:8080 || exit 1'  
            }
        }
    }

    post {
        success {
            echo 'Deployment was successful!'
        }
        failure {
            echo 'Deployment failed! Rolling back...'
            sh 'docker stop chat-app || true'
            sh 'docker rm chat-app || true'
        }
    }
}