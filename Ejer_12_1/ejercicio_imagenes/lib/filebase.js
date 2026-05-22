import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Creo el cliente S3 
export const s3 = new S3Client({
  endpoint: process.env.AWS_ENDPOINT,
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  forcePathStyle: true
});

export const BUCKET = process.env.AWS_BUCKET_MANE;

// Subo una imagen al bucket
export async function subirImagen(nombreArchivo, buffer, mimetype) {
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: nombreArchivo,
    Body: buffer,
    ContentType: mimetype
  }));
}

// Elimino una imagen del bucket
export async function eliminarImagen(nombreArchivo) {
  await s3.send(new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: nombreArchivo
  }));
}

// Genero una URL firmada 
export async function getUrlPublica(nombreArchivo) {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: nombreArchivo
  });
  return await getSignedUrl(s3, command, { expiresIn: 604800 });
}