#!/bin/bash
sudo su - ec2-user
cd /home/ec2-user
sudo yum install -y git
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install v16.20.2
npm install -y -g yarn
git clone https://github.com/luisapino/ProyectoFinal-Infra3.git
cd ProyectoFinal-Infra3/
git checkout back
cd backend/
sudo -u ec2-user bash -c "cat <<EOF > .env
DB_HOST=${RDSInstance.Endpoint.Address}
DB_USERNAME=${DBUsername}
DB_PASSWORD=${DBPassword}
DB_DATABASE=${DBName}
DB_PORT=${DBPort}
PORT=${BackendPort}
JWT_SECRET=${JwtSecret}
EOF"
yarn install
yarn build
yarn start