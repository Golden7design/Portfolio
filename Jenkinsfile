pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = credentials('NETLIFY_TOKEN') // Token stocké dans Jenkins
        NETLIFY_SITE_ID = 'c7cee1b2-95a3-4691-a09c-769785e98146'
    }

    stages {
        stage('Checkout') {
            steps {
                // Git via SSH avec credentials créées
                git branch: 'main',
                    url: 'https://github.com/Golden7design/Portfolio.git'
            }
        }

        stage('Install dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                sh 'npm install'
            }
        }

        stage('Build project') {
            steps {
                echo 'Building React project...'
                sh 'npm run build'
            }
        }

        stage('Deploy to Netlify') {
            steps {
                echo 'Deploying to Netlify...'

                // Option 1 : utiliser npx (pas besoin d'installation globale)
                sh 'npx netlify-cli deploy --prod --dir=build --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID'
                
                // Option 2 : installation globale si tu préfères
                // sh 'npm install -g netlify-cli'
                // sh 'netlify deploy --prod --dir=build --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID'
            }
        }
    }

    post {
        success {
            echo 'Pipeline finished successfully!'
        }
        failure {
            echo 'Pipeline failed. Check logs above.'
        }
    }
}
