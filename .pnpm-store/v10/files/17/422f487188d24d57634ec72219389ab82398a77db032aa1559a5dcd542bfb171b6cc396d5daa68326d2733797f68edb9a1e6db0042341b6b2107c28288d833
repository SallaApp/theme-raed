const path = require('path');
const glob = require("glob");
const color = {normal: "\x1b[0m", red: "\x1b[31m", green: "\x1b[32m", yellow: "\x1b[33m", cyan: "\x1b[36m",}
const {execSync} = require("child_process");
const fs = require("fs");
const WebSocketClient = require('websocket').client;
//const webpack = require("webpack");
/**
 * @callback HookCallback
 * @param {string} callbackName
 * @param {Function} callback
 */
/** @typedef {{tap:HookCallback, tapSync:HookCallback}} HookAction **/
/** @typedef {{
                environment             :HookAction,
                afterEnvironment        :HookAction,
                entryOption             :HookAction,
                afterPlugins            :HookAction,
                afterResolvers          :HookAction,
                initialize              :HookAction,
                beforeRun               :HookAction,
                run                     :HookAction,
                watchRun                :HookAction,
                normalModuleFactory     :HookAction,
                contextModuleFactory    :HookAction,
                beforeCompile           :HookAction,
                compile                 :HookAction,
                thisCompilation         :HookAction,
                compilation             :HookAction,
                make                    :HookAction,
                afterCompile            :HookAction,
                shouldEmit              :HookAction,
                emit                    :HookAction,
                afterEmit               :HookAction,
                assetEmitted            :HookAction,
                done                    :HookAction,
                additionalPass          :HookAction,
                failed                  :HookAction,
                invalid                 :HookAction,
                watchClose              :HookAction,
                infrastructureLog       :HookAction,
                log                     :HookAction}} CompilerHooks
 @see https://webpack.js.org/api/compiler-hooks/
 */

/** @typedef {import("./node_modules/webpack/lib/Compiler.js")|{options:{entry:Object}, webpack:Object|undefined, hooks:CompilerHooks}} Compiler */
/**
 * @property {string} version
 * @property {boolean} isWebpack5
 * @property {boolean} isWin
 */
class WatcherPlugin {
    constructor(params = {}) {
      try{
        if(!params.theme_id){
          // this is another way to get params from cli 
          let cachePath = path.join(process.cwd(), "/node_modules/.salla-cli");
          if(fs.existsSync(cachePath)) params = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
        }
      }catch(err){}
      
      let {wsport = 8001, sallaCli = "salla", theme_id, upload_url, store_id, draft_id} = params;
      
      this.sallaCli = sallaCli;
      this.theme_id = theme_id;
      this.upload_url = upload_url;
      this.store_id = store_id;
      this.draft_id = draft_id;
      this.wsport = wsport;
      this.files = {};
    }
  
    /**
     * @param {Compiler} compiler
     */
    apply(compiler) {
        if (!this.canWatch(compiler.options)) {
            return;
        }
        this.version = compiler.webpack && compiler.webpack.version ? compiler.webpack.version : '4.*';
        this.isWebpack5 = this.version.startsWith('5.');
        this.isWin = process.platform.toLowerCase().startsWith('win');

        console.log(color.green, '✓ Listening to webpack watch.', color.normal);
        this.addFilesToWatcher(compiler);
        this.connectToWsServer();
        this.watchingChangedFiles(compiler);
        this.afterCompile(compiler);
    }
    
    /**
     * @param {Compiler} compiler
     */  
    afterCompile(compiler) {
      compiler.hooks.afterCompile.tap('SallaAfterCompilePlugin', (compilation) => {
        if(this.connection) this.connection.sendUTF(JSON.stringify({ msg: "reload" }));
      });
    }
    /**
     * @param {Compiler} compiler
     */
    watchingChangedFiles(compiler) {
        compiler.hooks.watchRun.tap('watching', compiler_ => {
                let files = this.isWebpack5
                    ? Array.from(compiler_.modifiedFiles || [])
                    : Object.keys(compiler_.watchFileSystem.watcher.mtimes);
               
                files.map((file) => {
                  const FileExt = file.substr(file.length - 5);
                  if ([".twig",".json"].includes(FileExt)) this.addToQ(file);
                });
            }
        );
    }

    /**
     * @param {Compiler} compiler
     */
    addFilesToWatcher(compiler) {
        let filesToWatch = [...this.getEntry("src/views","twig"), ...this.getEntry("src","json")];
        compiler.hooks.afterEmit.tap('afterEmit', compilation =>
            compilation.fileDependencies = new Set([...compilation.fileDependencies, ...filesToWatch])
        );
    }

    getEntry(folder,type) {
        let viewsPath = path.join(process.cwd(), folder);
        return this.isWin && this.isWebpack5
            ? glob.sync(path.join(viewsPath, `**/*.${type}`).replace(/\\/g, "/"), {absolute: true}).map((file)=>file.replace(/\//g, "\\"))
            : glob.sync(path.join(viewsPath, `**/*.${type}`), {absolute: true});
    }

    /**
     * @param {{mode:'development'|'none'|'production', watch:boolean, ...}} options - @see https://webpack.js.org/configuration
     * @return {boolean}
     */
    canWatch(options) {
        if (!options.watch) return false;
        return !!this.theme_id;
    }
    connectToWsServer(){
        // connect to live reload server
        let client = new WebSocketClient();
            client.on('connectFailed', (error)=> {
            console.error('[x] Oops! Hot reload is currently not working. Check the error message for details: ',error.toString());
        });

        client.on('connect', (connection)=> {
            this.connection = connection;
            console.log(color.green, `✓ Performing hot reload on port ws://localhost:${this.wsport}`, color.normal);
        });
        client.connect(`ws://localhost:${this.wsport}`, 'echo-protocol');
    }
    addToQ(file) {
        if (this.files[file]) clearTimeout(this.files[file]);
        this.files[file] = setTimeout(() => {
          execSync(
            `${this.sallaCli} theme sync -f "${file}" -id ${this.theme_id}  -store_id ${this.store_id} -draft_id ${this.draft_id}  -upload_url ${this.upload_url}`,
            { stdio: "inherit" }
          );
          delete this.files[file];
        }, 700);
    }
}

module.exports = WatcherPlugin;
