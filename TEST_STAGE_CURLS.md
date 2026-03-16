# Lead Draft Test Curls

This file captures the current curl commands for testing the lead draft flow stage by stage.

Base URL used below:

```bash
http://localhost:3000/api
```

## 1. Create Lead Draft

```bash
curl -X POST http://localhost:3000/api/lead-drafts \
  -H "Content-Type: application/json" \
  -d '{
    "contact": {
      "contactInformation": {
        "firstName": "FirstName",
        "lastName": "LastName",
        "phone": "+49 00000000000",
        "email": "email@example.com",
        "newsletterSingleOptIn": true
      }
    }
  }'
```

Expected response shape:

```json
{
  "leadStage": "lead_capture",
  "dataAcquisitionLink": null,
  "appointmentBookingLink": null
}
```

Use the returned or stored draft id in the next calls. The examples below use:

```bash
a113d492-283f-4f3b-97a7-292ea02673a5
```

## 2. Home Type

```bash
curl -X PATCH http://localhost:3000/api/lead-drafts/a113d492-283f-4f3b-97a7-292ea02673a5 \
  -H "Content-Type: application/json" \
  -d '{
    "formStep": "home_type",
    "building": {
      "buildingInformation": {
        "immoType": "Einfamilienhaus / Zweifamilienhaus",
        "residentialUnits": 1
      },
      "ownershipRelationships": {
        "ownerOccupiedHousing": true,
        "type": "one_owner"
      }
    }
  }'
```

## 3. Current Heating

```bash
curl -X PATCH http://localhost:3000/api/lead-drafts/a113d492-283f-4f3b-97a7-292ea02673a5 \
  -H "Content-Type: application/json" \
  -d '{
    "formStep": "current_heating",
    "building": {
      "energyRelevantInformation": {
        "locationHeating": "Keller"
      }
    },
    "heatingSystem": {
      "systemType": "Erdgas"
    }
  }'
```

## 4. Property Details

```bash
curl -X PATCH http://localhost:3000/api/lead-drafts/a113d492-283f-4f3b-97a7-292ea02673a5 \
  -H "Content-Type: application/json" \
  -d '{
    "formStep": "property_details",
    "building": {
      "address": {
        "street": "Hohenzollernring 22-24",
        "city": "Köln",
        "postalCode": "50672",
        "countryCode": "DE"
      },
      "buildingInformation": {
        "heritageProtection": "Nein",
        "constructionYearString": "2001-2010",
        "livingSpace": 195,
        "personsHousehold": 4
      },
      "energyRelevantInformation": {
        "heatedArea": 185,
        "typeOfHeating": "Heizkörper + Fußbodenheizung"
      }
    }
  }'
```

At this point, the expected business stage is typically:

```json
{
  "leadStage": "qualification",
  "dataAcquisitionLink": null,
  "appointmentBookingLink": null
}
```

## 5. Technical Details

```bash
curl -X PATCH http://localhost:3000/api/lead-drafts/a113d492-283f-4f3b-97a7-292ea02673a5 \
  -H "Content-Type: application/json" \
  -d '{
    "formStep": "technical_details",
    "building": {
      "buildingInformation": {
        "boilerRoomSize": "mehr als 4 qm",
        "installationLocationCeilingHeight": "180 - 199 cm",
        "widthPathway": "Ja",
        "heightPathway": "Ja",
        "roomsBetweenHeatingRoomAndOutdoorUnit": "one_room",
        "meterClosetLocation": "Keller",
        "electricityConnectionLocation": "Keller",
        "groundingType": "grounding_spike_or_foundation",
        "hasSolarThermalSystem": false
      }
    },
    "heatingSystem": {
      "consumption": 9000,
      "consumptionUnit": "Kilowattstunden (kWh)",
      "constructionYearHeatingSystem": 1995,
      "floorHeatingConnectedToReturnPipe": false,
      "floorHeatingOwnHeatingCircuit": true,
      "floorHeatingOnlyInSmallRooms": false,
      "numberOfFloorHeatingDistributors": 1,
      "numberOfRadiators": 10,
      "domesticHotWaterByHeatpump": true,
      "domesticHotWaterCirculationPump": "no",
      "domestic_water_station": "yes"
    },
    "project": {
      "timeline": "3-6 Monate",
      "householdIncome": "more_than_40k_gross",
      "statusOfFoundationConstruction": "Vamo",
      "fullReplacementOfHeatingSystemPlanned": true,
      "additionalDisposal": []
    }
  }'
```

Expected response shape after this happy path:

```json
{
  "leadStage": "discovery",
  "dataAcquisitionLink": null,
  "appointmentBookingLink": null
}
```
