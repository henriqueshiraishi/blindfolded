class Metodo < ApplicationRecord
  belongs_to :classe
  validates :descricao, presence: true
end
