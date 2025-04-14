import { CollectionConfig } from "payload/types";

// const courseSchema = new mongoose.Schema({
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
//     totalCredits: {
//         type: Number,
//         required: true
//     },
//     totalSemesters: {
//         type: Number,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     }
// });

 const Courses: CollectionConfig = {
    slug: "courses",
    admin: {
        useAsTitle: "name",
    },
    fields: [
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
        },
        {
            name:'code',
            label:'Code',
            type:'text',
            required:true,
        },
        {
            name: 'department',
            type: 'relationship',
            relationTo: 'departments', // Relate to the `departments` collection
            hasMany: true,             // Allow multiple department references
            required: true,
          },
        {
            name: "totalCredits",
            label: "Total Credits",
            type: "number",
            required: true,
        },
        {
            name: "totalSemesters",
            label: "Total Semesters",
            type: "number",
            required: true,
        },
        {
            name: "description",
            label: "Description",
            type: "textarea",
            required: true,
        }
    ],

};

export default Courses;