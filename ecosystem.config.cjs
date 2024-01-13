module.exports = {
  apps: [
    {
      name: 'app', // name of the process in PM2
      script: 'build/index.js',
      instances: 0,
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
        PORT: 5173, // port the app will be launched on
      },
    },
  ],

  deploy: {
    production: {
      user: 'root', // 접속할 계정. SSH를 사용해서 서버에 접속할 수 있어야 한다.
      host: '34.82.147.82', // 서버 도메인 또는 IP
      ref: 'origin/main', // 서버에서 clone할 브랜치
      repo: 'git@github.com:jeongmu-yee-team/jeongmu-cafe-svelte.git', // Git 저장소 URL
      ssh_options: 'StrictHostKeyChecking=no', // SSH 접속 옵션.
      path: '/var/www/html', // 앱을 설치할 폴더 위치
      'post-deploy': 'pnpm install && pnpm run build && pm2 reload ecosystem.config.cjs', // PM2가 배포(git clone)한 후 실행할 명령어
    },
  },
};
