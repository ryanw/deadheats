class Race < ApplicationRecord
  has_many :lanes, dependent: :destroy
end
