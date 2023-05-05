"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const path_1 = require("path");
const config = ({ name, workingDir = "" }) => {
    const workdirPath = (pathChunk) => (0, path_1.join)(workingDir, ...pathChunk.split("/"));
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
            },
            endpoints: {
                development: {
                    url: "http://127.0.0.1:1337/graphql",
                },
                staging: {
                    url: `https://${name}.bndigital.dev/graphql`,
                },
            },
        },
    };
};
exports.config = config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSwrQkFBMkI7QUFDM0IsTUFBTSxNQUFNLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEdBQUcsRUFBRSxFQUF3QyxFQUFrQixFQUFFO0lBQ2pHLE1BQU0sV0FBVyxHQUFHLENBQUMsU0FBaUIsRUFBVSxFQUFFLENBQUMsSUFBQSxXQUFJLEVBQUMsVUFBVSxFQUFFLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBRTVGLE9BQU87UUFDTCxVQUFVLEVBQUUsV0FBVyxDQUFDLDBDQUEwQyxDQUFDO1FBQ25FLFNBQVMsRUFBRSxDQUFDLG9DQUFvQyxDQUFDO1FBQ2pELE9BQU8sRUFBRSxDQUFDLGtDQUFrQyxFQUFFLG9DQUFvQyxDQUFDO1FBQ25GLFVBQVUsRUFBRTtZQUNWLE9BQU8sRUFBRTtnQkFDUCxNQUFNLEVBQUUsV0FBVyxDQUFDLG1DQUFtQyxDQUFDO2dCQUN4RCxNQUFNLEVBQUU7b0JBQ04sY0FBYyxFQUFFLElBQUk7b0JBQ3BCLGVBQWUsRUFBRSxJQUFJO29CQUNyQixlQUFlLEVBQUUsSUFBSTtvQkFDckIsYUFBYSxFQUFFLElBQUk7b0JBQ25CLE9BQU8sRUFBRTt3QkFDUCxJQUFJLEVBQUUsTUFBTTt3QkFDWixRQUFRLEVBQUUsTUFBTTt3QkFDaEIsSUFBSSxFQUFFLE1BQU07d0JBQ1osSUFBSSxFQUFFLDZCQUE2Qjt3QkFDbkMsSUFBSSxFQUFFLFFBQVE7cUJBQ2Y7aUJBQ0Y7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULENBQUMsd0JBQXdCLENBQUMsRUFBRTt3QkFDMUIsU0FBUyxFQUFFLENBQUMsMkNBQTJDLENBQUM7d0JBQ3hELE1BQU0sRUFBRTs0QkFDTixRQUFRLEVBQUUsSUFBSTs0QkFDZCxZQUFZLEVBQUUsSUFBSTs0QkFDbEIsWUFBWSxFQUFFLElBQUk7eUJBQ25CO3dCQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSx1QkFBdUIsQ0FBQztxQkFDakQ7b0JBQ0QsZ0NBQWdDLEVBQUU7d0JBQ2hDLFNBQVMsRUFBRSxDQUFDLHVDQUF1QyxDQUFDO3dCQUNwRCxNQUFNLEVBQUU7NEJBQ04sUUFBUSxFQUFFLElBQUk7NEJBQ2QsWUFBWSxFQUFFLElBQUk7NEJBQ2xCLFlBQVksRUFBRSxJQUFJO3lCQUNuQjt3QkFDRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7cUJBQ3hCO29CQUNELHdCQUF3QixFQUFFO3dCQUN4QixTQUFTLEVBQUUsQ0FBQywyQ0FBMkMsQ0FBQzt3QkFDeEQsTUFBTSxFQUFFOzRCQUNOLFlBQVksRUFBRSxLQUFLOzRCQUNuQixhQUFhLEVBQUUsS0FBSzs0QkFDcEIsU0FBUyxFQUFFLElBQUk7NEJBQ2YsY0FBYyxFQUFFLElBQUk7NEJBQ3BCLHVCQUF1QixFQUFFLEtBQUs7NEJBQzlCLGlCQUFpQixFQUFFLElBQUk7eUJBQ3hCO3dCQUNELE9BQU8sRUFBRSxDQUFDLGtCQUFrQixFQUFFLHlCQUF5QixDQUFDO3FCQUN6RDtpQkFDRjthQUNlO1lBQ2xCLFNBQVMsRUFBRTtnQkFDVCxXQUFXLEVBQUU7b0JBQ1gsR0FBRyxFQUFFLCtCQUErQjtpQkFDckM7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLEdBQUcsRUFBRSxXQUFXLElBQUksd0JBQXdCO2lCQUM3QzthQUNGO1NBQ0Y7S0FDRixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBRVEsd0JBQU0ifQ==