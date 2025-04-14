import { buildConfig } from 'payload/config';
import { CollectionConfig } from 'payload/types';
import { FieldHook } from 'payload/types';

// Validation Hooks defined above
const validateLevel1Weightage: FieldHook = async ({ value }) => {
  const totalWeightage = value.reduce((sum, component) => sum + (component.weightage || 0), 0);

  if (totalWeightage !== 100) {
    throw new Error('The total weightage of all Level 1 components must be 100.');
  }

  return value;
};

const validateLevel2Weightage: FieldHook = async ({ value, siblingData }) => {
  const parentMarks = siblingData.marks;
  const blockType = siblingData.type;

  if (blockType === 'sum_of_n') {
    const totalWeightage = value.reduce((sum, subComponent) => sum + (subComponent.weightage || 0), 0);

    if (totalWeightage !== parentMarks) {
      throw new Error(`The total weightage of all Level 2 components must be equal to ${parentMarks}.`);
    }
  } else if (blockType === 'best_of_n') {
    value.forEach((subComponent) => {
      subComponent.weightage = parentMarks;
    });
  }

  return value;
};

const ExamComponents: CollectionConfig = {
  slug: 'examComponents',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'subject',
      type: 'relationship',
      relationTo: 'subjects',
      hasMany: true,
      required: true,
    },
    {
      name: 'year',
      type: 'number',
      required: true,
    },
    {
      name: 'semester',
      type: 'number',
      required: true,
    },
    {
      name: 'components',
      type: 'blocks',
      required: true,
      hooks: {
        beforeValidate: [validateLevel1Weightage],
      },
      blocks: [
        {
          slug: 'exam-name',
          labels: {
            singular: 'Exam',
            plural: 'Exams',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'weightage',
              type: 'number',
              required: true,
              min: 0,
              max: 100,
            },
            {
              name: 'marks',
              type: 'number',
              required: true,
              min: 0,
              admin: {
                description: 'Enter the total marks scored out of a maximum (e.g., 100).',
              },
            },
            {
              name: 'type',
              type: 'select',
              options: [
                {
                  label: 'Best of N',
                  value: 'best_of_n',
                },
                {
                  label: 'Average of N',
                  value: 'average_of_n',
                },
                {
                  label: 'Sum of N',
                  value: 'sum_of_n',
                },
              ],
              required: true,
            },
            {
              name: 'bestOfSettings',
              type: 'group',
              admin: {
                condition: (data) => data.type === 'best_of_n',
              },
              fields: [
                {
                  name: 'n',
                  type: 'number',
                  required: true,
                },
                {
                  name: 'bestOf',
                  type: 'number',
                  required: true,
                },
              ],
            },
            {
              name: 'examComponents',
              type: 'blocks',
              hooks: {
                beforeValidate: [validateLevel2Weightage],
              },
              blocks: [
                {
                  slug: 'exam-sub-component',
                  labels: {
                    singular: 'Exam Component',
                    plural: 'Exam Components',
                  },
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'weightage',
                      type: 'number',
                      required: true,
                      min: 0,
                      max: 100,
                    },
                    {
                      name: 'marks',
                      type: 'number',
                      required: true,
                      min: 0,
                      // description: 'Enter the marks scored for this sub-component.',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default ExamComponents;
