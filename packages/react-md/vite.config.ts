


import { defineConfig } from 'vite'

import { viteStaticCopy } from 'vite-plugin-static-copy'



const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./src/index.ts", "./src/styles.scss"],
            name: "react-md",
            formats: ['cjs', 'es'],
            fileName: (format: string, entryName: string) => `${entryName}.${format}.js`
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'voby', 'oby', "voby/jsx-runtime"],
            output: {
                globals: {
                    'react': 'React',
                    'react-dom': 'ReactDOM',
                    'voby': 'voby',
                    'oby': 'oby',
                    'voby/jsx-runtime':'jsxRuntime'
                }
            }
        },
    },
    
    esbuild: {
        jsx: 'automatic',
    },
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: 'src/*.scss',
                    dest: './'
                }
            ]
        }),
    ],
    css: {
        modules: {
            scopeBehaviour: 'global',
            localsConvention: 'camelCase',
        },
        preprocessorOptions: {
            sass: {
                "load-path": "./node_modules"
            }
        }
    },

})



export default config