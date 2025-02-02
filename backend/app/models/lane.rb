class Lane < ApplicationRecord
  belongs_to :race
  belongs_to :competitor
  accepts_nested_attributes_for :competitor, allow_destroy: true
end
