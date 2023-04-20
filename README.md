# mastdatabase.co.uk proxy services

![](https://status.davw.network/api/v1/endpoints/apis_mastdatabase-co-uk-proxies/uptimes/7d/badge.svg) ![](https://status.davw.network/api/v1/endpoints/apis_mastdatabase-co-uk-proxies/response-times/7d/badge.svg) ![](https://status.davw.network/api/v1/endpoints/apis_mastdatabase-co-uk-proxies/health/badge.svg)

A variety of proxies, which allow you to fetch data from various mobile networks without setting up your own backend API service.

> Please don't abuse these. I don't want to have to update them if a network implements more stringent request validation, nor do I want my cheap VPS overloaded. Thanks.

This must be hosted alongside the [streetworks API](https://github.com/davwheat/one-network-streetworks-api) (not open source) to function fully.

**Production endpoint:** https://proxies.mastdatabase.co.uk/

## Endpoints

**Some endpoints are not documented here.**

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
