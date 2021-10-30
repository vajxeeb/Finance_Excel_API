pipeline {
    agent { label 'master' }
    stages {
        stage('build') {
            steps {
                 sh  'ls' 
                 sh 'docker-compose up'
            }
        }
    }
}
