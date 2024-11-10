sudo su - ec2-user
cd /home/ec2-user
sudo yum update
sudo yum install httpd
sudo systemctl start httpd
sudo systemctl enable httpd
sudo yum install -y git
git clone https://github.com/luisapino/ProyectoFinal-Infra3.git
cd ProyectoFinal-Infra3/
git checkout front
cd Frontend/
sudo cp . -r /var/www/html/
sudo systemctl restart apache2