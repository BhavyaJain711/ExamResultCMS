import { CollectionConfig } from 'payload/types';

const StudentFaculty: CollectionConfig = {
  slug: 'studentfaculty',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'subject',
      type: 'relationship',
      relationTo: 'subjects',
      required: true,
    },
    {
      name: 'faculty',
      type: 'relationship',
      relationTo: 'users',  // Link to the users collection (faculty are users)
      required: true,
    },
    {
      name: 'students',
      type: 'relationship',
      relationTo: 'users', // Students are users too
      hasMany: true,
    },
  ],

  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        const selectedSubjectId = data.subject; // The subject selected in the field

        // Check if the subject exists and if faculty should be filtered
        if (selectedSubjectId) {
          // You can filter the faculty by checking if the faculty is assigned to this subject
          const subjectDoc = await req.payload.findByID({
            collection: 'subjects',
            id: selectedSubjectId,
          });

          // Check the `FacultyAssigned` field for faculty users
          const facultyAssigned = subjectDoc?.FacultyAssigned || [];

          // Ensure the faculty assigned is a subset of the users available
          if (facultyAssigned.length > 0) {
            data.faculty = facultyAssigned; // This filters the available faculty based on the subject's faculty
          } else {
            data.faculty = []; // No faculty assigned, clear the faculty field
          }
        }

        return data;
      },
    ],
  },
};

export default StudentFaculty;
