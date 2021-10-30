pipeline {
    agent { label 'master' }
    stages {
        stage('build') {
            steps {
                 sh  'docker image ls' 
                 sh 'docker tag hello-world 49.0.198.122:5001/hello-world:latest'
                 sh 'docker push hello-world 49.0.198.122:5001/hello-world:latest'
            }
        }
    }
}
