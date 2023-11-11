import { Config, Plugin } from 'payload/config'

export interface AddLastModifiedConfig {
  usersCollection: string
}

export default function addLastModified({ usersCollection }: AddLastModifiedConfig): Plugin {
  return (incomingConfig: Config): Config => {

    // Spread the existing config
    const config: Config = {
      ...incomingConfig,
      collections: incomingConfig.collections.map((collection) => {
        // Spread each item that we are modifying,
        // and add our new field - complete with
        // hooks and proper admin UI config
        return {
          ...collection,
          fields: [
            ...collection.fields,
            {
              name: 'lastModifiedBy',
              type: 'relationship',
              relationTo: usersCollection,
              defaultValue: ({ user }) => user.id,
              hooks: {
                beforeChange: [
                  ({ req }) => ({
                    value: req?.user?.id,
                  }),
                ],
              },
              admin: {
                position: 'sidebar',
                readOnly: true,
              },
            },
          ],
        }
      }),
    }

    return config
  }
}

