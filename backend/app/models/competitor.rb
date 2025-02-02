class Competitor < ApplicationRecord
  has_one :lane
  validates :name, presence: true
end
