'use strict';
const config = require('./config')
const Hapi = require('@hapi/hapi');
const db = require('./DB');
const axios = require('axios');
const { parseString } = require("xml2js"); 


const download = async () =>{
    const count = await db.query('SELECT COUNT(*) FROM db_product');
    if(count.rows[0].count == 0){
        const {data} = await axios.get(`http://api.elevenia.co.id/rest/prodservices/product/listing`,{headers: {"openapikey" : config.open_api}});
            let result;
            await parseString(data, function (err, results) {
                if(!err) result = results
            });

            for (let i = 0; i < result.Products.product.length; i++) {
                try {
                    db.query(
                        `INSERT INTO db_product (product_name, sku, description, price_prod) VALUES( $1, $2, $3, $4)`,
                        [result.Products.product[i].prdNm[0], result.Products.product[i].sellerPrdCd[0], 
                        result.Products.product[i].dispCtgrNm[0], result.Products.product[i].selPrc[0]]);

                } catch (error) {
                    console.log(error);
                    break;
                }
                
            }

    }
}


const init = async () =>{
    const server = new Hapi.server({
        host:config.host,
        port:config.port
    })
    await db.connect();

    server.route([
        {
            method: 'GET',
            path: '/',
            handler: async (request,h) =>{
                return "Hello"
            },
        },
        {
            config: {
                cors: {
                    origin: ['*'],
                    additionalHeaders: ['cache-control', 'x-requested-with']
                }
            },
            method: 'GET',
            path: '/product',
            handler: async (request,h) =>{
                try {
                    const data = await db.query('SELECT * FROM db_product ORDER BY id asc');
                    return h.response({
                        status:200,
                        message: "Success",
                        data: data.rows
                    })
                } catch (error) {
                    return h.response({
                        status:400,
                        message: error.message,
                        data: []
                    })
                }

            }
        },
        {
            config: {
                cors: {
                    origin: ['*'],
                    additionalHeaders: ['cache-control', 'x-requested-with']
                }
            },
            method: 'DELETE',
            path: '/product/{ID}',
            handler: async (request,h) =>{
                try {
                    const data = await db.query('DELETE FROM db_product WHERE id = $1',[request.params.ID]);
                    return h.response({
                        status:200,
                        message: "Success",
                    })
                } catch (error) {
                    return h.response({
                        status:400,
                        message: error.message,
                    })
                }
     
            }
        },
        {
            config: {
                cors: {
                    origin: ['*'],
                    additionalHeaders: ['cache-control', 'x-requested-with']
                }
            },
            method: 'PUT',
            path: '/product/{ID}',
            handler: async (request,h) =>{
                try {
                    const data = await db.query(
                        `UPDATE db_product
                        SET product_name = $1,
                        sku = $2,
                        description = $3,
                        price_prod = $4
                        WHERE id = $5`,
                        [request.payload.product_name, request.payload.sku, request.payload.description, request.payload.price_prod,request.params.ID]);
                    return h.response({
                        status:200,
                        message: "Success",
                    })
                } catch (error) {
                    return h.response({
                        status:400,
                        message: error.message,
                    })
                }
     
            }
        },
        {
            config: {
                cors: {
                    origin: ['*'],
                    additionalHeaders: ['cache-control', 'x-requested-with']
                }
            },
            method: 'GET',
            path: '/product/{ID}',
            handler: async (request,h) =>{
                try {
                    const data = await db.query('SELECT * FROM db_product WHERE id = $1', [request.params.ID]);
                    return h.response({
                        status:200,
                        message: "Success",
                        data:data.rows
                    })
                } catch (error) {
                    return h.response({
                        status:400,
                        message: error.message,
                    })
                }
     
            }
        }
    ]);

    await server.start();
    console.log(`Server start on :${server.info.uri}`);
    download()

}

process.on('UnHandleRejection',(err) =>{
    console.log(err);
    process.exit(1);
})


init()