// calls to 1ml API

//1. if can't find remote pubkey --> use 1ml to find it
//2. for each pubkey, use 1ml to find the corresponding alias

const axios = require('axios')

const yourNodePubKey = require("../config.json").yourNodePubKey

async function getAlias(pubKey) {
    const url = `https://1ml.com/node/${pubKey}/json`
    const resp = await axios.get(url)
    const alias = resp.data.alias
    return alias
}

async function getPubKeyFromChanId(chanId) {
    const url = `https://1ml.com/channel/${chanId}/json`
    const resp = await axios.get(url)
    const node1 = resp.data.node1_pub
    const node2 = resp.data.node2_pub
    if (node1 == yourNodePubKey) {
        return node2
    }else{
        return node1
    }
}

module.exports = {
    getAlias:getAlias,
    getPubKeyFromChanId:getPubKeyFromChanId
}