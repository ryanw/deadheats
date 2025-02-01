class Race < ApplicationRecord
  has_many :lanes, dependent: :destroy
  accepts_nested_attributes_for :lanes, allow_destroy: true

  validates :name, presence: true, format: { with: /\S/, message: 'cannot be blank' }
  validate :validate_minimum_lane_count
  validate :validate_finish_places

  private
    def validate_minimum_lane_count
      if lanes.size < 2
        errors.add(:lanes, 'must have at least 2 lanes')
      end
    end

    def validate_finish_places
      next_place = 1
      prev_place = 1
      sorted_lanes = lanes
        .filter { |lane| not lane.competitor&.position.nil? }
        .sort { |a, b| a.competitor.position <=> b.competitor.position }

      for lane in sorted_lanes
        if lane.competitor.position != next_place and lane.competitor.position != prev_place
          errors.add(:competitor, "is in an invalid position. Expected #{next_place} got #{lane.competitor.position}")
        end

        next_place += 1
        prev_place = lane.competitor.position
      end
    end
end
