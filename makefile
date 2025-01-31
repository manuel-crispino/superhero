start:
	@echo "Setting up and starting the client..."
	cd client && pwd && npm install && npm run build
	@echo "Setting up and starting the server..."
	cd server && npm install && npm run dev 
	
test: 
	@echo "Start testing..."
	cd server && npm test

	