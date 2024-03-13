import * as fs from 'fs';
import path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

async function fileGeneratorHelper(
  sampleName: string,
  documentName: string,
  data: object,
) {
  const template = fs.readFileSync(
    path.resolve('src/assets', sampleName),
    'binary',
  );
  const zip = new PizZip(template);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.render(data);

  const buf = doc.getZip().generate({
    type: 'nodebuffer',
    // compression: DEFLATE adds a compression step.
    // For a 50MB output document, expect 500ms additional CPU time
    compression: 'DEFLATE',
  });

  fs.writeFileSync(
    path.resolve('src/storage/to-work-applications-and-orders', documentName),
    buf,
  );
}

async function updateFileHelper(existingFileName: string, data: object) {
  const template = fs.readFileSync(
    path.resolve(
      'src/storage/to-work-applications-and-orders',
      existingFileName,
    ),
    'binary',
  );
  const zip = new PizZip(template);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.setData(data);
  doc.render();

  const buf = doc.getZip().generate({
    type: 'nodebuffer',
    compression: 'DEFLATE',
  });

  fs.writeFileSync(
    path.resolve(
      'src/storage/to-work-applications-and-orders',
      existingFileName,
    ),
    buf,
  );
}

export { fileGeneratorHelper, updateFileHelper };
