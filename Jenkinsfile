pipeline {
    agent any;
    stages {
        stage('build') {
            steps {
                 sh 'docker image ls'
                 docker 'push 49.0.198.122:5001/hello-world'
                 
             }
        }
    }
}
