pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = credentials('NETLIFY_TOKEN')
        NETLIFY_SITE_ID = 'c7cee1b2-95a3-4691-a09c-769785e98146'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Golden7design/Portfolio.git'
            }
        }

        stage('Install dependencies') {
            steps {
                echo 'Installing dependencies npm...'
                bat 'npm install'
            }
        }

        stage('Deploy to Netlify') {
            steps {
                bat 'npm install -g netlify-cli'
                bat 'netlify deploy --prod --dir=%WORKSPACE% --auth=%NETLIFY_AUTH_TOKEN% --site=%NETLIFY_SITE_ID%'
            }
}
    }

    post {
        success {
            echo '✅ Pipeline finished successfully !!'
        }
        failure {
            echo '❌ Pipeline failed. Check logs above.'
        }
    }
}
