#!/bin/bash
sudo yum update -y
sudo amazon-linux-extras install epel -y
sudo yum install -y stress
sudo yum install -y nginx
sudo yum install -y git

cd /home/ec2-user/
git clone https://github.com/luisapino/ProyectoFinal-Infra3.git
cd /home/ec2-user/ProyectoFinal-Infra3/
git checkout front

cd /home/ec2-user/ProyectoFinal-Infra3/Frontend/script
sudo rm API.js
cat <<EOF > /home/ec2-user/ProyectoFinal-Infra3/Frontend/script/API.js
export const backendUrl = 'http://${FrontendALB.DNSName}';
export const backendPort = '80';
EOF

cd /home/ec2-user/ProyectoFinal-Infra3/Frontend/
sudo cp -r . /usr/share/nginx/html/

sudo tee /etc/nginx/nginx.conf > /dev/null <<EOL
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    sendfile on;
    keepalive_timeout 65;

    server {
        listen 80;

        location / {
            root /usr/share/nginx/html;
            index index.html index.htm;
        }

        location /health/ {
            proxy_pass http://${BackendALB.DNSName}:${BackendPort};
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }

        location /auth/ {
            proxy_pass http://${BackendALB.DNSName}:${BackendPort};
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }

        location /products/ {
            proxy_pass http://${BackendALB.DNSName}:${BackendPort};
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }

        location /cart/ {
            proxy_pass http://${BackendALB.DNSName}:${BackendPort};
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }
    }
}
EOL

sudo chkconfig nginx on
sudo service nginx start