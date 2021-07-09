class Page < ApplicationRecord
  belongs_to :topic
  has_many :sections, dependent: :destroy
  has_many :refrences, dependent: :destroy
end
