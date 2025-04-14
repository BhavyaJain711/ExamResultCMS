import { CollectionConfig } from "payload/types";

// const subjectSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     code:{
//         type: String,
//         required:true
//     },
//     department: {
//         type: Array,
//         required: true
//     },
//     courses:{
//         type: Array,
//         required: true
//     },
//     semesters:{
//         type: Array,
//         required: true
//     },
//     credit: {
//         type: Number,
//         required: true
//     }
// });
const Subjects: CollectionConfig = {
  slug: "subjects",
  admin: {
    useAsTitle: "name",
  },
  // access:{
  //   create: ({ req: { user } }) => {
  //     if(user && user.role === 'admin') return true;
  //   }
  // },
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "code",
      label: "Code",
      type: "text",
      required: true,
    },
    {
      name: "department",
      type: "relationship",
      relationTo: "departments", // Relate to the `departments` collection
      required: true,
    },
    {
      name: "courses",
      type: "relationship",
      relationTo: "courses", // Relate to the `courses` collection
      hasMany: true, // Allow multiple department references
      required: true,
    },
    {
      name: "semesters",
      type: "number",
      hasMany: true, // Allow multiple department references
      required: true,
    },
    {
      name: "credit",
      label: "Credit",
      type: "number",
      required: true,
    },
    {
      name: "FacultyAssigned",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: true,
    }
  ],
  
};

export default Subjects;
