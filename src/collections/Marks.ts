import { buildConfig } from 'payload/config';
import { CollectionConfig } from 'payload/types';

const StudentMarks: CollectionConfig = {
  slug: 'studentMarks',
  fields: [
    {
      name: 'student',
      type: 'relationship',
      relationTo: 'students', // Assuming you have a students collection
      required: true,
    },
    {
      name: 'subject',
      type: 'relationship',
      relationTo: 'subjects',
      required: true,
    },
    {
      name: 'semester', // Add semester field if not already defined
      type: 'text', // Or whatever type is appropriate
      required: true,
    },
    {
      name: 'year', // Add year field if not already defined
      type: 'number', // Assuming year is a number
      required: true,
    },
    {
      name: 'marks', // Store marks for each component
      type: 'array',
      required: true,
      fields: [
        {
          name: 'componentId',
          type: 'relationship',
          relationTo: 'examComponents', // Relate to exam components collection
          required: true,
          admin: {
            description: 'Select an exam component by name', // Display name for the relationship
          },
        },
        {
          name: 'subComponentId', // For specifying the sub-component
          type: 'relationship',
          relationTo: 'examComponents', // Point to a separate collection for sub-components
          required: true,
          admin: {
            description: 'Select a sub-component by name',
          },
        },
        {
          name: 'marks',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'createdAt',
      type: 'date',
      defaultValue: () => new Date(),
    },
  ],
  
};

export default StudentMarks;
