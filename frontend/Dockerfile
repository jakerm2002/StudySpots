FROM node:18

# Directory that we are working in
WORKDIR /frontend

# Copy package information for package dependencies
COPY package-lock.json .
COPY package.json .

# Run all the package dependencies
RUN npm install

# Copy all of the source files
COPY ./ /frontend

# Expose port that the app will be running on
EXPOSE 3000

# Run the react application
CMD ["npm", "start"]