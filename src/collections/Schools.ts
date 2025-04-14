import { CollectionConfig } from "payload/types";

const Schools: CollectionConfig = {
    slug: "schools",
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
            required:true
        }
    ],

};

export default Schools;