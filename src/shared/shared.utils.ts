import * as AWS from "aws-sdk";

AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_KEY, 
        secretAccessKey: process.env.AWS_SECRET,
    },
});

export const uploadToS3 = async (file, userid, folderName) => {
    console.log("uploadToS3");
    console.log(file);
    const { filename, createReadStream } = await file;
    console.log(createReadStream);
    const objectName = `${folderName}/${userid}-${Date.now()}-${filename}`;
    console.log(objectName);
    const readStream = createReadStream();
    console.log(readStream);
    
    console.log(file);
    
    const { Location } = await new AWS.S3().upload({
        Bucket: "woori-nomad-coffee-uploaders",
        Key: objectName,
        ACL: "public-read",
        Body: readStream,
    })
        .promise();
    console.log(Location);
    return Location;
};