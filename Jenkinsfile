node {
    checkout scm

    docker.withRegistry('49.0.198.122:5001', 'Jenkins-Docker') {

        def customImage = docker.build("hello-world:${env.1.0.0}")

        /* Push the container to the custom Registry */
        customImage.push()
    }
}
