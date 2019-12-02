node {
        tools {nodejs "node"}

        environment {
                CHROME_BIN = '/bin/google-chrome'
        }
        
        stage('Checkout SCM'){
                git branch: 'devBuild', credentialsId: 'fa2bcd20-6f2a-411c-a0fe-1f48a759c366', url: 'https://github.com/thinkperfect/SmartBid-Frontend.git'  
        }
        
        stage('Install node modules'){
            sh "npm install"
            sh "npm audit fix"    
        }
        
        stage('Build'){
            sh "npm run-script build"
        }
        
        stage('Test'){
            sh "ng run-script test"
        }
}
