import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            includeAssets: ["favicon.ico", "apple-touch-icon.png", "favicon-32x32.png", "favicon-16x16.png"],
            manifest: {
                name: "Plain Counter",
                short_name: "Plain Counter",
                description: "A simple React application to keep track of things with persistent data storage.",
                theme_color: "transparent",
                background_color: "transparent",
                display: "standalone",
                orientation: "portrait",
                start_url: "/",
                icons: [
                    {
                        src: "/android-chrome-192x192.png",
                        sizes: "192x192",
                        type: "image/png"
                    },
                    {
                        src: "/android-chrome-512x512.png",
                        sizes: "512x512",
                        type: "image/png"
                    },
                    {
                        src: "/apple-touch-icon.png",
                        sizes: "180x180",
                        type: "image/png"
                    }
                ]
            },
            workbox: {
                runtimeCaching: [
                    {
                        urlPattern: ({ request }) => request.destination === "document",
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "html-cache",
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },
                    {
                        urlPattern: ({ request }) =>
                            request.destination === "script" || request.destination === "style",
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "static-resources",
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    }
                ]
            }
        })
    ]
});
