class CLMETO < ApplicationRecord
  belongs_to :clclas
  validates :descricao, presence: true
end
