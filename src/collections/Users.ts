import { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'teacher',
      options: [
        {
          label: 'Teacher',
          value: 'teacher',
        },
        {
          label: 'Student',
          value: 'student',
        },
        {
          label: 'Admin',
          value: 'admin',
        }
      ],
    },
  ],
}

export default Users
