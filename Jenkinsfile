node {
        stage('Checkout SCM'){
                git branch: 'master', url: 'https://github.com/thinkperfect/SmartBid-Frontend.git'  
        }
        
        stage('Install node modules'){
            sh "npm install"
        }
        
        stage('Build'){
            sh "npm build"
        }
}
