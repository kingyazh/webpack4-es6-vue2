'use strict'
module.exports = {
    API_ROOT : process.env.NODE_ENV === 'dev'?'"//test.domain.com/"':'"//prod.domain.com/"'
}