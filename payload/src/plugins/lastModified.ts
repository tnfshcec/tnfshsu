import { Config, Plugin } from "payload/config";

export interface AddLastModifiedConfig {
  usersCollection: string;
}

export default function addLastModified({ usersCollection }: AddLastModifiedConfig): Plugin {
  return (incomingConfig: Config): Config => {
    let config: Config = { ...incomingConfig };

    for (let coll of config.collections) {
      coll.fields.push({
        name: "lastModifiedBy",
        type: "relationship",
        relationTo: usersCollection,
        defaultValue: ({ user }) => user?.id,
        hooks: {
          beforeChange: [({ req }) => req?.user?.id],
        },
        admin: {
          position: "sidebar",
          readOnly: true,
        },
      });
    }

    return config;
  };
}
