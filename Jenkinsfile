pipeline {
  agent any
  environment {
    IMAGE_NAME = 'chat-app'
    CONTAINER_NAME = 'chatApp'
    TEST_SCRIPT = 'app.spec.js'
  }
  stages {
    stage('Build') {
      steps {
        echo 'Building the application...'
        sh 'docker build -d 5434:5432 -t ${IMAGE_NAME}'
      }
    }
    stage('Test') {
      steps {
        echo 'Testing the application...'
        sh 'node ${TEST_SCRIPT}'
      }
    }
    stage('Deploy') {
      steps {
        echo 'Deploying the application (locally)...'
        sh 'docker run -d --name ${CONTAINER_NAME} '
      }
    }
    stage('Monitor') {
      steps {
        echo 'Monitoring the application...'
        sh 'curl -f http://localhost:3000 || exit 1'
      }
    }
    stage('Rollback') {
      when {
        expression {
          return currentBuild.result == 'FAILURE'
        }
      }
      steps {
        echo 'Rolling back the application...'
        sh 'docker stop ${CONTAINER_NAME} || true'
      }
    }
  }
  post {
    always {
      echo 'Cleaning up...'
      sh 'docker stop ${CONTAINER_NAME} || true'
    }
    success {
      echo 'Pipeline completed successfully!'
    }
    failure {
      echo 'Pipeline failed. Check logs for more details.'
    }
  }
}

