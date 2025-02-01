class Competitor < ApplicationRecord
  has_one :lane
  # TODO has_one :race_result
end
