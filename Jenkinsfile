pipeline {
        
        agent any
        
        parameters {
                string(defaultValue: "devBuild", description: 'Which branch?', name: 'BRANCH_NAME')
        }

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
                        post {
                                always {  
                                        emailext attachLog: true, attachmentsPattern: 'generatedFile.txt', body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
                                        compressLog: true, recipientProviders: [brokenBuildSuspects(), culprits(), developers(), requestor(), brokenTestsSuspects()], subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}",
                                        replyTo: 'devops@thinkperfect.io', to: 'devops@thinkperfect.io, asaha@thinkperfect.io'
                                }            
                        }
                }     
        }
     post {
        success {  
               sh "cd /var/lib/jenkins/workspace/SmartBid-UI"
                script {
                        if ( params.BRANCH_NAME == 'devBuild') {
                                environment { 
                                        GIT_AUTH = credentials('fa2bcd20-6f2a-411c-a0fe-1f48a759c366') 
                                }
                        sh ('''
                                git checkout -b tempBuild
                                git add --all
                                git commit -m '${env.BUILD_NUMBER}'
                                git config --local credential.helper "!f() { echo username=\\$GIT_AUTH_USR; echo password=\\$GIT_AUTH_PSW; }; f"
                                git remote rm origin
                                git remote add origin "https://ad685938e05af159d5cd9668350783a16b56f394@github.com/KedarBelavanaki/SmartBid-Frontend.git"
                                git push origin tempBuild -f
                        ''')
                                sh "cd /var/lib/jenkins/workspace"
                                cleanWs()        
                        }
                }
        }            
    }
}
