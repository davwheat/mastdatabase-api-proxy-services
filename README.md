# mastdatabase.co.uk proxy services

A variety of proxies, which allow you to fetch data from various mobile networks without setting up your own backend API service.

> Please don't abuse these. I don't want to have to update them if a network implements more stringent request validation, nor do I want my cheap VPS overloaded. Thanks.

**Production endpoint:** https://proxies.mastdatabase.co.uk/

## Endpoints

### `/uk/o2/coverage-map/sites`

#### Example

<details>
<summary>Example HTTP request</summary>

```
GET https://proxies.mastdatabase.co.uk/uk/o2/coverage-map/sites?lat=50.8290026634407&lon=-0.1409800773142767 HTTP/2.0

{
  "info": [
    "This service is provided free-of-charge (for now), courtesy of dav.network.",
    "If you use this a lot, please consider supporting me: https://github.com/sponsors/davwheat",
    "Documenation is found at https://github.com/davwheat/mastdatabase-api-proxy-services#readme",
    "Anyway, the raw data from the API you wanted is found below! Enjoy!"
  ],
  "ok": true,
  "data": {
    "customer": "68AA7B45",
    "raster_values": [
      {
        "layer": 0,
        "raw": -72,
        "cat": 1
      },
      {
        "layer": 1,
        "raw": -94,
        "cat": 2
      },
      {
        "layer": 2,
        "raw": -80,
        "cat": 1
      }
    ],
    "total": 29,
    "avg_distance": 587.6543156399999,
    "grid_srs": 900913,
    "search_point": {
      "geojson": {
        "type": "Point",
        "coordinates": [
          -0.133479,
          50.961951
        ]
      },
      "point": {
        "lon": -0.133479,
        "lat": 50.961951
      },
      "point_grid": {
        "x": -14858,
        "y": 6614566,
        "srs": 900913
      }
    },
    "search_results": [],
    "records": [
      {
        "counter": 1,
        "id": "1668930",
        "point": {
          "lon": -0.1334716849144785,
          "lat": 50.996626435877374
        },
        "point_grid": {
          "x": -14858,
          "y": 6620697
        },
        "distance": {
          "miles": 0.03885,
          "km": 0.06216000000000001
        }
      },
      {
        "counter": 2,
        "id": "1076714",
        "point": {
          "lon": -0.11657750716227708,
          "lat": 50.984763867269876
        },
        "point_grid": {
          "x": -12977.348735253887,
          "y": 6618599.069652313
        },
        "distance": {
          "miles": 0.01311,
          "km": 0.020976
        }
      },
      {
        "counter": 3,
        "id": "1891576",
        "point": {
          "lon": -0.08924432094756422,
          "lat": 50.985318781758714
        },
        "point_grid": {
          "x": -9934.632364074329,
          "y": 6618697.195967455
        },
        "distance": {
          "miles": 0.04207,
          "km": 0.06731200000000001
        }
      }
    ]
  }
}
```

</details>

#### Query parameters

| Parameter | Description                     | Required |
| --------- | ------------------------------- | -------- |
| `lat`     | Longitude to find sites around. | Yes      |
| `lon`     | Latitude to find sites around.  | Yes      |

### `/uk/three/coverage-map/tiles`

#### Notes

- The `i` parameter needs to be calculated with some maths. See below for Javascript code to do so, designed for use primarily with Leaflet:

```js
interface IViewData {
  bbox: L.BoundsExpression
  width: number
  height: number
  zoom: number
  tile: {
    row: number
    column: number
  }
  subdomain: string
}

function getTileUri(view: IViewData) {
  let { column: x, row: y } = view.tile

  const i = (1 << tileZoomLevel) - y - 1

  if (x >= x1 && x <= x2 && i >= i1 && i <= i2) {
    const qs = new URLSearchParams({
      layer: layerName,
      zoom: tileZoomLevel.toString(),
      x: x.toString(),
      i: i.toString(),
    })

    return `https://proxies.mastdatabase.co.uk/uk/three/coverage-map/tiles?${qs.toString()}`
  } else {
    // blank image
    return `data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==`
  }
}
```

#### Example

<details>
<summary>Example HTTP request</summary>

```

GET https://proxies.mastdatabase.co.uk/uk/three/coverage-map/tiles?layer=FiveG&zoom=14&x=8137&i=10885 HTTP/2.0

<Binary PNG data>
```

</details>

#### Query parameters

| Parameter | Description                                         | Required |
| --------- | --------------------------------------------------- | -------- |
| `layer`   | Map layer to pull from (`FiveG`/`4G`/`800`/`Fast`). | Yes      |
| `zoom`    | Map zoom level (`9`/`12`/`14`).                     | Yes      |
| `x`       | Map x-position                                      | Yes      |
| `i`       | Map y-position (complex)                            | Yes      |

### `/uk/three/ran-status`

#### Notes

- We have no idea what the `endpointFlags` are. They seem to be a letter, then 1-9.

#### Example

<details>
<summary>Example HTTP request</summary>

```
GET https://proxies.mastdatabase.co.uk/uk/three/ran-status?postcode=SW1A%201AA&endpoint=coverage HTTP/2.0

{
  "info": [
    "This service is provided free-of-charge (for now), courtesy of dav.network.",
    "If you use this a lot, please consider supporting me: https://github.com/sponsors/davwheat",
    "Documenation is found at https://github.com/davwheat/mastdatabase-api-proxy-services#readme",
    "Anyway, the raw data from the API you wanted is found below! Enjoy!"
  ],
  "ok": true,
  "data": {
    "data": {
      "outages": {
        "SW1A1AA": {
          "endpoint": "NOISSUEFOUND",
          "endpointFlags": [
            "c3"
          ]
        }
      },
      "content": {
        "NOISSUEFOUND": {
          "headline": "",
          "body": "We're not planning any maintenance for your area."
        }
      }
    }
  }
}
```

</details>

#### Query parameters

| Parameter  | Description                                                                         | Required |
| ---------- | ----------------------------------------------------------------------------------- | -------- |
| `postcode` | Postcode to check against. For spaces, provide a space, or `%20`. `+` is not valid. | Yes      |
| `endpoint` | Three UK API endpoint to check. One of `outages`, `coverage` or `hbb`.              | Yes      |

```

```
