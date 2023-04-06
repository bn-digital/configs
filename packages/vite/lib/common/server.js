"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverOptions = void 0;
const STRAPI_URLS = [
    "_health",
    "admin",
    "api",
    "config-sync",
    "content-manager",
    "content-type-builder",
    "email",
    "email-designer",
    "graphql",
    "graphs-builder",
    "i18n",
    "import-export-entries",
    "menus",
    "secrets",
    "sitemap",
    "upload",
    "uploads",
    "users-permissions",
];
const serverOptions = (options) => {
    const proxy = options?.proxy ??
        (options?.proxyUrl
            ? { [`^/(${STRAPI_URLS.join("|")})(.*)`]: options.proxyUrl.replace("localhost", "127.0.0.1") }
            : undefined);
    return {
        port: Number.parseInt(process.env.WEBSITE_PORT ?? "8080"),
        strictPort: false,
        fs: {
            strict: false,
        },
        proxy,
        ...options,
    };
};
exports.serverOptions = serverOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1vbi9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsTUFBTSxXQUFXLEdBQXVCO0lBQ3RDLFNBQVM7SUFDVCxPQUFPO0lBQ1AsS0FBSztJQUNMLGFBQWE7SUFDYixpQkFBaUI7SUFDakIsc0JBQXNCO0lBQ3RCLE9BQU87SUFDUCxnQkFBZ0I7SUFDaEIsU0FBUztJQUNULGdCQUFnQjtJQUNoQixNQUFNO0lBQ04sdUJBQXVCO0lBQ3ZCLE9BQU87SUFDUCxTQUFTO0lBQ1QsU0FBUztJQUNULFFBQVE7SUFDUixTQUFTO0lBQ1QsbUJBQW1CO0NBQ1gsQ0FBQTtBQUVWLE1BQU0sYUFBYSxHQUFHLENBQUMsT0FBNEIsRUFBeUIsRUFBRTtJQUM1RSxNQUFNLEtBQUssR0FDVCxPQUFPLEVBQUUsS0FBSztRQUNkLENBQUMsT0FBTyxFQUFFLFFBQVE7WUFDaEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsRUFBRTtZQUM5RixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDaEIsT0FBTztRQUNMLElBQUksRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxJQUFJLE1BQU0sQ0FBQztRQUN6RCxVQUFVLEVBQUUsS0FBSztRQUNqQixFQUFFLEVBQUU7WUFDRixNQUFNLEVBQUUsS0FBSztTQUNkO1FBQ0QsS0FBSztRQUNMLEdBQUcsT0FBTztLQUNYLENBQUE7QUFDSCxDQUFDLENBQUE7QUFFUSxzQ0FBYSJ9