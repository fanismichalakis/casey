rawJson = require('../data/fwdinghistory.json')
fwdingEvents = rawJson.forwarding_events

function getChannelIds() {
    channelIdList = []
    for (eventIndex in fwdingEvents) {
        chanIdIn = fwdingEvents[eventIndex].chan_id_in
        chanIdOut = fwdingEvents[eventIndex].chan_id_out
        if (!channelIdList.includes(chanIdIn)) {
            channelIdList.push(chanIdIn)
        }
        if (!channelIdList.includes(chanIdOut)) {
            channelIdList.push(chanIdOut)
        }
    }

    return channelIdList
}

function getTotalAmountRoutedIn(chanId, precision) {
    // compute amount in msat first
    totalRoutedAmount = 0
    for (eventIndex in fwdingEvents) {
        if (fwdingEvents[eventIndex].chan_id_in == chanId) {
            totalRoutedAmount += Number(fwdingEvents[eventIndex].amt_in_msat)
        }
    }

    // return the result in sat or msat depending on precision
    if (precision == "msat") {
        return totalRoutedAmount
    }else if(precision == "sat") {
        totalRoutedAmountSat = Math.trunc(totalRoutedAmount/1000)
        return totalRoutedAmountSat
    }else{
        console.log("Error: precison must be either 'sat' or 'msat'.")
    }
}

function getTotalAmountRoutedOut(chanId, precision) {
    // compute amount in msat first
    totalRoutedAmount = 0
        for (eventIndex in fwdingEvents) {
            if (fwdingEvents[eventIndex].chan_id_out == chanId) {
                totalRoutedAmount += Number(fwdingEvents[eventIndex].amt_out_msat)
            }
        }

    // return the result in sat or msat depending on precision
    if (precision == "msat") {
        return totalRoutedAmount
    }else if(precision == "sat") {
        totalRoutedAmountSat = Math.trunc(totalRoutedAmount/1000)
        return totalRoutedAmountSat
    }else{
        console.log("Error: precison must be either 'sat' or 'msat'.")
    }
}

function getTotalAmountFee(chanId, precision) {
    // compute amount in msat first
    totalFee = 0
    for (eventIndex in fwdingEvents) {
        if (fwdingEvents[eventIndex].chan_id_in == chanId) {
            totalFee += Number(fwdingEvents[eventIndex].fee_msat)
        }
    }

    // return the result in sat or msat depending on precision
    if (precision == "msat") {
        return totalFee
    }else if(precision == "sat") {
        totalFeeSat = Math.trunc(totalFee/1000)
        return totalFeeSat
    }else{
        console.log("Error: precison must be either 'sat' or 'msat'.")
    }
}

module.exports = {
    getChannelIds:getChannelIds,
    getTotalAmountRoutedIn:getTotalAmountRoutedIn,
    getTotalAmountRoutedOut:getTotalAmountRoutedOut,
    getTotalAmountFee:getTotalAmountFee
}