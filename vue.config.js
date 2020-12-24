let proxyObj={};
proxyObj['/api']={
    ws:false,
    target:'http://localhost:8024',
    changeOrigin:true,
    pathRewrite:{
        '^/api':''
    }
};
module.exports={
    devServer:{
        host:'localhost',
        port:9000,
        proxy:proxyObj
    }

};