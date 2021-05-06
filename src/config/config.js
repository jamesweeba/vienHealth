module.exports={
    jwtSecret: process.env.JWT_SECRETE ||"indeedthisisasecret",
    port: process.env.PORT || 1900,
    databaseHost:process.env.DATABASE_HOST||'localhost',
    databasePort:process.env.DATABASE_PORT || 27017

}