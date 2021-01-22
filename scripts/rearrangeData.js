const extract = require('./extractData')
const oneml = require('./1ml')

rawChannelList = require('../data/channelsList.json')
channels = rawChannelList.channels

function pairChannelWithRemoteId(chanId) {
     for (index in channels) {
         if (channels[index].chan_id == chanId) {
             return channels[index].remote_pubkey
         }
     }

     return "Can't find remote pub_key"
}

function getChannelsAndRemote() {
    channelIds = extract.getChannelIds()
    channelAndRemote = {}
    for (i in channelIds) {
        let remote = pairChannelWithRemoteId(channelIds[i])
        channelAndRemote[channelIds[i]] = {"remote_pub_key":remote}
    }

    return channelAndRemote
}

async function channelAndAlias() {
    let channelAndRemote = getChannelsAndRemote()
    console.log("Fetching aliases from 1ml")
    for (index in channelAndRemote) {
        if (channelAndRemote[index]["remote_pub_key"] !== "Can't find remote pub_key") {
            channelAndRemote[index]["alias"] = await oneml.getAlias(channelAndRemote[index]["remote_pub_key"])
        }else if(channelAndRemote[index]["remote_pub_key"] == "Can't find remote pub_key"){
            channelAndRemote[index]["remote_pub_key"] = await oneml.getPubKeyFromChanId(index)
            channelAndRemote[index]["alias"] = await oneml.getAlias(channelAndRemote[index]["remote_pub_key"])
        }
    }

    return channelAndRemote
}

function computeRoutedVolumes(channels) {
    for (channel in channels) {
        routedVolumeIn = extract.getTotalAmountRoutedIn(channel, "sat")
        channels[channel]["total_routed_volume_sat_in"] = routedVolumeIn
        routedVolumeOut = extract.getTotalAmountRoutedOut(channel, "sat")
        channels[channel]["total_routed_volume_sat_out"] = routedVolumeOut
    }
}

function computeFees(channels) {
    for (channel in channels) {
        collectedFee = extract.getTotalAmountFee(channel, "sat")
        channels[channel]["total_collected_fee"] = collectedFee
    }
}

function totalVolumeIn(channels) {
    totalIn = 0
    for (channel in channels) {
        totalIn += Number(channels[channel]["total_routed_volume_sat_in"])
    }

    return totalIn
}

function totalVolumeOut(channels) {
    totalOut = 0
    for (channel in channels) {
        totalOut += Number(channels[channel]["total_routed_volume_sat_out"])
    }

    return totalOut
}

function totalFee(channels) {
    totalFee = 0
    for (channel in channels) {
        totalFee += Number(channels[channel]["total_collected_fee"])
    }

    return totalFee
}

module.exports = {
    channelAndAlias:channelAndAlias,
    computeRoutedVolumes:computeRoutedVolumes,
    computeFees:computeFees,
    totalVolumeIn:totalVolumeIn,
    totalVolumeOut:totalVolumeOut,
    totalFee:totalFee
}