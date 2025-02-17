import { defineConfig } from 'vite'
// import mdPlugin, { Mode } from 'vite-plugin-markdown';
import sassDts from 'vite-plugin-sass-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'


const config = defineConfig({
    build: {
        minify: false,
        lib: {
            entry: ["./src/index.ts", "./src/styles.scss"],
            name: "transition",
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

    css: {
        modules: {
            scopeBehaviour: 'global',
            localsConvention: 'camelCase',
        }
    },

    plugins: [
        // mdPlugin({ mode: [Mode.HTML] }),
        sassDts({
            enabledMode: ['development', 'production'],
            global: {
                generate: true,
                // outFile: path.resolve(__dirname, './src/style.d.ts'),
            },
        }),
        viteStaticCopy({
            targets: [
                {
                    src: 'src/*.scss',
                    dest: './'
                }
            ]
        }),
    ],

})



export default config
