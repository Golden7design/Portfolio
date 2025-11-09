pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo "This Build Stage"
            }
        }

        stage('Test') {
            steps {
                echo 'Test stage'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying to Netlify...'
                }
        }
    }
}
