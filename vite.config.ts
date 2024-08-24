import restart from "vite-plugin-restart";
import mkcert from "vite-plugin-mkcert";

export default {
  root: "src/", // Sources files (typically where index.html is)
  publicDir: "../static/", // Path from "root" to static assets (files that are served as they are)
  server: {
    host: true, // Open to local network and display URL
    open: !("SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env), // Open if it's not a CodeSandbox
    // NOTE: server proxy required until this issue is fixed https://github.com/liuweiGL/vite-plugin-mkcert/issues/89#issuecomment-2155474691

    proxy: {},
  },

  build: {
    outDir: "../dist", // Output in the dist/ folder
    emptyOutDir: true, // Empty the folder first
    sourcemap: true, // Add sourcemap
  },
  plugins: [
    restart({ restart: ["../static/**"] }),
    mkcert(), // Restart server on static file change
  ],
};
