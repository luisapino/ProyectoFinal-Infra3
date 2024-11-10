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
yarn install
yarn build
yarn start