class CSELEM < ApplicationRecord
  belongs_to :csdiag
  enum tipo_elemento: [:Actor, :UseCase]
  validates :descricao, presence: true
  validates :tipo_elemento, presence: true
  def self.tipo_elementos
    [ ['Ator', 'Actor'], ['Caso de Uso', 'UseCase'] ]
  end
  before_destroy :remove_dependencias
  private
  def remove_dependencias
    CSASSO.where(cselem_origem_id:  id).delete_all
    CSASSO.where(cselem_destino_id: id).delete_all
  end
end
