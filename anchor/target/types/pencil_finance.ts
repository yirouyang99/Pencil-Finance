/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/pencil_finance.json`.
 */
export type PencilFinance = {
  "address": "JAVuBXeBZqXNtS73azhBDAoYaaAFfo4gWXoZe2e7Jf8H",
  "metadata": {
    "name": "pencilFinance",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createBundleToken",
      "discriminator": [
        165,
        104,
        112,
        155,
        33,
        153,
        241,
        191
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "bundleAccount"
        }
      ],
      "args": [
        {
          "name": "loanAmount",
          "type": "u64"
        },
        {
          "name": "trancheRatios",
          "type": "u8"
        },
        {
          "name": "interestRate",
          "type": "u8"
        },
        {
          "name": "lockUpPeriod",
          "type": "u32"
        }
      ]
    },
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [],
      "args": []
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
  "types": [
    {
      "name": "bundleAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "loanAmount",
            "type": "u64"
          },
          {
            "name": "trancheRatios",
            "type": "u8"
          },
          {
            "name": "interestRate",
            "type": "u8"
          },
          {
            "name": "lockUpPeriod",
            "type": "u32"
          }
        ]
      }
    }
  ]
};
