export default {
  US: {
    iso3166Code: 'US',
    displayName: 'United States',
    addressForm: {
      addressFields: {
        Address: {
          name: 'Address',
          addressPart: 'line1',
          position: 1,
          required: true,
          validationRegex: '',
          countryCode: 'US',
        },
        'Address line 2': {
          name: 'Address line 2',
          addressPart: 'line2',
          position: 1,
          required: false,
          validationRegex: '',
          countryCode: 'US',
        },
        City: {
          name: 'City',
          addressPart: 'city',
          position: 1,
          required: true,
          validationRegex: '',
          countryCode: 'US',
        },
        State: {
          name: 'State',
          addressPart: 'stateProvince',
          options: [
            {
              fieldOptionValue: 'APO',
              fieldOptionLabel: 'APO - Army/Air Force Post Office',
            },
            {
              fieldOptionValue: 'AE',
              fieldOptionLabel: 'AE - Armed Forces Europe',
            },
            {
              fieldOptionValue: 'AP',
              fieldOptionLabel: 'AP - Armed Forces Pacific',
            },
            {
              fieldOptionValue: 'AA',
              fieldOptionLabel: 'AA - Armed Forces Americas',
            },
            {
              fieldOptionValue: 'AL',
              fieldOptionLabel: 'Alabama',
            },
            {
              fieldOptionValue: 'AK',
              fieldOptionLabel: 'Alaska',
            },
            {
              fieldOptionValue: 'AS',
              fieldOptionLabel: 'American Samoa',
            },
            {
              fieldOptionValue: 'AZ',
              fieldOptionLabel: 'Arizona',
            },
            {
              fieldOptionValue: 'AR',
              fieldOptionLabel: 'Arkansas',
            },
            {
              fieldOptionValue: 'CA',
              fieldOptionLabel: 'California',
            },
            {
              fieldOptionValue: 'CO',
              fieldOptionLabel: 'Colorado',
            },
            {
              fieldOptionValue: 'CT',
              fieldOptionLabel: 'Connecticut',
            },
            {
              fieldOptionValue: 'DE',
              fieldOptionLabel: 'Delaware',
            },
            {
              fieldOptionValue: 'DC',
              fieldOptionLabel: 'District of Columbia',
            },
            {
              fieldOptionValue: 'FPO',
              fieldOptionLabel:
                'FPO - Fleet Post Office or Federal Post Office',
            },
            {
              fieldOptionValue: 'FL',
              fieldOptionLabel: 'Florida',
            },
            {
              fieldOptionValue: 'FM',
              fieldOptionLabel: 'Federated States of Micronesia',
            },
            {
              fieldOptionValue: 'GA',
              fieldOptionLabel: 'Georgia',
            },
            {
              fieldOptionValue: 'GU',
              fieldOptionLabel: 'Guam',
            },
            {
              fieldOptionValue: 'HI',
              fieldOptionLabel: 'Hawaii',
            },
            {
              fieldOptionValue: 'ID',
              fieldOptionLabel: 'Idaho',
            },
            {
              fieldOptionValue: 'IL',
              fieldOptionLabel: 'Illinois',
            },
            {
              fieldOptionValue: 'IN',
              fieldOptionLabel: 'Indiana',
            },
            {
              fieldOptionValue: 'IA',
              fieldOptionLabel: 'Iowa',
            },
            {
              fieldOptionValue: 'KS',
              fieldOptionLabel: 'Kansas',
            },
            {
              fieldOptionValue: 'KY',
              fieldOptionLabel: 'Kentucky',
            },
            {
              fieldOptionValue: 'LA',
              fieldOptionLabel: 'Louisiana',
            },
            {
              fieldOptionValue: 'ME',
              fieldOptionLabel: 'Maine',
            },
            {
              fieldOptionValue: 'MD',
              fieldOptionLabel: 'Maryland',
            },
            {
              fieldOptionValue: 'MA',
              fieldOptionLabel: 'Massachusetts',
            },
            {
              fieldOptionValue: 'MH',
              fieldOptionLabel: 'Marshall Islands',
            },
            {
              fieldOptionValue: 'MI',
              fieldOptionLabel: 'Michigan',
            },
            {
              fieldOptionValue: 'MN',
              fieldOptionLabel: 'Minnesota',
            },
            {
              fieldOptionValue: 'MP',
              fieldOptionLabel: 'Northern Mariana Islands',
            },
            {
              fieldOptionValue: 'MS',
              fieldOptionLabel: 'Mississippi',
            },
            {
              fieldOptionValue: 'MO',
              fieldOptionLabel: 'Missouri',
            },
            {
              fieldOptionValue: 'MT',
              fieldOptionLabel: 'Montana',
            },
            {
              fieldOptionValue: 'NE',
              fieldOptionLabel: 'Nebraska',
            },
            {
              fieldOptionValue: 'NV',
              fieldOptionLabel: 'Nevada',
            },
            {
              fieldOptionValue: 'NH',
              fieldOptionLabel: 'New Hampshire',
            },
            {
              fieldOptionValue: 'NJ',
              fieldOptionLabel: 'New Jersey',
            },
            {
              fieldOptionValue: 'NM',
              fieldOptionLabel: 'New Mexico',
            },
            {
              fieldOptionValue: 'NY',
              fieldOptionLabel: 'New York',
            },
            {
              fieldOptionValue: 'NC',
              fieldOptionLabel: 'North Carolina',
            },
            {
              fieldOptionValue: 'ND',
              fieldOptionLabel: 'North Dakota',
            },
            {
              fieldOptionValue: 'OH',
              fieldOptionLabel: 'Ohio',
            },
            {
              fieldOptionValue: 'OK',
              fieldOptionLabel: 'Oklahoma',
            },
            {
              fieldOptionValue: 'OR',
              fieldOptionLabel: 'Oregon',
            },
            {
              fieldOptionValue: 'PA',
              fieldOptionLabel: 'Pennsylvania',
            },
            {
              fieldOptionValue: 'PR',
              fieldOptionLabel: 'Puerto Rico',
            },
            {
              fieldOptionValue: 'PW',
              fieldOptionLabel: 'Palau',
            },
            {
              fieldOptionValue: 'RI',
              fieldOptionLabel: 'Rhode Island',
            },
            {
              fieldOptionValue: 'SC',
              fieldOptionLabel: 'South Carolina',
            },
            {
              fieldOptionValue: 'SD',
              fieldOptionLabel: 'South Dakota',
            },
            {
              fieldOptionValue: 'TN',
              fieldOptionLabel: 'Tennessee',
            },
            {
              fieldOptionValue: 'TX',
              fieldOptionLabel: 'Texas',
            },
            {
              fieldOptionValue: 'UT',
              fieldOptionLabel: 'Utah',
            },
            {
              fieldOptionValue: 'VT',
              fieldOptionLabel: 'Vermont',
            },
            {
              fieldOptionValue: 'VA',
              fieldOptionLabel: 'Virginia',
            },
            {
              fieldOptionValue: 'VI',
              fieldOptionLabel: 'Virgin Islands',
            },
            {
              fieldOptionValue: 'WA',
              fieldOptionLabel: 'Washington',
            },
            {
              fieldOptionValue: 'WV',
              fieldOptionLabel: 'West Virginia',
            },
            {
              fieldOptionValue: 'WI',
              fieldOptionLabel: 'Wisconsin',
            },
            {
              fieldOptionValue: 'WY',
              fieldOptionLabel: 'Wyoming',
            },
          ],
          position: 1,
          required: true,
          validationRegex: '',
          countryCode: 'US',
        },
        ZIP: {
          name: 'ZIP',
          addressPart: 'postalCode',
          position: 1,
          required: true,
          validationRegex: '^(\\d{5}|\\d{5}-\\d{4})$',
          countryCode: 'US',
        },
      },
    },
    locales: ['en_US'],
    isSupported: true,
    addressFormatTemplate:
      '${address.line1}\n${address.line2}\n${address.city} ${address.stateProvince} ${address.postalCode}',
  },
  CA: {
    iso3166Code: 'CA',
    displayName: 'Canada',
    addressForm: {
      addressFields: {
        Address: {
          name: 'Address',
          addressPart: 'line1',
          position: 1,
          required: true,
          validationRegex: '',
          countryCode: 'CA',
        },
        'Address line 2': {
          name: 'Address line 2',
          addressPart: 'line2',
          position: 1,
          required: false,
          validationRegex: '',
          countryCode: 'CA',
        },
        City: {
          name: 'City',
          addressPart: 'city',
          position: 1,
          required: true,
          validationRegex: '',
          countryCode: 'CA',
        },
        Province: {
          name: 'Province',
          addressPart: 'stateProvince',
          options: [
            {
              fieldOptionValue: 'AB',
              fieldOptionLabel: 'Alberta',
            },
            {
              fieldOptionValue: 'BC',
              fieldOptionLabel: 'British Columbia',
            },
            {
              fieldOptionValue: 'MB',
              fieldOptionLabel: 'Manitoba',
            },
            {
              fieldOptionValue: 'NB',
              fieldOptionLabel: 'New Brunswick',
            },
            {
              fieldOptionValue: 'NL',
              fieldOptionLabel: 'Newfoundland and Labrador',
            },
            {
              fieldOptionValue: 'NT',
              fieldOptionLabel: 'Northwest Territories',
            },
            {
              fieldOptionValue: 'NS',
              fieldOptionLabel: 'Nova Scotia',
            },
            {
              fieldOptionValue: 'NU',
              fieldOptionLabel: 'Nunavut',
            },
            {
              fieldOptionValue: 'ON',
              fieldOptionLabel: 'Ontario',
            },
            {
              fieldOptionValue: 'PE',
              fieldOptionLabel: 'Prince Edward Island',
            },
            {
              fieldOptionValue: 'QC',
              fieldOptionLabel: 'Quebec',
            },
            {
              fieldOptionValue: 'SK',
              fieldOptionLabel: 'Saskatchewan',
            },
            {
              fieldOptionValue: 'YT',
              fieldOptionLabel: 'Yukon Territory',
            },
          ],
          position: 1,
          required: true,
          validationRegex: '',
          countryCode: 'CA',
        },
        'Postal code': {
          name: 'Postal code',
          addressPart: 'postalCode',
          position: 1,
          required: true,
          validationRegex: '^([A-Za-z]\\d[A-Za-z]) ?(\\d[A-Za-z]\\d)$',
          countryCode: 'CA',
        },
      },
    },
    locales: ['en_CA', 'fr_CA'],
    isSupported: true,
    addressFormatTemplate:
      '${address.line1}\n${address.line2}\n${address.city}, ${address.stateProvince}\n${address.postalCode}\n${address.country}',
  },
  ID: {
    iso3166Code: 'ID',
    displayName: 'Indonesia',
    addressForm: {
      addressFields: {
        Address: {
          name: 'Address',
          addressPart: 'line1',
          position: 1,
          required: true,
          validationRegex: '',
          countryCode: 'ID',
        },
        'Address line 2': {
          name: 'Address line 2',
          addressPart: 'line2',
          position: 1,
          required: false,
          validationRegex: '',
          countryCode: 'ID',
        },
        'Village / Kelurahan, Subdistrict / Kecematan': {
          name: 'Village / Kelurahan, Subdistrict / Kecematan',
          addressPart: 'city',
          position: 1,
          required: true,
          validationRegex: '',
          countryCode: 'ID',
        },
        'City and Regency Postal Code': {
          name: 'City and Regency Postal Code',
          addressPart: 'city',
          position: 2,
          required: true,
          validationRegex: '',
          countryCode: 'ID',
        },
        Province: {
          name: 'Province',
          addressPart: 'stateProvince',
          position: 1,
          required: false,
          validationRegex: '',
          countryCode: 'ID',
        },
        State: {
          name: 'State',
          addressPart: 'stateProvince',
          position: 2,
          required: true,
          validationRegex: '',
          countryCode: 'ID',
        },
      },
    },
    locales: ['in_ID'],
    isSupported: true,
    addressFormatTemplate:
      '${address.line1}\n${address.line2}\n${address.city}, ${address.stateProvince}\n${address.postalCode}\n${address.country}',
  },
  UFO: { addressForm: { addressFields: {} } },
}
