const path = require("path");   
module.exports ={
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname,"build"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },  
    module:{
        rules:[
            {
                test:/\.tsx?$/,
                loader: "ts-loader",

            }
        ]
    },
    plugins:[]

}