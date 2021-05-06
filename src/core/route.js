
const users=require('../users/routes');
const auth=require('../auth/routes')
const bodyParser = require("body-parser");
const cors=require('cors');
const fileUpload = require("express-fileupload");
const port=require('../config/config').port



module.exports={
    startApp:(app)=>{

        app.listen(port, () => {
            console.log('magic happens on port ' + port);
        });


        app.use(fileUpload());
        app.use(bodyParser.json({ limit: '50mb' }), bodyParser.urlencoded({ extended: true, limit: '50mb' }));
        app.use(cors());


        app.use('/api/v1/users',users)
        app.use('/api/v1/auth',auth)
       
        
    }
}