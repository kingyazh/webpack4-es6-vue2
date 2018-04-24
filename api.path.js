'use strict'
module.exports = {
    API_ROOT : process.env.NODE_ENV === 'dev'?'"//test.caissa.com.cn/"':'"//prod.caissa.com.cn/"'
}