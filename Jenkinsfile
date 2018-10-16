node('192.168.14.46') {
	def errorStage=''
	try{
		stage('下载git源码') { // for display purposes
			try{
				dir("$WORKSPACE") {
					git([url: 'http://gitlab.ggjs.sinobest.cn/SinoGear/sinogear-frontend-blank.git', branch: "${BranchName}"])
				}
			} catch (error) {
				errorStage='下载git源码'
				throw error
			}
		}

		stage('下载依赖') {
			try{
				dir("$WORKSPACE") {
					sh 'yarn install --registry $NpmRegistry'
				}
			} catch (error) {
				errorStage='下载依赖'
				throw error
			}
		}


		stage('删除之前Docker容器') {
			try {
				sh "docker stop sinogear-frontend-blank"
				sh "docker rm sinogear-frontend-blank"
			} catch (error) {
				echo '[WARN] docker remove application container error,Maybe application havn\'t started.'
			}
		}

		stage('删除Docker之前镜像') {
			try {
				sh "docker rmi sinogear/frontend-blank"
			}catch (error) {
				echo '[WARN] docker remove previous image error,Maybe previous image is not existed.'
			}
		}

		stage('构建Docker镜像') {
			try{
				dir("$WORKSPACE") {
					sh "docker build -t sinogear/frontend-blank ."
				}
			} catch (error) {
				errorStage='构建Docker镜像'
				throw error
			}
		}

		stage('启动Docker容器') {

			try {
				sh "docker run  --restart=always --name sinogear-frontend-blank -d -p 20000:8000 sinogear/frontend-blank"
			}catch (error) {
				errorStage='启动Docker容器'
				throw error
			}
		}

	} catch (error) {
        stage('发送邮件') {
            emailext body: '${FailBuildEmailTemplate}',
                     mimeType: 'text/html',
                     replyTo: 'rd-jenkins@sinobest.cn',
                     subject: '${JOB_NAME}项目-第${BUILD_NUMBER}次构建，构建失败!',
                     to: '$BlankProjectMailRecipients';
        }
        throw error
	}
}