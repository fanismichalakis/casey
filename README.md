# Casey, a CLI tool that prints your Lightning node's statistics

Casey is a simple CLI tool that allows you yo print stats about your Lightning Network routing node right in your terminal.
For now, it performs one really simple task : summing up all routing data in one table :

| (index) | alias | total_routed_volume_sat_in | total_routed_volume_sat_out | total_collected_fee |
| :---: | :---: | :---: | :---: | :---: |
| remote node pubkey | remote node alias | total number of sats routed from this node to another node | total number of sats routed from another node to this node | total fee collected from this node |

It also displays the sum of sats routed + the total collected fee.

In the future, it will be able to do more complex tasks.

## Usage

1. Clone the repo in your node
2. Run ‘npm install‘ to install the packages. We focused on a clean and strict package requirement (no vulnerability policy).
3. Grant the ‘getStats.sh‘ file the rigths required to run ‘lncli‘ commands in your configuration + grant the access rights to write inside the data folder
4. Edit the ‘config.json‘ file to add your node's pubkey
5. Run ‘getStats.sh‘.

## Why Casey ?

Because Casey Node Stats. That's an Amecian YouTube Tech joke.

## TODO :
- refactor so that the we don't rely on 1ml(.)com (it was the easy way, should not stay as is),
- allow user to select a specific timeframe instead of the node's whole lifespan,
- no need to print the ‘fwdinghistory‘ and ‘listchannels‘ in files, just use them as objects ?
