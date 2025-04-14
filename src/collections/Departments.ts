import { CollectionConfig } from "payload/types";

// const departmentSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     code:{
//         type: String,
//         required:true
//     },
//     school: {
//         type: String,
//         required: true
//     }
// });

export const Departments: CollectionConfig = {
    slug: "departments",
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
            name: "school",
            label: "School",
            type: "relationship",
            relationTo: "schools",
            required: true,
        }
    ],

};