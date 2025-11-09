pipeline {
    agent any

    environment {
        NETLIFY_AUTH_TOKEN = credentials('NETLIFY_TOKEN')
        NETLIFY_SITE_ID = 'c7cee1b2-95a3-4691-a09c-769785e98146'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Golden7design/Portfolio.git'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build project') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Netlify') {
            steps {
                // Option 1 : installation globale
                sh 'npm install -g netlify-cli'
                sh 'netlify deploy --prod --dir=build --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID'

                // Option 2 : sans installation globale (recommandé si Jenkins local)
                // sh 'npx netlify-cli deploy --prod --dir=build --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID'
            }
        }
    }
}
