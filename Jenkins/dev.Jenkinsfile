node('cit-dev') {
  cleanWs()
  def repo = 'frontend-client'
  stage('Checkout') {
    def gitBranch = 'develop'
    def gitUrl = env.CIT_GIT_FRONTEND_CLIENT_URL
    git branch: gitBranch, url: gitUrl
    echo "Checking out $repo form $gitUrl, branch $gitBranch"
  }

  stage ('CodeQL Analysis'){
    sh "docker run --rm --name codeql-container -v \$(pwd):/src -e CODEQL_LANGUAGE=javascript -e CODEQL_QUERIES=javascript/ql/src/codeql-suites/javascript-lgtm-full.qls -e CODEQL_THREADS=3 codeql-int:latest"
  }

  stage ('Semgrep Analysis'){
    sh "mkdir output"
    sh "chmod 777 output"
    sh "ls -la"
    sh "docker run --rm -v \${PWD}:/src returntocorp/semgrep --config=p/r2c-ci /src --junit-xml -o /src/output/semgrep-junit-report.xml"
    def summary = junit allowEmptyResults: true, testResults: 'output/semgrep-junit-report.xml'
    echo "Test Summary"
    echo "Total: ${summary.totalCount}, Failures: ${summary.failCount}, Successes: ${summary.passCount}"
  }

  stage("ATLAS") {
      docker.withRegistry("https://mgm-atlas-docker-local.dockerregistry.mgm-tp.com", "docker-mgm-atlas-readonly-ci") {
          withCredentials([file(credentialsId: "atlas-engine-config_frontend-client02", variable: "ATLAS_ENGINE_CONFIG")]) {
              /* Pull the ATLAS Engine Docker image: */
              def imgTag = "mgm-atlas-docker-local.dockerregistry.mgm-tp.com/com.mgmsp.mgm-atlas/engine:latest"
              def img = docker.image(imgTag)
              img.pull()
              def run_atlas_docker = """docker run --rm --name atlas \
                  -v $ATLAS_ENGINE_CONFIG:/app/config.yaml:ro \
                  -e PROJECT_NAME=frontend-client \
                  -e SCANNER__PROJECT_GIT_URL=https://github.com/canitrust/frontend-client.git $imgTag \
                  triggerAndWait --timeout 600 --loglevel DEBUG /app/config.yaml
              """
              sh "$run_atlas_docker"
          }
      }
  }

  def artifactory = env.GITHUB_PACKAGE_DOCKER_URL
  def urlArt = "https://${artifactory}"
  def imagePath = "canitrust/frontend-client"
  def imageName = "frontend-client"
  def imageTag = "devel"
  def credential = "github-citbot-token"
  def imageNginxName = "frontend-client-nginx"
  stage ("Clean") {
    sh "docker images --format '{{.Repository}}:{{.Tag}}' | grep 'frontend-client' | xargs --no-run-if-empty docker rmi --force"
  }
  stage ("Pull") {
    withDockerRegistry(credentialsId: credential, url: urlArt) {   
      sh "docker pull $artifactory/$imagePath/$imageName:$imageTag"
    }
  }
  stage ('Test') {
    sh "docker run $artifactory/$imagePath/$imageName:$imageTag npm run test:ci"
  }

  stage ('Build Nginx') {
    sh "docker build -f local.Dockerfile --label $imageNginxName -t $imageNginxName --build-arg REACT_APP_API_URL=${env.DEV_HOST}:${env.DEV_API_PORT} --build-arg REACT_APP_API_PREFIX=/api/v1/ ./"
  }

  stage ('Run') {
    // Clean up running containers
    sh "docker ps -f label=$imageNginxName -q | xargs --no-run-if-empty docker stop"
    sh "docker ps -a -f label=$imageNginxName -q | xargs --no-run-if-empty docker rm"

    // Deploy new containers
    sh "docker run -d -p 80:80 $imageNginxName"
  }
}
