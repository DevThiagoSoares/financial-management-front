pipeline{
  agent any
  stages {
    stage('Build image'){
      steps {
        script {
          dockerapp = docker.build("financial/financial-ui:${env.BUILD_ID}", '-f ./Dockerfile .')
        }
      }
    }
    stage('Deploy Financial UI - Stop and Remove Container') {
        steps {
          script {
            def containerName = 'financial-ui'
            
            sh "docker stop ${containerName} || true"
            sh "docker rm ${containerName} || true"
          }
        }
      }
      stage('Deploy Financial UI - Run New Container') {
        steps {
          script {
            def imageName = "financial/financial-ui:${env.BUILD_ID}"
            def containerName = 'financial-ui'
            
            sh "docker run -d --name ${containerName} -p 3000:3000 ${imageName}"
          }
        }
      }
  }
}
