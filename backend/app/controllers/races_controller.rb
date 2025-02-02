class RacesController < ApplicationController
  before_action :set_race, only: %i[ show update destroy ]

  # GET /races
  def index
    @races = Race.includes(lanes: [:competitor]).all

    render json: @races, include: race_includes
  end

  # GET /races/1
  def show
    render json: @race, include: race_includes
  end

  # POST /races
  def create
    @race = Race.new(race_params)

    if @race.save
      render json: @race, status: :created, location: @race, include: race_includes
    else
      render json: @race.errors, status: :unprocessable_entity
    end
  end

  # PATCH /races/1
  def update
    if @race.update(race_params)
      render json: @race, include: race_includes
    else
      render json: @race.errors, status: :unprocessable_entity
    end
  end

  # DELETE /races/1
  def destroy
    @race.destroy!
  end

  private
    def set_race
      @race = Race.includes(lanes: [:competitor]).find(params.expect(:id))
    end

    def race_params
      # Remap nested records to *_attributes
      final_params = params.expect(race: [:name, lanes: [[:id, :name, competitor: [:id, :name, :position]]]])
      if final_params.key?(:lanes)
        final_params[:lanes_attributes] = final_params.delete(:lanes).map do |lane|
          if lane.key?(:competitor)
            lane[:competitor_attributes] = lane.delete(:competitor)
          end
          lane
        end
      end

      final_params
    end

    def race_includes
      [lanes: { include: [:competitor] }]
    end
end
