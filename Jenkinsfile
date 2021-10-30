pipeline {
    agent { label 'master' }
    stages {
        stage('build') {
            steps {
                 sh 'cd FinanceAPI ' 
                 sh 'docker-compose up'
            }
        }
    }
}
