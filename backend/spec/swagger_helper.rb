# frozen_string_literal: true

require 'rails_helper'

RSpec.configure do |config|
  # Specify a root folder where Swagger JSON files are generated
  # NOTE: If you're using the rswag-api to serve API descriptions, you'll need
  # to ensure that it's configured to serve Swagger from the same folder
  config.openapi_root = Rails.root.join('public').to_s

  # Define one or more Swagger documents and provide global metadata for each one
  # When you run the 'rswag:specs:swaggerize' rake task, the complete Swagger will
  # be generated at the provided relative path under openapi_root
  # By default, the operations defined in spec files are added to the first
  # document below. You can override this behavior by adding a openapi_spec tag to the
  # the root example_group in your specs, e.g. describe '...', openapi_spec: 'v2/swagger.json'
  config.openapi_specs = {
    'openapi.json' => {
      openapi: '3.0.1',
      info: {
        title: 'Rēhi API V1',
        version: 'v1'
      },
      paths: {},
      servers: [
        {
          url: 'http://{hostname}',
          variables: {
            hostname: {
              default: 'localhost:3000'
            }
          }
        }
      ],
      components: {
        schemas: {
          # Models
          Race: {
            type: :object,
            properties: {
              id: { type: :integer },
              name: { type: :string },
              created_at: { type: :string, format: :'date-time' },
              updated_at: { type: :string, format: :'date-time' },
              lanes: { type: :array, items: { '$ref': '#/components/schemas/Lane' } }
            },
            required: [ 'id', 'name', 'lanes', 'created_at', 'updated_at' ],
          },
          Lane: {
            type: :object,
            properties: {
              id: { type: :integer },
              race_id: { type: :integer },
              competitor_id: { type: :integer, nullable: true },
              name: { type: :string },
              sort: { type: :integer },
              created_at: { type: :string, format: :'date-time' },
              updated_at: { type: :string, format: :'date-time' },
              competitor: { '$ref': '#/components/schemas/Competitor', nullable: true }
            },
            required: [ 'id', 'name', 'race_id', 'sort', 'created_at', 'updated_at' ]
          },
          Competitor: {
            type: :object,
            properties: {
              id: { type: :integer },
              name: { type: :string },
              position: { type: :integer, nullable: true },
              created_at: { type: :string, format: :'date-time' },
              updated_at: { type: :string, format: :'date-time' },
            },
            required: [ 'id', 'name', 'position', 'created_at', 'updated_at' ]
          },

          # Inputs
          RaceInput: {
            type: :object,
            properties: {
              name: { type: :string },
              lanes: {
                type: :array,
                items: { '$ref': '#/components/schemas/LaneInput' }
              }
            },
            required: [ 'name', 'lanes' ],
            example: {
              name: 'Test Race 123',
              lanes: [
                { name: 'A', competitor: { name: 'Bill', position: 3 } },
                { name: 'B', competitor: { name: 'Ted', position: 1 } },
                { name: 'C', competitor: { name: 'Joanna' } },
                { name: 'D', competitor: { name: 'Elizabeth', position: 2 } },
                { name: 'E', competitor: { name: 'Rufus' } },
              ]
            }
          },
          LaneInput: {
            type: :object,
            properties: {
              id: { type: :integer },
              name: { type: :string },
              competitor: { '$ref': '#/components/schemas/CompetitorInput', nullable: true },
            },
            required: [ 'name' ],
            example: {
              lane: {
                name: 'A',
                competitor: {
                  name: 'Bill',
                  position: 1
                }
              }
            },
          },
          CompetitorInput: {
            type: :object,
            properties: {
              id: { type: :integer },
              name: { type: :string },
              position: { type: :integer, nullable: true },
            },
            required: [ 'name' ],
            example: {
              competitor: {
                name: 'Bill',
                position: 1
              }
            },
          },
        }
      }
    }
  }

  # Specify the format of the output Swagger file when running 'rswag:specs:swaggerize'.
  # The openapi_specs configuration option has the filename including format in
  # the key, this may want to be changed to avoid putting yaml in json files.
  # Defaults to json. Accepts ':json' and ':yaml'.
  config.openapi_format = :json
end
