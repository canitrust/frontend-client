node ('Build'){
  echo "Deploying to AWS s3"
  def credential = '1c5d5f9a-db60-4799-9f6f-6d12750f5f7f'
  def s3Loc = "${params.S3_LOC}"
  def cdnDistributionId = "${params.CDN_DISTRIBUTION_ID}"
  def repo = 'frontend-client'
  def imageTag = "latest"
  def buildImageName = "cit-frontend-client"
  def buildImageTag = "latest"
  def imageName = "frontend-client-s3"
  def urlArt = "https://${env.ARTIFACTORY_HOST}"
  def apiUrl = "${params.API_URL}"
  def apiPath = "${params.API_PATH}"
  def apiEnv = "${params.BUILD_ENV}"
  def path_build= '/s3/'
  def awsRegion = env.AWS_REGION
  def awsImageName = 'aws-cli-docker'
  def awsImageTag = 'latest'
  def awsImage = "${env.ARTIFACTORY_HOST}/${env.ARTIFACTORY_PATH}/${awsImageName}:${awsImageTag}"

  stage('Checkout'){
    def gitBranch = "release/${params.TAG}"
    def gitUrl = env.CIT_GIT_FRONTEND_CLIENT_URL
    git branch: gitBranch, url: gitUrl
    echo "Checking out ${repo} form ${gitUrl}, branch ${gitBranch}"
  }

  stage ('CodeQL Analysis'){
    sh "docker run --rm --name codeql-container -v \$(pwd):/src -e CODEQL_LANGUAGE=javascript -e CODEQL_QUERIES=javascript/ql/src/codeql-suites/javascript-lgtm-full.qls -e CODEQL_THREADS=3 codeql-int:latest"
  }

  stage ('Semgrep Analysis'){
    sh "docker run --rm -v \${PWD}:/src returntocorp/semgrep --config=p/r2c-ci /src --junit-xml -o /src/semgrep-junit-report.xml"
    def summary = junit allowEmptyResults: true, testResults: 'output/semgrep-junit-report.xml'
    echo "Test Summary"
    echo "Total: ${summary.totalCount}, Failures: ${summary.failCount}, Successes: ${summary.passCount}"
  }

  stage ('Clean docker images'){
    def returnVal = sh "docker images --format '{{.Repository}}:{{.Tag}}' | grep 'frontend-client' | xargs --no-run-if-empty docker rmi --force"
  }

  stage ('Pull AWS-CLI Image'){
    // withDockerRegistry(credentialsId: credential, url: urlArt)  {
    //   sh "docker pull ${awsImage}"
    //   sh "docker tag ${awsImage} ${awsImageName}:${awsImageTag}"
    // }
    // //Verify
    // sh "docker run ${awsImageName}:${awsImageTag} aws --version"
  }

  stage ('Build Docker Image and Push to S3'){
    // sh "docker build --no-cache -f Dockerfile --build-arg REACT_APP_API_URL=${apiUrl} --build-arg REACT_APP_API_PREFIX=${apiPath} --build-arg REACT_APP_ENV_NODE=${apiEnv} --build-arg GENERATE_SOURCEMAP=false --label ${buildImageName} -t ${buildImageName}:${buildImageTag} ./"

    // withDockerRegistry(credentialsId: credential, url: urlArt)  {
    //   sh "docker build -f Jenkins/aws.Dockerfile --build-arg REACT_APP_API_URL=${apiUrl} --build-arg REACT_APP_API_PREFIX=${apiPath} --build-arg REACT_APP_ENV_NODE=${apiEnv} --label ${imageName} -t ${imageName}:${imageTag} ./"
    // }
    
    // withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'aws', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
    //     sh "docker run -e PATH_LOCAL=${path_build} -e S3_LOC=${s3Loc} -e CDN_DISTRIBUTION_ID=${cdnDistributionId} -e AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} -e AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} -e AWS_DEFAULT_REGION=${awsRegion} $imageName /bin/sh /scripts/runS3.sh"
    //     echo "Build and push successfully!"
    // }
  }
}