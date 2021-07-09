class Topic < ApplicationRecord
  has_many :pages, dependent: :destroy
end
