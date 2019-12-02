node {
        stage('Checkout SCM'){
                git branch: 'master', credentialsId: 'fa2bcd20-6f2a-411c-a0fe-1f48a759c366', url: 'https://github.com/thinkperfect/SmartBid-Frontend.git'  
        }
        
        stage('Install node modules'){
            sh "npm install"
        }
        
        stage('Build'){
            sh "npm build"
        }
        stage('Test'){
            sh "npm test"
        }
}
