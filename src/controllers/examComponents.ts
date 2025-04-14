import { buildConfig } from 'payload/config';
import { Request, Response } from 'express';
import ExamComponents from '../collections/ExamComponents';
import fileUpload from 'express-fileupload';
import xlsx from 'xlsx';

export const uploadExcelSheet = (req: Request, res: Response) => {
  try {
    // Access the uploaded file from the request
    const file = req.files?.file as fileUpload.UploadedFile;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Read the Excel file using the xlsx library
    const workbook = xlsx.read(file.data, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0]; // Assuming first sheet
    const sheet = workbook.Sheets[sheetName];

    // Parse Excel data to JSON
    const examData = xlsx.utils.sheet_to_json(sheet);

    // Loop through the data and insert into MongoDB (Payload CMS API)
    const promises = examData.map(async (data: any) => {
      await req.payload.create({
        collection: 'examComponents', // The slug for the collection
        data: {
          name: data.name,
          subject: data.subject, // assuming you have the subject ID in the Excel sheet
          year: data.year,
          semester: data.semester,
          components: data.components, // you may need to process this field based on structure
        },
      });
    });

    Promise.all(promises)
      .then(() => res.status(200).json({ message: 'Excel data imported successfully' }))
      .catch((err) => res.status(500).json({ message: 'Error importing data', error: err }));

  } catch (error) {
    res.status(500).json({ message: 'Error processing the file', error });
  }
};
