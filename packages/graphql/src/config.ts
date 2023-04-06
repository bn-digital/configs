import type { IGraphQLConfig } from "graphql-config"
import { join } from "path"
import { CodegenConfig } from "@graphql-codegen/cli"
const config = ({ name, workingDir = "" }: { name: string; workingDir: string }): IGraphQLConfig => {
  const workdirPath = (pathChunk: string): string => join(workingDir, ...pathChunk.split("/"))

  return {
    schemaPath: workdirPath("packages/cms/src/graphql/schema.graphqls"),
    documents: ["**/src/graphql/fragments/*.graphql"],
    include: ["**/src/graphql/queries/*.graphql", "**/src/graphql/mutations/*.graphql"],
    extensions: {
      codegen: {
        schema: workdirPath("../cms/src/graphql/schema.graphql"),
        config: {
          avoidOptionals: true,
          dedupeFragments: true,
          preResolveTypes: true,
          strictScalars: true,
          scalars: {
            Date: "Date",
            DateTime: "Date",
            Time: "Date",
            JSON: "Record<string, any> | any[]",
            Long: "bigint",
          },
        },
        generates: {
          [`src/types/graphql.d.ts`]: {
            documents: ["packages/website/src/graphql/**/*.graphql"],
            config: {
              noExport: true,
              skipTypename: true,
              enumsAsTypes: true,
            },
            plugins: ["typescript", "typescript-operations"],
          },
          "../cms/src/types/graphql.d.ts:": {
            documents: ["packages/cms/src/graphql/**/*.graphql"],
            config: {
              noExport: true,
              skipTypename: true,
              enumsAsTypes: true,
            },
            plugins: ["typescript"],
          },
          "src/graphql/index.tsx:": {
            documents: ["packages/website/src/graphql/**/*.graphql"],
            config: {
              addDocBlocks: false,
              withComponent: false,
              withHooks: true,
              withResultType: true,
              withMutationOptionsType: false,
              useExplicitTyping: true,
            },
            plugins: [`fragment-matcher`, `typescript-react-apollo`],
          },
        },
      } as CodegenConfig,
      endpoints: {
        development: {
          url: "http://127.0.0.1:1337/graphql",
        },
        staging: {
          url: `https://${name}.bndigital.dev/graphql`,
        },
      },
    },
  }
}

export { config }
