require 'swagger_helper'

describe 'races', type: :request do
  fixtures :races

  path '/races' do
    get('List all races') do
      tags 'Races'
      produces 'application/json'
      response(200, 'successful') do
        schema type: :array, items: { '$ref': '#/components/schemas/Race' }
        run_test!
      end
    end

    post('Create a new race') do
      tags 'Races'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :race, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string }
        },
        required: [ 'name' ]
      }

      response(201, 'Created race') do
        schema '$ref': '#/components/schemas/Race'
        let(:race) { { name: 'Test Race 123' } }
        run_test!
      end

      response(422, 'invalid request') do
        let(:race) { { name: '' } }
        run_test!
      end
    end
  end

  path '/races/{id}' do
    parameter name: 'id', in: :path, type: :string, description: 'Race ID'

    get('Show a race') do
      tags 'Races'
      produces 'application/json'
      response(200, 'The race') do
        schema '$ref': '#/components/schemas/Race'
        let(:id) { 123 }
        run_test!
      end
      response(404, 'Race not found') do
        let(:id) { 555 }
        run_test!
      end
    end

    patch('Update a race') do
      tags 'Races'
      consumes 'application/json'
      produces 'application/json'
      parameter name: :race, in: :body, schema: {
        type: :object,
        properties: {
          name: { type: :string }
        },
        required: []
      }

      response(200, 'Race was updated') do
        let(:id) { 123 }
        let(:race) { { name: 'Updated Race' } }
        run_test!
      end
      response(404, 'Race not found') do
        let(:id) { 555 }
        run_test!
      end
    end

    delete('Delete a race') do
      tags 'Races'
      response(204, 'Race was deleted') do
        let(:id) { 123 }
        run_test!
      end
      response(404, 'Race not found') do
        let(:id) { 555 }
        run_test!
      end
    end
  end
end
