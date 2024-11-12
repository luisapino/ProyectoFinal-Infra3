yum update
yum install httpd
systemctl start httpd
systemctl enable httpd
yum install -y git
cd /home/ec2-user/
git clone https://github.com/luisapino/ProyectoFinal-Infra3.git
cd /home/ec2-user/ProyectoFinal-Infra3/
git checkout front
cd /home/ec2-user/ProyectoFinal-Infra3/Frontend/
cat <<EOF > /home/ec2-user/ProyectoFinal-Infra3/Frontend/script/API.js
export const backendUrl = ${BackendLoadBalancer.DNSName};
export const backendPort = ${BackendPort};
EOF
cd /home/ec2-user/ProyectoFinal-Infra3/Frontend/
sudo cp /home/ec2-user/ProyectoFinal-Infra3/Frontend/ -r /var/www/html/
sudo systemctl restart apache2