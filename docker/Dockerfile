FROM ubuntu:latest

# Install node.js, and supplementary programs
RUN DEBIAN_FRONTEND=noninteractive apt-get -qq update \
	&& apt-get -y -qq install \
		curl \
	&& curl -sL https://deb.nodesource.com/setup_6.x | bash - \
	&& apt-get install -qq -y \
		nodejs \
		build-essential \
	&& npm install -g \
		create-react-app \
	&& cd / \
	&& create-react-app theapp \
	&& cd /theapp \
	&& npm install --save \		
		bootstrap@3 \
		react-bootstrap \
		redux \
		react-fontawesome \
		isomorphic-fetch \
		es6-promise \
		react-select
		# react-redux
		
EXPOSE 3000

# By default, simply start the app
CMD cd /theapp && npm start
