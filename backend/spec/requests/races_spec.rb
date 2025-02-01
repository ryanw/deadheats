require 'swagger_helper'

describe 'races', type: :request do
  before do
    @london = create(:london_marathon)
    @boston = create(:boston_marathon)
    @berlin = create(:berlin_marathon)
    @initial_race_count = Race.count
  end

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
      parameter name: :race, in: :body, schema: { '$ref': '#/components/schemas/RaceInput' }

      response(201, 'Created race') do
        schema '$ref': '#/components/schemas/Race'
        let(:race) do
          {
            race: {
              name: 'Test Race 123',
              lanes: [
                { name: 'A', competitor: { name: 'Bill' } },
                { name: 'B', competitor: { name: 'Ted' } },
                { name: 'C', competitor: { name: 'Joanna' } },
                { name: 'D', competitor: { name: 'Elizabeth' } },
                { name: 'E', competitor: { name: 'Rufus' } },
              ]
            }
          }
        end
        run_test! do |response|
          expect(Race.count).to eq(@initial_race_count + 1)

          data = JSON.parse(response.body)
          expect(data['name']).to eq('Test Race 123')
          expect(data['lanes']).not_to be_nil

          expected_lanes = [
            { 'name' => 'A', 'competitor' => { 'name' => 'Bill' } },
            { 'name' => 'B', 'competitor' => { 'name' => 'Ted' } },
            { 'name' => 'C', 'competitor' => { 'name' => 'Joanna' } },
            { 'name' => 'D', 'competitor' => { 'name' => 'Elizabeth' } },
            { 'name' => 'E', 'competitor' => { 'name' => 'Rufus' } },
          ]

          data['lanes'].each_with_index do |lane, i|
            lane = lane.slice('name', 'competitor')
            lane['competitor'] = lane['competitor'].slice('name')
            expect(lane).to eq(expected_lanes[i])
          end
        end
      end

      response(422, 'invalid request') do
        let(:race) { { name: '' } }
        run_test!
      end

      response(422, 'invalid request', document: false) do
        let(:race) {
          {
            name: 'Invalid Race',
            lanes: [
              { name: 'A', competitor: { name: 'Bill' } },
            ]
          }
        }
        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['lanes']).to eq(['must have at least 2 lanes'])
        end
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
        let(:id) { @boston.id }
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
      parameter name: :race, in: :body, schema: { '$ref': '#/components/schemas/RaceInput' }

      response(200, 'Race was updated') do
        let(:id) { @london.id }
        let(:race) do
          {
            race: {
              name: 'Updated Race',
              lanes: [
                { id: @london.lanes[2].id, name: 'Updated Lane' },
              ]
            }
          }
        end
        run_test! do |response|
          data = JSON.parse(response.body)
          expect(data['lanes'].length).to eq(10)
          # ID shouldn't change
          expect(data['lanes'][2]['id']).to eq(@london.lanes[2].id)
          # Name should change
          expect(data['lanes'][2]['name']).to eq('Updated Lane')
        end
      end
      response(404, 'Race not found') do
        let(:id) { 555 }
        let(:race) { { race: { name: 'Updated Race' } } }
        run_test!
      end
    end

    delete('Delete a race') do
      tags 'Races'

      response(204, 'Race was deleted') do
        let(:id) { @berlin.id }

        run_test! do
          expect(Race.count).to eq(@initial_race_count - 1)
        end
      end
      response(404, 'Race not found') do
        let(:id) { 555 }
        run_test!
      end
    end
  end
end
