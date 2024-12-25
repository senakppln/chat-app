pipeline {
    agent any
    environment {
        IMAGE_NAME = 'websocket-chat'
        IMAGE_TAG = 'latest'
        DOCKER_PORT = '3000'
    }
    stages {
        // Stage 1: Build
        stage('Build') {
            steps {
                echo 'Building the Docker image...'
                script {
                    // Docker image oluşturuluyor
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        // Stage 2: Test
        stage('Test') {
            steps {
                echo 'Running tests...'
                script {
                    // Testlerin çalıştırılması
                    sh 'node app.spec.js'  
                    sh 'node app.spec.js' // Buradaki komutlar testlerinizi çalıştıracak
                }
            }
        }

        // Stage 3: Deploy
        stage('Deploy') {
            steps {
                echo 'Deploying the application (locally)...'
                script {
                    // Docker container başlatılıyor
                    sh "docker run -d -p ${DOCKER_PORT}:3000 ${IMAGE_NAME}:${IMAGE_TAG}"
                    sleep(5)
                    echo 'Verifying the application is running...'
                    // Uygulamanın doğru şekilde çalışıp çalışmadığı kontrol ediliyor
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
                // Hata durumunda konteyner durduruluyor ve siliniyor
                sh 'docker stop websocket-chat || true'
                sh 'docker rm websocket-chat || true'
            }
        }
    }
}
