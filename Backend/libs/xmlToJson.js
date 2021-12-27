let xmlParser = require('xml2json');
module.exports.parser = (strXml) => {
    return JSON.parse(xmlParser.toJson(strXml))
}