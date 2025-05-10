const {writeFile} = require('fs');

require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';
const demo = "demo24";

const targetPath = isProduction 
? `./src/environments/environment.prod.ts` 
: `./src/environments/environment.ts`;

const envFileContent = `
export const environment = {
    production: ${isProduction},
    demo: "${demo}",
    SERVER_URL: "${process.env.SERVER_URL}"
  };
`;

writeFile(targetPath, envFileContent, (err) => {
    if (err) {
        throw console.error(err);
    }
})