const fs = require('fs');
const path = require('path');
const { S3 } = require('aws-sdk');


class EnvUtil {
  constructor(bucket, key, directory = '.', file = '.env') {
    this.bucket = bucket;
    this.key = key;
    this.directory = directory;
    this.file = file;
    this.s3 = new S3();
    this.writeToFile = this.writeToFile.bind(this);
  }

  getEnvVariables() {
    const params = {
      Bucket: this.bucket,
      Key: this.key,
    };

    return new Promise((resolve, reject) => {
      this.s3.getObject(params, (err, data) => {
        if (err) {
          reject(new Error(`There was an error retrieving ${params.Bucket}/${params.key}: ${err}`));
        } else {
          resolve(data.Body.toString().trim());
        }
      });
    });
  }

  /* eslint-disable class-methods-use-this */
  writeToFile(envVariables) {
    if (this.directory !== '.') {
      const dir = this.directory;
      if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
      }
    }
    let filePath = path.join(this.directory, this.file);

    fs.writeFile(filePath, envVariables, (err) => {
      if (err) {
        throw new Error(`There was an error when writing to .env: ${err}`);
      }
    });
  }
}

module.exports = EnvUtil;
