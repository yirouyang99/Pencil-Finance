/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/pencil_finance.json`.
 */
export type PencilFinance = {
  "address": "6yovnUkuEdNBGgxqDzUgQLkGg75h2zDQsNwG6Zipp5ML",
  "metadata": {
    "name": "pencilFinance",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createBundle",
      "discriminator": [
        108,
        43,
        176,
        128,
        45,
        94,
        197,
        95
      ],
      "accounts": [
        {
          "name": "lendingCompany",
          "writable": true,
          "signer": true
        },
        {
          "name": "bundleAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "companyName"
              },
              {
                "kind": "arg",
                "path": "bundleIndex"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "bundleIndex",
          "type": "i64"
        },
        {
          "name": "totalAmount",
          "type": "u64"
        },
        {
          "name": "juniorRatio",
          "type": "u16"
        },
        {
          "name": "seniorRatio",
          "type": "u16"
        },
        {
          "name": "juniorRate",
          "type": "u16"
        },
        {
          "name": "seniorRate",
          "type": "u16"
        },
        {
          "name": "startTime",
          "type": "i64"
        },
        {
          "name": "endTime",
          "type": "i64"
        },
        {
          "name": "redemptionTime",
          "type": "i64"
        },
        {
          "name": "juniorPeriod",
          "type": "i64"
        },
        {
          "name": "minFundingThreshold",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "bundleAccount",
      "discriminator": [
        142,
        19,
        74,
        167,
        10,
        26,
        33,
        129
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidRatio",
      "msg": "Junior and Senior ratios must sum to 100% (10000 basis points)"
    },
    {
      "code": 6001,
      "name": "invalidStartTime",
      "msg": "Start time must be in the future"
    },
    {
      "code": 6002,
      "name": "invalidEndTime",
      "msg": "End time must be after start time"
    },
    {
      "code": 6003,
      "name": "invalidRedemptionTime",
      "msg": "Redemption time must be after end time"
    },
    {
      "code": 6004,
      "name": "invalidJuniorPeriod",
      "msg": "Junior period must be positive"
    },
    {
      "code": 6005,
      "name": "invalidThreshold",
      "msg": "Invalid funding threshold"
    }
  ],
  "types": [
    {
      "name": "bundleAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "status",
            "type": {
              "defined": {
                "name": "bundleStatus"
              }
            }
          },
          {
            "name": "lendingCompany",
            "type": "pubkey"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "raisedAmount",
            "type": "u64"
          },
          {
            "name": "juniorRatio",
            "type": "u16"
          },
          {
            "name": "seniorRatio",
            "type": "u16"
          },
          {
            "name": "juniorRate",
            "type": "u16"
          },
          {
            "name": "seniorRate",
            "type": "u16"
          },
          {
            "name": "startTime",
            "type": "i64"
          },
          {
            "name": "endTime",
            "type": "i64"
          },
          {
            "name": "redemptionTime",
            "type": "i64"
          },
          {
            "name": "approved",
            "type": "bool"
          },
          {
            "name": "isActive",
            "type": "bool"
          },
          {
            "name": "juniorPeriod",
            "type": "i64"
          },
          {
            "name": "minFundingThreshold",
            "type": "u64"
          },
          {
            "name": "lastStatusUpdateTime",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "bundleStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "upcoming"
          },
          {
            "name": "raising"
          },
          {
            "name": "active"
          },
          {
            "name": "finalRedemption"
          },
          {
            "name": "completed"
          },
          {
            "name": "failed"
          }
        ]
      }
    }
  ]
};
