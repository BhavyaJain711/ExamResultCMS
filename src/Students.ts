import { CollectionConfig } from "payload/types";

// const studentSchema = new mongoose.Schema({
//     userId:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     roll:{
//         type: String,
//         required:true
//     },
//     secondary_email: {
//         type: String
//     },
//     phone:{
//         type: Array,
//         required: true
//     },
//     department: {
//         type: Array,
//         required: true
//     },
//     courses:{
//         type: Array,
//         required: true
//     },
//     year:{
//         type: Number,
//         required: true
//     },
//     currentSemester:{
//         type: Number,
//         required: true
//     },
//     division:{
//         type: String,
//         required: true
//     },
//     lab_group:{
//         type: String,
//         required: true
//     }


// });

const Students: CollectionConfig = {
    slug: "students",
    admin: {
        useAsTitle: "roll",
    },
    fields: [
        {
            name: "userId",
            label: "User",
            type: "relationship",
            relationTo: "users",
            required: true
        },
        {
            name: "roll",
            label: "Roll",
            type: "text",
            required: true
        },
        {
            name: "secondary_email",
            label: "Secondary Email",
            type: "text"
        },
        {
            name: "phone",
            label: "Phone",
            type: "text",
            required: true
        },
        {
            name: "department",
            label: "Department",
            type: "relationship",
            relationTo: "departments",
            required: true
        },
        {
            name: "courses",
            label: "Courses",
            type: "relationship",
            relationTo: "courses",
        },
        {
            name: "year",
            label: "Year",
            type: "number",
            required: true
        },
        {
            name: "currentSemester",
            label: "Current Semester",
            type: "number",
            required: true
        },
        {
            name: "division",
            label: "Division",
            type: "text",
            required: true
        },
        {
            name: "lab_group",
            label: "Lab Group",
            type: "text",
            required: true
        }
    ],

};

export default Students;