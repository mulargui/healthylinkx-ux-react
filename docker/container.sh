sudo docker stop REACT
sudo docker rm REACT
sudo docker run -ti --name REACT -p 80:3000 -v /vagrant/apps/healthylinkx-ux-react:/myapp react /bin/bash
