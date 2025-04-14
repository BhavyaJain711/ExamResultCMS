import { CollectionConfig } from "payload/types";

const SubjectStudents: CollectionConfig = {
  slug: "subjectstudents",
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "student",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "subject",
      type: "relationship",
      relationTo: "subjects",
      hasMany: true,
      required: true,
    },
  ],
};