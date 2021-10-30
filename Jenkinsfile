pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'npm i -D jest-sonar-reporter'
                sh 'npm install --save-dev jest'
                sh 'npm test -- --coverage'
             }
        }
    }
    post {
        always {
            sh 'sonar-scanner \
  -Dsonar.projectKey=JSAPI \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://49.0.198.122:9000 \
  -Dsonar.login=93b04ee665db3f0c6b1b8ccb9881bf715ceb03ef'
        }
    
    }
}
