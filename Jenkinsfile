pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = credentials('NETLIFY_TOKEN')   // Credential de type "Secret Text"
        NETLIFY_SITE_ID = credentials('NETLIFY_SITE_ID')    // Credential de type "Secret Text"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Golden7design/Portfolio.git'
            }
        }

        stage('Deploy to Netlify') {
            steps {
                echo 'Deploying to Netlify...'
                bat 'netlify deploy --prod --dir=%WORKSPACE% --auth=%NETLIFY_AUTH_TOKEN% --site=%NETLIFY_SITE_ID%'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline finished successfully !!'
        }
        failure {
            echo '❌ Pipeline failed.Check logs above.'
        }
    }
}
