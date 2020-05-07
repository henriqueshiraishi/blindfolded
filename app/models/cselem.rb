class CSELEM < ApplicationRecord
  belongs_to :csdiag
  enum tipo_elemento: [:Actor, :UseCase]
  validates :descricao, presence: true
  validates :tipo_elemento, presence: true
  def self.tipo_elementos
    [ ['Ator', 'Actor'], ['Caso de Uso', 'UseCase'] ]
  end
end
