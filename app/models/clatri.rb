class CLATRI < ApplicationRecord
  belongs_to :clclas
  validates :descricao, presence: true
end
