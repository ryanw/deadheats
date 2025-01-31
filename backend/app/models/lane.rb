class Lane < ApplicationRecord
  belongs_to :race
  has_one :competitor
end
