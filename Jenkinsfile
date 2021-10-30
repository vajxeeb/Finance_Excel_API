pipeline {
    agent { label 'master' }
    stages {
        stage('build') {
            steps {
                 sh  'docker image ls' 
                 sh 'docker-compose up'
            }
        }
    }
}
