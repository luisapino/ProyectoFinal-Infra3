#!/bin/bash
yum update -y
yum install -y git
sudo -u ec2-user bash -c "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash"
export NVM_DIR="/home/ec2-user/.nvm"
sudo -u ec2-user bash -c 'export NVM_DIR="/home/ec2-user/.nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
    nvm install v16.20.2 && nvm alias default v16.20.2'
echo 'export NVM_DIR="$HOME/.nvm"' >> /home/ec2-user/.bashrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> /home/ec2-user/.bashrc
echo 'export PATH="$NVM_DIR/versions/node/v16.20.2/bin:$PATH"' >> /home/ec2-user/.bashrc
sudo -u ec2-user bash -c 'export NVM_DIR="/home/ec2-user/.nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
    npm install -g yarn pm2'
sudo -u ec2-user git clone https://github.com/luisapino/ProyectoFinal-Infra3.git /home/ec2-user/ProyectoFinal-Infra3
cd /home/ec2-user/ProyectoFinal-Infra3
sudo -u ec2-user git checkout back
cd /home/ec2-user/ProyectoFinal-Infra3/backend
sudo -u ec2-user bash -c 'export NVM_DIR="/home/ec2-user/.nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
    yarn install && yarn build'
cat <<EOF > /home/ec2-user/ProyectoFinal-Infra3/backend/.env
PORT=${BackendPort}
JWT_SECRET=${JwtSecret}
DB_HOST=${RDSInstance.Endpoint.Address}
DB_PORT=${DBPort}
DB_USERNAME=${DBUsername}
DB_PASSWORD=${DBPassword}
DB_DATABASE=${DBName}
EOF
sudo -u ec2-user bash -c 'export NVM_DIR="/home/ec2-user/.nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
    pm2 start yarn -- start && \
    pm2 save && \
    pm2 startup'