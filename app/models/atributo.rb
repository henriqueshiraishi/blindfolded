class Atributo < ApplicationRecord
  belongs_to :classe
  validates :descricao, presence: true
end
