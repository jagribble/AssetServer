# AssetServer

## Data Model
There are 4 SQL tables that the server gets data from to simulate retrieving data from an alarm system
> - Organization
> - Asset
> - DataPoints
> - DataTypes

## Insert data
### Organization
> `POST /insert/organisation`

Expexted request body
```
{
  "name":"test_organisation"
}
```
### Asset
> `POST /:organisation/insert/asset`

`:organisation` is the organisation name
Expected request body
```
{
  "name":"test_asset",
  "assetX": 51.2413,
  "assetY": -0.9124
}
```

### DataTypes
> `POST /intert/datatype`

Expected request body
```
{
  "name":"Pressure",
  "unit":"Pa"
}
```

### Data Point
> `POST /insert/asset/:assetID/datapoint/datatype/:dataTypeID`

`:assetID` is the ID of the asset that the data point is for, `dataTypeID` is the ID of the data type for the data
Expected request body
```
{
  "time":"2038-01-19 03:14:07.999999"
  "data":"20"
}
```
