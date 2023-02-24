"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverOptions = void 0;
const plugins_1 = require("./plugins");
const STRAPI_URLS = [
    '_health',
    'admin',
    'api',
    'config-sync',
    'import-export-entries',
    'menus',
    'content-manager',
    'content-type-builder',
    'email',
    'email-designer',
    'graphql',
    'graphs-builder',
    'i18n',
    'secrets',
    'sitemap',
    'upload',
    'uploads',
    'users-permissions',
];
const serverOptions = (options) => {
    const packageJson = (0, plugins_1.readPackageJson)();
    const proxy = packageJson?.proxy
        ? { [`^/(${STRAPI_URLS.join('|')})(.*)`]: packageJson.proxy.replace('localhost', '127.0.0.1') }
        : undefined;
    return {
        server: {
            port: Number.parseInt(process.env.WEBSITE_PORT ?? '8080'),
            strictPort: false,
            fs: {
                strict: false,
            },
            proxy,
            ...options,
        },
    };
};
exports.serverOptions = serverOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1vbi9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsdUNBQTJDO0FBRTNDLE1BQU0sV0FBVyxHQUF1QjtJQUN0QyxTQUFTO0lBQ1QsT0FBTztJQUNQLEtBQUs7SUFDTCxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLE9BQU87SUFDUCxpQkFBaUI7SUFDakIsc0JBQXNCO0lBQ3RCLE9BQU87SUFDUCxnQkFBZ0I7SUFDaEIsU0FBUztJQUNULGdCQUFnQjtJQUNoQixNQUFNO0lBQ04sU0FBUztJQUNULFNBQVM7SUFDVCxRQUFRO0lBQ1IsU0FBUztJQUNULG1CQUFtQjtDQUNYLENBQUE7QUFJVixNQUFNLGFBQWEsR0FBRyxDQUFDLE9BQXVCLEVBQThCLEVBQUU7SUFDNUUsTUFBTSxXQUFXLEdBQUcsSUFBQSx5QkFBZSxHQUFFLENBQUE7SUFDckMsTUFBTSxLQUFLLEdBQUcsV0FBVyxFQUFFLEtBQUs7UUFDOUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFHLFdBQVcsQ0FBQyxLQUFnQixDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLEVBQUU7UUFDM0csQ0FBQyxDQUFDLFNBQVMsQ0FBQTtJQUNiLE9BQU87UUFDTCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksSUFBSSxNQUFNLENBQUM7WUFDekQsVUFBVSxFQUFFLEtBQUs7WUFDakIsRUFBRSxFQUFFO2dCQUNGLE1BQU0sRUFBRSxLQUFLO2FBQ2Q7WUFFRCxLQUFLO1lBQ0wsR0FBRyxPQUFPO1NBQ1g7S0FDRixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBRVEsc0NBQWEifQ==