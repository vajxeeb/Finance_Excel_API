pipeline {
    agent { label 'master' }
    stages {
        stage('build') {
            steps {
                 sh 'http://49.0.198.122:8088/job/FinanceAPI/8/execution/node/3/ws/docker-compose up'
            }
        }
    }
}
