const rearrange = require('./rearrangeData');

(async () => {
    // Build channels object with pubkeys and aliases
    const chanAndAlias = await rearrange.channelAndAlias()

    // Now let's add routed volume in sats
    rearrange.computeRoutedVolumes(chanAndAlias)
    rearrange.computeFees(chanAndAlias)

    // Lets check the totals
    totalRoutedIn = rearrange.totalVolumeIn(chanAndAlias)
    totalRoutedOut = rearrange.totalVolumeOut(chanAndAlias)
    totalFee = rearrange.totalFee(chanAndAlias)
    console.log(`All in all:\n
                    ${totalRoutedIn} sats were routed from a remote node to your node,\n
                    ${totalRoutedOut} sats were routed from your node to a remote node,\n
                    resulting in a total collected fee of ${totalFee}.`)

    // Let's print the results in a table
    console.table(chanAndAlias, ["alias", "total_routed_volume_sat_in", "total_routed_volume_sat_out", "total_collected_fee"])
})()