node {
    checkout scm

    docker.withRegistry('49.0.198.122:5001/v2', 'Jenkins-Docker') {

        def customImage = docker.build("hello-world:${env.BUILD_ID}")

        /* Push the container to the custom Registry */
        customImage.push()
    }
}
