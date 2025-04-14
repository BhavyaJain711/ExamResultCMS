import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'
import Schools from './collections/Schools'
import { Departments } from './collections/Departments'
import Courses from './collections/Courses'
import Subjects from './collections/Subjects'
import ExamComponents from './collections/ExamComponents'
import StudentMarks from './collections/Marks'
import Students from './Students'
import StudentFaculty from './collections/StudentFaculty'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  cors: ["http://localhost:5173"],
  editor: slateEditor({}),
  collections: [Users, Schools, Departments, Courses, Subjects, ExamComponents, Students, StudentMarks,StudentFaculty],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
