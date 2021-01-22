lncli fwdinghistory --start_time=1484092800 | cat > data/fwdinghistory.json
lncli listchannels | cat > data/channelsList.json
node scripts/displayData.js