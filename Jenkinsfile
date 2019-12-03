pipeline {
        
        agent any

        environment {
                CHROME_BIN = '/bin/google-chrome'
        }
        
        stages {
             stage('Checkout SCM branch devBuild'){
                steps{
                        git branch: 'devBuild', credentialsId: 'fa2bcd20-6f2a-411c-a0fe-1f48a759c366', url: 'https://github.com/thinkperfect/SmartBid-Frontend.git' 
                }
                
        }
        
              stage('Install node modules'){
                steps{
                        sh "npm install"
                        sh "npm audit fix"
                }    
        }
        
               stage('Build'){
                steps{
                        sh "npm run-script build"
                }
        }
        
              stage('Unit Test'){
                steps{
                        sh "npm run test"
                }
        }
                
             stage('e2e Tests') {
                steps {
                        sh "npm run e2e"
            }
        }
                
     }
}
