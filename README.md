# Remote Water Readings

## How to generate the report

1. Install the dependencies
```
yarn install
```
2. Place the CSV consumption data file at the root of the folder and rename it `consumption_data.csv`
3. Run the report generation:
```
yarn run generate-report
```
4. The resulting CSV will be available under the `./readings` folder

## How to retrieve the consumption data

1. [Install `FService`](https://www.relay.de/en/products/software/fservice)

2. Connect to the logger using a USB/Serial cable

3. Launch `FService`

4. In the first tab `Info`, enter the `password` (the default password is `00001767` as per the [documentation](https://www.relay.de/fileadmin/user_upload/manuals/FSERV21E.pdf))



5. _OPTIONAL if retrieving the data for the first time_.

Once connected (look for the confirmation in the logs), retrieve the list of slaves in the `List of slaves` tab by clicking the `Start search for slaves` button.

6. Retrieve the consumption data in the `Remote Control` tab by clicking the button `Read by list of slaves`




