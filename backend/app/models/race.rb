class Race < ApplicationRecord
  has_many :lanes, dependent: :destroy
  accepts_nested_attributes_for :lanes, allow_destroy: true

  validates :name, presence: true, format: { with: /\S/, message: 'cannot be blank' }
  validate :minimum_lane_count

  private
    def minimum_lane_count
      if lanes.size < 2
        errors.add(:lanes, 'must have at least 2 lanes')
      end
    end
end
